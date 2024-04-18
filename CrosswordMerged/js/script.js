document.getElementById("hiddenBoxQ1").style.display = "none";
document.getElementById("hiddenBoxQ2").style.display = "none";
document.getElementById("hiddenBoxQ3").style.display = "none";
document.getElementById("hiddenBoxQ4").style.display = "none";
document.getElementById("hiddenBoxQ5").style.display = "none";
document.getElementById("hiddenBoxQ6").style.display = "none";
document.getElementById("hiddenBoxQ7").style.display = "none";
document.getElementById("hiddenBoxQ8").style.display = "none";

let words = ['flora', 'abbau', 'brand', 'axt', 'tropen', 'jaguar', 'lianen', 'amazonas'];
let letters0 = ['F', 'L', 'O', 'R', 'A'];
let letters1 = ['A', 'B', 'B', 'A', 'U'];
let letters2 = ['B', 'R', 'A', 'N', 'D'];
let letters3 = ['A', 'X', 'T'];
let letters4 = ['T', 'R', 'O', 'P', 'E', 'N'];
let letters5 = ['J', 'A', 'G', 'U', 'A', 'R'];
let letters6 = ['L', 'I', 'A', 'N', 'E', 'N'];
let letters7 = ['A', 'M', 'A', 'Z', 'O', 'N', 'A', 'S'];



let backgroundAudio = new Audio('/CrosswordMerged/audio/Level1Background.mp3');

document.addEventListener('DOMContentLoaded', () => {
  backgroundAudio.play();
  backgroundAudio.volume = 0.2;
  backgroundAudio.loop = true;
});

