"""Relink the supplied PBR textures and render spatial inspection previews."""

from __future__ import annotations

import json
import math
import sys
from pathlib import Path

import bpy
from mathutils import Vector


ROOT = Path(__file__).resolve().parents[2]
SOURCE_ROOT = ROOT / "source-assets" / "iron-man"
TEXTURES = SOURCE_ROOT / "textures"
ARTIFACTS = ROOT / "artifacts" / "armour-previews"


def link_image(image_name: str, filename: str, color_space: str) -> bool:
    path = TEXTURES / filename
    if not path.exists():
        return False
    replacement = bpy.data.images.load(str(path), check_existing=False)
    replacement.name = f"KJ_{image_name}"
    replacement.colorspace_settings.name = color_space
    replaced = False
    for material in bpy.data.materials:
        if not material.use_nodes or not material.node_tree:
            continue
        for node in material.node_tree.nodes:
            if node.type == "TEX_IMAGE" and node.image and node.image.name == image_name:
                node.image = replacement
                replaced = True
    return replaced


def relink_materials() -> dict[str, bool]:
    linked = {
        "Image_0": link_image("Image_0", "Image_0.jpeg", "sRGB"),
        "Image_1": link_image("Image_1", "Image_1.png", "Non-Color"),
        "Image_2": link_image("Image_2", "Image_2.jpeg", "sRGB"),
    }
    # The source archive contains no files for these optional image nodes. Disconnect
    # them so missing magenta/black image values cannot corrupt the PBR material.
    for material in bpy.data.materials:
        if not material.use_nodes or not material.node_tree:
            continue
        for node in material.node_tree.nodes:
            if node.type != "TEX_IMAGE" or not node.image:
                continue
            if node.image.name not in {"Image_3", "Specular Tint"}:
                continue
            for output in node.outputs:
                for link in list(output.links):
                    material.node_tree.links.remove(link)
    return linked


def look_at(obj: bpy.types.Object, target: Vector) -> None:
    direction = target - obj.location
    obj.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()


def ensure_camera() -> bpy.types.Object:
    camera = bpy.data.objects.get("KJ_Render_Camera")
    if camera is None:
        camera_data = bpy.data.cameras.new("KJ_Render_Camera")
        camera = bpy.data.objects.new("KJ_Render_Camera", camera_data)
        bpy.context.collection.objects.link(camera)
    camera.data.lens = 55
    camera.data.sensor_width = 36
    bpy.context.scene.camera = camera
    return camera


def ensure_area_light(name: str, location, energy: float, size: float, color) -> bpy.types.Object:
    light = bpy.data.objects.get(name)
    if light is None:
        data = bpy.data.lights.new(name, type="AREA")
        light = bpy.data.objects.new(name, data)
        bpy.context.collection.objects.link(light)
    light.location = location
    light.data.energy = energy
    light.data.shape = "DISK"
    light.data.size = size
    light.data.color = color
    look_at(light, Vector((0, 0, 4.2)))
    return light


def configure_scene(width: int, height: int, samples: int = 24) -> None:
    scene = bpy.context.scene
    scene.render.engine = "BLENDER_EEVEE_NEXT"
    scene.render.resolution_x = width
    scene.render.resolution_y = height
    scene.render.resolution_percentage = 100
    scene.render.image_settings.file_format = "PNG"
    scene.render.image_settings.color_mode = "RGBA"
    scene.render.film_transparent = True
    scene.render.image_settings.color_depth = "8"
    scene.render.image_settings.compression = 30
    scene.render.resolution_percentage = 100
    scene.render.use_file_extension = True
    scene.render.film_transparent = True
    scene.render.engine = "BLENDER_EEVEE_NEXT"
    scene.world.color = (0.008, 0.01, 0.015)
    if hasattr(scene, "view_settings"):
        scene.view_settings.look = "Medium High Contrast"
    scene.render.image_settings.color_mode = "RGBA"
    scene.render.image_settings.color_depth = "8"
    scene.render.resolution_percentage = 100
    scene.render.pixel_aspect_x = 1
    scene.render.pixel_aspect_y = 1
    ensure_area_light("KJ_Key", (-6.0, -8.0, 10.0), 1800, 5.0, (1.0, 0.58, 0.34))
    ensure_area_light("KJ_Rim", (5.0, 3.5, 9.0), 2200, 4.0, (0.22, 0.58, 1.0))
    ensure_area_light("KJ_Fill", (0.0, -4.0, 2.0), 900, 3.0, (0.35, 0.65, 1.0))


def render(path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    bpy.context.scene.render.filepath = str(path)
    bpy.ops.render.render(write_still=True)


def mesh_objects() -> list[bpy.types.Object]:
    return [obj for obj in bpy.data.objects if obj.type == "MESH"]


def render_full_views() -> None:
    configure_scene(640, 800, 24)
    camera = ensure_camera()
    target = Vector((0, 0, 3.9))
    views = {
        "front-negative-y": Vector((0, -18, 4.1)),
        "front-positive-y": Vector((0, 18, 4.1)),
        "three-quarter-negative-y": Vector((7.5, -17, 5.0)),
        "three-quarter-positive-y": Vector((7.5, 17, 5.0)),
    }
    for name, position in views.items():
        camera.location = position
        look_at(camera, target)
        render(ARTIFACTS / f"{name}.png")


def render_head_candidates() -> list[dict]:
    configure_scene(360, 360, 16)
    camera = ensure_camera()
    all_meshes = mesh_objects()
    candidates = []
    for obj in all_meshes:
        points = [obj.matrix_world @ Vector(corner) for corner in obj.bound_box]
        z_min = min(point.z for point in points)
        z_max = max(point.z for point in points)
        if z_max < 6.35:
            continue
        candidates.append((obj, z_min, z_max))

    manifest = []
    for index, (candidate, z_min, z_max) in enumerate(candidates):
        for obj in all_meshes:
            obj.hide_render = obj != candidate
        centre = sum((candidate.matrix_world @ Vector(corner) for corner in candidate.bound_box), Vector()) / 8
        size = max(candidate.dimensions)
        distance = max(3.2, size * 4.2)
        camera.location = Vector((centre.x, centre.y - distance, centre.z + size * 0.05))
        look_at(camera, centre)
        filename = f"head-{index:02d}-{candidate.name.strip().replace(' ', '_').replace('.', '-')}.png"
        render(ARTIFACTS / filename)
        manifest.append(
            {
                "index": index,
                "name": candidate.name,
                "file": filename,
                "zMin": round(z_min, 5),
                "zMax": round(z_max, 5),
                "polygons": len(candidate.data.polygons),
            }
        )
    for obj in all_meshes:
        obj.hide_render = False
    (ARTIFACTS / "head-manifest.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    return manifest


def main() -> None:
    ARTIFACTS.mkdir(parents=True, exist_ok=True)
    linked = relink_materials()
    print(f"TEXTURE_LINKS={json.dumps(linked)}")
    render_full_views()
    manifest = render_head_candidates()
    print(f"HEAD_CANDIDATES={len(manifest)}")
    print(f"PREVIEW_DIR={ARTIFACTS}")


if __name__ == "__main__":
    main()
