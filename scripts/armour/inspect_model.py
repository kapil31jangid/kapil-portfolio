"""Inspect the private armour source model from Blender's background mode.

Run with:
  blender -b source-assets/iron-man/source/iron.blend \
    --python scripts/armour/inspect_model.py
"""

from __future__ import annotations

import json
import math
from pathlib import Path

import bpy
from mathutils import Vector


ROOT = Path(__file__).resolve().parents[2]
ARTIFACTS = ROOT / "artifacts"
TEXTURES = ROOT / "source-assets" / "iron-man" / "textures"
JSON_PATH = ARTIFACTS / "armour-inspection.json"
MARKDOWN_PATH = ARTIFACTS / "armour-inspection.md"


def rounded(value: float) -> float:
    return round(float(value), 6)


def vector(value) -> list[float]:
    return [rounded(item) for item in value]


def world_bounds(obj: bpy.types.Object) -> dict[str, list[float]] | None:
    if not getattr(obj, "bound_box", None):
        return None
    points = [obj.matrix_world @ Vector(corner) for corner in obj.bound_box]
    minimum = [min(point[index] for point in points) for index in range(3)]
    maximum = [max(point[index] for point in points) for index in range(3)]
    return {
        "min": vector(minimum),
        "max": vector(maximum),
        "centre": vector([(minimum[i] + maximum[i]) / 2 for i in range(3)]),
        "size": vector([maximum[i] - minimum[i] for i in range(3)]),
    }


def relink_textures() -> list[dict[str, str | bool]]:
    available = {path.name.lower(): path for path in TEXTURES.glob("*") if path.is_file()}
    results: list[dict[str, str | bool]] = []
    for image in bpy.data.images:
        if image.source != "FILE":
            continue
        original = image.filepath
        filename = Path(bpy.path.abspath(original)).name.lower()
        candidate = available.get(filename)
        if candidate:
            image.filepath = str(candidate)
            try:
                image.reload()
                linked = True
            except RuntimeError:
                linked = False
        else:
            linked = bool(image.has_data)
        results.append(
            {
                "image": image.name,
                "original": original,
                "resolved": image.filepath,
                "loaded": linked,
            }
        )
    return results


def material_record(material: bpy.types.Material) -> dict:
    nodes = []
    if material.use_nodes and material.node_tree:
        for node in material.node_tree.nodes:
            node_record = {
                "name": node.name,
                "type": node.bl_idname,
                "label": node.label,
            }
            if node.type == "TEX_IMAGE" and getattr(node, "image", None):
                node_record["image"] = node.image.name
                node_record["filepath"] = node.image.filepath
            links = []
            for output in node.outputs:
                for link in output.links:
                    links.append(
                        {
                            "from_socket": output.name,
                            "to_node": link.to_node.name,
                            "to_socket": link.to_socket.name,
                        }
                    )
            if links:
                node_record["links"] = links
            nodes.append(node_record)
    return {
        "name": material.name,
        "use_nodes": material.use_nodes,
        "diffuse_color": vector(material.diffuse_color),
        "nodes": nodes,
    }


def object_record(obj: bpy.types.Object) -> dict:
    record = {
        "name": obj.name,
        "type": obj.type,
        "parent": obj.parent.name if obj.parent else None,
        "parent_type": obj.parent_type if obj.parent else None,
        "location": vector(obj.location),
        "rotation_euler": vector(obj.rotation_euler),
        "scale": vector(obj.scale),
        "dimensions": vector(obj.dimensions),
        "world_bounds": world_bounds(obj),
        "hidden_render": obj.hide_render,
        "constraints": [
            {"name": constraint.name, "type": constraint.type}
            for constraint in obj.constraints
        ],
        "modifiers": [
            {"name": modifier.name, "type": modifier.type}
            for modifier in obj.modifiers
        ],
    }
    if obj.type == "MESH":
        mesh = obj.data
        record.update(
            {
                "mesh": mesh.name,
                "vertices": len(mesh.vertices),
                "edges": len(mesh.edges),
                "polygons": len(mesh.polygons),
                "materials": [slot.material.name if slot.material else None for slot in obj.material_slots],
                "vertex_groups": [group.name for group in obj.vertex_groups],
                "shape_keys": (
                    [key.name for key in mesh.shape_keys.key_blocks]
                    if mesh.shape_keys
                    else []
                ),
            }
        )
    elif obj.type == "ARMATURE":
        record.update(
            {
                "bones": [
                    {
                        "name": bone.name,
                        "head": vector(bone.head_local),
                        "tail": vector(bone.tail_local),
                        "parent": bone.parent.name if bone.parent else None,
                    }
                    for bone in obj.data.bones
                ]
            }
        )
    elif obj.type == "CAMERA":
        record.update(
            {
                "lens": rounded(obj.data.lens),
                "sensor_width": rounded(obj.data.sensor_width),
            }
        )
    return record


