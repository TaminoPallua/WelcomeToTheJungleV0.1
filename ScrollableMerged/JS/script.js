// CODE SNIPPET

//-------------------- BLOCK DEFAULT EVENT ----------------------------//
window.addEventListener(
  'wheel',
  (event) => {
    event.preventDefault(); // Unterdrückt das Scrollen der Webseite
  },
  { passive: false },
); // Option, um das Standardverhalten zu verhindern

//-------------------- VEHICLE VARIABLES ----------------------------//
const vehicle = document.getElementById('vehicle'); // Fahrzeug holen
let positionX;
let isMoving = false;
let firstTurned = false; // Schauen ob das Fahrzeug gedreht ist
const screenWidth = window.innerWidth; // Bildschirmbreite holen
let endNotReached = true; // Schauen ob der Bagger das Ende erreicht hat
let turned = false;
let level = 0; // Aktuelle Ebene
let levelGlobal;
let vehicleWidth = vehicle.width;
if (levelGlobal == undefined) {
  // Wenn noch kein Event zum erhöhen des Levels getriggerd wurde befindet sich der Bagger auf Level 0 der Starterebene
  levelGlobal = 0;
}
const ebenen = 4; // Gesamtanzahl Ebenen
const numberOfWindowHeigths = 2; // Anzahl der Fensterhöhen
const levelHeight = 100 / ebenen; // Höhe jeder Ebene in vh (Viewport Height), für 4 Ebenen

//-------------------- MISSION TERMINAL VARIABLES ----------------------------//

//Event Listener check variable
let isEventListenerAdded = false;

//Station 1 -- Erstes Minigame
let station1 = document.getElementById('Station_1');
var station1rect = station1.getBoundingClientRect();
let xCoordinateStation1 = station1rect.left;
// console.log(`X: ${xCoordinateVehicle}`);

// HiddenBox 1
let hiddenboxLevel1 = document.getElementById('hiddenBoxLevel1');

//Station 2 -- Zweites Minigame
let station2 = document.getElementById('Station_2');
var station2rect = station2.getBoundingClientRect();
let xCoordinateStation2 = station2rect.left;
// HiddenBox 2
let hiddenboxLevel2 = document.getElementById('hiddenBoxLevel2');

//Station 3 -- Drittes Minigame
let station3 = document.getElementById('Station_3');
var station3rect = station3.getBoundingClientRect();
let xCoordinateStation3 = station3rect.left;
// HiddenBox 3
let hiddenboxLevel3 = document.getElementById('hiddenBoxLevel3');

//Station 4 -- Viertes Minigame
let station4 = document.getElementById('Station_4');
var station4rect = station4.getBoundingClientRect();
let xCoordinateStation4 = station4rect.left;
// HiddenBox 4
let hiddenboxLevel4 = document.getElementById('hiddenBoxLevel4');

//  //-------------------- Minigame starter Positions ----------------------------//

if (sessionStorage.getItem('globalPositionIndex') == 0) {
  //Startposition, wenn kein Terminal angesteuert wurde
  positionX = 50;
} else if (sessionStorage.getItem('globalPositionIndex') == 1) {
  // Setzten des Fahrzeuges auf der X-Achse basierend auf der Station wo das Fahrzeug war
  positionX = xCoordinateStation1;
} else if (sessionStorage.getItem('globalPositionIndex') == 2) {
  // Setzten des Fahrzeuges auf der X-Achse basierend auf der Station wo das Fahrzeug war
  positionX = xCoordinateStation2 + 100;
} else if (sessionStorage.getItem('globalPositionIndex') == 3) {
  // Setzten des Fahrzeuges auf der X-Achse basierend auf der Station wo das Fahrzeug war
  positionX = xCoordinateStation3;
} else if (sessionStorage.getItem('globalPositionIndex') == 4) {
  // Setzten des Fahrzeuges auf der X-Achse basierend auf der Station wo das Fahrzeug war
  positionX = xCoordinateStation4;
}

//  //-------------------- AUDIO VARIABLES ----------------------------//

