<template>
  <div class="button_container_universal">
    <router-link to="/agreeToAlert" class="button_universal">
      <div class="button_text_universal">AGREE TO AN ALERT</div>
    </router-link>
    <button
      class="button_universal green"
      @click="toggleMetronome"
      :class="{ running: isRunning }"
    >
      <div class="button_text_universal">
        {{ isRunning ? "STOP" : "START" }} METRONOMO
      </div>
    </button>
    <button
      class="button_universal green"
      @click="toggleMusic"
      :class="{ running: isMusicRunning }"
    >
      <div class="button_text_universal">
        {{ isMusicRunning ? "STOP" : "START" }} MUSIC
      </div>
    </button>
  </div>
</template>

<script>
import { Howl, Howler } from "howler";

export default {
  data() {
    return {
      bpm: 110, // Frequenza prefissata in BPM
      intervalId: null,
      isRunning: false,
      isMusicRunning: false,
      sound: new Howl({
        src: ["./public/beep.mp3"],
      }),
      music: new Howl({
        src: ["./public/magic_music.mp3"],
      }),
    };
  },
  methods: {
    toggleMetronome() {
      if (this.isRunning) {
        this.stopMetronome();
      } else {
        this.startMetronome();
      }
    },
    toggleMusic() {
      if (this.isMusicRunning) {
        this.stopMusic();
      } else {
        this.startMusic();
      }
    },
    startMetronome() {
      this.stopMetronome(); // Ferma il metronomo se è già in esecuzione
      const interval = (60 / this.bpm) * 1000; // Calcola l'intervallo in millisecondi
      this.isRunning = true;
      this.intervalId = setInterval(() => {
        this.sound.play();
      }, interval);
    },
    startMusic() {
      this.stopMusic(); // Ferma il metronomo se è già in esecuzione
      this.isMusicRunning = true;
      this.music.play();
    },
    stopMetronome() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
        this.isRunning = false;
      }
    },
    stopMusic() {
      this.music.stop();
      this.isMusicRunning = false;
    },
  },
};
</script>

<style scoped>
.green {
  background-color: #4caf50;
}

button.running {
  background-color: red;
  color: white;
}
</style>