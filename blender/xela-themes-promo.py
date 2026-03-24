"""
XELA Themes — Photorealistic Blender Promo Video
================================================
Blender 4.x / bpy script.

Run from Blender's scripting workspace or via:
  blender --background --python blender/xela-themes-promo.py -- --render

Three floating surfaces showcased:
  1. VS Code editor mockup
  2. Windows Terminal mockup
  3. Windows Personalization mockup (taskbar + desktop)

Scene:
  - XELA Midnight palette — emission materials, neon glows
  - Palette orbs orbiting the full triptych
  - HDRI + area lights (key/fill/rim/bounce)
  - Cinematic camera: 450 frames @ 30fps (15 sec)
    Pass 1 → VS Code close-up
    Pass 2 → Windows Terminal fly-by
    Pass 3 → Windows Personalization pull-back reveal
    Pass 4 → Wide triptych hero shot
  - Cycles, 256 samples, OptiX denoising, 1920x1080 PNG sequence
  - Post-render: ffmpeg stitch → MP4 → os.startfile to open

Output: //render/frame_####.png  →  //render/xela_promo.mp4

CLI flags (after --):
  --render      actually render + stitch (default: just build scene)
  --preview     32 samples, 960x540, faster
"""

import bpy
import math
import os
import sys
import subprocess
from mathutils import Vector, Euler

# ---------------------------------------------------------------------------
# CLI FLAGS
# ---------------------------------------------------------------------------

argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
DO_RENDER  = "--render"  in argv
DO_PREVIEW = "--preview" in argv

# ---------------------------------------------------------------------------
# CONFIG
# ---------------------------------------------------------------------------

FRAME_START  = 1
FRAME_END    = 450
FPS          = 30
RESOLUTION   = (960, 540)   if DO_PREVIEW else (1920, 1080)
SAMPLES      = 32            if DO_PREVIEW else 256
OUTPUT_PATH  = "//render/frame_####.png"
OUTPUT_MP4   = "render/xela_promo.mp4"   # relative to .blend / script dir

# XELA Midnight palette
PALETTE = {
    "bg":       (0.027, 0.027, 0.035, 1.0),
    "surface":  (0.055, 0.055, 0.078, 1.0),
    "border":   (0.10,  0.10,  0.16,  1.0),
    "accent":   (0.0,   0.55,  1.0,   1.0),   # blue
    "cyan":     (0.0,   0.85,  0.85,  1.0),
    "violet":   (0.55,  0.2,   1.0,   1.0),
    "amber":    (1.0,   0.65,  0.0,   1.0),
    "green":    (0.0,   0.9,   0.45,  1.0),
    "red":      (1.0,   0.22,  0.22,  1.0),
    "text":     (0.85,  0.88,  0.95,  1.0),
    # Windows Personalization accent
    "win_accent": (0.0,  0.47,  0.84,  1.0),
    "win_taskbar":(0.05, 0.05,  0.08,  1.0),
}

NEON   = 8.0
PANEL  = 1.2
DIM    = 0.4


# ---------------------------------------------------------------------------
# HELPERS
# ---------------------------------------------------------------------------

def clear_scene():
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete()
    for col in list(bpy.data.collections):
        bpy.data.collections.remove(col)


def mat(name, color, emit=0.0, rough=0.15, metal=0.0):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    nodes = m.node_tree.nodes
    links = m.node_tree.links
    nodes.clear()
    out  = nodes.new("ShaderNodeOutputMaterial")
    bsdf = nodes.new("ShaderNodeBsdfPrincipled")
    bsdf.inputs["Base Color"].default_value    = color
    bsdf.inputs["Roughness"].default_value     = rough
    bsdf.inputs["Metallic"].default_value      = metal
    if emit > 0:
        bsdf.inputs["Emission Color"].default_value   = color
        bsdf.inputs["Emission Strength"].default_value = emit
    links.new(bsdf.outputs["BSDF"], out.inputs["Surface"])
    return m


def plane(name, loc, scale, rot=(0, 0, 0), mat=None):
    bpy.ops.mesh.primitive_plane_add(location=loc, rotation=rot)
    obj = bpy.context.active_object
    obj.name = name
    obj.scale = scale
    if mat:
        obj.data.materials.append(mat)
    return obj


