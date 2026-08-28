class AudioSystem {
  constructor() {
    this.sounds = [];

    this.collect = new Audio("../assets/sounds/coin-pickup.mp3");
    this.jetpackStarted = new Audio("../assets/sounds/jetpack-started.mp3");
    this.jetpackOn = new Audio("../assets/sounds/jetpack-on.mp3");
    this.jetpackOff = new Audio("../assets/sounds/jetpack-stop.wav");

    this.sounds.push(this.collect);
    this.sounds.push(this.jetpackStarted);
    this.sounds.push(this.jetpackOn);
    this.sounds.push(this.jetpackOff);
  }
  adjustVolume(volume = 0.3) {
    this.sounds.forEach((sounds) => (sounds.volume = volume));
  }
  playCollect() {
    const sound = this.collect.cloneNode();
    sound.play();
  }
  playJetpackOn() {
    this.jetpackOn.loop = true;
    this.jetpackOn.volume = 0.2;
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
