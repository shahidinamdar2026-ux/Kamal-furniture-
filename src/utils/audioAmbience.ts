// Web Audio API harmonic tanpura / sitar drone generator & brass bell chime
let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let oscillators: OscillatorNode[] = [];
let isPlaying = false;

export function toggleRoyalAmbience(): boolean {
  if (isPlaying) {
    stopRoyalAmbience();
    return false;
  } else {
    startRoyalAmbience();
    return true;
  }
}

export function isAmbienceActive(): boolean {
  return isPlaying;
}

export function startRoyalAmbience() {
  if (isPlaying) return;

  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();

    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.08, audioCtx.currentTime); // Soft background level
    masterGain.connect(audioCtx.destination);

    // Tanpura Drone Frequencies in Sa (C#3 / D3 royal tone: ~146.8 Hz and harmonics)
    const baseFreq = 146.83; // D3
    const harmonicRatios = [1.0, 1.333, 1.5, 2.0]; // Sa - Ma - Pa - Sa octave

    oscillators = [];

    harmonicRatios.forEach((ratio, i) => {
      if (!audioCtx || !masterGain) return;
      const osc = audioCtx.createOscillator();
      const oscGain = audioCtx.createGain();

      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(baseFreq * ratio, audioCtx.currentTime);

      // Gentle LFO tremolo for authentic string vibration
      const lfo = audioCtx.createOscillator();
      const lfoGain = audioCtx.createGain();
      lfo.frequency.setValueAtTime(0.2 + i * 0.15, audioCtx.currentTime);
      lfoGain.gain.setValueAtTime(0.015, audioCtx.currentTime);
      lfo.connect(oscGain.gain);
      lfo.start();

      oscGain.gain.setValueAtTime(0.04 / (i + 1), audioCtx.currentTime);

      osc.connect(oscGain);
      oscGain.connect(masterGain);

      osc.start();
      oscillators.push(osc);
    });

    isPlaying = true;
  } catch (err) {
    console.warn('AudioContext autoplay policy or error:', err);
  }
}

export function stopRoyalAmbience() {
  oscillators.forEach(osc => {
    try {
      osc.stop();
      osc.disconnect();
    } catch {}
  });
  oscillators = [];
  if (audioCtx && audioCtx.state !== 'closed') {
    try {
      audioCtx.close();
    } catch {}
  }
  audioCtx = null;
  masterGain = null;
  isPlaying = false;
}

// Brass Bell Chime Sound effect (Triggered on swing or button click)
export function playBrassChime() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1760, ctx.currentTime); // High resonant chime
    osc.frequency.exponentialRampToValueAtTime(1040, ctx.currentTime + 0.8);

    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 1.2);
  } catch {}
}