def sphere(name, loc, radius=0.12, mat=None):
    bpy.ops.mesh.primitive_uv_sphere_add(
        radius=radius, location=loc, segments=64, ring_count=32)
    obj = bpy.context.active_object
    obj.name = name
    if mat:
        obj.data.materials.append(mat)
    return obj


def area_light(name, loc, rot, energy, color=(1,1,1), size=2.0):
    bpy.ops.object.light_add(type='AREA', location=loc, rotation=rot)
    l = bpy.context.active_object
    l.name = name
    l.data.energy = energy
    l.data.color  = color
    l.data.size   = size
    return l


def bez(obj, attr):
    """Smooth all keyframes on an attribute to BEZIER."""
    if obj.animation_data and obj.animation_data.action:
        for fc in obj.animation_data.action.fcurves:
            if attr in fc.data_path:
                for kp in fc.keyframe_points:
                    kp.interpolation = 'BEZIER'


# ---------------------------------------------------------------------------
# SCENE BASE
# ---------------------------------------------------------------------------

def build_scene():
    clear_scene()
    sc = bpy.context.scene
    sc.frame_start = FRAME_START
    sc.frame_end   = FRAME_END
    sc.render.fps  = FPS

    sc.render.engine          = 'CYCLES'
    sc.cycles.samples         = SAMPLES
    sc.cycles.use_denoising   = True
    sc.cycles.denoiser        = 'OPTIX'   # fallback: 'OPENIMAGEDENOISE'
    sc.render.resolution_x    = RESOLUTION[0]
    sc.render.resolution_y    = RESOLUTION[1]
    sc.render.image_settings.file_format = 'PNG'
    sc.render.filepath        = OUTPUT_PATH

    # World
    world = bpy.data.worlds.new("XelaWorld")
    sc.world = world
    world.use_nodes = True
    wn = world.node_tree.nodes
    wn.clear()
    bg  = wn.new("ShaderNodeBackground")
    bg.inputs["Color"].default_value    = (0.008, 0.008, 0.018, 1.0)
    bg.inputs["Strength"].default_value = 0.35
    out = wn.new("ShaderNodeOutputWorld")
    world.node_tree.links.new(bg.outputs["Background"], out.inputs["Surface"])


# ---------------------------------------------------------------------------
# SURFACE 1 — VS CODE  (center, offset left: x = -5)
# ---------------------------------------------------------------------------

def build_vscode(cx=0.0, cy=0.0, cz=0.0):
    m_bg  = mat("vs_bg",      PALETTE["bg"],      emit=PANEL * 0.3, rough=0.9)
    m_sur = mat("vs_surface", PALETTE["surface"], emit=PANEL * 0.5, rough=0.8)
    m_acc = mat("vs_accent",  PALETTE["accent"],  emit=NEON,        rough=0.05, metal=0.1)
    m_cyn = mat("vs_cyan",    PALETTE["cyan"],    emit=NEON * 0.8,  rough=0.05)
    m_vio = mat("vs_violet",  PALETTE["violet"],  emit=NEON,        rough=0.05)

    plane("vs_main",      (cx,       cy,       cz),       (3.2, 1.8, 1), mat=m_bg)
    plane("vs_sidebar",   (cx-2.85,  cy,       cz+0.01),  (0.35, 1.8, 1), mat=m_sur)
    plane("vs_statusbar", (cx,       cy-1.85,  cz+0.01),  (3.2, 0.05, 1), mat=m_acc)
    plane("vs_tabbar",    (cx,       cy+1.82,  cz+0.01),  (3.2, 0.08, 1), mat=m_sur)
    plane("vs_tab_act",   (cx-2.5,   cy+1.82,  cz+0.02),  (0.45, 0.08, 1), mat=m_acc)
    plane("vs_minimap",   (cx+3.0,   cy,       cz+0.01),  (0.18, 1.8, 1), mat=m_sur)

    line_data = [
        (m_acc, 1.8, cy+1.2), (m_cyn, 1.2, cy+0.8), (m_vio, 2.1, cy+0.4),
        (m_cyn, 0.9, cy+0.0), (m_acc, 1.5, cy-0.4), (m_vio, 0.7, cy-0.8),
    ]
    for i, (lm, w, ly) in enumerate(line_data):
        plane(f"vs_line_{i}", (cx - 3.2 + w*0.5 + 0.3, ly, cz+0.02), (w*0.5, 0.025, 1), mat=lm)


