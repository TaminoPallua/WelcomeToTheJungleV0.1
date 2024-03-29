//HTML Elements
const answerContainer = document.getElementById('answerContainer');
const questionText = document.querySelector('#questionText');
const score_container = document.querySelector('#score_h2')
const sbm_btn = document.getElementById("next_btn");
const hr = document.getElementById("break_styleElement");

//Global Variables
let currentQuestionIndex = 0;
let score = 0;
let clickedAnswers = 0;
// Selected Difficulty (Default is Easy)
let selectedDifficulty = 0;

//Background music

let backgroundMusic = new Audio("/QuizGame_WTTJ/audio/Level1Background.mp3")



//Question/Answer Array

const questionsEasy = [
  {
    question:
      'Warum ist die Erhaltung der Wälder wichtig für den Klimaschutz?',
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
    question:
      'Was ist eine direkte Auswirkung der Abholzung von Wäldern auf das Klima?',
    answers: [
      { text: 'Zunahme der Artenvielfalt', correct: false },
      { text: 'Verringerung der Bodenerosion', correct: false },
      { text: 'Freisetzung von Treibhausgasen in die Atmosphäre', correct: true},
      { text: 'Erhöhung des Niederschlags', correct: false },
    ],
  },
  {
    question:
      'Welche der folgenden Maßnahmen ist eine nachhaltige Lösung, um die Entwaldung zu bekämpfen und den Klimawandel zu adressieren?',
    answers: [
      { text: 'Ausweitung von Palmölplantagen auf gerodeten Waldflächen', correct: false },
      { text: 'Förderung von Holzimporten aus nicht-zertifizierten Quellen', correct: false },
      { text: 'Reduzierung des Fleischkonsums, um die Nachfrage nach Weideflächen zu verringern', correct: true },
      { text: 'Förderung von Waldbränden zur Bekämpfung von Schädlingen', correct: false },
    ],
  }
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
    question: 'Welche Maßnahme trägt am meisten zum Klimaschutz bei, indem sie die CO2-Emissionen reduziert und gleichzeitig die Wälder erhält?',
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
    question:
      'Was ist eine bedeutende Funktion von Regenwäldern im Ökosystem?',
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
      { text: 'Öl- und Gasunternehmen, die Waldflächen für die Exploration nutzen', correct: false },
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
  }
];

const questionsHard = [
  {
    question:
      'Hard',
    answers: [
      { text: 'Etwa 5%', correct: true },
      { text: 'Etwa 10%', correct: false },
      { text: 'Etwa 15%', correct: false },
      { text: 'Etwa 20%', correct: false },
    ],
  },
  {
    question: 'Welcher Teil der Welt ist am meisten von der Rodung des Urwalds betroffen?',
    answers: [
      { text: 'Nordamerika', correct: true },
      { text: 'Europa', correct: false },
      { text: 'Südamerika', correct: false },
      { text: 'Afrika', correct: false },
    ],
  },
  {
    question:
      'Welches Land beheimatet den größten Teil des Amazonas-Regenwaldes?',
    answers: [
      { text: 'Brasilien', correct: true },
      { text: 'Australien', correct: false },
      { text: 'Kanada', correct: false },
      { text: 'Russland', correct: false },
    ],
  },
  {
    question:
      'Was ist eine bedeutende Funktion von Regenwäldern im Ökosystem?',
    answers: [
      { text: 'Kühlen der Atmosphäre', correct: true },
      { text: 'Verschmutzung des Wassers', correct: false },
      { text: 'Reduzierung des Sauerstoffgehalts', correct: false },
      { text: 'Erhöhung der Wüstenbildung', correct: false },
    ],
  },
  {
    question:
      'Wie viel Prozent der weltweiten Artenvielfalt gehen jedes Jahr durch die Rodung des Urwalds ',
    answers: [
      { text: 'Etwa 5%', correct: true },
      { text: 'Etwa 10%', correct: false },
      { text: 'Etwa 15%', correct: false },
      { text: 'Etwa 20%', correct: false },
    ],
  },
];

