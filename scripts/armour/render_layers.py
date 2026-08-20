"""Render aligned RGBA armour layers from the private Blender source."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

import bpy
from bpy_extras.object_utils import world_to_camera_view
from mathutils import Vector

SCRIPT_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(SCRIPT_DIR))

from process_model import (  # noqa: E402
    ROOT,
    configure_scene,
    ensure_camera,
    look_at,
    mesh_objects,
    relink_materials,
    render,
)


RAW_DIR = ROOT / "artifacts" / "armour-render" / "raw"
PUBLIC_DIR = ROOT / "public" / "armours" / "iron-man"
FACEPLATE_NAME = "Object_3.006"
REACTOR_NAME = "Object_3.010"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--preview", action="store_true")
    parser.add_argument("--width", type=int)
    parser.add_argument("--height", type=int)
    args = sys.argv[sys.argv.index("--") + 1 :] if "--" in sys.argv else []
    return parser.parse_args(args)


def set_base_emission(enabled: bool) -> None:
    for material in bpy.data.materials:
        if not material.use_nodes or not material.node_tree:
            continue
        for node in material.node_tree.nodes:
            if node.type != "BSDF_PRINCIPLED":
                continue
            socket = node.inputs.get("Emission Strength")
            if socket:
                socket.default_value = 1.35 if enabled else 0.0


def make_glow_material() -> bpy.types.Material:
    material = bpy.data.materials.new("KJ_Emission_Isolation")
    material.use_nodes = True
    nodes = material.node_tree.nodes
    nodes.clear()
    output = nodes.new("ShaderNodeOutputMaterial")
    emission = nodes.new("ShaderNodeEmission")
    texture = nodes.new("ShaderNodeTexImage")
    texture.image = bpy.data.images.get("KJ_Image_2")
    texture.interpolation = "Linear"
    emission.inputs["Strength"].default_value = 6.0
    material.node_tree.links.new(texture.outputs["Color"], emission.inputs["Color"])
    material.node_tree.links.new(emission.outputs["Emission"], output.inputs["Surface"])
    return material


def set_visibility(visible_names: set[str] | None, hidden_names: set[str] | None = None) -> None:
    hidden_names = hidden_names or set()
    for obj in mesh_objects():
        if visible_names is None:
            obj.hide_render = obj.name in hidden_names
        else:
            obj.hide_render = obj.name not in visible_names


def projected_bounds(obj: bpy.types.Object, width: int, height: int) -> dict[str, float]:
    scene = bpy.context.scene
    camera = scene.camera
    points = [world_to_camera_view(scene, camera, obj.matrix_world @ Vector(corner)) for corner in obj.bound_box]
    left = max(0.0, min(point.x for point in points))
    right = min(1.0, max(point.x for point in points))
    top = max(0.0, 1.0 - max(point.y for point in points))
    bottom = min(1.0, 1.0 - min(point.y for point in points))
    return {
        "x": round(left * width, 3),
        "y": round(top * height, 3),
        "width": round((right - left) * width, 3),
        "height": round((bottom - top) * height, 3),
        "xPercent": round(left * 100, 4),
        "yPercent": round(top * 100, 4),
        "widthPercent": round((right - left) * 100, 4),
        "heightPercent": round((bottom - top) * 100, 4),
    }


def configure_camera() -> bpy.types.Object:
    camera = ensure_camera()
    camera.data.lens = 82
    camera.location = Vector((0.85, -12.8, 5.35))
    look_at(camera, Vector((0.0, -0.05, 5.05)))
    return camera


def render_layer(filename: str, visible: set[str] | None, hidden: set[str] | None = None) -> None:
    set_visibility(visible, hidden)
    render(RAW_DIR / filename)


def main() -> None:
    args = parse_args()
    width = args.width or (768 if args.preview else 2048)
    height = args.height or (960 if args.preview else 2560)
    samples = 16 if args.preview else 32
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    PUBLIC_DIR.mkdir(parents=True, exist_ok=True)

    linked = relink_materials()
    if not all(linked.values()):
        raise RuntimeError(f"Required texture relinking failed: {linked}")
    configure_scene(width, height, samples)
    camera = configure_camera()
    scene = bpy.context.scene
    faceplate = bpy.data.objects.get(FACEPLATE_NAME)
    reactor = bpy.data.objects.get(REACTOR_NAME)
    if faceplate is None:
        raise RuntimeError(f"Faceplate object {FACEPLATE_NAME!r} is unavailable")
    if reactor is None:
        raise RuntimeError(f"Reactor object {REACTOR_NAME!r} is unavailable")

    set_base_emission(False)
    render_layer("body-open.png", None, {FACEPLATE_NAME})
    render_layer("faceplate.png", {FACEPLATE_NAME})

    glow_material = make_glow_material()
    scene.view_layers[0].material_override = glow_material
    render_layer("eyes-source.png", {FACEPLATE_NAME})
    render_layer("reactor-source.png", {REACTOR_NAME})
    scene.view_layers[0].material_override = None

    set_base_emission(True)
    render_layer("closed-reference.png", None)
    render_layer("open-reference.png", None, {FACEPLATE_NAME})
    set_visibility(None)

    plate_bounds = projected_bounds(faceplate, width, height)
    hinge_x = plate_bounds["xPercent"] + plate_bounds["widthPercent"] / 2
    hinge_y = plate_bounds["yPercent"] + plate_bounds["heightPercent"] * 0.08
    face_bounds = {
        "x": round(plate_bounds["x"] + plate_bounds["width"] * 0.12, 3),
        "y": round(plate_bounds["y"] + plate_bounds["height"] * 0.08, 3),
        "width": round(plate_bounds["width"] * 0.76, 3),
        "height": round(plate_bounds["height"] * 0.86, 3),
    }
    metadata = {
        "width": width,
        "height": height,
        "sourceModel": "source-assets/iron-man/source/iron.blend",
        "sourceModelPublic": False,
        "faceplateObject": FACEPLATE_NAME,
        "reactorObject": REACTOR_NAME,
        "camera": {
            "location": [round(value, 5) for value in camera.location],
            "rotationEuler": [round(value, 5) for value in camera.rotation_euler],
            "lens": camera.data.lens,
        },
        "hinge": {"xPercent": round(hinge_x, 4), "yPercent": round(hinge_y, 4)},
        "helmetBounds": plate_bounds,
        "faceBounds": face_bounds,
        "openTransform": {"rotateX": -68, "translateYPercent": -4.5, "scale": 0.965},
        "attribution": {"status": "pending", "author": None, "licence": None, "sourceUrl": None},
    }
    (RAW_DIR / "metadata.json").write_text(json.dumps(metadata, indent=2) + "\n", encoding="utf-8")
    print(f"RAW_LAYER_DIR={RAW_DIR}")
    print(f"RENDER_SIZE={width}x{height}")
    print(f"FACEPLATE_BOUNDS={plate_bounds}")


if __name__ == "__main__":
    main()
