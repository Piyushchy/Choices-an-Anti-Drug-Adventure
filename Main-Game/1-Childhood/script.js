const dialogueBox = document.getElementById("dialogueBox");
const background = document.querySelector(".background");
const rightHalf = document.querySelector(".right-half");
var choiceBox = document.querySelector(".choice-box");
var intro = document.querySelector(".intro");
const menuItems = document.querySelector(".menu-items");
localStorage.setItem("isStorytelling", true);

sharedIsStoryTelling = localStorage.getItem("isStorytelling");

console.log("sharedIsStoryTelling = " + sharedIsStoryTelling);

let isIntroShown = false;
let isMenuShown = false;

const imageUrls = [
  "assets/0.png",
  "assets/1.png",
  "assets/2.png",
  "assets/3.png",
  "assets/4.png",
  // Add more image URLs as needed
];

checkStoryTeller();

// Preload images
function preloadImages(urls) {
  const imagePromises = [];

  for (const url of urls) {
    const img = new Image();
    img.src = url;

    const promise = new Promise((resolve) => {
      img.onload = resolve;
    });

    imagePromises.push(promise);
  }

  return Promise.all(imagePromises);
}

preloadImages(imageUrls)
  .then(() => {
    console.log("All images are preloaded. Start your game here.");
    if (window.innerWidth > 760) {
      showIntro();
      setTimeout(showRightHalf, 5000);
    }
  })
  .catch((error) => {
    console.error("Image preload failed:", error);
  });

let currentStoryIndex = 0;
const story = [
  "Meet Raj, Raj is a bright and curious boy",
  "His playful days revolve around building sandcastles and catching fireflies",
  "One day... Raj finds his older brother, Ravi, acting strangely.",
  "Ravi’s once vibrant eyes are glazed over, and his playful laughter has been replaced by a vacant smile. ",
  "Ravi hides mysterious, colorful candies that seem to spark immense energy, followed by long periods of withdrawal and irritability.",
  "What should Raj do?",
  // Add more story lines
];

let currentCharacter = 0;
let isTyping = false;
let typingTimeout; // Store the typing timeout to be able to clear it

document.addEventListener("click", handleScreenClick);

const synth = window.speechSynthesis;

function handleScreenClick(event) {
  const clickedElement = event.target;

  if (
    !isIntroShown &&
    !clickedElement.closest(".mobile-popup") &&
    !clickedElement.closest(".menu-icon") &&
    !clickedElement.closest(".menu-items")
  ) {
    isIntroShown = true;
    hideIntro();
    hideRightHalf();
    hideMenu();
    speak(story[currentStoryIndex]);
    updateDialogue();
    updateBackground();
    return;
  }

  // Check if the clicked element or any of its ancestors is the .choice-box
  if (
    !clickedElement.closest(".choice-box") &&
    !clickedElement.closest(".mobile-popup") &&
    !clickedElement.closest(".menu-icon") &&
    !clickedElement.closest(".menu-items")
  ) {
    if (isTyping) {
      // If typing is in progress, finish it instantly
      clearTimeout(typingTimeout); // Clear the typing timeout
      currentCharacter = story[currentStoryIndex].length;
      dialogueBox.textContent = story[currentStoryIndex];
      isTyping = false;
    } else {
      const clickX = event.clientX;
      const halfScreenWidth = window.innerWidth / 2;

      if (clickX > halfScreenWidth) {
        // Clicked on the right half, move story forward
        currentStoryIndex = Math.min(currentStoryIndex + 1, story.length - 1);
        stopSpeaking();
        hideMenu();
        speak(story[currentStoryIndex]);
      } else {
        // Clicked on the left half, go back in the story
        currentStoryIndex = Math.max(currentStoryIndex - 1, 0);
        hideChoiceBox();
      }

      currentCharacter = 0;
      updateDialogue();
      updateBackground();

      if (currentStoryIndex === story.length - 1) {
        showChoiceBox();
      }
    }
  }
}

