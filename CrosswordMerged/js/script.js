document.getElementById('hiddenBoxQ1').style.display = 'none';
document.getElementById('hiddenBoxQ2').style.display = 'none';
document.getElementById('hiddenBoxQ3').style.display = 'none';
document.getElementById('hiddenBoxQ4').style.display = 'none';
document.getElementById('hiddenBoxQ5').style.display = 'none';
document.getElementById('hiddenBoxQ6').style.display = 'none';
document.getElementById('hiddenBoxQ7').style.display = 'none';
document.getElementById('hiddenBoxQ8').style.display = 'none';

// Set session Storage
sessionStorage.setItem('globalPositionIndex', 2);

let words = ['flora', 'abbau', 'brand', 'axt', 'tropen', 'jaguar', 'lianen', 'amazonas'];
let letters0 = ['F', 'L', 'O', 'R', 'A'];
let letters1 = ['A', 'B', 'B', 'A', 'U'];
let letters2 = ['B', 'R', 'A', 'N', 'D'];
let letters3 = ['A', 'X', 'T'];
let letters4 = ['T', 'R', 'O', 'P', 'E', 'N'];
let letters5 = ['J', 'A', 'G', 'U', 'A', 'R'];
let letters6 = ['L', 'I', 'A', 'N', 'E', 'N'];
let letters7 = ['A', 'M', 'A', 'Z', 'O', 'N', 'A', 'S'];

let backgroundAudio = new Audio('/CrosswordMerged/audio/crossword_music.mp3');

document.addEventListener('DOMContentLoaded', () => {
  backgroundAudio.play();
  backgroundAudio.volume = 1;
  backgroundAudio.loop = true;
});

function sumbit1() {
  let userInput = document.getElementById('submissionText').value.toLowerCase();
  if (userInput == words[0]) {
    document.getElementById('Q1').style.textDecoration = 'line-through';

    document.getElementById('f3').innerHTML = letters0[0];
    document.getElementById('g3').innerHTML = letters0[1];
    document.getElementById('h3').innerHTML = letters0[2];
    document.getElementById('i3').innerHTML = letters0[3];
    document.getElementById('j3').innerHTML = letters0[4];
  } else if (userInput == words[1]) {
    document.getElementById('Q2').style.textDecoration = 'line-through';

    document.getElementById('j3').innerHTML = letters1[0];
    document.getElementById('j4').innerHTML = letters1[1];
    document.getElementById('j5').innerHTML = letters1[2];
    document.getElementById('j6').innerHTML = letters1[3];
    document.getElementById('j7').innerHTML = letters1[4];
  } else if (userInput == words[2]) {
    document.getElementById('Q3').style.textDecoration = 'line-through';

    document.getElementById('j4').innerHTML = letters2[0];
    document.getElementById('k4').innerHTML = letters2[1];
    document.getElementById('l4').innerHTML = letters2[2];
    document.getElementById('m4').innerHTML = letters2[3];
    document.getElementById('n4').innerHTML = letters2[4];
  } else if (userInput == words[3]) {
    document.getElementById('Q4').style.textDecoration = 'line-through';

    document.getElementById('l7').innerHTML = letters3[0];
    document.getElementById('m7').innerHTML = letters3[1];
    document.getElementById('n7').innerHTML = letters3[2];
  } else if (userInput == words[4]) {
    document.getElementById('Q5').style.textDecoration = 'line-through';

    document.getElementById('b6').innerHTML = letters4[0];
    document.getElementById('c6').innerHTML = letters4[1];
    document.getElementById('d6').innerHTML = letters4[2];
    document.getElementById('e6').innerHTML = letters4[3];
    document.getElementById('f6').innerHTML = letters4[4];
    document.getElementById('g6').innerHTML = letters4[5];
  } else if (userInput == words[5]) {
    document.getElementById('Q6').style.textDecoration = 'line-through';

    document.getElementById('l3').innerHTML = letters5[0];
    document.getElementById('l4').innerHTML = letters5[1];
    document.getElementById('l5').innerHTML = letters5[2];
    document.getElementById('l6').innerHTML = letters5[3];
    document.getElementById('l7').innerHTML = letters5[4];
    document.getElementById('l8').innerHTML = letters5[5];
  } else if (userInput == words[6]) {
    document.getElementById('Q7').style.textDecoration = 'line-through';

    document.getElementById('g3').innerHTML = letters6[0];
    document.getElementById('g4').innerHTML = letters6[1];
    document.getElementById('g5').innerHTML = letters6[2];
    document.getElementById('g6').innerHTML = letters6[3];
    document.getElementById('g7').innerHTML = letters6[4];
    document.getElementById('g8').innerHTML = letters6[5];
  } else if (userInput == words[7]) {
    document.getElementById('Q8').style.textDecoration = 'line-through';

    document.getElementById('b8').innerHTML = letters7[0];
    document.getElementById('c8').innerHTML = letters7[1];
    document.getElementById('d8').innerHTML = letters7[2];
    document.getElementById('e8').innerHTML = letters7[3];
    document.getElementById('f8').innerHTML = letters7[4];
    document.getElementById('g8').innerHTML = letters7[5];
    document.getElementById('h8').innerHTML = letters7[6];
    document.getElementById('i8').innerHTML = letters7[7];
  }

  // Change style according to input
  if (
    userInput != words[0] &&
    userInput != words[1] &&
    userInput != words[2] &&
    userInput != words[3] &&
    userInput != words[4] &&
    userInput != words[5] &&
    userInput != words[6] &&
    userInput != words[7]
  ) {
    document.getElementById('submissionText').style.backgroundColor = 'red';
  } else {
    document.getElementById('submissionText').style.backgroundColor = 'green';
    setTimeout(() => {
      document.getElementById('submissionText').style.backgroundColor = 'white';
      document.getElementById('submissionText').value = '';
    }, 1000);
  }
}

