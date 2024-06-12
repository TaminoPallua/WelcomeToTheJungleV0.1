import {
  setCustomProperty,
  incrementCustomProperty,
  getCustomProperty,
} from './updateCustomProperty.js';


const objectSelectionArray = ['./imgs/object0.png', './imgs/object1.png'];
const SPEED = 0.05;
const OBJECT_INTERVAL_MIN = 800;
const OBJECT_INTERVAL_MAX = 2000;
const worldElem = document.querySelector('[data-world]');

let nextObjectTime;
export function setupObject() {
  nextObjectTime = OBJECT_INTERVAL_MIN;
  document.querySelectorAll('[data-object]').forEach((object) => {
    object.remove();
  });
}

export function updateObject(delta, speedScale) {
  document.querySelectorAll('[data-object]').forEach((object) => {
    incrementCustomProperty(object, '--left', delta * speedScale * SPEED * -1);
    if (getCustomProperty(object, '--left') <= -100) {
      object.remove();
    }
  });

  if (nextObjectTime <= 0) {
    createObject();
    nextObjectTime = randomNumberBetween(OBJECT_INTERVAL_MIN, OBJECT_INTERVAL_MAX) / speedScale;
  }
  nextObjectTime -= delta;
}

export function getObjectRects() {
  return [...document.querySelectorAll('[data-object]')].map((object) => {
    return object.getBoundingClientRect();
  });
}

function createObject() {
  let randomImageSelectionIndex = Math.floor(Math.random() * 2);
  const object = document.createElement('img');
  object.dataset.object = true;
  //INSERT IMAGE
  object.src = `./imgs/Objects/object${randomImageSelectionIndex}.png`;
  object.classList.add('object');
  setCustomProperty(object, '--left', 100);
  worldElem.append(object);
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