function sumbit1() {
  let userInput = document.getElementById('submissionText').value.toLowerCase();
  if (userInput == words[0]) {
    document.getElementById('Q1').style.textDecoration = 'line-through';

    document.getElementById('a2').innerHTML = letters0[0];
    document.getElementById('b2').innerHTML = letters0[1];
    document.getElementById('c2').innerHTML = letters0[2];
    document.getElementById('d2').innerHTML = letters0[3];
    document.getElementById('e2').innerHTML = letters0[4];
  } else if (userInput == words[1]) {
    document.getElementById('Q2').style.textDecoration = 'line-through';

    document.getElementById('e2').innerHTML = letters1[0];
    document.getElementById('e3').innerHTML = letters1[1];
    document.getElementById('e4').innerHTML = letters1[2];
    document.getElementById('e5').innerHTML = letters1[3];
    document.getElementById('e6').innerHTML = letters1[4];
  } else if (userInput == words[2]) {
    document.getElementById('Q3').style.textDecoration = 'line-through';

    document.getElementById('e4').innerHTML = letters2[0];
    document.getElementById('d4').innerHTML = letters2[1];
    document.getElementById('c4').innerHTML = letters2[2];
    document.getElementById('b4').innerHTML = letters2[3];
    document.getElementById('a4').innerHTML = letters2[4];
  } else if (userInput == words[3]) {
    document.getElementById('Q4').style.textDecoration = 'line-through';

    document.getElementById('e5').innerHTML = letters3[0];
    document.getElementById('f5').innerHTML = letters3[1];
    document.getElementById('g5').innerHTML = letters3[2];
  } else if (userInput == words[4]) {
    document.getElementById('Q5').style.textDecoration = 'line-through';

    document.getElementById('c7').innerHTML = letters4[0]
    document.getElementById('d7').innerHTML = letters4[1]
    document.getElementById('e7').innerHTML = letters4[2]
    document.getElementById('f7').innerHTML = letters4[3]
    document.getElementById('g7').innerHTML = letters4[4]
    document.getElementById('h7').innerHTML = letters4[5]
  } else if (userInput == words[5]) {
    document.getElementById('Q2').style.textDecoration = 'line-through';

    document.getElementById('e2').innerHTML = letters1[0];
    document.getElementById('e3').innerHTML = letters1[1];
    document.getElementById('e4').innerHTML = letters1[2];
    document.getElementById('e5').innerHTML = letters1[3];
    document.getElementById('e6').innerHTML = letters1[4];
  }

  // Change style according to input
  if (
    userInput != words[0] &&
    userInput != words[1] &&
    userInput != words[2] &&
    userInput != words[3] &&
    userInput != words[4]
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

//Div Box Q1
document.getElementById('a2').addEventListener('click', () => {
  if (!shownQ1) {
    document.getElementById("hiddenBoxQ1").style.display = "block";
    shownQ1 = true;
    console.log('Div Q1 wird angezeigt')
    //Hide other Question Divs
    document.getElementById("hiddenBoxQ2").style.display = "none";
    document.getElementById("hiddenBoxQ3").style.display = "none";
    document.getElementById("hiddenBoxQ4").style.display = "none";
    document.getElementById("hiddenBoxQ5").style.display = "none";
    shownQ2 = false;
    shownQ3 = false;
    shownQ4 = false;
    shownQ5 = false;

  }
  else if (shownQ1) {
    document.getElementById("hiddenBoxQ1").style.display = "none";
    console.log('Div Q1 wird nichtmehr angezeigt')
    shownQ1 = false;
  }
});

//Div Box Q2
document.getElementById('e2').addEventListener('click', () => {
  if (!shownQ2) {
    document.getElementById("hiddenBoxQ2").style.display = "block";
    shownQ2 = true;
    document.getElementById("hiddenBoxQ1").style.display = "none";
    document.getElementById("hiddenBoxQ3").style.display = "none";
    document.getElementById("hiddenBoxQ4").style.display = "none";
    document.getElementById("hiddenBoxQ5").style.display = "none";
    shownQ1 = false;
    shownQ3 = false;
    shownQ4 = false;
    shownQ5 = false;
    console.log('Div Q2 wird angezeigt')

  }
  else if (shownQ2) {
    document.getElementById("hiddenBoxQ2").style.display = "none";
    console.log('Div Q2 wird nichtmehr angezeigt')
    shownQ2 = false;
  }
});

//Div Box Q3
document.getElementById('e4').addEventListener('click', () => {
  if (!shownQ3) {
    document.getElementById("hiddenBoxQ3").style.display = "block";
    shownQ3 = true;
    document.getElementById("hiddenBoxQ1").style.display = "none";
    document.getElementById("hiddenBoxQ2").style.display = "none";
    document.getElementById("hiddenBoxQ4").style.display = "none";
    document.getElementById("hiddenBoxQ5").style.display = "none";
    shownQ1 = false;
    shownQ2 = false;
    shownQ4 = false;
    shownQ5 = false;
    console.log('Div Q3 wird angezeigt')

  }
  else if (shownQ3) {
    document.getElementById("hiddenBoxQ3").style.display = "none";
    console.log('Div Q3 wird nichtmehr angezeigt')
    shownQ3 = false;
  }
});

//Div Box Q4
document.getElementById('e5').addEventListener('click', () => {
  if (!shownQ4) {
    document.getElementById("hiddenBoxQ4").style.display = "block";
    shownQ4 = true;
    document.getElementById("hiddenBoxQ1").style.display = "none";
    document.getElementById("hiddenBoxQ2").style.display = "none";
    document.getElementById("hiddenBoxQ3").style.display = "none";
    document.getElementById("hiddenBoxQ5").style.display = "none";
    shownQ1 = false;
    shownQ2 = false;
    shownQ3 = false;
    shownQ5 = false;
    console.log('Div Q4 wird angezeigt')

  }
  else if (shownQ4) {
    document.getElementById("hiddenBoxQ4").style.display = "none";
    console.log('Div Q4 wird nichtmehr angezeigt')
    shownQ4 = false;
  }
});

//Div Box Q5
document.getElementById('c7').addEventListener('click', () => {
  if (!shownQ5) {
    document.getElementById("hiddenBoxQ5").style.display = "block";
    shownQ5 = true;
    document.getElementById("hiddenBoxQ1").style.display = "none";
    document.getElementById("hiddenBoxQ2").style.display = "none";
    document.getElementById("hiddenBoxQ3").style.display = "none";
    document.getElementById("hiddenBoxQ4").style.display = "none";
    shownQ1 = false;
    shownQ2 = false;
    shownQ3 = false;
    shownQ4 = false;
    console.log('Div Q5 wird angezeigt')

  }
  else if (shownQ5) {
    document.getElementById("hiddenBoxQ5").style.display = "none";
    console.log('Div Q5 wird nichtmehr angezeigt')
    shownQ5 = false;
  }
});

document.getElementById("refresh_btn").addEventListener("click", ()=>{
  window.location = "";
})

function goBack() {
  window.history.back();
}