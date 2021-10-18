
const song = document.querySelector(".song");
const play = document.querySelector(".play");
const replay = document.querySelector(".replay");
const outline = document.querySelector(".moving-outline circle");
const video = document.querySelector(".vid-container video");
//Sounds
const sounds = document.querySelectorAll(".sound-picker button");
//Time Display
const timeDisplay = document.querySelector(".time-display");
//Get the lenght of the outline 
const outlineLength = outline.getTotalLength();
//Duration
const timeSelect = document.querySelectorAll(".time-select button");
let fakeDuration = 600;

outline.style.strokeDashoffset = outlineLength;
outline.style.strokeDasharray = outlineLength;
let outlineSeconds = (Math.floor(fakeDuration % 60) < 10) ? ("0" + Math.floor(fakeDuration%60)) : Math.floor(fakeDuration%60);
let outlineMinutes = Math.floor(fakeDuration / 60);
timeDisplay.textContent = `${outlineMinutes}:${outlineSeconds}`;

// Pick different sounds

sounds.forEach(sound => {
  sound.addEventListener("click", function() {
    song.src = this.getAttribute("data-sound");
    video.src = this.getAttribute("data-video");
    checkPlaying(song);
  });
});

play.addEventListener("click", function() {
  checkPlaying(song);
});

// Select sound
timeSelect.forEach(option => {
  option.addEventListener("click", function() {
    fakeDuration = this.getAttribute("data-time");
    let outlineSeconds = (Math.floor(fakeDuration%60) < 10) ? ("0" + Math.floor(fakeDuration%60)) : Math.floor(fakeDuration%60);
    let outlineMinutes = Math.floor(fakeDuration/60);
    timeDisplay.textContent = `${outlineMinutes}:${outlineSeconds}`;
  });
});
// Create a function specific to stop and play the sounds
const checkPlaying = song => {
  if (song.paused) {
    song.play();
    video.play();
    play.src = "./svg/pause.svg";
  } else {
    song.pause();
    video.pause();
    play.src = "./svg/play.svg";
  }
};
// we can animated the circle
song.ontimeupdate = function() {
  let currentTime = song.currentTime;
  let elapsed = fakeDuration - currentTime;
  let seconds = (Math.floor(elapsed % 60) < 10) ? ("0" + Math.floor(elapsed%60)) : Math.floor(elapsed%60);
  let minutes = Math.floor(elapsed / 60);
  timeDisplay.textContent = `${minutes}:${seconds}`;
  let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
  outline.style.strokeDashoffset = progress;

  if (currentTime >= fakeDuration) {
    song.pause();
    song.currentTime = 0;
    play.src = "./svg/play.svg";
    video.pause();
  }
};
