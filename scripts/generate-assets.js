const fs = require("fs");
const { execSync } = require("child_process");

const ROOT = process.cwd();

fs.mkdirSync("public/assets/models", { recursive: true });
fs.mkdirSync("public/assets/sfx", { recursive: true });
fs.mkdirSync("public/assets/music", { recursive: true });

// Placeholder GLB (minimal valid cube)
const glb = Buffer.from([
  0x67, 0x6c, 0x54, 0x46, 0x02, 0x00, 0x00, 0x00, 0x2c, 0x00, 0x00, 0x00, 0x20, 0x00, 0x00, 0x00,
  0x4a, 0x53, 0x4f, 0x4e, 0x7b, 0x22, 0x61, 0x73, 0x73, 0x65, 0x74, 0x22, 0x3a, 0x5b, 0x7d, 0x2c,
  0x22, 0x73, 0x63, 0x65, 0x6e, 0x65, 0x73, 0x22, 0x3a, 0x5b, 0x7b, 0x22, 0x6e, 0x6f, 0x64, 0x65,
  0x73, 0x22, 0x3a, 0x5b, 0x7b, 0x22, 0x6e, 0x61, 0x6d, 0x65, 0x22, 0x3a, 0x22, 0x63, 0x75, 0x62,
  0x65, 0x22, 0x7d, 0x5d, 0x2c, 0x22, 0x6d, 0x65, 0x73, 0x68, 0x65, 0x73, 0x22, 0x3a, 0x5b, 0x7b,
  0x22, 0x6e, 0x61, 0x6d, 0x65, 0x22, 0x3a, 0x22, 0x63, 0x75, 0x62, 0x65, 0x22, 0x2c, 0x22, 0x70,
  0x72, 0x69, 0x6d, 0x69, 0x74, 0x69, 0x76, 0x65, 0x73, 0x22, 0x3a, 0x5b, 0x30, 0x5d, 0x7d, 0x5d,
  0x2c, 0x22, 0x61, 0x63, 0x63, 0x65, 0x73, 0x73, 0x6f, 0x72, 0x73, 0x22, 0x3a, 0x5b, 0x7b, 0x22,
  0x62, 0x75, 0x66, 0x66, 0x65, 0x72, 0x56, 0x69, 0x65, 0x77, 0x22, 0x3a, 0x30, 0x2c, 0x22, 0x63,
  0x6f, 0x6d, 0x70, 0x6f, 0x6e, 0x65, 0x6e, 0x74, 0x54, 0x79, 0x70, 0x65, 0x22, 0x3a, 0x35, 0x31,
  0x32, 0x36, 0x2c, 0x22, 0x63, 0x6f, 0x75, 0x6e, 0x74, 0x22, 0x3a, 0x33, 0x36, 0x2c, 0x22, 0x74,
  0x79, 0x70, 0x65, 0x22, 0x3a, 0x22, 0x56, 0x45, 0x43, 0x54, 0x4f, 0x52, 0x33, 0x22, 0x7d, 0x5d,
  0x7d, 0x5d, 0x7d,
]);

const models = [
  "dish_feed_horn", "nokia_3310", "gloved_hand", "dish_mesh_closeup",
  "dish_full", "cherry_picker", "coder_rig", "vargas_face",
  "vargas_rig", "abort_button", "glasses_reflection", "audio_coupler",
  "lna_input", "solder_joints", "goldstone_dish", "mission_control_mic",
  "frostbitten_thumb", "timer_overlay", "starfield_animated", "coder_jacket",
  "armpit_cavity", "snr_display_dual", "coffee_cup", "antenna_nub",
  "teeth_rig", "saliva_effect", "snr_crossover_animation", "vargas_face_freeze",
  "telemetry_frames_animation", "reed_solomon_visual", "aurora_shader",
  "coder_rig_collapse", "nokia_dead", "usb_c_brick", "charger_cable",
  "dish_stowed", "zip_lock_bag", "label_gun", "telemetry_wall_animation",
  "golden_record_spin", "data_rate_counter", "cleanroom_bench", "asset_tag",
  "twta_spare", "logbook", "pen", "frame", "pond", "mallard_rig",
  "nokia_display", "signal_bars_animation", "solder_joint_micro",
  "fissure_shader", "nokia_3310_2017", "pocket_fabric", "anvil",
  "nokia_3310_original", "waterfall_display_dead", "goldstone_alert",
  "moonlight_shader", "split_screen_snr", "goldstone_flatline",
  "coder_carrier_lock", "data_flow_animation", "vargas_face_smirk",
  "headset", "patch_cord", "coder_rig_shout", "aurora_crown_shader",
  "call_ended_screen", "battery_1pct", "signal_5_bars", "jpl_campus",
  "mallard_rig_takeoff", "binary_ripple_shader",
];

