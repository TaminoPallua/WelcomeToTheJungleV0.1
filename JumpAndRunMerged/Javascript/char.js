//Import functions from updateCustomProperty.js
import {
  incrementCustomProperty,
  setCustomProperty,
  getCustomProperty,
} from './updateCustomProperty.js';

//Grab data using querySelector
const monkeyElem = document.querySelector('[data-monkey]');
const JUMP_SPEED = 0.45;
const GRAVITY = 0.0015;
const MONKEY_FRAME_COUNT = 7;
const FRAME_TIME = 80;

//Boolean, integer variables
let isJumping;
let monkeyFrame;
let currentFrameTime;
let yVelocity;

//Make monkey ready
export function setupMonkey() {
  isJumping = false;
  monkeyFrame = 0;
  currentFrameTime = 0;
  yVelocity = 0;
  setCustomProperty(monkeyElem, '--bottom', 0);
  document.removeEventListener('keydown', onJump);
  document.addEventListener('keydown', onJump);
}

export function updateMonkey(delta, speedScale) {
  handleRun(delta, speedScale);
  handleJump(delta);
}

export function getMonkeyRect() {
  //Get radius for Hitbox and export the function for script.js
  return monkeyElem.getBoundingClientRect();
}

export function setMonkeyLose() {
  //Frame 4 is the jumping view of the monkey
  monkeyElem.src = './imgs/MonkeyAnimations/frame4.png';
}

//Run code for monkey
function handleRun(delta, speedScale) {
  if (isJumping) {
    //Make sure jumping frame is applied
    monkeyElem.src = `./imgs/MonkeyAnimations/frame4.png`;
    return;
  }

  //Control speed and frame switch according to current frame and speed increased by the score
  if (currentFrameTime >= FRAME_TIME) {
    //Count up frame until variable limit
    monkeyFrame = (monkeyFrame + 1) % MONKEY_FRAME_COUNT;
    //Set src of monkey img
    monkeyElem.src = `./imgs/MonkeyAnimations/frame${monkeyFrame}.png`;
    // console.log(monkeyElem.src);
    //Set speed according to score
    currentFrameTime -= FRAME_TIME;
  }
  //Increase frame switch speed (Monkey runs faster or slower, depending on the current score)
  currentFrameTime += delta * speedScale;
}

function handleJump(delta) {
  if (!isJumping) return;
  //Fall speed for monkey controlled by yVelocity variable
  incrementCustomProperty(monkeyElem, '--bottom', yVelocity * delta);

  if (getCustomProperty(monkeyElem, '--bottom') <= 0) {
    setCustomProperty(monkeyElem, '--bottom', 0);
    isJumping = false;
  }

  yVelocity -= GRAVITY * delta;
}

function onJump(e) {
  //Call funciton when pressing spacebar
  if (e.code !== 'Space' || isJumping) return;

  yVelocity = JUMP_SPEED;
  isJumping = true;
}