// Set Engine sound to the default (change happens when the vehicle is switched)
var engineAudio = new Audio('/ScrollableMerged/audio/EngineSounds/EngineSound_jeep.mp3');

//Backgorund music
var level0Audio = new Audio('/ScrollableMerged/audio/BackgroundNoises/Level0Background.mp3');
var level1Audio = new Audio('/ScrollableMerged/audio/BackgroundNoises/Level1Background.mp3');
var level2Audio = new Audio('/ScrollableMerged/audio/BackgroundNoises/Level2Background.mp3');
var level3Audio = new Audio('/ScrollableMerged/audio/BackgroundNoises/Level3Background.mp3');
let isPLayingSound1 = false;
let isPLayingSound2 = false;
let isPLayingSound3 = false;
let isPLayingSound4 = false;

//AI Voices
var station1_AI_Voice = new Audio('/ScrollableMerged/audio/AI-Voices/Station1_KI_Voice.mp3');
var station2_AI_Voice = new Audio('/ScrollableMerged/audio/AI-Voices/Station2_KI_Voice.mp3');
var station3_AI_Voice = new Audio('/ScrollableMerged/audio/AI-Voices/Station3_KI_Voice.mp3');
var station4_AI_Voice = new Audio('/ScrollableMerged/audio/AI-Voices/Station4_KI_Voice.mp3');

//-------------------- MOUSE WHEEL EVENT ----------------------------//

