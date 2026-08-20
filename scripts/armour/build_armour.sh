#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
BLENDER_BIN="${BLENDER_BIN:-$ROOT_DIR/source-assets/tools/blender-4.5.12-linux-x64/blender}"
MODEL="$ROOT_DIR/source-assets/iron-man/source/iron.blend"
PYTHON_ENV="$ROOT_DIR/source-assets/tools/armour-python"

if [[ ! -x "$BLENDER_BIN" ]]; then
  echo "BLENDER_UNAVAILABLE: $BLENDER_BIN" >&2
  exit 1
fi
if [[ ! -f "$MODEL" ]]; then
  echo "SOURCE_GATE_FAILED: $MODEL" >&2
  exit 1
fi

mkdir -p "$ROOT_DIR/artifacts" "$ROOT_DIR/public/armours/iron-man"

if [[ ! -f "$ROOT_DIR/source-assets/iron-man/textures/Image_1.png" ]]; then
  magick \
    -size 4096x4096 xc:black \
    "$ROOT_DIR/source-assets/iron-man/textures/Image_1@channels=G.png" \
    "$ROOT_DIR/source-assets/iron-man/textures/Image_1@channels=B.png" \
    -combine \
    "$ROOT_DIR/source-assets/iron-man/textures/Image_1.png"
fi

if [[ ! -x "$PYTHON_ENV/bin/python" ]]; then
  python3 -m venv --system-site-packages "$PYTHON_ENV"
fi
if ! "$PYTHON_ENV/bin/python" -c 'import cv2' >/dev/null 2>&1; then
  "$PYTHON_ENV/bin/pip" install --disable-pip-version-check --no-deps opencv-python-headless==4.12.0.88
fi

"$BLENDER_BIN" -b "$MODEL" --python "$ROOT_DIR/scripts/armour/inspect_model.py"
"$BLENDER_BIN" -b "$MODEL" --python "$ROOT_DIR/scripts/armour/render_layers.py"
"$PYTHON_ENV/bin/python" "$ROOT_DIR/scripts/armour/prepare_face.py"
node "$ROOT_DIR/scripts/armour/validate_layers.mjs"
