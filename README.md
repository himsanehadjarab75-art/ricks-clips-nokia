# Ricks Clips — The Coder Who Debugged a Satellite with a Speakerphone

A 60-second vertical short-form video (9:16, 1080×1920, 60fps) in the style of @RicksClips3000, built with Remotion + React Three Fiber.

## Quick Start

```bash
# Install dependencies
npm ci

# Preview in Remotion Studio (interactive)
npm run studio

# Render preview (faster, lower quality)
npm run render:preview

# Render production (H.265, CRF 18, 60fps)
npm run render
```

## Free Cloud Rendering (GitHub Actions)

**Push to a public GitHub repo and it renders automatically:**

```bash
git init
git add .
git commit -m "Ricks Clips: Nokia satellite debug"
gh repo create ricks-clips-nokia --public --push
```

Then:
1. Go to **Actions** tab in GitHub
2. Click **"Render Ricks Clips — Nokia Satellite"**
3. Click **"Run workflow"** → choose `production` or `preview`
4. Download `video.mp4` from **Artifacts** when done

**Free quota:** 2,000 minutes/month on public repos (~150+ renders)

## Project Structure

```
src/
├── Root.tsx              # Main composition (3600 frames = 60s @ 60fps)
├── data/
│   └── shots.ts          # All 32 shots with timing, VO, SFX, camera, lighting
├── components/
│   ├── VOOverlay.tsx     # Breathless typewriter VO overlay
│   ├── SFXProvider.tsx   # Micro-SFX sync per shot
│   └── MusicTrack.tsx    # 5-segment music arc (tick → brass → decay)
└── shots/
    ├── Shot1_FeedHorn.tsx      # Act I: Ignition hook
    ├── Shot2_Keypad.tsx
    ├── Shot3_CherryPicker.tsx
    ├── Shot4_SplitScreen.tsx   # Act II: Stakes & Skeptic
    ... (28 more shots)
    └── Shot32_LoopHook.tsx     # Act IV: Seamless loop (identical to Shot 1)
```

## The 4-Act Structure

| Act | Frames | Time | Shots | Purpose |
|-----|--------|------|-------|---------|
| **I: Ignition Hook** | 0–180 | 0:00–0:03 | 1–3 | Mid-task absurdity, macro close-up |
| **II: Stakes & Skeptic** | 180–900 | 0:03–0:15 | 4–9 | Vargas (DSN) vs. coder (Nokia) |
| **III: Escalation** | 900–2700 | 0:15–0:45 | 10–24 | Montage: armpit thermal, antenna bite, crossover |
| **IV: Climax & Loop** | 2700–3600 | 0:45–1:07 | 25–32 | Goldstone fails, Nokia wins, loops to Shot 1 |

## Loop Hook (Seamless Replay)

**Final frame (Shot 32) = First frame (Shot 1):**
- Identical visual: gloved fingers jamming Nokia into feed horn
- Identical audio: `thunk` → `hiss` → `click-click`
- Identical VO: *"Three AM. Voyager 1's downlink died..."*
- Music: 60 BPM tick → 60 BPM tick

Triggers accidental replays on TikTok/Shorts/Reels.

## Assets Needed

Replace placeholders in `public/assets/`:

| Type | Location | Count |
|------|----------|-------|
| GLB models | `public/assets/models/` | ~50 |
| SFX (WAV) | `public/assets/sfx/` | ~65 |
| Music (MP3) | `public/assets/music/` | 5 |

Current placeholders are minimal (1×1×1 cubes, silence). For production:
- Models: Blender → export GLB (keep < 500KB each)
- SFX: Record/foley or source from freesound.org
- Music: Compose 5 stems matching the arc in `MusicTrack.tsx`

## Color Palette (Ricks Clips Style)

| Role | Hex | Usage |
|------|-----|-------|
| Spark Orange | `#FF4500` | Key light, accents, alerts |
| Safety Yellow | `#FFD700` | Fill, telemetry, gold record |
| Moonlight Cyan | `#00FFFF` | Rim, dish glow, aurora, UI |
| Charcoal | `#1a1a1a` | Base ambient |
| Ochre | `#8B4513` | Earth tones, skin, wood |

## Render Settings (Production)

- **Codec:** H.265 (HEVC)
- **CRF:** 18 (visually lossless)
- **Pixel Format:** yuv420p (broadcast compatible)
- **Audio:** AAC 128kbps
- **Frame Rate:** 60fps
- **Resolution:** 1080×1920 (9:16)

## License

MIT — Use for your own Ricks Clips–style videos.