import { useEffect, useRef } from "react";
import { Shot } from "../data/shots";

interface SFXProviderProps {
  currentShot: Shot;
  shotProgress: number;
  children: React.ReactNode;
}

// SFX manifest — maps names to actual audio files
const SFX_MANIFEST: Record<string, string> = {
  thunk_plastic_aluminum: "/public/assets/sfx/thunk_plastic_aluminum.wav",
  hiss_he3_boiloff: "/public/assets/sfx/hiss_he3_boiloff.wav",
  generator_drone_distant: "/public/assets/sfx/generator_drone_distant.wav",
  click_keypad: "/public/assets/sfx/click_keypad.wav",
  electrical_buzz_lna: "/public/assets/sfx/electrical_buzz_lna.wav",
  wind_dish_surface: "/public/assets/sfx/wind_dish_surface.wav",
  hydraulic_whine_azimuth: "/public/assets/sfx/hydraulic_whine_azimuth.wav",
  voice_crack_ping: "/public/assets/sfx/voice_crack_ping.wav",
  metal_fatigue_groan: "/public/assets/sfx/metal_fatigue_groan.wav",
  control_room_hum: "/public/assets/sfx/control_room_hum.wav",
  coffee_sip: "/public/assets/sfx/coffee_sip.wav",
  flatline_tone: "/public/assets/sfx/flatline_tone.wav",
  burger_wrapper_crinkle: "/public/assets/sfx/burger_wrapper_crinkle.wav",
  button_beep: "/public/assets/sfx/button_beep.wav",
  led_pulse_sync: "/public/assets/sfx/led_pulse_sync.wav",
  clock_tick_sidechain_start: "/public/assets/sfx/clock_tick_sidechain_start.wav",
  solder_iron_hiss: "/public/assets/sfx/solder_iron_hiss.wav",
  tape_rip: "/public/assets/sfx/tape_rip.wav",
  keypad_tones_dtmf_echo: "/public/assets/sfx/keypad_tones_dtmf_echo.wav",
  scope_beep: "/public/assets/sfx/scope_beep.wav",
  lock_tone_rising: "/public/assets/sfx/lock_tone_rising.wav",
  prayer_bead_click: "/public/assets/sfx/prayer_bead_click.wav",
  dish_motor_roar: "/public/assets/sfx/dish_motor_roar.wav",
  transformer_hum_400kw: "/public/assets/sfx/transformer_hum_400kw.wav",
  phone_battery_whine: "/public/assets/sfx/phone_battery_whine.wav",
  timer_beep_beep_beep: "/public/assets/sfx/timer_beep_beep_beep.wav",
  inhale_sharp: "/public/assets/sfx/inhale_sharp.wav",
  heartbeat_thump: "/public/assets/sfx/heartbeat_thump.wav",
  star_trail_whoosh: "/public/assets/sfx/star_trail_whoosh.wav",
  battery_tick_1pct_sec: "/public/assets/sfx/battery_tick_1pct_sec.wav",
  hydraulic_drone: "/public/assets/sfx/hydraulic_drone.wav",
  fabric_rustle: "/public/assets/sfx/fabric_rustle.wav",
  skin_contact_squelch: "/public/assets/sfx/skin_contact_squelch.wav",
  lcd_bias_whine: "/public/assets/sfx/lcd_bias_whine.wav",
  cup_slam: "/public/assets/sfx/cup_slam.wav",
  vein_pulse_throb: "/public/assets/sfx/vein_pulse_throb.wav",
  snr_meter_tick: "/public/assets/sfx/snr_meter_tick.wav",
  bite_crunch: "/public/assets/sfx/bite_crunch.wav",
  antenna_snap: "/public/assets/sfx/antenna_snap.wav",
  dielectric_hum: "/public/assets/sfx/dielectric_hum.wav",
  crossover_whoosh: "/public/assets/sfx/crossover_whoosh.wav",
  vargas_gasp: "/public/assets/sfx/vargas_gasp.wav",
  control_room_silence: "/public/assets/sfx/control_room_silence.wav",
  frame_sync_beep: "/public/assets/sfx/frame_sync_beep.wav",
  rs_decode_chirp: "/public/assets/sfx/rs_decode_chirp.wav",
  cosmic_distance_echo: "/public/assets/sfx/cosmic_distance_echo.wav",
  aurora_crackle: "/public/assets/sfx/aurora_crackle.wav",
  body_thud: "/public/assets/sfx/body_thud.wav",
  lcd_fade_black: "/public/assets/sfx/lcd_fade_black.wav",
  slow_clap: "/public/assets/sfx/slow_clap.wav",
  charger_cable_whip: "/public/assets/sfx/charger_cable_whip.wav",
  usb_negotiation_beep: "/public/assets/sfx/usb_negotiation_beep.wav",
  cherry_picker_descent_whine: "/public/assets/sfx/cherry_picker_descent_whine.wav",
  zip_lock_seal: "/public/assets/sfx/zip_lock_seal.wav",
  label_gun_click: "/public/assets/sfx/label_gun_click.wav",
  data_rate_counter_spin: "/public/assets/sfx/data_rate_counter_spin.wav",
  record_groove_hiss: "/public/assets/sfx/record_groove_hiss.wav",
  johnny_b_goode_fragment: "/public/assets/sfx/johnny_b_goode_fragment.wav",
  tag_gun_pfft: "/public/assets/sfx/tag_gun_pfft.wav",
  cleanroom_airflow: "/public/assets/sfx/cleanroom_airflow.wav",
  twta_fan_hum: "/public/assets/sfx/twta_fan_hum.wav",
  pen_scratch: "/public/assets/sfx/pen_scratch.wav",
  paper_fiber: "/public/assets/sfx/paper_fiber.wav",
  frame_corner_tap: "/public/assets/sfx/frame_corner_tap.wav",
  duck_splash: "/public/assets/sfx/duck_splash.wav",
  quack_modulated: "/public/assets/sfx/quack_modulated.wav",
  signal_bar_ping: "/public/assets/sfx/signal_bar_ping.wav",
  micro_crack_snap: "/public/assets/sfx/micro_crack_snap.wav",
  thermal_ping: "/public/assets/sfx/thermal_ping.wav",
  engineer_sigh: "/public/assets/sfx/engineer_sigh.wav",
  pocket_slide: "/public/assets/sfx/pocket_slide.wav",
  anvil_ring: "/public/assets/sfx/anvil_ring.wav",
  new_phone_boot_chime: "/public/assets/sfx/new_phone_boot_chime.wav",
  cryocooler_bang: "/public/assets/sfx/cryocooler_bang.wav",
  kw400_silence: "/public/assets/sfx/kw400_silence.wav",
  waterfall_collapse: "/public/assets/sfx/waterfall_collapse.wav",
  hydraulic_rise: "/public/assets/sfx/hydraulic_rise.wav",
  moonlight_shimmer: "/public/assets/sfx/moonlight_shimmer.wav",
  carrier_lock_tone: "/public/assets/sfx/carrier_lock_tone.wav",
  data_burst_chirp: "/public/assets/sfx/data_burst_chirp.wav",
  headset_tap: "/public/assets/sfx/headset_tap.wav",
  patch_cord_click: "/public/assets/sfx/patch_cord_click.wav",
  smirk_breath: "/public/assets/sfx/smirk_breath.wav",
  dtmf_tones: "/public/assets/sfx/dtmf_tones.wav",
  slew_roar: "/public/assets/sfx/slew_roar.wav",
  aurora_hiss: "/public/assets/sfx/aurora_hiss.wav",
  call_end_beep: "/public/assets/sfx/call_end_beep.wav",
  battery_blink: "/public/assets/sfx/battery_blink.wav",
  signal_bar_solid: "/public/assets/sfx/signal_bar_solid.wav",
  wing_beats: "/public/assets/sfx/wing_beats.wav",
  ripple_plop: "/public/assets/sfx/ripple_plop.wav",
  binary_tone: "/public/assets/sfx/binary_tone.wav",
  click_click_keypad: "/public/assets/sfx/click_click_keypad.wav",
};