def score_candidate(obj: bpy.types.Object, words: tuple[str, ...]) -> float:
    name = obj.name.lower()
    materials = " ".join(
        slot.material.name.lower()
        for slot in obj.material_slots
        if slot.material
    )
    score = sum(4.0 for word in words if word in name)
    score += sum(2.0 for word in words if word in materials)
    bounds = world_bounds(obj)
    if bounds:
        centre = bounds["centre"]
        size = bounds["size"]
        # Spatial features are intentionally kept as raw hints; coordinate axes vary by model.
        score += min(max(size), 10.0) * 0.01
        score += abs(centre[2]) * 0.0001
    return rounded(score)


def candidate_list(objects, words: tuple[str, ...], minimum: float = 0.0) -> list[dict]:
    scored = []
    for obj in objects:
        score = score_candidate(obj, words)
        if score > minimum:
            scored.append({"name": obj.name, "score": score, "bounds": world_bounds(obj)})
    return sorted(scored, key=lambda item: item["score"], reverse=True)


def main() -> None:
    ARTIFACTS.mkdir(parents=True, exist_ok=True)
    texture_links = relink_textures()
    objects = list(bpy.data.objects)
    mesh_objects = [obj for obj in objects if obj.type == "MESH"]
    report = {
        "source_file": bpy.data.filepath,
        "blender_version": bpy.app.version_string,
        "scene": bpy.context.scene.name,
        "frame_range": [bpy.context.scene.frame_start, bpy.context.scene.frame_end],
        "active_camera": bpy.context.scene.camera.name if bpy.context.scene.camera else None,
        "counts": {
            "objects": len(objects),
            "meshes": len(mesh_objects),
            "materials": len(bpy.data.materials),
            "images": len(bpy.data.images),
            "armatures": len([obj for obj in objects if obj.type == "ARMATURE"]),
            "actions": len(bpy.data.actions),
            "polygons": sum(len(obj.data.polygons) for obj in mesh_objects),
        },
        "texture_relinks": texture_links,
        "materials": [material_record(material) for material in bpy.data.materials],
        "objects": [object_record(obj) for obj in objects],
        "actions": [
            {
                "name": action.name,
                "frame_range": vector(action.frame_range),
                "slots": len(getattr(action, "slots", [])),
            }
            for action in bpy.data.actions
        ],
        "candidates": {
            "faceplate": candidate_list(mesh_objects, ("faceplate", "face_plate", "visor", "mask", "helmet_front")),
            "helmet": candidate_list(mesh_objects, ("helmet", "head", "mask", "visor")),
            "interior": candidate_list(mesh_objects, ("interior", "inner", "cavity", "rim")),
            "eyes": candidate_list(mesh_objects, ("eye", "lens", "emission", "glow")),
            "reactor": candidate_list(mesh_objects, ("reactor", "arc", "chest_light", "core", "emission")),
        },
    }
    JSON_PATH.write_text(json.dumps(report, indent=2), encoding="utf-8")

    lines = [
        "# Armour model inspection",
        "",
        f"- Source: `{report['source_file']}`",
        f"- Blender: {report['blender_version']}",
        f"- Objects: {report['counts']['objects']}",
        f"- Meshes: {report['counts']['meshes']}",
        f"- Polygons: {report['counts']['polygons']:,}",
        f"- Materials: {report['counts']['materials']}",
        f"- Armatures: {report['counts']['armatures']}",
        f"- Actions: {report['counts']['actions']}",
        "",
        "## Texture relinking",
        "",
    ]
    for item in texture_links:
        lines.append(f"- `{item['image']}` → `{item['resolved']}` ({'loaded' if item['loaded'] else 'missing'})")
    for category, candidates in report["candidates"].items():
        lines.extend(["", f"## {category.title()} candidates", ""])
        if candidates:
            for candidate in candidates[:20]:
                lines.append(f"- `{candidate['name']}` — semantic score {candidate['score']}")
        else:
            lines.append("- No semantically named candidate; spatial/topological inspection required.")
    lines.extend(["", "## Objects", ""])
    for obj in report["objects"]:
        if obj["type"] == "MESH":
            lines.append(
                f"- `{obj['name']}` — {obj.get('polygons', 0):,} polygons; "
                f"materials: {', '.join(str(item) for item in obj.get('materials', [])) or 'none'}; "
                f"bounds: {obj.get('world_bounds')}"
            )
    MARKDOWN_PATH.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"INSPECTION_JSON={JSON_PATH}")
    print(f"INSPECTION_MARKDOWN={MARKDOWN_PATH}")
    print(json.dumps(report["counts"], indent=2))


if __name__ == "__main__":
    main()
