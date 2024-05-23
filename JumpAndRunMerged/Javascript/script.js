import { updateGround, setupGround } from './ground.js';
import { updateMonkey, setupMonkey, getMonkeyRect, setMonkeyLose } from './char.js';
import { updateObject, setupObject, getObjectRects } from './objects.js';

const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;
const SPEED_SCALE_INCREASE = 0.00001;

let hasLost = false;

const worldElem = document.querySelector('[data-world]');
const scoreElem = document.querySelector('[data-score]');
// const startScreenElem = document.querySelector('[data-start-screen]');
const infoBox = document.querySelector('[data-info-box]');

//Grab Monkey to hide when the Game ends
const monkeyElem = document.querySelector('[data-monkey]');

setPixelToWorldScale();
window.addEventListener('resize', setPixelToWorldScale);
//Setup start when pressing Spacebar
document.addEventListener('keydown', (e) => {
  if (e.key == 'Enter') {
    handleStart();
  }
});

let lastTime;
let speedScale;
let score;
function update(time) {
  if (lastTime == null) {
    lastTime = time;
    window.requestAnimationFrame(update);
    return;
  }
  const delta = time - lastTime;

  updateGround(delta, speedScale);
  updateMonkey(delta, speedScale);
  updateObject(delta, speedScale);
  updateSpeedScale(delta);
  updateScore(delta);
  if (checkLose()) return handleLose();

  lastTime = time;
  window.requestAnimationFrame(update);
}

function checkLose() {
  const MonkeyRect = getMonkeyRect();
  return getObjectRects().some((rect) => isCollision(rect, MonkeyRect));
}

function isCollision(rect1, rect2) {
  // console.log(rect1, rect2);
  //Check for collision, the numbers can be edited to change the hitbox radius, the higher the number the smaller the hitbox gets
  return (
    rect1.left < rect2.right - 100 &&
    rect1.top < rect2.bottom - 100 &&
    rect1.right > rect2.left + 100 &&
    rect1.bottom > rect2.top - 100
  );
}

function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE;
}

function updateScore(delta) {
  score += delta * 0.01;
  scoreElem.textContent = Math.floor(score);
}

function handleStart() {
  monkeyElem.style.visibility = 'visible';
  lastTime = null;
  speedScale = 1;
  score = 0;
  setupGround();
  setupMonkey();
  setupObject();
  // startScreenElem.classList.add('hide');
  infoBox.classList.add('hide');
  window.requestAnimationFrame(update);
}

function handleLose() {
  setMonkeyLose();
  setTimeout(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key == 'Space') {
        handleStart();
      }
    });

    monkeyElem.style.visibility = 'hidden';
    infoBox.children[0].innerHTML = 'Game Over !';
    infoBox.children[0].style.fontSize = '180px';
    infoBox.removeChild(infoBox.children[1]);
    infoBox.children[1].innerHTML = 'Press Enter to start a new try';
    infoBox.classList.remove('hide');
  }, 100);
}

function setPixelToWorldScale() {
  let worldToPixelScale;
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldToPixelScale = window.innerWidth / WORLD_WIDTH;
  } else {
    worldToPixelScale = window.innerHeight / WORLD_HEIGHT;
  }

  worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`;
  worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`;
}