document.addEventListener('wheel', (event) => {
  setTimeout(function () {
    sessionStorage.setItem('globalPositionIndex', 0);
  }, 100);
  console.log(positionX);
  //-------------------- VEHICLE MOVEMENT ----------------------------//

  let direction = event.deltaY > 0 ? 1 : -1; // Vorwärts oder rückwärts
  // Drehung des Fahrzeuges
  if (direction === 1) {
    // Wenn das Fahrzeug geradeaus fährt
    vehicle.style.transform = `translateX(${positionX}px) rotateX(0deg)`;
    if (firstTurned) {
      turned = false;
    }
  } else {
    // Wenn das Fahrzeug sich dreht -> 180 Grad drehung auf der X Achse
    vehicle.style.transform = `translateX(${positionX}px) scaleX(-1)`;
    if (firstTurned) {
      turned = true;
    }
  }

  // Bewegungsschritt (50 Pixel)
  if (turned) {
    positionX -= direction * 50; //Für die Fahrtrichtung
  } else {
    positionX += direction * 50; //Für die Fahrtrichtung
  }

  // Begrenzen Sie die Position auf den Bildschirmrand für die linke Seite auf dem ersten Level
  if (positionX < 0 && level === 0) {
    positionX = 0;
  } else if (positionX >= window.outerWidth - vehicleWidth && level == ebenen - 1) {
    // Stopp/Ende für das letzte Level
    positionX = window.outerWidth - vehicleWidth; // vehicleWidth => Fahrzeugbreite
  } else if (positionX + vehicleWidth + 20 < 0 && level !== 0) {
    // Verhindern das man außerhalb des linken randes ist
    positionX = screenWidth;
    level -= 1;
    levelGlobal = level;

    //Verschieben des Fahrzeuges auf der Y Achse
    if (level == 1) {
      // Ausnahme bei level 1 aufgrund von unterschiedlichen Bodenhöhen
      vehicle.style.top = `${numberOfWindowHeigths * level * levelHeight + 6.5}vh`;
    } else if (level == 2) {
      // Ausnahme bei level 2 aufgrund von unterschiedlichen Bodenhöhen
      vehicle.style.top = `${numberOfWindowHeigths * level * levelHeight + 18}vh`;
    } else {
      vehicle.style.top = `${numberOfWindowHeigths * level * levelHeight}vh`;
    }

    // Raufscollen wenn man die 2 Ebene betreten möchte
    if (level == 1) {
      window.scrollBy(0, -window.innerHeight);
    }
  } else if (positionX > screenWidth + 200 && level !== ebenen - 1) {
    positionX = 0;
    level += 1;

    levelGlobal = level;

    if (level == 1) {
      // Ausnahme bei level 1 aufgrund von unterschiedlichen Bodenhöhen
      vehicle.style.top = `${numberOfWindowHeigths * level * levelHeight + 6.5}vh`;
    } else if (level == 2) {
      // Ausnahme bei level 2 aufgrund von unterschiedlichen Bodenhöhen
      vehicle.style.top = `${numberOfWindowHeigths * level * levelHeight + 18}vh`;
    } else {
      vehicle.style.top = `${numberOfWindowHeigths * level * levelHeight}vh`;
    }

    // Runterscollen wenn man die 3 Ebene betreten möchte
    if (level == 2) {
      window.scrollBy(0, window.innerHeight + 50);
    }
  }

  //Change vehicles depending on the layer
  if (level == 0) {
    //Change vehicle
    vehicle.src = '/ScrollableMerged/images/vehicles/Vehicle_jeep.png';
    //Change engineSound
    // engineAudio.src = '/ScrollableMerged/audio/EngineSounds/EngineSound_jeep.mp3';
  }
  if (level == 1) {
    //Change vehicle
    vehicle.src = '/ScrollableMerged/images/vehicles/Vehicle_bagger.png';
    //Change engineSound
    // engineAudio = new Audio('/ScrollableMerged/audio/EngineSounds/XXX_EngineSound.mp3');
  }
  if (level == 2) {
    //Change vehicle
    vehicle.src = '/ScrollableMerged/images/vehicles/Vehicle_truck.png';
    //Chnage size
    vehicle.style.width = '450px';
    // //Change engineSound
    // engineAudio = new Audio('/ScrollableMerged/audio/EngineSounds/XXX_EngineSound.mp3');
  }
  if (level == 3) {
    //Change vehicle
    // vehicle.src = '/ScrollableMerged/images/vehicles/Vehicle_XXX.png';
    // //Change engineSound
    // engineAudio = new Audio('/ScrollableMerged/audio/EngineSounds/XXX_EngineSound.mp3');
  }

  //-------------------- VEHICLE SOUNDS ----------------------------//

  if (isMoving && engineAudio.paused) {
    engineAudio.play();
    engineAudio.volume = 0.3;
    isEngineSoundPlaying = true;
  }

  // Wenn das Fahrzeug sich nicht bewegt und der Motorsound spielt
  if (!isMoving && !engineAudio.paused) {
    engineAudio.pause();
    isEngineSoundPlaying = false;
  }

  //-------------------- BACKGROUND NOISES ----------------------------//
  if (level == 0 && isPLayingSound1 == false) {
    //Zurücketzten der flags
    isPLayingSound1 = true;
    isPLayingSound2 = false;
    //Resetten der vorherigen Audios
    level1Audio.pause();
    level1Audio.currentTime = 0;
    //Audio abspielen
    level0Audio.play();
    level0Audio.volume = 0.2;
  }
  if (level == 1 && isPLayingSound2 == false) {
    //Zurücketzten der flags
    isPLayingSound2 = true;
    isPLayingSound1 = false;
    isPLayingSound3 = false;

    //Resetten der vorherigen Audios
    level0Audio.pause();
    level0Audio.currentTime = 0;
    level2Audio.pause();
    level2Audio.currentTime = 0;
    //Audio abspielen
    level1Audio.play();
    level1Audio.volume = 0.2;
  }
  if (level == 2 && isPLayingSound3 == false) {
    //Zurücketzten der flags
    isPLayingSound3 = true;
    isPLayingSound2 = false;
    isPLayingSound4 = false;

    //Resetten der vorherigen Audios
    level1Audio.pause();
    level1Audio.currentTime = 0;
    level3Audio.pause();
    level3Audio.currentTime = 0;
    //Audio abspielen
    level2Audio.play();
    level2Audio.volume = 0.2;
  }
  if (level == 3 && isPLayingSound4 == false) {
    //Zurücketzten der flags
    isPLayingSound4 = true;
    isPLayingSound3 = false;

    //Resetten der vorherigen Audios
    level2Audio.pause();
    level2Audio.currentTime = 0;
    //Audio abspielen
    level3Audio.play();
    level3Audio.volume = 0.2;
  }

  //-------------------- STATION VERLINKUNG ----------------------------//

  //Vehicle X-Koordinate
  let vehicleRect = vehicle.getBoundingClientRect();
  let xCoordinateVehicle = vehicleRect.left;

  //Scroll to top of the page before it reloads
  window.onbeforeunload = () => {
    window.scrollTo(0, 0);
  };

  //Station 1
  if (
    xCoordinateVehicle + 150 >= xCoordinateStation1 &&
    xCoordinateVehicle <= xCoordinateStation1 + vehicleWidth &&
    level == 0
  ) {
    //Add EventListener only one time
    if (!isEventListenerAdded) {
      window.addEventListener('keypress', FirstLevel);
      isEventListenerAdded = true;
    }
    //Unhide info box
    hiddenboxLevel1.style.display = 'block';
    //---Noises---//
    //Lower Background sounds
    level0Audio.volume = 0.1;
    engineAudio.volume = 0.015;

    //Start AI Voice
    station1_AI_Voice.play();
    station1_AI_Voice.volume = 0.7;
  } else if (level == 0) {
    //Remove EventListener
    if (isEventListenerAdded) {
      window.removeEventListener('keypress', FirstLevel);
      isEventListenerAdded = false;
    }
    hiddenboxLevel1.style.display = 'none';
    //Reset AI Voice
    station1_AI_Voice.pause();
    station1_AI_Voice.currentTime = 0;
    //Set volume of Background noises to default
    level0Audio.volume = 0.2;
    engineAudio.volume = 0.03;
  }

  //Station 2

  if (
    xCoordinateVehicle + 150 >= xCoordinateStation2 &&
    xCoordinateVehicle <= xCoordinateStation2 + vehicleWidth &&
    level == 1
  ) {
    //Unhide info box
    hiddenboxLevel2.style.display = 'block';
    //Add Event
    if (!isEventListenerAdded) {
      window.addEventListener('keypress', SecondLevel);
      isEventListenerAdded = true;
    }

    //---Noises---//
    //Lower Background sounds
    level1Audio.volume = 0.1;
    engineAudio.volume = 0.015;

    //Start AI Voice
    station2_AI_Voice.play();
    station2_AI_Voice.volume = 0.7;
  } else if (level == 1) {
    if (isEventListenerAdded) {
      window.removeEventListener('keypress', SecondLevel);
      isEventListenerAdded = false;
    }
    hiddenboxLevel2.style.display = 'none';
    //Reset AI Voice
    station2_AI_Voice.pause();
    station2_AI_Voice.currentTime = 0;
    //Set volume of Background noises to default
    level1Audio.volume = 0.2;
    engineAudio.volume = 0.03;
  }

  //Station 3
  if (
    xCoordinateVehicle + 150 >= xCoordinateStation3 &&
    xCoordinateVehicle <= xCoordinateStation3 + vehicleWidth &&
    level == 2
  ) {
    hiddenboxLevel3.style.display = 'block';
    // Add Event only one time
    if (!isEventListenerAdded) {
      window.addEventListener('keypress', ThirdLevel);
      isEventListenerAdded = true;
    }

    //---Noises---//
    //Lower Background sounds
    level2Audio.volume = 0.1;
    engineAudio.volume = 0.015;

    //Start AI Voice
    station3_AI_Voice.play();
    station3_AI_Voice.volume = 0.7;
  } else if (level == 2) {
    //Remove EventListener
    if (isEventListenerAdded) {
      window.removeEventListener('keypress', ThirdLevel);
      isEventListenerAdded = false;
    }
    hiddenboxLevel3.style.display = 'none';

    //Reset AI Voice
    station3_AI_Voice.pause();
    station3_AI_Voice.currentTime = 0;
    //Set volume of Background noises to default
    level2Audio.volume = 0.2;
    engineAudio.volume = 0.03;
  }

  //Station 4
  if (
    xCoordinateVehicle + 50 >= xCoordinateStation4 &&
    xCoordinateVehicle <= xCoordinateStation4 + vehicleWidth &&
    level == 3
  ) {
    hiddenboxLevel4.style.display = 'block';
    // Add Event only one time
    if (!isEventListenerAdded) {
      window.addEventListener('keypress', FourthLevel);
      isEventListenerAdded = true;
    }

    //---Noises---//
    //Lower Background sounds
    level3Audio.volume = 0.1;
    engineAudio.volume = 0.015;

    //Start AI Voice
    station4_AI_Voice.play();
    station4_AI_Voice.volume = 0.7;
  } else if (level == 3) {
    //Remove EventListener
    if (isEventListenerAdded) {
      window.removeEventListener('keypress', FourthLevel);
      isEventListenerAdded = false;
    }
    hiddenboxLevel4.style.display = 'none';

    //Reset AI Voice
    station4_AI_Voice.pause();
    station4_AI_Voice.currentTime = 0;

    //Set volume of Background noises to default
    level3Audio.volume = 0.2;
    engineAudio.volume = 0.3;
  }

  window.addEventListener('load', () => {
    if (locationChangeStaion1) {
      SetVehiclePos(globalPositionIndex);
    }
  });
});