# ---------------------------------------------------------------------------
# SURFACE 2 — WINDOWS TERMINAL  (offset right: x = +6)
# ---------------------------------------------------------------------------

def build_terminal(cx=6.0, cy=0.0, cz=0.0):
    m_bg   = mat("wt_bg",     PALETTE["bg"],      emit=PANEL * 0.3, rough=0.9)
    m_sur  = mat("wt_sur",    PALETTE["surface"], emit=PANEL * 0.4, rough=0.85)
    m_tab  = mat("wt_tab",    PALETTE["border"],  emit=DIM,         rough=0.8)
    m_acc  = mat("wt_acc",    PALETTE["accent"],  emit=NEON,        rough=0.05)
    m_grn  = mat("wt_green",  PALETTE["green"],   emit=NEON * 0.9,  rough=0.05)
    m_cyn  = mat("wt_cyan",   PALETTE["cyan"],    emit=NEON * 0.8,  rough=0.05)
    m_amb  = mat("wt_amber",  PALETTE["amber"],   emit=NEON * 0.85, rough=0.05)
    m_red  = mat("wt_red",    PALETTE["red"],     emit=NEON * 0.7,  rough=0.05)
    m_vio  = mat("wt_violet", PALETTE["violet"],  emit=NEON,        rough=0.05)

    # Terminal window body
    plane("wt_body",   (cx,      cy,      cz),       (3.0, 1.8, 1), mat=m_bg)
    # Title bar
    plane("wt_title",  (cx,      cy+1.75, cz+0.01),  (3.0, 0.12, 1), mat=m_tab)
    # Tab strip
    plane("wt_tab0",   (cx-2.2,  cy+1.75, cz+0.02),  (0.5, 0.12, 1), mat=m_acc)
    plane("wt_tab1",   (cx-1.5,  cy+1.75, cz+0.02),  (0.4, 0.10, 1), mat=m_sur)

    # ANSI color swatch row (bottom strip — 8 swatches)
    swatch_mats = [m_red, m_grn, m_amb, m_acc, m_vio, m_cyn,
                   mat("wt_white", PALETTE["text"], emit=DIM), m_sur]
    for i, sm in enumerate(swatch_mats):
        sx = cx - 2.55 + i * 0.73
        plane(f"wt_swatch_{i}", (sx, cy-1.5, cz+0.02), (0.3, 0.12, 1), mat=sm)

    # Prompt / command lines
    prompt_data = [
        (m_grn,  0.35, cy+1.1),   # user@host
        (m_acc,  0.5,  cy+1.1),   # path
        (m_cyn,  1.4,  cy+0.75),  # command
        (m_amb,  1.0,  cy+0.4),   # output line 1
        (m_vio,  0.8,  cy+0.05),  # output line 2
        (m_grn,  0.35, cy-0.3),   # next prompt
        (m_acc,  0.6,  cy-0.3),   # path
        (m_cyn,  0.9,  cy-0.65),  # command 2
    ]
    for i, (pm, w, ly) in enumerate(prompt_data):
        plane(f"wt_prompt_{i}", (cx - 3.0 + w*0.5 + 0.15, ly, cz+0.02), (w*0.5, 0.022, 1), mat=pm)

    # Cursor blink block
    plane("wt_cursor", (cx-2.85, cy-0.65, cz+0.03), (0.06, 0.055, 1), mat=m_acc)


# ---------------------------------------------------------------------------
# SURFACE 3 — WINDOWS PERSONALIZATION  (offset far right: x = +12.5)
# ---------------------------------------------------------------------------

