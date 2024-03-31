//HTML Elements
const answerContainer = document.getElementById('answerContainer');
const questionText = document.querySelector('#questionText');
const score_container = document.querySelector('#score_h2');
const sbm_btn = document.getElementById('next_btn');
const hr = document.getElementById('break_styleElement');

//Global Variables
let currentQuestionIndex = 0;
let score = 0;
let clickedAnswers = 0;
// Selected Difficulty (Default is Easy)
let selectedDifficulty = 0;
let blockLevelButtons = false;

//Background music

let backgroundMusic = new Audio('/QuizGame_WTTJ/audio/Level1Background.mp3');

//Question/Answer Array

const questionsEasy = [
  {
    question: 'Warum ist die Erhaltung der Wälder wichtig für den Klimaschutz?',
    answers: [
      { text: 'Weil Bäume schöne Landschaften schaffen', correct: false },
      { text: 'Weil Wälder wichtige Lebensräume für Tiere sind', correct: false },
      { text: 'Weil Wälder große Mengen an Kohlenstoff speichern', correct: true },
      { text: 'Weil Wälder den Niederschlag beeinflussen', correct: false },
    ],
  },
  {
    question: 'Welche Aktivität trägt am meisten zur Abholzung der Wälder bei?',
    answers: [
      { text: 'Recycling von Papierprodukten', correct: false },
      { text: 'Verwendung von nachhaltigem Holz', correct: false },
      { text: 'Anbau von Monokulturen wie Palmölplantagen', correct: true },
      { text: 'Förderung von Aufforstungsprojekten', correct: false },
    ],
  },
  {
    question: 'Was ist eine direkte Auswirkung der Abholzung von Wäldern auf das Klima?',
    answers: [
      { text: 'Zunahme der Artenvielfalt', correct: false },
      { text: 'Verringerung der Bodenerosion', correct: false },
      { text: 'Freisetzung von Treibhausgasen in die Atmosphäre', correct: true },
      { text: 'Erhöhung des Niederschlags', correct: false },
    ],
  },
  {
    question:
      'Welche der folgenden Maßnahmen ist eine nachhaltige Lösung, um die Entwaldung zu bekämpfen und den Klimawandel zu adressieren?',
    answers: [
      { text: 'Ausweitung von Palmölplantagen auf gerodeten Waldflächen', correct: false },
      { text: 'Förderung von Holzimporten aus nicht-zertifizierten Quellen', correct: false },
      {
        text: 'Reduzierung des Fleischkonsums, um die Nachfrage nach Weideflächen zu verringern',
        correct: true,
      },
      { text: 'Förderung von Waldbränden zur Bekämpfung von Schädlingen', correct: false },
    ],
  },
];

