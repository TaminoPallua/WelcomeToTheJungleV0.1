//Global variables
let backgroundSounds = new Audio('/Jump_And_RunMerged/audio/jump_and_run_audio_trim.mp3');

window.addEventListener('load', () => {
  sessionStorage.setItem('globalPositionIndex', 4);
  //Set background music
  backgroundSounds.play();
  backgroundSounds.volume = 1;
  backgroundSounds.loop = true;
});