def build_personalization(cx=12.5, cy=0.0, cz=0.0):
    m_desktop  = mat("wp_desktop",  PALETTE["bg"],         emit=PANEL * 0.2, rough=0.9)
    m_taskbar  = mat("wp_taskbar",  PALETTE["win_taskbar"],emit=PANEL * 0.6, rough=0.7)
    m_start    = mat("wp_start",    PALETTE["win_accent"], emit=NEON * 0.9,  rough=0.05, metal=0.2)
    m_accent   = mat("wp_accent",   PALETTE["win_accent"], emit=NEON,        rough=0.05)
    m_wallpaper= mat("wp_wallpaper",PALETTE["surface"],    emit=PANEL * 0.4, rough=0.85)
    m_border   = mat("wp_border",   PALETTE["border"],     emit=DIM * 0.5,   rough=0.9)
    m_text     = mat("wp_text",     PALETTE["text"],       emit=DIM,         rough=0.9)
    m_accent2  = mat("wp_accent2",  PALETTE["violet"],     emit=NEON * 0.7,  rough=0.05)
    m_grn      = mat("wp_green",    PALETTE["green"],      emit=NEON * 0.6,  rough=0.05)

    # Desktop background
    plane("wp_desktop",   (cx,      cy,       cz),       (3.5, 2.0, 1), mat=m_desktop)

    # Wallpaper gradient block (center of desktop)
    plane("wp_wallpaper", (cx,      cy+0.15,  cz+0.01),  (2.8, 1.4, 1), mat=m_wallpaper)

    # Taskbar (bottom bar)
    plane("wp_taskbar",   (cx,      cy-1.9,   cz+0.01),  (3.5, 0.18, 1), mat=m_taskbar)

    # Start button
    plane("wp_start",     (cx-3.1,  cy-1.9,   cz+0.02),  (0.18, 0.14, 1), mat=m_start)

    # Taskbar icons (running apps — glowing dots)
    icon_mats = [m_accent, m_accent2, m_grn, m_accent, m_border]
    for i, im in enumerate(icon_mats):
        ix = cx - 2.4 + i * 0.38
        plane(f"wp_icon_{i}", (ix, cy-1.9, cz+0.02), (0.13, 0.10, 1), mat=im)

    # System tray strip (right side of taskbar)
    plane("wp_tray", (cx+2.85, cy-1.9, cz+0.02), (0.45, 0.10, 1), mat=m_border)

    # Settings panel (right panel — color accent picker)
    plane("wp_settings_bg",  (cx+1.6, cy+0.2,  cz+0.02), (1.6, 1.5, 1), mat=m_border)
    plane("wp_settings_hdr", (cx+1.6, cy+0.95, cz+0.03), (1.6, 0.14, 1), mat=m_accent)

    # Color swatches in settings panel
    swatch_mats = [m_accent, m_accent2, m_grn,
                   mat("wp_sw_amb", PALETTE["amber"], emit=NEON*0.6),
                   mat("wp_sw_red", PALETTE["red"],   emit=NEON*0.5),
                   mat("wp_sw_cyn", PALETTE["cyan"],  emit=NEON*0.7)]
    for i, sm in enumerate(swatch_mats):
        row, col = divmod(i, 3)
        sx = cx + 0.85 + col * 0.55
        sy = cy + 0.45 - row * 0.5
        plane(f"wp_swatch_{i}", (sx, sy, cz+0.04), (0.2, 0.18, 1), mat=sm)

    # Active accent highlight ring (thin border around selected swatch)
    plane("wp_swatch_sel", (cx+0.85, cy+0.45, cz+0.045), (0.22, 0.20, 1),
          mat=mat("wp_sel", PALETTE["accent"], emit=NEON*1.2, rough=0.02))

    # Desktop widgets (top-right corner glowing cards)
    for i in range(3):
        plane(f"wp_widget_{i}", (cx + 2.3, cy + 0.9 - i*0.55, cz+0.02),
              (0.7, 0.18, 1), mat=m_border)


# ---------------------------------------------------------------------------
# PALETTE ORBS  (orbit the whole triptych)
# ---------------------------------------------------------------------------

def build_orbs():
    orb_cfg = [
        ("orb_accent", PALETTE["accent"],  NEON),
        ("orb_cyan",   PALETTE["cyan"],    NEON*0.9),
        ("orb_violet", PALETTE["violet"],  NEON),
        ("orb_amber",  PALETTE["amber"],   NEON*0.85),
        ("orb_green",  PALETTE["green"],   NEON*0.8),
        ("orb_red",    PALETTE["red"],     NEON*0.75),
    ]
    center_x = 6.25   # midpoint of triptych (0 + 6 + 12.5) / 3 ≈ 6.17
    for i, (name, color, strength) in enumerate(orb_cfg):
        m = mat(name+"_m", color, emit=strength, rough=0.02, metal=0.3)
        orb = sphere(name, (0, 0, 0), radius=0.16, mat=m)
        angle_off = (2*math.pi / len(orb_cfg)) * i
        rx = 8.5 + 0.6*(i % 3)
        ry = 3.2 + 0.4*(i % 2)
        z0 = -0.8 + 0.3*i
        for frame in range(FRAME_START, FRAME_END + 1):
            angle = angle_off + (2*math.pi*frame) / (FRAME_END * 0.7)
            orb.location = (
                center_x + math.cos(angle)*rx,
                math.sin(angle)*ry,
                z0 + math.sin(angle*1.5)*0.5,
            )
            orb.keyframe_insert(data_path="location", frame=frame)


