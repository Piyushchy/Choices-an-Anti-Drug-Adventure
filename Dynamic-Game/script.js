var choice;
var stageCounter = 1;
var isLoading = true;
var tempStory = "";

const storyElement = document.querySelector(".story-text");
const choice1Element = document.getElementById("option1");
const choice2Element = document.getElementById("option2");

var userInput;

updateStory(1);

function updateStory(choice) {
  toggleLoading();
  console.log("choice: ", choice);
  console.log("stageCounter: ", stageCounter);
  if (stageCounter == 1) {
    userInput =
      "You have to make a 4 stage story game, with 2 choices at the end of each stage first choice will be bad choice and second choice will be good choice, a story inside a particular stage should at least have 70 words and choices have 11 words, The topic of the Game is Anti-Drug Awareness you will tell stories about people addicted to drugs or people who are not but helping the addicts, also you can use different types of ways or factor a person can get addicted to drugs. I have given a sample response, give a same response with your storyonly for 1 stage Sample Response: Story: In a small town, Jake discovers a mysterious package on his doorstep. Unbeknownst to him, it contains a potent new street drug. As temptation takes hold, Jake faces the decision to either try the drug, lured by the promise of escape, or seek guidance from his supportive friends at the community center. Choice 1: Emma gives in to peer pressure, risking her well-being for a shortcut. Choice 2: She rejects the temptation, choosing to explore alternative creative outlets.";
    generate();
    stageCounter++;
  } else if (stageCounter > 1 && stageCounter < 5) {
    userInput =
      "You have to make a 4 stage story game, with 2 choices at the end of each stage first choice will be bad choice and second choice will be good choice, a story inside a particular stage should at least have 70 words and choices have 11 words, The topic of the Game is Anti-Drug Awareness you will tell stories about people addicted to drugs or people who are not but helping the addicts, also you can use different types of ways or factor a person can get addicted to drugs. I have given a sample response, give a same response with your storyonly for 1 stage, this is story for stage " +
      (stageCounter - 1) +
      " Generate a story for stage " +
      stageCounter +
      " sample story of stage " +
      (stageCounter - 1) +
      tempStory +
      " user selected choice " +
      choice +
      " for stage " +
      (stageCounter - 1);
    generate();
    stageCounter++;
  }
}

async function generate() {
  try {
    const response = await sendUserInput(userInput);
    storyElement.innerHTML = formatStoryString(response);
    toggleLoading();
  } catch (error) {
    console.error(error);
    console.log("Error:", error);
    toggleLoading();
  }
}

async function sendUserInput(userInput) {
  const response = await fetch(
    "https://ubiquitous-sprinkles-b6020b.netlify.app/api/story",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput }),
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const responseBody = await response.json();
  return responseBody.response;
}

function toggleLoading() {
  console.log("Loading");
  const loadingElement = document.querySelector(".loading-screen");

  if (isLoading) {
    console.log("showing loading");
    loadingElement.style.display = "flex";
    isLoading = false;
  } else {
    console.log("hiding loading");
    loadingElement.style.display = "none";
    // make scroll smooth and take 0.5s
    window.scrollTo({ top: 100, behavior: "smooth" });
    isLoading = true;
  }
}

function formatStoryString(inputString) {
  tempStory = inputString;
  // Add <br> before "Story:"
  inputString = inputString.replace(/Story:/g, "");

  // Find "Choice 1:" and extract content until the next ". Choice 2:" or end of string
  var choice1Match = inputString.match(/Choice 1:(.*)/);
  var choice1Content = choice1Match ? choice1Match[1].trim() : null;

  // Find "Choice 2:" and extract content until the end of the string
  var choice2Match = inputString.match(/Choice 2:(.*)/);
  var choice2Content = choice2Match ? choice2Match[1].trim() : null;

  if (
    choice1Content == null ||
    choice1Content == undefined ||
    choice1Content == ""
  ) {
    choice1Content = "Choice 1";
  }
  if (
    choice2Content == null ||
    choice2Content == undefined ||
    choice2Content == ""
  ) {
    choice2Content = "Choice 2";
  }

  inputString = inputString.replace(/Choice 1:.*/g, "");
  inputString = inputString.replace(/Choice 2:.*/g, "");

  choice1Element.innerHTML = choice1Content;
  choice2Element.innerHTML = choice2Content;
  return inputString;
}

//  Nav bar Scroll
const nav = document.querySelector("nav");

let lastScrollPos = 0;
window.addEventListener("scroll", function () {
  const currentScrollPos = window.scrollY;

  if (currentScrollPos > lastScrollPos) {
    // Scrolling down
    nav.style.top = "-50%";
  } else {
    // Scrolling up
    nav.style.top = "0";
  }
  lastScrollPos = currentScrollPos;
});

//  Mobile Menu
const mobileMenu = document.querySelector(".menu-overlay");
const menuButton = document.querySelector(".hamburger-menu");

let isMenuOpen = false;

function showMenu() {
  isMenuOpen = true;
  mobileMenu.style.right = "0";
  menuButton.style.backgroundImage = "url(/assets/cross-icon.png)";
}

function hideMenu() {
  isMenuOpen = false;
  mobileMenu.style.right = "-100%";
  menuButton.style.backgroundImage = "url(/assets/menu-icon.png)";
}

function toggleMenu() {
  if (!isMenuOpen) {
    showMenu();
    console.log("Showing menu");
  } else {
    hideMenu();
    console.log("Hiding menu");
    isDropdownOpen = true;
    dropDown();
  }
}

// dropdown
var isDropdownOpen = false;
function dropDown() {
  const dropdownContent = document.querySelector(".dropdown-content");
  const dropdownIcon = document.querySelector(".dropdown img");
  const mobileDropdownContent = document.querySelector(
    ".mobile-dropdown-content"
  );
  const mobileDropdownIcon = document.querySelector(".mobile-dropdown img");

  if (!isDropdownOpen) {
    dropdownContent.style.display = "flex";
    dropdownIcon.style.transform = "rotate(180deg)";
    mobileDropdownContent.style.display = "flex";
    mobileDropdownIcon.style.transform = "rotate(180deg)";
    console.log("showing dropdown");
    isDropdownOpen = true;
    setTimeout(() => {
      // if mouse is not hovering over the dropdown hide the dropdown
      dropdownContent.addEventListener("mouseleave", () => {
        dropdownContent.style.display = "none";
        dropdownIcon.style.transform = "rotate(0deg)";
        isDropdownOpen = false;
      });
    }, 1000);
  } else {
    dropdownContent.style.display = "none";
    dropdownIcon.style.transform = "rotate(0deg)";
    mobileDropdownContent.style.display = "none";
    mobileDropdownIcon.style.transform = "rotate(0deg)";
    console.log("hiding dropdown");
    isDropdownOpen = false;
  }
}
