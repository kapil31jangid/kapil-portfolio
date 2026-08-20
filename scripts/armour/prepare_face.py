"""Prepare web layers and align Kapil's original portrait to the helmet opening."""

from __future__ import annotations

import hashlib
import json
from pathlib import Path

import cv2
import numpy as np
from PIL import Image, ImageChops, ImageDraw, ImageEnhance, ImageFilter, ImageOps


ROOT = Path(__file__).resolve().parents[2]
RAW = ROOT / "artifacts" / "armour-render" / "raw"
PUBLIC = ROOT / "public" / "armours" / "iron-man"
ARTIFACTS = ROOT / "artifacts"
PORTRAIT = ROOT / "public" / "profile" / "kapil-portrait.jpg"
SOURCE_ZIP = Path("/home/kapil31jangid/Downloads/iron-man.zip")


def load_rgba(name: str) -> Image.Image:
    return Image.open(RAW / name).convert("RGBA")


def alpha_bbox(image: Image.Image) -> tuple[int, int, int, int]:
    bbox = image.getchannel("A").getbbox()
    if bbox is None:
        raise RuntimeError("Rendered layer has no alpha foreground")
    return bbox


def geometry_mask(faceplate: Image.Image) -> Image.Image:
    alpha = faceplate.getchannel("A")
    bbox = alpha_bbox(faceplate)
    x0, y0, x1, y1 = bbox
    width, height = x1 - x0, y1 - y0
    ellipse = Image.new("L", faceplate.size, 0)
    draw = ImageDraw.Draw(ellipse)
    inset_x = int(width * 0.17)
    inset_top = int(height * 0.11)
    inset_bottom = int(height * 0.075)
    draw.ellipse(
        (x0 + inset_x, y0 + inset_top, x1 - inset_x, y1 - inset_bottom),
        fill=255,
    )
    # Keep the face within the actual plate silhouette, with a crisp AA edge.
    erode_size = max(5, int(min(width, height) * 0.025) | 1)
    eroded = alpha.filter(ImageFilter.MinFilter(erode_size))
    return ImageChops.multiply(ellipse, eroded).filter(ImageFilter.GaussianBlur(1.2))


def detect_face_and_eyes(path: Path) -> dict:
    image = cv2.imread(str(path))
    if image is None:
        raise RuntimeError(f"Unable to decode portrait: {path}")
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
    eye_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_eye_tree_eyeglasses.xml")
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.08, minNeighbors=5, minSize=(120, 120))
    if len(faces) == 0:
        raise RuntimeError("No frontal face detected in Kapil's source portrait")
    x, y, w, h = max(faces, key=lambda item: item[2] * item[3])
    region = gray[y : y + int(h * 0.68), x : x + w]
    eyes = eye_cascade.detectMultiScale(region, scaleFactor=1.06, minNeighbors=5, minSize=(24, 18))
    eye_centres = sorted(
        [(x + ex + ew / 2, y + ey + eh / 2) for ex, ey, ew, eh in eyes],
        key=lambda point: point[0],
    )
    if len(eye_centres) >= 2:
        eye_centres = [eye_centres[0], eye_centres[-1]]
    else:
        eye_centres = [(x + w * 0.32, y + h * 0.42), (x + w * 0.68, y + h * 0.42)]
    return {
        "face": [int(x), int(y), int(w), int(h)],
        "eyes": [[round(px, 3), round(py, 3)] for px, py in eye_centres],
        "sourceSize": [int(image.shape[1]), int(image.shape[0])],
    }


def remove_background(image: Image.Image, face: list[int]) -> Image.Image:
    rgba = np.array(image.convert("RGBA"))
    rgb = cv2.cvtColor(rgba[:, :, :3], cv2.COLOR_RGB2BGR)
    x, y, w, h = face
    rect_x = max(1, int(x - w * 0.42))
    rect_y = max(1, int(y - h * 0.55))
    rect_w = min(rgb.shape[1] - rect_x - 1, int(w * 1.84))
    rect_h = min(rgb.shape[0] - rect_y - 1, int(h * 2.05))
    mask = np.zeros(rgb.shape[:2], np.uint8)
    bg_model = np.zeros((1, 65), np.float64)
    fg_model = np.zeros((1, 65), np.float64)
    cv2.grabCut(rgb, mask, (rect_x, rect_y, rect_w, rect_h), bg_model, fg_model, 7, cv2.GC_INIT_WITH_RECT)
    alpha = np.where((mask == cv2.GC_FGD) | (mask == cv2.GC_PR_FGD), 255, 0).astype(np.uint8)
    oval = np.zeros_like(alpha)
    centre = (int(x + w * 0.5), int(y + h * 0.48))
    axes = (int(w * 0.57), int(h * 0.78))
    cv2.ellipse(oval, centre, axes, 0, 0, 360, 255, -1)
    alpha = cv2.multiply(alpha, oval, scale=1 / 255)
    alpha = cv2.GaussianBlur(alpha, (0, 0), 1.2)
    rgba[:, :, 3] = alpha
    return Image.fromarray(rgba, "RGBA")


