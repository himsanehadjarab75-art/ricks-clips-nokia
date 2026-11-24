import { useEffect, useRef } from "remotion";
import { Shot } from "../data/shots";

interface SFXProviderProps {
  currentShot: Shot;
  shotProgress: number;
  children: React.ReactNode;
}

// SFX manifest — maps names to actual audio files
const SFX_MANIFEST: Record<string, string> = {
  thunk_plastic_aluminum: "/assets/sfx/thunk_plastic_aluminum.wav",
  hiss_he3_boiloff: "/assets/sfx/hiss_he3_boiloff.wav",
  generator_drone_distant: "/assets/sfx/generator_drone_distant.wav",
  click_keypad: "/assets/sfx/click_keypad.wav",
  electrical_buzz_lna: "/assets/sfx/electrical_buzz_lna.wav",
  wind_dish_surface: "/assets/sfx/wind_dish_surface.wav",
  hydraulic_whine_azimuth: "/assets/sfx/hydraulic_whine_azimuth.wav",
  voice_crack_ping: "/assets/sfx/voice_crack_ping.wav",
  metal_fatigue_groan: "/assets/sfx/metal_fatigue_groan.wav",
  control_room_hum: "/assets/sfx/control_room_hum.wav",
  coffee_sip: "/assets/sfx/coffee_sip.wav",
  flatline_tone: "/assets/sfx/flatline_tone.wav",
  burger_wrapper_crinkle: "/assets/sfx/burger_wrapper_crinkle.wav",
  button_beep: "/assets/sfx/button_beep.wav",
  led_pulse_sync: "/assets/sfx/led_pulse_sync.wav",
  clock_tick_sidechain_start: "/assets/sfx/clock_tick_sidechain_start.wav",
  solder_iron_hiss: "/assets/sfx/solder_iron_hiss.wav",
  tape_rip: "/assets/sfx/tape_rip.wav",
  keypad_tones_dtmf_echo: "/assets/sfx/keypad_tones_dtmf_echo.wav",
  scope_beep: "/assets/sfx/scope_beep.wav",
  lock_tone_rising: "/assets/sfx/lock_tone_rising.wav",
  prayer_bead_click: "/assets/sfx/prayer_bead_click.wav",
  dish_motor_roar: "/assets/sfx/dish_motor_roar.wav",
  transformer_hum_400kw: "/assets/sfx/transformer_hum_400kw.wav",
  phone_battery_whine: "/assets/sfx/phone_battery_whine.wav",
  timer_beep_beep_beep: "/assets/sfx/timer_beep_beep_beep.wav",
  inhale_sharp: "/assets/sfx/inhale_sharp.wav",
  heartbeat_thump: "/assets/sfx/heartbeat_thump.wav",
  star_trail_whoosh: "/assets/sfx/star_trail_whoosh.wav",
  battery_tick_1pct_sec: "/assets/sfx/battery_tick_1pct_sec.wav",
  hydraulic_drone: "/assets/sfx/hydraulic_drone.wav",
  fabric_rustle: "/assets/sfx/fabric_rustle.wav",
  skin_contact_squelch: "/assets/sfx/skin_contact_squelch.wav",
  lcd_bias_whine: "/assets/sfx/lcd_bias_whine.wav",
  cup_slam: "/assets/sfx/cup_slam.wav",
  vein_pulse_throb: "/assets/sfx/vein_pulse_throb.wav",
  snr_meter_tick: "/assets/sfx/snr_meter_tick.wav",
  bite_crunch: "/assets/sfx/bite_crunch.wav",
  antenna_snap: "/assets/sfx/antenna_snap.wav",
  dielectric_hum: "/assets/sfx/dielectric_hum.wav",
  crossover_whoosh: "/assets/sfx/crossover_whoosh.wav",
  vargas_gasp: "/assets/sfx/vargas_gasp.wav",
  control_room_silence: "/assets/sfx/control_room_silence.wav",
  frame_sync_beep: "/assets/sfx/frame_sync_beep.wav",
  rs_decode_chirp: "/assets/sfx/rs_decode_chirp.wav",
  cosmic_distance_echo: "/assets/sfx/cosmic_distance_echo.wav",
  aurora_crackle: "/assets/sfx/aurora_crackle.wav",
  body_thud: "/assets/sfx/body_thud.wav",
  lcd_fade_black: "/assets/sfx/lcd_fade_black.wav",
  slow_clap: "/assets/sfx/slow_clap.wav",
  charger_cable_whip: "/assets/sfx/charger_cable_whip.wav",
  usb_negotiation_beep: "/assets/sfx/usb_negotiation_beep.wav",
  cherry_picker_descent_whine: "/assets/sfx/cherry_picker_descent_whine.wav",
  zip_lock_seal: "/assets/sfx/zip_lock_seal.wav",
  label_gun_click: "/assets/sfx/label_gun_click.wav",
  data_rate_counter_spin: "/assets/sfx/data_rate_counter_spin.wav",
  record_groove_hiss: "/assets/sfx/record_groove_hiss.wav",
  johnny_b_goode_fragment: "/assets/sfx/johnny_b_goode_fragment.wav",
  tag_gun_pfft: "/assets/sfx/tag_gun_pfft.wav",
  cleanroom_airflow: "/assets/sfx/cleanroom_airflow.wav",
  twta_fan_hum: "/assets/sfx/twta_fan_hum.wav",
  pen_scratch: "/assets/sfx/pen_scratch.wav",
  paper_fiber: "/assets/sfx/paper_fiber.wav",
  frame_corner_tap: "/assets/sfx/frame_corner_tap.wav",
  duck_splash: "/assets/sfx/duck_splash.wav",
  quack_modulated: "/assets/sfx/quack_modulated.wav",
  signal_bar_ping: "/assets/sfx/signal_bar_ping.wav",
  micro_crack_snap: "/assets/sfx/micro_crack_snap.wav",
  thermal_ping: "/assets/sfx/thermal_ping.wav",
  engineer_sigh: "/assets/sfx/engineer_sigh.wav",
  pocket_slide: "/assets/sfx/pocket_slide.wav",
  anvil_ring: "/assets/sfx/anvil_ring.wav",
  new_phone_boot_chime: "/assets/sfx/new_phone_boot_chime.wav",
  cryocooler_bang: "/assets/sfx/cryocooler_bang.wav",
  kw400_silence: "/assets/sfx/kw400_silence.wav",
  waterfall_collapse: "/assets/sfx/waterfall_collapse.wav",
  hydraulic_rise: "/assets/sfx/hydraulic_rise.wav",
  moonlight_shimmer: "/assets/sfx/moonlight_shimmer.wav",
  carrier_lock_tone: "/assets/sfx/carrier_lock_tone.wav",
  data_burst_chirp: "/assets/sfx/data_burst_chirp.wav",
  headset_tap: "/assets/sfx/headset_tap.wav",
  patch_cord_click: "/assets/sfx/patch_cord_click.wav",
  smirk_breath: "/assets/sfx/smirk_breath.wav",
  dtmf_tones: "/assets/sfx/dtmf_tones.wav",
  slew_roar: "/assets/sfx/slew_roar.wav",
  aurora_hiss: "/assets/sfx/aurora_hiss.wav",
  call_end_beep: "/assets/sfx/call_end_beep.wav",
  battery_blink: "/assets/sfx/battery_blink.wav",
  signal_bar_solid: "/assets/sfx/signal_bar_solid.wav",
  wing_beats: "/assets/sfx/wing_beats.wav",
  ripple_plop: "/assets/sfx/ripple_plop.wav",
  binary_tone: "/assets/sfx/binary_tone.wav",
  click_click_keypad: "/assets/sfx/click_click_keypad.wav",
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