// Triggeres submit function when pressing enter in the input field
document.getElementById('submissionText').addEventListener('keypress', function (event) {
  if (event.key === 'Enter' && document.getElementById('submissionText').value.length > 0) {
    sumbit1();
  }
});

// Reset styling when input is trimmed
document.getElementById('submissionText').addEventListener('keydown', function (event) {
  if (event.key === 'Backspace') {
    document.getElementById('submissionText').style.backgroundColor = 'white';
  }
});

let questionShown = false;

//Variables for hiddenBox

let shownQ1 = false;
let shownQ2 = false;
let shownQ3 = false;
let shownQ4 = false;
let shownQ5 = false;
let shownQ6 = false;
let shownQ7 = false;
let shownQ8 = false;

//Div Box Q1
document.getElementById('f3').addEventListener('click', () => {
  if (!shownQ1) {
    document.getElementById('hiddenBoxQ1').style.display = 'block';
    shownQ1 = true;
    console.log('Div Q1 wird angezeigt');
    //Hide other Question Divs
    document.getElementById('hiddenBoxQ2').style.display = 'none';
    document.getElementById('hiddenBoxQ3').style.display = 'none';
    document.getElementById('hiddenBoxQ4').style.display = 'none';
    document.getElementById('hiddenBoxQ5').style.display = 'none';
    document.getElementById('hiddenBoxQ6').style.display = 'none';
    document.getElementById('hiddenBoxQ7').style.display = 'none';
    document.getElementById('hiddenBoxQ8').style.display = 'none';
    console.log('Div Q1 wird angezeigt');
    //Hide other Question Divs
    document.getElementById('hiddenBoxQ2').style.display = 'none';
    document.getElementById('hiddenBoxQ3').style.display = 'none';
    document.getElementById('hiddenBoxQ4').style.display = 'none';
    document.getElementById('hiddenBoxQ5').style.display = 'none';
    shownQ2 = false;
    shownQ3 = false;
    shownQ4 = false;
    shownQ5 = false;
    shownQ6 = false;
    shownQ7 = false;
    shownQ8 = false;
  } else if (shownQ1) {
    document.getElementById('hiddenBoxQ1').style.display = 'none';
    console.log('Div Q1 wird nichtmehr angezeigt');
  } else if (shownQ1) {
    document.getElementById('hiddenBoxQ1').style.display = 'none';
    console.log('Div Q1 wird nichtmehr angezeigt');
    shownQ1 = false;
  }
});