const questionsMedium = [
  {
    question:
      'Was ist eine der Hauptursachen für die Entwaldung und den Verlust von Kohlenstoffsenken?',
    answers: [
      { text: 'Erhaltung von Biodiversität', correct: false },
      { text: 'Ausbau erneuerbarer Energien', correct: false },
      { text: 'Landwirtschaftliche Expansion', correct: true },
      { text: 'Reduzierung des Fleischkonsums', correct: false },
    ],
  },
  {
    question:
      'Welche Maßnahme trägt am meisten zum Klimaschutz bei, indem sie die CO2-Emissionen reduziert und gleichzeitig die Wälder erhält?',
    answers: [
      { text: 'Einsatz von Elektroautos', correct: false },
      { text: 'Förderung von Recyclingprogrammen', correct: false },
      { text: 'Verwendung von Einwegplastikprodukten', correct: false },
      { text: 'Schutz und Wiederaufforstung von Wäldern', correct: true },
    ],
  },
  {
    question:
      'Welche internationalen Abkommen zielen darauf ab, den Schutz der Wälder und den Kampf gegen den Klimawandel zu fördern?',
    answers: [
      { text: 'Montreal-Protokoll', correct: false },
      { text: 'Pariser Abkommen', correct: true },
      { text: 'Kyoto-Protokoll', correct: false },
      { text: 'Rio de Janeiro-Deklaration', correct: false },
    ],
  },
  {
    question: 'Was ist eine bedeutende Funktion von Regenwäldern im Ökosystem?',
    answers: [
      { text: 'Kühlen der Atmosphäre', correct: true },
      { text: 'Verschmutzung des Wassers', correct: false },
      { text: 'Reduzierung des Sauerstoffgehalts', correct: false },
      { text: 'Erhöhung der Wüstenbildung', correct: false },
    ],
  },
  {
    question:
      'Welche der folgenden Organisationen ist bekannt für ihren Einsatz im Kampf gegen die Waldrodung und den Klimawandel?',
    answers: [
      { text: 'Internationale Holzhandelsunternehmen', correct: false },
      { text: 'Umweltorganisationen wie Greenpeace und WWF', correct: true },
      {
        text: 'Öl- und Gasunternehmen, die Waldflächen für die Exploration nutzen',
        correct: false,
      },
      { text: 'Regierungen, die keine Umweltschutzmaßnahmen ergreifen', correct: false },
    ],
  },
  {
    question:
      'Welches der folgenden Länder hat in den letzten Jahren die größte Fläche an Wald verloren, was sowohl den Klimawandel als auch den Verlust an Biodiversität beeinflusst hat?',
    answers: [
      { text: 'Kanada', correct: false },
      { text: 'Brasilien', correct: true },
      { text: 'Australien', correct: false },
      { text: 'Norwegen', correct: false },
    ],
  },
  {
    question:
      'Welches der folgenden Länder hat in den letzten Jahren die größte Fläche an Wald verloren, was sowohl den Klimawandel als auch den Verlust an Biodiversität beeinflusst hat?',
    answers: [
      { text: 'Kanada', correct: false },
      { text: 'Brasilien', correct: true },
      { text: 'Australien', correct: false },
      { text: 'Norwegen', correct: false },
    ],
  },
];

const questionsHard = [
  {
    question:
      'Welchen Prozentsatz der weltweiten Treibhausgasemissionen trägt die Rodung des Urwalds bei?',
    answers: [
      { text: 'Etwa 5%', correct: true },
      { text: 'Etwa 10%', correct: false },
      { text: 'Etwa 15%', correct: false },
      { text: 'Etwa 20%', correct: false },
    ],
  },
  {
    question:
      'Welche Art von Luftverschmutzung hat die größte direkte Auswirkung auf die Gesundheit von Waldökosystemen?',
    answers: [
      { text: 'Feinstaubpartikel (PM)', correct: true },
      { text: 'Stickstoffoxide (NOx)', correct: false },
      { text: 'Schwefeldioxid (SO2)', correct: false },
      { text: 'Kohlenmonoxid (CO)', correct: false },
    ],
  },
  {
    question:
      'Welche der folgenden menschlichen Aktivitäten trägt am meisten zur Verschmutzung von Flüssen und Bächen in Waldgebieten bei?',
    answers: [
      { text: 'Industrielle Abwässer', correct: false },
      { text: 'Freizeitaktivitäten wie Bootfahren', correct: false },
      { text: 'Landwirtschaftliche Düngemittel', correct: true },
      { text: 'Straßenverkehr', correct: false },
    ],
  },
  {
    question:
      'Welchen Prozentsatz der weltweiten Treibhausgasemissionen trägt die Rodung des Urwalds bei?',
    answers: [
      { text: 'Etwa 5%', correct: false },
      { text: 'Etwa 10%', correct: false },
      { text: 'Etwa 15%', correct: true },
      { text: 'Etwa 20%', correct: false },
    ],
  },
  {
    question:
      'Welche Art von Waldverschmutzung hat die größte langfristige Auswirkung auf die Artenvielfalt?',
    answers: [
      { text: 'Luftverschmutzung', correct: true },
      { text: 'Wasserverschmutzung', correct: false },
      { text: 'Bodenverschmutzung', correct: false },
      { text: 'Lärmverschmutzung', correct: false },
    ],
  },
  {
    question:
      'Welche Strategie ist effektiv, um die Verschmutzung von Waldökosystemen durch nicht abbaubare Kunststoffe zu bekämpfen?',
    answers: [
      { text: 'Verbrennung von Kunststoffen vor Ort', correct: false },
      { text: 'Verwendung biologisch abbaubarer Kunststoffe', correct: true },
      { text: 'Recycling von Kunststoffen in spezialisierten Anlagen', correct: false },
      { text: 'Verbot von Kunststoffprodukten in Waldgebieten', correct: false },
    ],
  },
  {
    question:
      'Welches ist ein wesentlicher Bestandteil von Luftverschmutzung, der oft übersehen wird, aber dennoch erhebliche Auswirkungen auf Waldökosysteme hat?',
    answers: [
      { text: 'Ozon in der Stratosphäre', correct: false },
      { text: 'Kohlenstoffmonoxid in der Luft', correct: false },
      { text: 'Feinstaubpartikel in der Atmosphäre', correct: false },
      { text: 'Stickstoffdioxid in der Troposphäre', correct: true },
    ],
  },
  {
    question:
      'Welche Strategie wird oft zur Bekämpfung von Bodenverschmutzung durch Schwermetalle in Waldgebieten angewendet?',
    answers: [
      { text: 'Anbau von Schwermetall-toleranten Pflanzenarten', correct: true },
      { text: 'Bodensanierung durch Chemikalien', correct: false },
      { text: 'Verstärkte Bewässerung', correct: false },
      { text: 'Einführung von genetisch modifizierten Mikroorganismen', correct: false },
    ],
  },
  {
    question:
      'Welches ist eine der Hauptursachen für die Verschmutzung von Waldgewässern durch Pestizide?',
    answers: [
      { text: 'Auslaufen von Ölbohrplattformen', correct: false },
      { text: 'Unkontrollierte Müllentsorgung', correct: false },
      { text: 'Industrielle Abwasserkanäle', correct: false },
      { text: 'Landwirtschaftliche Sprühflugzeuge', correct: true },
    ],
  },
  {
    question:
      'Welches Instrument wird verwendet, um den Kohlenstoffgehalt in einem Waldgebiet zu messen?',
    answers: [
      { text: 'Photometer', correct: false },
      { text: 'Dendrometer', correct: false },
      { text: 'Carbon-Monitoring-Systeme', correct: true },
      { text: 'Geigerzähler', correct: false },
    ],
  },
];

