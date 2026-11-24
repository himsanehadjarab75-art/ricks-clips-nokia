import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setJpegQuality(90);
Config.setPixelFormat("yuv420p");
Config.setCodec("h265");
Config.setCrf(18);
Config.setAudioBitrate("128k");

// 9:16 vertical, 60fps, 60 seconds = 3600 frames
Config.setDimensions({
  width: 1080,
  height: 1920,
});

Config.setFrameRate(60);
Config.setDurationInFrames(3600);

Config.setLogLevel("info");
Config.setConcurrency(4);
Config.setProxies("none");