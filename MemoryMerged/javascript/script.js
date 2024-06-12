//Global game variables
let counter = 0;
let IDCounter = 0;
let cardsGlobal;
let ImagesIndex = [];
let cardsArray = [];
let images = [];

let selectedImages = [];
let selectedParents = [];

//Scoreboard global variables
let scoreboard_tries = 0;
let scoreboard_matches = 0;
let scoreboard_time = 0;

const data = [
  './images/affeAufBaum.jpg',
  './images/affeMitBanane.jpg',
  './images/ameisenbär.jpg',
  './images/basilisk-5951351.jpg',
  './images/bird-1850910.jpg',
  './images/flughund.jpg',
  './images/kleinerAffe.jpg',
  './images/lemur.jpg',
  './images/lizard_2.jpg',
  './images/lizard.jpg',
  './images/pfeilgiftfrosch.jpg',
  './images/rafflesia.jpg',
  './images/snake.jpg',
  './images/toucan-2247143.jpg',
  './images/wasserFall.jpeg',
  './images/tiger.jpg',
  './images/kolibri.jpg',
  './images/kolibri2.jpg',
];

//Background music
let backgroundAudio = new Audio('/MemoryMerged//audio/Level1Background.mp3');

document.addEventListener('DOMContentLoaded', () => {
  backgroundAudio.play();
  backgroundAudio.volume = 0.25;
});

document.addEventListener('keydown', (e) => {
  if (e.key == 'Escape') {
    window.history.back();
  }
});

function StartGame(cards) {
  //Reset all variables for next Match
  cardsGlobal = cards;
  clearDeck();
  IDCounter = 0;
  scoreboard_matches = 0;
  scoreboard_tries = 0;
  //Get mixed Images Indexes for shuffled Deck
  IndexForImages(cards);
  //Unhide the container with all cards
  document.getElementById('memeory_Container').style.display = 'block';

  //Built card field
  if (cards % 2 != 0 || Math.sqrt(cards) % 1 != 0) {
    alert('invalid Parameter');
  } else {
    const rows = Math.sqrt(cards);
    for (let i = 0; i < rows; i++) {
      //Collumns
      for (let j = 0; j < rows; j++) {
        //Elements per row
        generateElements();
        if (counter == cards / 2) {
          counter = 0;
        }
      }
      //Create br Element at each row end
      document.getElementById('memeory_Container').appendChild(document.createElement('br'));
    }
  }
  // Grab all memory-cards
  cardsArray = document.querySelectorAll('.card-container');
  // Grab all images
  images = document.querySelectorAll('.imgContainer');

  //Reset counter - not used
  counter = 0;

  //Set scoreboard
  document.getElementById('h2_matches').innerHTML = `0/${cards / 2}`;
  document.getElementById('h2_moves').innerHTML = `0 tries`;
  document.getElementById('h2_cards').innerHTML = `${cards} Cards`;
  //Assign EventListener to every card (functionality/Game mechanic)
  clickCard();
}

function IndexForImages(cards) {
  // Two arrays getting filled with the same random numbers in data length
  let array1 = [];
  let array2 = [];
  let IndexArray = [];
  let randomNum;
  for (let i = 0; i < cards / 2; i++) {
    randomNum = Math.floor(Math.random() * data.length);
    //Check if there are no duplicates
    if (!array1.includes(randomNum)) {
      array1.push(randomNum);
      array2.push(randomNum);
    } else {
      //Dont count that try
      i--;
    }
  }
  //Put the two arrays together to get 1 array with all numbers 2x to create memory pairs
  IndexArray = array1.concat(array2);
  //Shuffle the indexes to create random patern
  shuffleArray(IndexArray);
  //Globalize Array
  ImagesIndex = IndexArray;
}

function generateElements() {
  //Create Container with 2 child elemts
  let container = document.createElement('div');
  //First child
  // let front_container = document.createElement('div');
  //Second child
  let back_container = document.createElement('div');
  //Child image in back-face for backside of the card
  let backgroundImage = document.createElement('img');

  //Assign the images with the createdIndex Array
  backgroundImage.src = data[ImagesIndex[IDCounter]];

  //Append all created Elements
  back_container.appendChild(backgroundImage);
  // container.appendChild(front_container);
  container.appendChild(back_container);

  //Add classes
  container.classList.add('card-container');
  backgroundImage.classList.add('imgContainer');
  container.classList.add(`card${ImagesIndex[IDCounter]}`);
  back_container.classList.add(`back_face`);
  // front_container.classList.add(`front_face`);

  //Append the cards to the main-container
  document.getElementById('memeory_Container').appendChild(container);
  IDCounter++;
}

function clearDeck() {
  document.getElementById('memeory_Container').innerHTML = '';
}

function shuffleArray(array) {
  array.sort(() => Math.random() - 0.5);
}

function clickCard() {
  //Add Eventlistender to all cards
  for (let i = 0; i < cardsArray.length; i++) {
    cardsArray[i].addEventListener('click', () => {
      //Grab an array with all cards that are currently flipped
      selectedParents = document.getElementsByClassName('flipped');

      //Start Timer if first card is flipped
      if (selectedParents.length >= 2) {
      } else {
        //Only flip the card if the card was not paired successfully
        if (cardsArray[i].classList.contains('static')) {
        } else {
          //Flip the card
          cardsArray[i].classList.add('flipped');
        }
        if (selectedParents.length == 2) {
          //If two cards are flipped push the child image into an array to compare
          selectedImages.push(selectedParents[0].children[0].children[0]);
          selectedImages.push(selectedParents[1].children[0].children[0]);
          compareImages();
        }
      }
    });
  }
}

function compareImages() {
  if (selectedImages[0].src == selectedImages[1].src) {
    //If the image sources are equal add static flip state
    for (let i = 0; i < 2; i++) {
      //Remove flipped class in order to not mess up the compare of the elements with the flipped states --> maximum of 2 Elements in the compare Array each time
      selectedParents[0].classList.add('static');
      selectedParents[0].classList.remove('flipped');
    }

    //Empty all variables for next compare
    selectedParents = [];
    selectedImages = [];

    //scoreboard add pair
    scoreboard_matches++;
    console.log(scoreboard_matches);
    document.getElementById('h2_matches').innerHTML = `${scoreboard_matches}/${cardsGlobal / 2}`;

    //Check if player Won
    checkWin();
  } else {
    //If the image source are not equal flip cards after one second
    setTimeout(turnCards, 1000);
  }

  //scoreboard add tries
  scoreboard_tries++;
  document.getElementById('h2_moves').innerHTML = `${scoreboard_tries} tries`;
}

function turnCards() {
  for (let j = 0; j < 2; j++) {
    selectedParents[0].classList.remove('flipped');
  }
  selectedParents = [];
  selectedImages = [];
}

function checkWin() {
  if (scoreboard_matches == cardsGlobal / 2) {
    setTimeout(function () {
      // Action for winning a game --> Diffrent styling needs to be implemented
      alert('You Won!');
      StartGame(cardsGlobal);
    }, 800);
  }
}

//Generate Cards on Load
window.addEventListener('DOMContentLoaded', () => {
  StartGame(36);
  sessionStorage.setItem('globalPositionIndex', 1);
});

//Button for returning to the main page

document.getElementById('return_btn').addEventListener('click', () => {
  window.location = '../index.html';
});