def align_face(mask: Image.Image, detection: dict) -> Image.Image:
    source = Image.open(PORTRAIT).convert("RGBA")
    source = remove_background(source, detection["face"])
    left_eye, right_eye = detection["eyes"]
    angle = np.degrees(np.arctan2(right_eye[1] - left_eye[1], right_eye[0] - left_eye[0]))
    source = source.rotate(float(angle), resample=Image.Resampling.BICUBIC, expand=False)

    mask_bbox = mask.getbbox()
    if not mask_bbox:
        raise RuntimeError("Helmet mask is empty")
    mx0, my0, mx1, my1 = mask_bbox
    mask_w, mask_h = mx1 - mx0, my1 - my0
    face_x, face_y, face_w, face_h = detection["face"]
    target_face_width = mask_w * 1.16
    scale = target_face_width / face_w
    resized = source.resize(
        (max(1, round(source.width * scale)), max(1, round(source.height * scale))),
        Image.Resampling.LANCZOS,
    )

    source_eye_x = ((left_eye[0] + right_eye[0]) / 2) * scale
    source_eye_y = ((left_eye[1] + right_eye[1]) / 2) * scale
    target_eye_x = (mx0 + mx1) / 2
    target_eye_y = my0 + mask_h * 0.405
    paste_x = round(target_eye_x - source_eye_x)
    paste_y = round(target_eye_y - source_eye_y)

    canvas = Image.new("RGBA", mask.size, (0, 0, 0, 0))
    canvas.alpha_composite(resized, (paste_x, paste_y))
    canvas = ImageEnhance.Contrast(canvas).enhance(1.04)
    pixels = np.array(canvas, dtype=np.uint8)
    pixels[:, :, 0] = np.clip(pixels[:, :, 0].astype(np.float32) * 0.98, 0, 255)
    pixels[:, :, 1] = np.clip(pixels[:, :, 1].astype(np.float32) * 1.01, 0, 255)
    pixels[:, :, 2] = np.clip(pixels[:, :, 2].astype(np.float32) * 1.05, 0, 255)
    canvas = Image.fromarray(pixels, "RGBA")
    canvas.putalpha(ImageChops.multiply(canvas.getchannel("A"), mask))
    return canvas


def glow_layer(source: Image.Image, tint: tuple[int, int, int]) -> Image.Image:
    rgba = np.array(source.convert("RGBA"), dtype=np.uint8)
    luminance = cv2.cvtColor(rgba[:, :, :3], cv2.COLOR_RGB2GRAY)
    alpha = np.clip((luminance.astype(np.int16) - 14) * 5, 0, 255).astype(np.uint8)
    alpha = cv2.multiply(alpha, rgba[:, :, 3], scale=1 / 255)
    output = np.zeros_like(rgba)
    output[:, :, :3] = tint
    output[:, :, 3] = alpha
    return Image.fromarray(output, "RGBA")


def metallic_highlights(*images: Image.Image) -> Image.Image:
    merged = Image.new("RGBA", images[0].size, (0, 0, 0, 0))
    for image in images:
        merged = Image.alpha_composite(merged, image)
    rgba = np.array(merged, dtype=np.uint8)
    luminance = cv2.cvtColor(rgba[:, :, :3], cv2.COLOR_RGB2GRAY)
    alpha = np.clip((luminance.astype(np.int16) - 178) * 1.9, 0, 90).astype(np.uint8)
    alpha = cv2.multiply(alpha, rgba[:, :, 3], scale=1 / 255)
    output = rgba.copy()
    output[:, :, :3] = np.clip(output[:, :, :3].astype(np.int16) + 24, 0, 255)
    output[:, :, 3] = alpha
    return Image.fromarray(output, "RGBA")


