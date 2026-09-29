# Thought-Controlled Bionic Hand Demo Video (Remotion)

A technical presentation and explainer video (1080p 30fps) for the **Thought-Controlled Bionic Hand** — a 3D-printed bionic prosthetic hand integrating neural & muscle-signal control, stereo vision intelligence, and multi-modal sensory feedback.

---

## Quick Start Commands

### 1. Install Dependencies
```bash
npm install
pip install edge-tts
```

### 2. Preview in Remotion Studio
```bash
npm run dev
# or
npx remotion studio
```
Opens the interactive timeline preview in your browser at `http://localhost:3000`.

### 3. Regenerate Voiceover & Word Timings
```bash
python scripts/gen_voice.py
```
Reads narration from `scripts/narration.json`, generates `scene1.mp3` through `scene8.mp3` into `public/voice/` via `edge-tts` (`en-IN-NeerjaNeural`, rate `-5%`), and extracts per-word boundary timestamps into `public/voice/sceneN.json`.

### 4. Render Final Video (MP4)
```bash
npm run render
# or
npx remotion render HandiDemo out/handi_demo.mp4 --codec=h264
```
The rendered video will be saved to `out/handi_demo.mp4`.

---

## Customization Guide

### Editing Narration Text
All scene narration, topics, and titles are defined in a single file:
- **[`scripts/narration.json`](scripts/narration.json)**

After updating the narration text in `scripts/narration.json`, simply re-run:
```bash
python scripts/gen_voice.py
```
The video's composition duration and word-by-word captions will automatically adapt via `calculateMetadata()` in Remotion.

### Using Custom Audio Recordings
If you record your own voiceover:
1. Drop your `.mp3` recordings into `public/voice/` with matching filenames (`scene1.mp3` ... `scene8.mp3`).
2. Remotion's dynamic `calculateMetadata()` measures the audio files directly using `@remotion/media-utils`'s `getAudioDurationInSeconds()` and adjusts scene durations with `+0.6s` padding automatically.

### Customizing Colors, Typography, & Timings
Design tokens and styling parameters are centralized in:
- **[`src/constants.ts`](src/constants.ts)**
  - `COLORS.bg`: Background color (`#F5F6F8`)
  - `COLORS.textPrimary`: Primary heading & body text (`#1B2540`)
  - `COLORS.accentOrange`: Highlight and active-caption color (`#F28C28`)
  - `COLORS.accentBlue`: Secondary technical blue (`#1F4E9E`)
  - `TRANSITION_FRAMES`: Duration of scene transitions (15 frames = 0.5s)
  - `SCENE_PADDING_SECONDS`: Post-narration padding per scene (0.6s)

---

## Architecture & Scenes

1. **Title**: Open-source robotics platform introduction with dual-hand hero photo.
2. **CAD Overview**: Interactive rotating 3D FreeCAD model (`handi_freecad.mp4`) with animated feature panel.
3. **Finger**: Exploded finger assembly (`finger_exploded.png`) detailing proximal, intermediate, distal sections, and M2 screw hinges.
4. **Thumb**: Opposable thumb rotator (`thumb_exploded.png`) highlighting pinch, tripod, and column grip configurations.
5. **Actuation**: Tendon spool powertrain (`servo_spool.png` cross-fading to `hero_both_hands.png`), Hitec HS-35HD servos, and aluminium heat-sink covers.
6. **Sensing**: Joint angle potentiometers (`potentiometers.png`) and fingertip force sensors (`fingertip_finished.png`) with animated digital counters.
7. **Palm**: Egocentric vision USB webcam (`webcam_palm.png`) and high-friction neoprene grip pads (`palm_grips_camera.png`).
8. **Outro**: Full CAD rotation backdrop, build statistics (~30 hours build time, 163g PLA), and project team / institution credits.