//Div Box Q2
document.getElementById('j3').addEventListener('click', () => {
  if (!shownQ2) {
    document.getElementById('hiddenBoxQ2').style.display = 'block';
    shownQ2 = true;
    document.getElementById('hiddenBoxQ1').style.display = 'none';
    document.getElementById('hiddenBoxQ3').style.display = 'none';
    document.getElementById('hiddenBoxQ4').style.display = 'none';
    document.getElementById('hiddenBoxQ5').style.display = 'none';
    document.getElementById('hiddenBoxQ6').style.display = 'none';
    document.getElementById('hiddenBoxQ7').style.display = 'none';
    document.getElementById('hiddenBoxQ8').style.display = 'none';
    shownQ1 = false;
    shownQ3 = false;
    shownQ4 = false;
    shownQ5 = false;
    shownQ6 = false;
    shownQ7 = false;
    shownQ8 = false;
    console.log('Div Q2 wird angezeigt');
  } else if (shownQ2) {
    document.getElementById('hiddenBoxQ2').style.display = 'none';
    console.log('Div Q2 wird nichtmehr angezeigt');
    console.log('Div Q2 wird angezeigt');
  } else if (shownQ2) {
    document.getElementById('hiddenBoxQ2').style.display = 'none';
    console.log('Div Q2 wird nichtmehr angezeigt');
    shownQ2 = false;
  }
});

//Div Box Q3
document.getElementById('j4').addEventListener('click', () => {
  if (!shownQ3) {
    document.getElementById('hiddenBoxQ3').style.display = 'block';
    shownQ3 = true;
    document.getElementById('hiddenBoxQ1').style.display = 'none';
    document.getElementById('hiddenBoxQ2').style.display = 'none';
    document.getElementById('hiddenBoxQ4').style.display = 'none';
    document.getElementById('hiddenBoxQ5').style.display = 'none';
    document.getElementById('hiddenBoxQ6').style.display = 'none';
    document.getElementById('hiddenBoxQ7').style.display = 'none';
    document.getElementById('hiddenBoxQ8').style.display = 'none';
    shownQ1 = false;
    shownQ2 = false;
    shownQ4 = false;
    shownQ5 = false;
    shownQ6 = false;
    shownQ7 = false;
    shownQ8 = false;
    console.log('Div Q3 wird angezeigt');
  } else if (shownQ3) {
    document.getElementById('hiddenBoxQ3').style.display = 'none';
    console.log('Div Q3 wird nichtmehr angezeigt');
    console.log('Div Q3 wird angezeigt');
  } else if (shownQ3) {
    document.getElementById('hiddenBoxQ3').style.display = 'none';
    console.log('Div Q3 wird nichtmehr angezeigt');
    shownQ3 = false;
  }
});

//Div Box Q4
document.getElementById('l7').addEventListener('click', () => {
  if (!shownQ4) {
    document.getElementById('hiddenBoxQ4').style.display = 'block';
    shownQ4 = true;
    document.getElementById('hiddenBoxQ1').style.display = 'none';
    document.getElementById('hiddenBoxQ2').style.display = 'none';
    document.getElementById('hiddenBoxQ3').style.display = 'none';
    document.getElementById('hiddenBoxQ5').style.display = 'none';
    document.getElementById('hiddenBoxQ6').style.display = 'none';
    document.getElementById('hiddenBoxQ7').style.display = 'none';
    document.getElementById('hiddenBoxQ8').style.display = 'none';
    shownQ1 = false;
    shownQ2 = false;
    shownQ3 = false;
    shownQ5 = false;
    shownQ6 = false;
    shownQ7 = false;
    shownQ8 = false;
    console.log('Div Q4 wird angezeigt');
  } else if (shownQ4) {
    document.getElementById('hiddenBoxQ4').style.display = 'none';
    console.log('Div Q4 wird nichtmehr angezeigt');
    console.log('Div Q4 wird angezeigt');
  } else if (shownQ4) {
    document.getElementById('hiddenBoxQ4').style.display = 'none';
    console.log('Div Q4 wird nichtmehr angezeigt');
    shownQ4 = false;
  }
});