const quizLenghts = [4, 7, 10]; // Number of questions in each level of difficulty 

//Array of all Difficulties
const selectedDifficultyArray = [questionsEasy, questionsMedium, questionsHard]

function Quiz(difficulty) {
  //Grab difficulty 
  selectedDifficulty = difficulty
  //Reset Game State
  resetState();
  currentQuestionIndex = 0;
  score = 0;
  ShowQuestions();
}

function ShowQuestions() {
  // Grab Question/Answer preset
  let currentQuestion = selectedDifficultyArray[selectedDifficulty][currentQuestionIndex];
  let numQuestion = currentQuestionIndex + 1;
  //Display Question
  questionText.innerHTML = `${numQuestion}. ${selectedDifficultyArray[selectedDifficulty][currentQuestionIndex].question}`;
  console.log('triggered');

  // Create Answer Buttons using a loop thats going through the answers Array
  currentQuestion.answers.forEach((answer) => {
    const submitButtonAnswer = document.createElement('button');
    submitButtonAnswer.innerHTML = answer.text;
    submitButtonAnswer.classList.add('answer-btn');
    answerContainer.appendChild(submitButtonAnswer);
  });
  SubmitAnswer();
  CheckForEndGame()
}

document.getElementById('next_btn').addEventListener('click', () => {
  if(!CheckForEndGame() && clickedAnswers == 1){
  //Delete the Answers from previous Question
  resetState();
  //Load new Answers + Question
  currentQuestionIndex++;
  //Show new Questions
  ShowQuestions();
  //Check if end is reached
  }
  //Winning the Game
  else if(CheckForEndGame()){
    alert("Du hast Gewonnen")
    Quiz(0);
  }
  else{
    alert("Wähle zumindest eine Antwort aus!")

  }
});

function resetState() {
  //Delete all child Elements of Parent Container
  while (answerContainer.firstChild) {
    answerContainer.removeChild(answerContainer.firstChild);
  }
  //set clicks for answers to 0
  clickedAnswers = 0;
  console.log(`CounterReset: ${clickedAnswers}`);
}

function SubmitAnswer() {
  console.log(`Counter: ${clickedAnswers}`);
  let currentQuestionSet = selectedDifficultyArray[selectedDifficulty][currentQuestionIndex];
  for (let i = 0; i < answerContainer.children.length; i++) {
    answerContainer.children[i].addEventListener('click', () => {
      if (clickedAnswers < 1) {
        if (currentQuestionSet.answers[i].correct == true) {
          clickedAnswers++;
          score++;
          let correctChild = answerContainer.children[i];
          correctChild.style.backgroundColor = 'green';
          score_container.innerHTML = score;
        } else {
          clickedAnswers++;
          let wrongChild = answerContainer.children[i];
          wrongChild.style.backgroundColor = 'red';
          console.log(score);
        }
      }
    });
  }
}

function CheckForEndGame() {
  
    // console.log(`Questions:${selectedDifficultyArray[selectedDifficulty].length}`)
    if(currentQuestionIndex+1 == selectedDifficultyArray[selectedDifficulty].length){
      // alert("End")
      sbm_btn.innerHTML = "Finish"
      return true;
    }
    else{
      return false;
    }
}

document.querySelector("#easy_btn").addEventListener("click", ()=>{
  Quiz(0)
  sbm_btn.style.visibility = "visible"
  hr.style.visibility = "visible";
})

document.querySelector("#medium_btn").addEventListener("click", ()=>{
  Quiz(1)
  sbm_btn.style.visibility = "visible"
  hr.style.visibility = "visible";
})

document.querySelector("#hard_btn").addEventListener("click", ()=>{
  Quiz(2)
  sbm_btn.style.visibility = "visible"
  hr.style.visibility = "visible";
})



window.addEventListener('load', () => {
  //Start game
  sbm_btn.style.visibility = "hidden";
  hr.style.visibility = "hidden";

  //StartBackgroundMusic
  backgroundMusic.play()
  backgroundMusic.volume = 0.2;
  backgroundMusic.loop = true;
});