//Funktionen für den Level wechsel
function FirstLevel(e) {
  if (e.key === 'Enter') {
    window.location = '/MemoryMerged/index.html';
  }
}
function SecondLevel(e) {
  if (e.key == 'Enter') {
    window.location = '/CrosswordMerged/index.html';
  }
}
function ThirdLevel(e) {
  if (e.key == 'Enter') {
    window.location = '/QuizGame_WTTJ/index.html';
  }
}
function FourthLevel(e) {
  if (e.key == 'Enter') {
    window.location = '/Jump_And_RunMerged/index.html';
  }
}

//Scroll to bottom when fullscreen is active to prevent the layers to merge

window.addEventListener('resize', function () {
  if (level > 1) {
    if (window.innerWidth === screen.width) {
      // Der Benutzer ist im Vollbildmodus
      window.scrollTo(0, document.body.scrollHeight);
    }
  }
});

window.addEventListener('load', () => {
  SetVehiclePos(sessionStorage.getItem('globalPositionIndex'));
});

// SetVehiclePos(1);

function SetVehiclePos(station) {
  if (station == 0) {
    vehicle.style.left = 0;
    vehicle.src = '/ScrollableMerged/images/vehicles/Vehicle_jeep.png';
    window.scrollTo(0, 0);
  }
  if (station == 1) {
    window.scrollTo(0, 0);
    // Set physical Postion of the vehicle according to the level and set the correct vehicle image
    level = 0;
    vehicle.src = '/ScrollableMerged/images/vehicles/Vehicle_jeep.png';
    vehicle.style.transform = `translateX(${xCoordinateStation1}px) rotateX(0deg)`;
  } else if (station == 2) {
    window.scrollTo(0, 0);
    vehicle.src = '/ScrollableMerged/images/vehicles/Vehicle_bagger.png';
    level = 1;
    vehicle.style.top = `${numberOfWindowHeigths * level * levelHeight + 6.5}vh`;
    vehicle.style.transform = `translateX(${xCoordinateStation2 + 100}px) rotateX(0deg)`;
  } else if (station == 3) {
    //Scroll down
    window.scrollBy(0, window.innerHeight + 50);
    vehicle.src = '/ScrollableMerged/images/vehicles/Vehicle_truck.png';
    level = 2;
    vehicle.style.top = `${numberOfWindowHeigths * level * levelHeight + 18}vh`;
    vehicle.style.transform = `translateX(${xCoordinateStation3}px) rotateX(0deg)`;
  } else if (station == 4) {
    // level = 3;
    // //Scroll down
    // window.scrollBy(0, window.innerHeight + 50);
    // vehicle.src = '/ScrollableMerged/images/vehicles/Vehicle_XXX.jpg';
    // level = 3;
    // vehicle.style.top = `${numberOfWindowHeigths * level * levelHeight}vh`;
    // vehicle.style.transform = `translateX(${xCoordinateStation4}px) rotateX(0deg)`;
  }
}
