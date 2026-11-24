import { useEffect, useRef } from "remotion";

interface MusicTrackProps {
  frame: number;
}

const MUSIC_SEGMENTS = [
  // Act I: 0:00-0:03 (frames 0-180) - Ticking minimalism
  { startFrame: 0, endFrame: 180, track: "/assets/music/act1_ticking.mp3", volume: 0.4 },
  // Act II: 0:03-0:15 (frames 180-900) - Rising tension
  { startFrame: 180, endFrame: 900, track: "/assets/music/act2_rising.mp3", volume: 0.5 },
  // Act III: 0:15-0:45 (frames 900-2700) - Montage drive
  { startFrame: 900, endFrame: 2700, track: "/assets/music/act3_montage.mp3", volume: 0.6 },
  // Act IV: 0:45-1:00 (frames 2700-3600) - Cinematic brass drop
  { startFrame: 2700, endFrame: 3600, track: "/assets/music/act4_brass.mp3", volume: 0.8 },
  // Loop tail: 1:00-1:07 (frames 3600-4020) - Decay to tick
  { startFrame: 3600, endFrame: 4020, track: "/assets/music/loop_decay.mp3", volume: 0.3 },
];

export const MusicTrack: React.FC<MusicTrackProps> = ({ frame }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrackRef = useRef<string | null>(null);

  useEffect(() => {
    // Find current segment
    const segment = MUSIC_SEGMENTS.find(
      (s) => frame >= s.startFrame && frame < s.endFrame
    ) || MUSIC_SEGMENTS[0];

    // Switch track if changed
    if (segment.track !== currentTrackRef.current) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }

      const audio = new Audio(segment.track);
      audio.loop = true;
      audio.volume = segment.volume;
      audio.play().catch(() => {}); // Ignore autoplay in dev

      audioRef.current = audio;
      currentTrackRef.current = segment.track;
    }

    // Update volume for crossfades near boundaries
    if (audioRef.current) {
      const nextSegment = MUSIC_SEGMENTS.find((s) => s.startFrame > frame);
      if (nextSegment) {
        const framesToNext = nextSegment.startFrame - frame;
        if (framesToNext < 60) { // 1 second crossfade
          const fadeProgress = 1 - framesToNext / 60;
          audioRef.current.volume = segment.volume * (1 - fadeProgress) + nextSegment.volume * fadeProgress;
        } else {
          audioRef.current.volume = segment.volume;
        }
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [frame]);

  return null; // No visual component
};