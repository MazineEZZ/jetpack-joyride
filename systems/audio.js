class AudioSystem {
  constructor() {
    this.song = [];

    // this.song.push(this.collect);
  }
  adjustVolume(volume = 0.4) {
    this.song.forEach((song) => (song.volume = volume));
  }
  // playCollect() {
  //   this.collect.play();
  // }
}

export { AudioSystem };
