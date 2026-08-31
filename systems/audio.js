class AudioSystem {
  constructor() {
    this.music = new Audio("../assets/music/main-theme.mp3");
    this.music.loop = true;
    this.music.volume = 0.3;

    this.sounds = [];

    this.collect = this.add("../assets/sounds/coin-pickup.mp3");
    this.jetpackStarted = this.add("../assets/sounds/jetpack-started.mp3");
    this.jetpackOn = this.add("../assets/sounds/jetpack_firelp.wav");
    this.jetpackOff = this.add("../assets/sounds/jetpack_stop.wav");
    this.running = this.add("../assets/sounds/running.wav");
    this.land = this.add("../assets/sounds/land.wav");

    this.adjustVolume();
  }
  add(src) {
    const audio = new Audio(src);

    this.sounds.push(audio);

    return audio;
  }
  adjustVolume(volume = 0.5) {
    this.sounds.forEach((sounds) => (sounds.volume = volume));
  }
  playMusic() {
    this.music.play();
  }
  pauseMusic() {
    this.music.pause();
  }
  pauseSounds() {
    this.sounds.forEach((sound) => sound.pause());
  }
  playCollect() {
    const sound = this.collect.cloneNode();
    sound.play();
  }
  playJetpackOn() {
    this.jetpackOn.loop = true;
    this.jetpackOn.play();
  }
  playJetpackOff() {
    this.jetpackOn.pause();
    this.jetpackOff.play();
  }
  playJetpackStarted() {
    this.jetpackStarted.play();
  }
  playRunning() {
    this.running.play();
  }
  playLand() {
    this.land.play();
  }
}

export { AudioSystem };