const quizLenghts = [4, 7, 10]; // Number of questions in each level of difficulty

//Array of all Difficulties
const selectedDifficultyArray = [questionsEasy, questionsMedium, questionsHard];

// Function to start the quiz
function Quiz(difficulty) {
  blockLevelButtons = false;
  //Grab difficulty
  selectedDifficulty = difficulty;
  //Shuffle Question Presets to have diffrent templates
  shuffleQuestions();
  //Reset Game State
  resetState();
  currentQuestionIndex = 0;
  score = 0;
  ShowQuestions();
}

// Generates Question preset
function ShowQuestions() {
  // Grab Question/Answer preset
  let currentQuestion = selectedDifficultyArray[selectedDifficulty][currentQuestionIndex];
  let numQuestion = currentQuestionIndex + 1;
  //Display Question
  questionText.innerHTML = `${numQuestion} / ${quizLenghts[selectedDifficulty]}. ${selectedDifficultyArray[selectedDifficulty][currentQuestionIndex].question}`;

  // Create Answer Buttons using a loop thats going through the answers Array
  currentQuestion.answers.forEach((answer) => {
    const submitButtonAnswer = document.createElement('button');
    submitButtonAnswer.innerHTML = answer.text;
    submitButtonAnswer.classList.add('answer-btn');
    answerContainer.appendChild(submitButtonAnswer);
  });
  SubmitAnswer();
  CheckForEndGame();
}

//Button for next Question set
document.getElementById('next_btn').addEventListener('click', () => {
  if (!CheckForEndGame() && clickedAnswers == 1) {
    //Delete the Answers from previous Question
    resetState();
    //Load new Answers + Question
    currentQuestionIndex++;
    //Show new Questions
    ShowQuestions();
    //Check if end is reached
  }
  //Winning the Game
  else if (CheckForEndGame()) {
    resetState();
    questionText.innerHTML = 'Game Stats:';
    buildScoreBoard();
    //deactivate Button
    sbm_btn.style.display = 'none';
    //Timeout before the site reloads
    setTimeout(function () {
      window.location.reload();
    }, 3000);
  } else {
    alert('Wähle zumindesredt eine Antwort aus!');
  }
});

