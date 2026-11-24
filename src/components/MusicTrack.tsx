import { useEffect, useRef } from "react";
import { staticFile, Audio } from "remotion";

interface MusicTrackProps {
  frame: number;
}

const MUSIC_SEGMENTS = [
  // Act I: 0:00-0:03 (frames 0-180) - Ticking minimalism
  { startFrame: 0, endFrame: 180, track: "act1_ticking.mp3", volume: 0.4 },
  // Act II: 0:03-0:15 (frames 180-900) - Rising tension
  { startFrame: 180, endFrame: 900, track: "act2_rising.mp3", volume: 0.5 },
  // Act III: 0:15-0:45 (frames 900-2700) - Montage drive
  { startFrame: 900, endFrame: 2700, track: "act3_montage.mp3", volume: 0.6 },
  // Act IV: 0:45-1:00 (frames 2700-3600) - Cinematic brass drop
  { startFrame: 2700, endFrame: 3600, track: "act4_brass.mp3", volume: 0.8 },
  // Loop tail: 1:00-1:07 (frames 3600-4020) - Decay to tick
  { startFrame: 3600, endFrame: 4020, track: "loop_decay.mp3", volume: 0.3 },
];

export const MusicTrack: React.FC<MusicTrackProps> = ({ frame }) => {
  const segment = MUSIC_SEGMENTS.find(
    (s) => frame >= s.startFrame && frame < s.endFrame
  ) || MUSIC_SEGMENTS[0];

  const audio = staticFile(`assets/music/${segment.track}`);

  // Crossfade: fade out last 60 frames of each segment
  const nextSegment = MUSIC_SEGMENTS.find((s) => s.startFrame > frame);
  let volume = segment.volume;
  if (nextSegment) {
    const framesToNext = nextSegment.startFrame - frame;
    if (framesToNext < 60) {
      const fadeProgress = 1 - framesToNext / 60;
      volume = segment.volume * (1 - fadeProgress) + nextSegment.volume * fadeProgress;
    }
  }

  return <Audio src={audio} volume={volume} />;
};