def helmet_interior(mask: Image.Image) -> Image.Image:
    size = max(9, int(min(mask.size) * 0.008) | 1)
    expanded = mask.filter(ImageFilter.MaxFilter(size))
    contracted = mask.filter(ImageFilter.MinFilter(size))
    ring = ImageChops.subtract(expanded, contracted)
    shadow = ImageChops.subtract(mask, contracted).filter(ImageFilter.GaussianBlur(3.0))
    alpha = ImageChops.lighter(ring.point(lambda value: min(235, int(value * 0.92))), shadow)
    layer = Image.new("RGBA", mask.size, (5, 10, 16, 0))
    layer.putalpha(alpha)
    return layer


def save_webp(image: Image.Image, filename: str, quality: int = 94) -> None:
    image.save(PUBLIC / filename, "WEBP", quality=quality, method=6, lossless=False, exact=True)


def contact_sheet(closed: Image.Image, opened: Image.Image, layers: list[tuple[str, Image.Image]]) -> None:
    thumb_w, thumb_h = 410, 512
    cards = [("Closed", closed), ("Open", opened), *layers]
    columns = 4
    rows = (len(cards) + columns - 1) // columns
    sheet = Image.new("RGB", (columns * thumb_w, rows * (thumb_h + 44)), (6, 9, 15))
    draw = ImageDraw.Draw(sheet)
    for index, (label, image) in enumerate(cards):
        x = (index % columns) * thumb_w
        y = (index // columns) * (thumb_h + 44)
        preview = ImageOps.contain(image, (thumb_w, thumb_h), Image.Resampling.LANCZOS)
        sheet.paste(preview, (x + (thumb_w - preview.width) // 2, y), preview)
        draw.text((x + 12, y + thumb_h + 12), label, fill=(220, 228, 240))
    sheet.save(ARTIFACTS / "armour-contact-sheet.png")


def main() -> None:
    PUBLIC.mkdir(parents=True, exist_ok=True)
    body = load_rgba("body-open.png")
    faceplate = load_rgba("faceplate.png")
    mask = geometry_mask(faceplate)
    body_alpha = body.getchannel("A")
    body.putalpha(ImageChops.subtract(body_alpha, ImageChops.multiply(body_alpha, mask)))
    detection = detect_face_and_eyes(PORTRAIT)
    face = align_face(mask, detection)
    interior = helmet_interior(mask)
    eyes = glow_layer(load_rgba("eyes-source.png"), (210, 249, 255))
    reactor = glow_layer(load_rgba("reactor-source.png"), (188, 244, 255))
    highlights = metallic_highlights(body, faceplate)

    save_webp(body, "body-open.webp")
    save_webp(faceplate, "faceplate.webp")
    save_webp(interior, "helmet-interior.webp", 96)
    save_webp(face, "kapil-face-layer.webp", 96)
    save_webp(eyes, "eyes.webp", 96)
    save_webp(reactor, "reactor.webp", 96)
    save_webp(highlights, "highlights.webp", 92)
    white_mask = Image.new("RGBA", mask.size, (255, 255, 255, 0))
    white_mask.putalpha(mask)
    white_mask.save(PUBLIC / "helmet-mask.png", optimize=True)

    metadata = json.loads((RAW / "metadata.json").read_text(encoding="utf-8"))
    metadata["portrait"] = {
        "source": "/profile/kapil-portrait.jpg",
        "detection": detection,
        "modifications": [
            "background removal",
            "rotation correction",
            "proportional scaling",
            "helmet-mask clipping",
            "exposure and colour-temperature integration",
        ],
        "facialGeneration": False,
    }
    metadata["sourceArchiveSha256"] = hashlib.sha256(SOURCE_ZIP.read_bytes()).hexdigest()
    (PUBLIC / "metadata.json").write_text(json.dumps(metadata, indent=2) + "\n", encoding="utf-8")

    closed = Image.alpha_composite(Image.alpha_composite(Image.alpha_composite(body, faceplate), eyes), reactor)
    closed = Image.alpha_composite(closed, highlights)
    opened = Image.alpha_composite(Image.alpha_composite(Image.alpha_composite(face, body), interior), reactor)
    contact_sheet(
        closed,
        opened,
        [
            ("Body open", body),
            ("Faceplate", faceplate),
            ("Helmet interior", interior),
            ("Kapil face", face),
            ("Eyes", eyes),
            ("Reactor", reactor),
            ("Highlights", highlights),
            ("Helmet mask", white_mask),
        ],
    )
    closed.save(ARTIFACTS / "armour-closed-composite.png")
    opened.save(ARTIFACTS / "armour-open-composite.png")
    print(f"PUBLIC_LAYER_DIR={PUBLIC}")
    print(f"PORTRAIT_DETECTION={json.dumps(detection)}")


if __name__ == "__main__":
    main()
