import { Config } from "@remotion/cli/config";
import { join } from "path";

Config.setVideoImageFormat("jpeg");
Config.setJpegQuality(90);
Config.setPixelFormat("yuv420p");
Config.setCodec("h265");
Config.setCrf(18);
Config.setAudioBitrate("128k");

// Serve public folder for assets
Config.setPublicDir(join(process.cwd(), "public"));

// 9:16 vertical, 60fps, 60 seconds = 3600 frames
// Dimensions and frame rate are set on Composition (Root.tsx)
// Config.setDimensions({ width: 1080, height: 1920 }); // REMOVED - set on Composition
// Config.setFrameRate(60); // REMOVED - set on Composition via useVideoConfig()
// Config.setDurationInFrames(3600); // REMOVED - set on Composition via useVideoConfig()
// Config.setProxies("none"); // REMOVED - not needed for local rendering

Config.setLogLevel("info");
Config.setConcurrency(4);