export const SFXProvider: React.FC<SFXProviderProps> = ({
  currentShot,
  shotProgress,
  children,
}) => {
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});
  const playedRef = useRef<Set<string>>(new Set());

  // Preload all SFX for current shot
  useEffect(() => {
    currentShot.sfx.forEach((sfxName) => {
      const path = SFX_MANIFEST[sfxName];
      if (path && !audioRefs.current[sfxName]) {
        const audio = new Audio(path);
        audio.preload = "auto";
        audioRefs.current[sfxName] = audio;
      }
    });
  }, [currentShot.id]);

  // Trigger SFX at specific progress points
  useEffect(() => {
    currentShot.sfx.forEach((sfxName, index) => {
      const triggerProgress = (index + 1) / (currentShot.sfx.length + 1);
      const key = `${currentShot.id}-${sfxName}`;

      if (shotProgress >= triggerProgress && !playedRef.current.has(key)) {
        const audio = audioRefs.current[sfxName];
        if (audio) {
          audio.currentTime = 0;
          audio.volume = 0.7;
          audio.play().catch(() => {}); // Ignore autoplay restrictions in dev
          playedRef.current.add(key);
        }
      }

      // Reset when shot changes
      if (shotProgress < triggerProgress) {
        playedRef.current.delete(key);
      }
    });
  }, [currentShot.id, shotProgress, currentShot.sfx]);

  return <>{children}</>;
};