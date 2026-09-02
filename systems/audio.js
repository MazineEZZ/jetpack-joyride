class AudioSystem {
  constructor() {
    this.music = new Audio("../assets/music/main-theme.mp3");
    this.music.loop = true;
    this.music.volume = 0.1;

    this.sounds = [];

    this.collect = this.add("coin-pickup.mp3");
    this.jetpackStarted = this.add("jetpack-started.mp3");
    this.jetpackOn = this.add("jetpack_firelp.wav");
    this.jetpackOff = this.add("jetpack_stop.wav");
    this.running = this.add("running.wav");
    this.land = this.add("land.wav");
    this.rocketLaunch = this.add("rocket-launch.wav");
    this.rocketWarning = this.add("rocket-warning.wav");

    this.adjustVolume();
  }
  add(src) {
    const soundDir = "../assets/sounds/";
    const audio = new Audio(soundDir + src);

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
  playRocketWarning() {
    this.rocketWarning.play();
  }
  playRocketLaunch() {
    this.rocketLaunch.play();
  }
}

export { AudioSystem };