models.forEach((m) => {
  fs.writeFileSync(`public/assets/models/${m}.glb`, glb);
});

const sfx = [
  "thunk_plastic_aluminum", "hiss_he3_boiloff", "generator_drone_distant",
  "click_keypad", "electrical_buzz_lna", "wind_dish_surface",
  "hydraulic_whine_azimuth", "voice_crack_ping", "metal_fatigue_groan",
  "control_room_hum", "coffee_sip", "flatline_tone", "burger_wrapper_crinkle",
  "button_beep", "led_pulse_sync", "clock_tick_sidechain_start",
  "solder_iron_hiss", "tape_rip", "keypad_tones_dtmf_echo",
  "scope_beep", "lock_tone_rising", "prayer_bead_click",
  "dish_motor_roar", "transformer_hum_400kw", "phone_battery_whine",
  "timer_beep_beep_beep", "inhale_sharp", "heartbeat_thump",
  "star_trail_whoosh", "battery_tick_1pct_sec", "hydraulic_drone",
  "fabric_rustle", "skin_contact_squelch", "lcd_bias_whine",
  "cup_slam", "vein_pulse_throb", "snr_meter_tick",
  "bite_crunch", "antenna_snap", "dielectric_hum",
  "crossover_whoosh", "vargas_gasp", "control_room_silence",
  "frame_sync_beep", "rs_decode_chirp", "cosmic_distance_echo",
  "aurora_crackle", "body_thud", "lcd_fade_black",
  "slow_clap", "charger_cable_whip", "usb_negotiation_beep",
  "cherry_picker_descent_whine", "zip_lock_seal", "label_gun_click",
  "data_rate_counter_spin", "record_groove_hiss", "johnny_b_goode_fragment",
  "tag_gun_pfft", "cleanroom_airflow", "twta_fan_hum",
  "pen_scratch", "paper_fiber", "frame_corner_tap",
  "duck_splash", "quack_modulated", "signal_bar_ping",
  "micro_crack_snap", "thermal_ping", "engineer_sigh",
  "pocket_slide", "anvil_ring", "new_phone_boot_chime",
  "cryocooler_bang", "kw400_silence", "waterfall_collapse",
  "hydraulic_rise", "moonlight_shimmer", "carrier_lock_tone",
  "data_burst_chirp", "headset_tap", "patch_cord_click",
  "smirk_breath", "dtmf_tones", "slew_roar", "aurora_hiss",
  "call_end_beep", "battery_blink", "signal_bar_solid",
  "wing_beats", "ripple_plop", "binary_tone", "click_click_keypad",
];

sfx.forEach((name) => {
  execSync(
    `ffmpeg -y -f lavfi -i anullsrc=r=44100:cl=mono -t 2 -q:a 0 "public/assets/sfx/${name}.wav"`,
    { stdio: "inherit" }
  );
});

const music = ["act1_ticking", "act2_rising", "act3_montage", "act4_brass", "loop_decay"];

music.forEach((name) => {
  execSync(
    `ffmpeg -y -f lavfi -i anullsrc=r=44100:cl=mono -t 5 -q:a 2 "public/assets/music/${name}.mp3"`,
    { stdio: "inherit" }
  );
});

console.log(
  `Generated ${models.length} GLB models, ${sfx.length} SFX WAVs, ${music.length} music MP3s.`
);