//Div Box Q5
document.getElementById('b6').addEventListener('click', () => {
  if (!shownQ5) {
    document.getElementById('hiddenBoxQ5').style.display = 'block';
    shownQ5 = true;
    document.getElementById('hiddenBoxQ1').style.display = 'none';
    document.getElementById('hiddenBoxQ2').style.display = 'none';
    document.getElementById('hiddenBoxQ3').style.display = 'none';
    document.getElementById('hiddenBoxQ4').style.display = 'none';
    document.getElementById('hiddenBoxQ6').style.display = 'none';
    document.getElementById('hiddenBoxQ7').style.display = 'none';
    document.getElementById('hiddenBoxQ8').style.display = 'none';
    shownQ1 = false;
    shownQ2 = false;
    shownQ3 = false;
    shownQ4 = false;
    shownQ6 = false;
    shownQ7 = false;
    shownQ8 = false;
    console.log('Div Q5 wird angezeigt');
  } else if (shownQ5) {
    document.getElementById('hiddenBoxQ5').style.display = 'none';
    console.log('Div Q5 wird nichtmehr angezeigt');
    console.log('Div Q5 wird angezeigt');
  } else if (shownQ5) {
    document.getElementById('hiddenBoxQ5').style.display = 'none';
    console.log('Div Q5 wird nichtmehr angezeigt');
    shownQ5 = false;
  }
});

//Div Box Q6
document.getElementById('l3').addEventListener('click', () => {
  if (!shownQ6) {
    document.getElementById('hiddenBoxQ6').style.display = 'block';
    shownQ6 = true;
    document.getElementById('hiddenBoxQ1').style.display = 'none';
    document.getElementById('hiddenBoxQ2').style.display = 'none';
    document.getElementById('hiddenBoxQ3').style.display = 'none';
    document.getElementById('hiddenBoxQ4').style.display = 'none';
    document.getElementById('hiddenBoxQ5').style.display = 'none';
    document.getElementById('hiddenBoxQ7').style.display = 'none';
    document.getElementById('hiddenBoxQ8').style.display = 'none';
    shownQ1 = false;
    shownQ2 = false;
    shownQ3 = false;
    shownQ4 = false;
    shownQ5 = false;
    shownQ7 = false;
    shownQ8 = false;
    console.log('Div Q6 wird angezeigt');
  } else if (shownQ6) {
    document.getElementById('hiddenBoxQ6').style.display = 'none';
    console.log('Div Q6 wird nichtmehr angezeigt');
    shownQ6 = false;
  }
});

//Div Box Q7
document.getElementById('g3').addEventListener('click', () => {
  if (!shownQ7) {
    document.getElementById('hiddenBoxQ7').style.display = 'block';
    shownQ7 = true;
    document.getElementById('hiddenBoxQ1').style.display = 'none';
    document.getElementById('hiddenBoxQ2').style.display = 'none';
    document.getElementById('hiddenBoxQ3').style.display = 'none';
    document.getElementById('hiddenBoxQ4').style.display = 'none';
    document.getElementById('hiddenBoxQ5').style.display = 'none';
    document.getElementById('hiddenBoxQ6').style.display = 'none';
    document.getElementById('hiddenBoxQ8').style.display = 'none';
    shownQ1 = false;
    shownQ2 = false;
    shownQ3 = false;
    shownQ4 = false;
    shownQ5 = false;
    shownQ6 = false;
    shownQ8 = false;
    console.log('Div Q7 wird angezeigt');
  } else if (shownQ7) {
    document.getElementById('hiddenBoxQ7').style.display = 'none';
    console.log('Div Q7 wird nichtmehr angezeigt');
    shownQ7 = false;
  }
});

//Div Box Q8
document.getElementById('b8').addEventListener('click', () => {
  if (!shownQ8) {
    document.getElementById('hiddenBoxQ8').style.display = 'block';
    shownQ8 = true;
    document.getElementById('hiddenBoxQ1').style.display = 'none';
    document.getElementById('hiddenBoxQ2').style.display = 'none';
    document.getElementById('hiddenBoxQ3').style.display = 'none';
    document.getElementById('hiddenBoxQ4').style.display = 'none';
    document.getElementById('hiddenBoxQ5').style.display = 'none';
    document.getElementById('hiddenBoxQ6').style.display = 'none';
    document.getElementById('hiddenBoxQ7').style.display = 'none';
    shownQ1 = false;
    shownQ2 = false;
    shownQ3 = false;
    shownQ4 = false;
    shownQ5 = false;
    shownQ6 = false;
    shownQ7 = false;
    console.log('Div Q8 wird angezeigt');
  } else if (shownQ8) {
    document.getElementById('hiddenBoxQ8').style.display = 'none';
    console.log('Div Q8 wird nichtmehr angezeigt');
    shownQ8 = false;
  }
});

function goBack() {
  window.history.back();
}
