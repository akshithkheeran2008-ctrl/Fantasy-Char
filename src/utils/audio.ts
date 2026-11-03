/**
 * Web Audio API synthesizer for tactile game feedback.
 * Zero external audio assets required; runs seamlessly in any modern browser.
 */

class SoundEffects {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  playDiceRoll() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      // Sequence of rapid tactile clicks simulating dice rolling on parchment
      const clicks = [0.0, 0.05, 0.11, 0.16, 0.22];
      clicks.forEach((offset, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(180 + Math.random() * 120 + i * 20, now + offset);
        gain.gain.setValueAtTime(0.08 - i * 0.012, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.04);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + offset);
        osc.stop(now + offset + 0.05);
      });

      // Triumphant subtle fantasy chime upon character reveal
      const chimeOsc = ctx.createOscillator();
      const chimeGain = ctx.createGain();
      chimeOsc.type = 'sine';
      chimeOsc.frequency.setValueAtTime(523.25, now + 0.24); // C5
      chimeOsc.frequency.exponentialRampToValueAtTime(659.25, now + 0.4); // E5
      chimeGain.gain.setValueAtTime(0.06, now + 0.24);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);
      chimeOsc.connect(chimeGain);
      chimeGain.connect(ctx.destination);
      chimeOsc.start(now + 0.24);
      chimeOsc.stop(now + 0.66);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  playSavePing() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1174.66, now + 0.12);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.36);
    } catch {
      // Audio fallback
    }
  }
}

export const soundEffects = new SoundEffects();
