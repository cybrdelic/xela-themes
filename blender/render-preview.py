"""
Quick single-frame preview render for the XELA promo scene.
Renders frame 390 (wide triptych hero) at 16 samples, 960x540.
Outputs: blender/render/preview.png  then opens it.
"""

import bpy
import os
import sys
import subprocess

# Add blender dir to path so we can import the main scene module
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
if SCRIPT_DIR not in sys.path:
    sys.path.insert(0, SCRIPT_DIR)

# Build the full scene (imports from xela-themes-promo.py)
import importlib.util
spec = importlib.util.spec_from_file_location(
    "promo", os.path.join(SCRIPT_DIR, "xela-themes-promo.py"))
promo = importlib.util.module_from_spec(spec)
spec.loader.exec_module(promo)

promo.build_scene()
promo.build_vscode(cx=0.0,   cy=0.0, cz=0.0)
promo.build_terminal(cx=6.25, cy=0.0, cz=0.0)
promo.build_personalization(cx=12.5, cy=0.0, cz=0.0)
promo.build_orbs()
promo.build_lights()
promo.build_camera()
promo.setup_compositor()

# Override for fast preview
sc = bpy.context.scene
sc.cycles.samples       = 16
sc.render.resolution_x  = 960
sc.render.resolution_y  = 540
sc.frame_current        = 390   # wide triptych hero shot

out_path = os.path.join(SCRIPT_DIR, "render", "preview.png")
os.makedirs(os.path.dirname(out_path), exist_ok=True)
sc.render.filepath      = out_path
sc.render.image_settings.file_format = 'PNG'

print(f"[preview] Rendering frame 390 → {out_path}")
bpy.ops.render.render(write_still=True)
print(f"[preview] Done. Opening {out_path}")

if sys.platform == "win32":
    os.startfile(out_path)
elif sys.platform == "darwin":
    subprocess.Popen(["open", out_path])
else:
    subprocess.Popen(["xdg-open", out_path])
