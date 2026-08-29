class AudioSystem {
  constructor() {
    this.sounds = [];

    this.collect = new Audio("../assets/sounds/coin-pickup.mp3");
    this.jetpackStarted = new Audio("../assets/sounds/jetpack-started.mp3");
    this.jetpackOn = new Audio("../assets/sounds/jetpack_firelp.wav");
    this.jetpackOff = new Audio("../assets/sounds/jetpack_stop.wav");

    this.sounds.push(this.collect);
    this.sounds.push(this.jetpackStarted);
    this.sounds.push(this.jetpackOn);
    this.sounds.push(this.jetpackOff);

    this.adjustVolume();
  }
  adjustVolume(volume = 0.4) {
    this.sounds.forEach((sounds) => (sounds.volume = volume));
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
    this.jetpackOn.volume = 0.4;
    this.jetpackOn.play();
  }
  playJetpackOff() {
    this.jetpackOn.pause();
    this.jetpackOff.play();
  }
  playJetpackStarted() {
    this.jetpackStarted.play();
  }
}

export { AudioSystem };