# ---------------------------------------------------------------------------
# LIGHTS
# ---------------------------------------------------------------------------

def build_lights():
    area_light("key",    (-8, -6, 8),  (math.radians(55), 0, math.radians(-40)), 1200, (1.0,0.97,0.92), 4.0)
    area_light("fill",   (14, 5,  4),  (math.radians(35), 0, math.radians(115)), 400,  (0.5,0.7,1.0),   5.0)
    area_light("rim",    (6,  9,  3),  (math.radians(75), 0, math.radians(180)), 700,  (0.55,0.2,1.0),  3.0)
    area_light("bounce", (6,  0, -4),  (0, 0, 0),                                100,  (0.3,0.35,0.5),  8.0)
    # Neon accent lights parked near each surface
    area_light("neon_vs",  (0,   -3, 1), (math.radians(60),0,0), 120, (0.0,0.55,1.0), 1.5)
    area_light("neon_wt",  (6,   -3, 1), (math.radians(60),0,0), 120, (0.0,0.85,0.85),1.5)
    area_light("neon_wp",  (12.5,-3, 1), (math.radians(60),0,0), 120, (0.0,0.47,0.84),1.5)


# ---------------------------------------------------------------------------
# CAMERA  — cinematic 450-frame fly-through
#
# Acts (each ~100-115 frames):
#   Act 1 (1–110):    VS Code hero — push in from left
#   Act 2 (110–220):  Windows Terminal — orbit/slide right
#   Act 3 (220–330):  Windows Personalization — slide further right + tilt
#   Act 4 (330–450):  Wide triptych reveal — pull back, all three in frame
# ---------------------------------------------------------------------------

def build_camera():
    bpy.ops.object.camera_add(location=(0, -12, 4))
    cam = bpy.context.active_object
    cam.name = "PromoCamera"
    bpy.context.scene.camera = cam
    cam.data.lens         = 50
    cam.data.dof.use_dof  = True
    cam.data.dof.focus_distance  = 12.0
    cam.data.dof.aperture_fstop  = 2.8

    R = math.radians
    keyframes = [
        # Frame   location                   rotation (euler XYZ)
        (1,       (-2,   -12,   4.5),        (R(73), 0, R(-8))),    # wide left start
        (60,      (0,    -6.5,  2.0),        (R(80), 0, 0)),         # VS Code close-up
        (110,     (2,    -5.5,  1.8),        (R(80), 0, R(10))),     # transition slide
        (160,     (6,    -7,    2.5),        (R(77), 0, 0)),         # Terminal full face
        (220,     (8,    -5,    1.5),        (R(82), 0, R(20))),     # Terminal side
        (270,     (12.5, -7.5,  2.5),        (R(76), 0, 0)),         # Personalization face
        (330,     (14,   -5,    2.0),        (R(79), 0, R(15))),     # Personalization side
        (390,     (6.25, -13,   5.5),        (R(70), 0, 0)),         # pull back center
        (450,     (6.25, -15,   7.0),        (R(68), 0, 0)),         # final wide hero
    ]

    for frame, loc, rot in keyframes:
        cam.location        = loc
        cam.rotation_euler  = Euler(rot)
        cam.keyframe_insert(data_path="location",       frame=frame)
        cam.keyframe_insert(data_path="rotation_euler", frame=frame)

    bez(cam, "location")
    bez(cam, "rotation_euler")
    return cam


# ---------------------------------------------------------------------------
# COMPOSITOR
# ---------------------------------------------------------------------------

