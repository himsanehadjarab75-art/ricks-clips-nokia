import { Composition, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, useAnimations } from "@react-three/drei";
import { shots, Shot } from "./data/shots";
import { Shot1_FeedHorn } from "./shots/Shot1_FeedHorn";
import { Shot2_Keypad } from "./shots/Shot2_Keypad";
import { Shot3_CherryPicker } from "./shots/Shot3_CherryPicker";
import { Shot4_SplitScreen } from "./shots/Shot4_SplitScreen";
import { Shot5_AbortButton } from "./shots/Shot5_AbortButton";
import { Shot6_LNACoupler } from "./shots/Shot6_LNACoupler";
import { Shot7_Oscilloscope } from "./shots/Shot7_Oscilloscope";
import { Shot8_Goldstone } from "./shots/Shot8_Goldstone";
import { Shot9_Timer } from "./shots/Shot9_Timer";
import { Shot10_DronePullback } from "./shots/Shot10_DronePullback";
import { Shot11_Armpit } from "./shots/Shot11_Armpit";
import { Shot12_SNRGap } from "./shots/Shot12_SNRGap";
import { Shot13_AntennaBite } from "./shots/Shot13_AntennaBite";
import { Shot14_Crossover } from "./shots/Shot14_Crossover";
import { Shot15_Telemetry } from "./shots/Shot15_Telemetry";
import { Shot16_AuroraCollapse } from "./shots/Shot16_AuroraCollapse";
import { Shot17_SlowClap } from "./shots/Shot17_SlowClap";
import { Shot18_DawnStow } from "./shots/Shot18_DawnStow";
import { Shot19_DataRate } from "./shots/Shot19_DataRate";
import { Shot20_Cleanroom } from "./shots/Shot20_Cleanroom";
import { Shot21_Logbook } from "./shots/Shot21_Logbook";
import { Shot22_Mallard } from "./shots/Shot22_Mallard";
import { Shot23_MicroFissure } from "./shots/Shot23_MicroFissure";
import { Shot24_PocketAnvil } from "./shots/Shot24_PocketAnvil";
import { Shot25_GoldstoneFail } from "./shots/Shot25_GoldstoneFail";
import { Shot26_ReturnToFeed } from "./shots/Shot26_ReturnToFeed";
import { Shot27_SplitScreenCarrier } from "./shots/Shot27_SplitScreenCarrier";
import { Shot28_VargasSmirk } from "./shots/Shot28_VargasSmirk";
import { Shot29_DTMFAurora } from "./shots/Shot29_DTMFAurora";
import { Shot30_CallEnded } from "./shots/Shot30_CallEnded";
import { Shot31_MallardBinary } from "./shots/Shot31_MallardBinary";
import { Shot32_LoopHook } from "./shots/Shot32_LoopHook";
import { VOOverlay } from "./components/VOOverlay";
import { SFXProvider } from "./components/SFXProvider";
import { MusicTrack } from "./components/MusicTrack";

const ShotComponents: Record<number, React.FC<{ progress: number }>> = {
  1: Shot1_FeedHorn,
  2: Shot2_Keypad,
  3: Shot3_CherryPicker,
  4: Shot4_SplitScreen,
  5: Shot5_AbortButton,
  6: Shot6_LNACoupler,
  7: Shot7_Oscilloscope,
  8: Shot8_Goldstone,
  9: Shot9_Timer,
  10: Shot10_DronePullback,
  11: Shot11_Armpit,
  12: Shot12_SNRGap,
  13: Shot13_AntennaBite,
  14: Shot14_Crossover,
  15: Shot15_Telemetry,
  16: Shot16_AuroraCollapse,
  17: Shot17_SlowClap,
  18: Shot18_DawnStow,
  19: Shot19_DataRate,
  20: Shot20_Cleanroom,
  21: Shot21_Logbook,
  22: Shot22_Mallard,
  23: Shot23_MicroFissure,
  24: Shot24_PocketAnvil,
  25: Shot25_GoldstoneFail,
  26: Shot26_ReturnToFeed,
  27: Shot27_SplitScreenCarrier,
  28: Shot28_VargasSmirk,
  29: Shot29_DTMFAurora,
  30: Shot30_CallEnded,
  31: Shot31_MallardBinary,
  32: Shot32_LoopHook,
};

export const Main: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Find current shot
  const currentShot = shots.find(
    (s) => frame >= s.startFrame && frame < s.endFrame
  ) ?? shots[0];

  const shotProgress = currentShot.durationFrames > 0
    ? (frame - currentShot.startFrame) / currentShot.durationFrames
    : 0;

  const ShotComponent = ShotComponents[currentShot.id];

  return (
    <SFXProvider currentShot={currentShot} shotProgress={shotProgress}>
      <MusicTrack frame={frame} />
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ width: "100%", height: "100%", touchAction: "none" }}
        gl={{ preserveDrawingBuffer: true, antialias: true, alpha: false }}
      >
        <ShotComponent progress={shotProgress} />
        <Html fullscreen>
          <VOOverlay shot={currentShot} progress={shotProgress} />
        </Html>
      </Canvas>
    </SFXProvider>
  );
};

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="Main"
        component={Main}
        width={1080}
        height={1920}
        fps={60}
        durationInFrames={3600}
        defaultProps={{}}
      />
    </>
  );
};