//Resets previous Question preset
function resetState() {
  //Delete all child Elements of Parent Container
  while (answerContainer.firstChild) {
    answerContainer.removeChild(answerContainer.firstChild);
  }
  //set clicks for answers to 0
  clickedAnswers = 0;
}

// Function for diffrent answers ,  and adds click event listener
function SubmitAnswer() {
  let currentQuestionSet = selectedDifficultyArray[selectedDifficulty][currentQuestionIndex];
  let answerChild;
  for (let i = 0; i < answerContainer.children.length; i++) {
    if (currentQuestionSet.answers[i].correct == true) {
      //Grab the correct answer child
      answerChild = answerContainer.children[i];
    }
    answerContainer.children[i].addEventListener('click', () => {
      if (clickedAnswers < 1) {
        if (currentQuestionSet.answers[i].correct == true) {
          clickedAnswers++;
          score++;
          let correctChild = answerContainer.children[i];
          correctChild.style.backgroundColor = 'green';
        } else {
          clickedAnswers++;
          let wrongChild = answerContainer.children[i];
          wrongChild.style.backgroundColor = 'red';
          //Show right answer

          wrongChild.style.textDecoration = 'line-through';
          answerChild.style.backgroundColor = 'green';
        }
      }
    });
  }
}

// Checks the Game state
function CheckForEndGame() {
  // console.log(`Questions:${selectedDifficultyArray[selectedDifficulty].length}`)
  if (currentQuestionIndex + 1 == selectedDifficultyArray[selectedDifficulty].length) {
    // alert("End")
    sbm_btn.innerHTML = 'Finish';
    return true;
  } else {
    return false;
  }
}

// Load game with easy difficulty
document.querySelector('#easy_btn').addEventListener('click', () => {
  if (!blockLevelButtons) {
    Quiz(0);
    sbm_btn.style.visibility = 'visible';
    hr.style.visibility = 'visible';
  }
});

// Load game with medium difficulty
document.querySelector('#medium_btn').addEventListener('click', () => {
  if (!blockLevelButtons) {
    Quiz(1);
    sbm_btn.style.visibility = 'visible';
    hr.style.visibility = 'visible';
  }
});

// Load game with hard difficulty
document.querySelector('#hard_btn').addEventListener('click', () => {
  if (!blockLevelButtons) {
    Quiz(2);
    sbm_btn.style.visibility = 'visible';
    hr.style.visibility = 'visible';
  }
});

//Loads the start view
window.addEventListener('load', () => {
  //Start game
  sbm_btn.style.visibility = 'hidden';
  hr.style.visibility = 'hidden';

  //StartBackgroundMusic
  backgroundMusic.play();
  backgroundMusic.volume = 0.2;
  backgroundMusic.loop = true;
});

//Builds the scoreboard for user Feedback
function buildScoreBoard() {
  //block  level buttons to prevent further interaction during this process
  blockLevelButtons = true;
  let scoreBoard_container = document.createElement('div');
  let pInfo = document.createElement('p');
  let scoreTitle = document.createElement('h3');
  pInfo.innerHTML = 'This page will refresh in 3 seconds';
  pInfo.classList.add('score_p');
  scoreTitle.classList.add('scoreText');
  scoreTitle.innerHTML = `Your Score: ${score} / ${quizLenghts[selectedDifficulty]}`;
  questionText.style.fontSize = '30px';
  scoreBoard_container.appendChild(scoreTitle);
  scoreBoard_container.classList.add('score_container');
  answerContainer.appendChild(pInfo);
  answerContainer.appendChild(scoreBoard_container);
}

//Randomize Question presets
function shuffleQuestions() {
  questionsEasy.sort(() => Math.random() - 0.5);
  questionsMedium.sort(() => Math.random() - 0.5);
  questionsHard.sort(() => Math.random() - 0.5);

  //Randomize Answer presets
  for (let i = 0; i < questionsEasy.length; i++) {
    questionsEasy[i].answers.sort(() => Math.random() - 0.5);
  }
  for (let i = 0; i < questionsMedium.length; i++) {
    questionsMedium[i].answers.sort(() => Math.random() - 0.5);
  }
  for (let i = 0; i < questionsHard.length; i++) {
    questionsHard[i].answers.sort(() => Math.random() - 0.5);
  }
}