def setup_compositor():
    sc = bpy.context.scene
    sc.use_nodes = True
    tree = sc.node_tree
    tree.nodes.clear()

    rl      = tree.nodes.new("CompositorNodeRLayers");   rl.location = (-500, 0)
    glare   = tree.nodes.new("CompositorNodeGlare");     glare.location = (-200, 100)
    glare.glare_type = 'BLOOM'; glare.threshold = 0.75; glare.size = 9; glare.mix = 0.88
    lens    = tree.nodes.new("CompositorNodeLensdist");  lens.location = (80, 100)
    lens.inputs["Distortion"].default_value = -0.012
    lens.inputs["Dispersion"].default_value = 0.007
    ellipse = tree.nodes.new("CompositorNodeEllipseMask"); ellipse.location = (-200,-220)
    ellipse.width = 0.88; ellipse.height = 0.88
    blur_v  = tree.nodes.new("CompositorNodeBlur");      blur_v.location = (50, -220)
    blur_v.size_x = 140; blur_v.size_y = 140
    mix_v   = tree.nodes.new("CompositorNodeMixRGB");    mix_v.location = (320, 0)
    mix_v.blend_type = 'MULTIPLY'; mix_v.inputs[0].default_value = 0.55
    comp    = tree.nodes.new("CompositorNodeComposite"); comp.location = (560, 0)
    viewer  = tree.nodes.new("CompositorNodeViewer");    viewer.location = (560, -150)

    L = tree.links
    L.new(rl.outputs["Image"],      glare.inputs["Image"])
    L.new(glare.outputs["Image"],   lens.inputs["Image"])
    L.new(lens.outputs["Image"],    mix_v.inputs[1])
    L.new(ellipse.outputs["Mask"],  blur_v.inputs["Image"])
    L.new(blur_v.outputs["Image"],  mix_v.inputs[2])
    L.new(mix_v.outputs["Image"],   comp.inputs["Image"])
    L.new(mix_v.outputs["Image"],   viewer.inputs["Image"])


# ---------------------------------------------------------------------------
# POST-RENDER: stitch PNG sequence → MP4 → open
# ---------------------------------------------------------------------------

def stitch_and_open():
    """
    Called after Blender finishes rendering.
    Requires ffmpeg on PATH.
    """
    script_dir = os.path.dirname(os.path.abspath(__file__))
    render_dir = os.path.join(script_dir, "render")
    mp4_path   = os.path.join(render_dir, "xela_promo.mp4")

    ffmpeg_cmd = [
        "ffmpeg", "-y",
        "-framerate", str(FPS),
        "-i", os.path.join(render_dir, "frame_%04d.png"),
        "-c:v", "libx264",
        "-preset", "slow",
        "-crf", "18",
        "-pix_fmt", "yuv420p",
        "-movflags", "+faststart",
        mp4_path,
    ]

    print("\n[xela-promo] Stitching frames → MP4...")
    print(" ".join(ffmpeg_cmd))
    result = subprocess.run(ffmpeg_cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print("[xela-promo] ffmpeg error:\n", result.stderr)
        return

    print(f"[xela-promo] Video written: {mp4_path}")
    print("[xela-promo] Opening video...")

    if sys.platform == "win32":
        os.startfile(mp4_path)
    elif sys.platform == "darwin":
        subprocess.Popen(["open", mp4_path])
    else:
        subprocess.Popen(["xdg-open", mp4_path])


# ---------------------------------------------------------------------------
# MAIN
# ---------------------------------------------------------------------------

def main():
    build_scene()

    # Three surfaces spaced ~6.25 units apart on X axis
    build_vscode(cx=0.0,  cy=0.0, cz=0.0)
    build_terminal(cx=6.25, cy=0.0, cz=0.0)
    build_personalization(cx=12.5, cy=0.0, cz=0.0)

    build_orbs()
    build_lights()
    build_camera()
    setup_compositor()

    print("=" * 62)
    print("XELA Themes Promo — scene built.")
    print(f"  Surfaces:   VS Code | Windows Terminal | Win Personalization")
    print(f"  Frames:     {FRAME_START}–{FRAME_END}  ({FPS} fps = {FRAME_END//FPS}s)")
    print(f"  Resolution: {RESOLUTION[0]}x{RESOLUTION[1]}")
    print(f"  Samples:    {SAMPLES} {'(PREVIEW)' if DO_PREVIEW else '(FULL)'}")
    print(f"  Output:     {OUTPUT_PATH}")
    print()

    if DO_RENDER:
        print("[xela-promo] Rendering...")
        bpy.ops.render.render(animation=True)
        stitch_and_open()
    else:
        print("Scene built. To render + auto-open:")
        print("  blender --background xela_promo.blend --python blender/xela-themes-promo.py -- --render")
        print()
        print("Preview render (faster):")
        print("  blender --background xela_promo.blend --python blender/xela-themes-promo.py -- --render --preview")
    print("=" * 62)


if __name__ == "__main__":
    main()
