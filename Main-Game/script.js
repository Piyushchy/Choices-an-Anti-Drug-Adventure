const dialogueBox = document.getElementById('dialogueBox');
const background = document.querySelector('.background');

let currentStoryIndex = 0;
const story = [
  "Once upon a time...",
  "In a land far, far away...",
  "You find yourself at a crossroad..."
  // Add more story lines
];

let currentCharacter = 0;
let isTyping = false;

updateDialogue();
updateBackground();

document.addEventListener('click', handleScreenClick);

function handleScreenClick(event) {
  if (isTyping) {
    // If typing is in progress, finish it instantly
    currentCharacter = story[currentStoryIndex].length;
  } else {
    const clickX = event.clientX;
    const halfScreenWidth = window.innerWidth / 2;

    if (clickX > halfScreenWidth) {
      // Clicked on the right half, move story forward
      currentStoryIndex = Math.min(currentStoryIndex + 1, story.length - 1);
    } else {
      // Clicked on the left half, go back in the story
      currentStoryIndex = Math.max(currentStoryIndex - 1, 0);
    }

    currentCharacter = 0;
    updateDialogue();
    updateBackground();
  }
}

function updateBackground() {
  background.style.backgroundImage = `url('assets/${currentStoryIndex}.png')`;
}

function updateDialogue() {
  isTyping = true;
  dialogueBox.textContent = ''; // Clear previous text

  function type() {
    dialogueBox.textContent += story[currentStoryIndex][currentCharacter];
    currentCharacter++;

    if (currentCharacter < story[currentStoryIndex].length) {
      setTimeout(type, 30); // Adjust typing speed here (in milliseconds)
    } else {
      isTyping = false;
    }
  }

  type();
}