function speak(text) {
  if (!sharedIsStoryTelling || window.innerWidth < 760) return;
  const utterance = new SpeechSynthesisUtterance(text);

  // Get the list of available voices
  const voices = synth.getVoices();

  // Find a female voice with a pleasant tone (customize as needed)
  const femaleVoice = voices.find(voice => voice.name.includes('Female') && voice.lang.includes('en'));

  // Set the selected voice
  utterance.voice = femaleVoice || voices[0]; // Use the first available voice if a suitable female voice is not found

  // Additional voice settings (customize as needed)
  utterance.rate = 1.0; // Speech rate (adjust as needed)
  utterance.pitch = 1.0; // Speech pitch (adjust as needed)

  // Speak the text
  synth.speak(utterance);
}

function stopSpeaking() {
  synth.cancel();
}

function hideMenu() {
  menuItems.style.display = "none";
  isMenuShown = false;
}

function toggleMenu() {
  if (!isMenuShown) {
    menuItems.style.display = "flex";
    isMenuShown = true;
  } else {
    menuItems.style.display = "none";
    isMenuShown = false;
  }
}

function choiceMade(choice) {
  if (choice === 1) {
    window.location.href = "/Main-Game/2-Teenage/Negative/index.html";
  } else if (choice === 2) {
    window.location.href = "/Main-Game/2-Teenage/Positive/index.html";
  }
}

function checkStoryTeller() {
  const storyTeller = document.querySelector(".toggle-button-story");
  if (sharedIsStoryTelling) {
    storyTeller.textContent = "ON";
    storyTeller.style.backgroundColor = "green";
    sharedIsStoryTelling = true;
  } else {
    storyTeller.textContent = "OFF";
    storyTeller.style.backgroundColor = "transparent";
    sharedIsStoryTelling = false;
  }
}

function toggleStoryTeller() {
  const storyTeller = document.querySelector(".toggle-button-story");
  if (sharedIsStoryTelling) {
    sharedIsStoryTelling = false;
    localStorage.setItem("isStorytelling", sharedIsStoryTelling);
    console.log("Storytelling turned off");
    console.log("sharedIsStoryTelling = " + sharedIsStoryTelling);
    storyTeller.textContent = "OFF";
    storyTeller.style.backgroundColor = "transparent";
  } else {
    sharedIsStoryTelling = true;
    localStorage.setItem("isStorytelling", sharedIsStoryTelling);
    console.log("Storytelling turned on");
    console.log("sharedIsStoryTelling = " + sharedIsStoryTelling);
    storyTeller.textContent = "ON";
    storyTeller.style.backgroundColor = "green";
  }
}

function toggleFullScreen() {
  const fullscreen = document.querySelector(".toggle-button-fullscreen");
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    fullscreen.textContent = "ON";
    fullscreen.style.backgroundColor = "green";
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      fullscreen.textContent = "OFF";
      fullscreen.style.backgroundColor = "transparent";
    }
  }
}

function showChoiceBox() {
  choiceBox.style.display = "flex";
  choiceBox.style.visibility = "visible";
}

function hideChoiceBox() {
  choiceBox.style.display = "none";
  choiceBox.style.visibility = "hidden";
}

function hideDialogueBox() {
  dialogueBox.style.display = "none";
  dialogueBox.style.visibility = "hidden";
}

function showDialogueBox() {
  dialogueBox.style.display = "flex";
  dialogueBox.style.visibility = "visible";
}

function hideIntro() {
  intro.style.display = "none";
  intro.style.visibility = "hidden";
}

function showRightHalf() {
  rightHalf.style.display = "block";
  rightHalf.classList.add("blink");
}

function hideRightHalf() {
  rightHalf.style.display = "none";
  rightHalf.classList.remove("blink");
}

function showIntro() {
  intro.style.display = "flex";
  intro.style.visibility = "visible";
}

function updateBackground() {
  background.style.backgroundImage = `url('assets/${currentStoryIndex}.png')`;
}

function updateDialogue() {
  isTyping = true;
  dialogueBox.textContent = ""; // Clear previous text

  function type() {
    dialogueBox.textContent += story[currentStoryIndex][currentCharacter];
    currentCharacter++;

    if (currentCharacter < story[currentStoryIndex].length) {
      typingTimeout = setTimeout(type, 25); // Store the timeout for clearing later
    } else {
      isTyping = false;
    }
  }

  type();
}
