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

// google sheet submission
const scriptURL =
  "https://script.google.com/macros/s/AKfycbwil5CZ_EMIdBuafVM7JFonoohOQ-6Om7U95dtCtSfjj8CpVKFtcwE3q5_noXWuWWAp/exec";
const form = document.getElementById("contact-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  showFullscreenMessage();

  // Create a new FormData object
  const formData = new FormData(form);

  // Get the value of the "Your-Name" input
  const yourName = document.querySelector('input[name="Your-Name"]').value;

  // Append the "Your-Name" to the form data
  formData.append("Your-Name", yourName);

  // Iterate through each rating container
  document
    .querySelectorAll(".rating-container")
    .forEach(function (ratingContainer) {
      // Get the selected star rating value within each container
      const starRating = ratingContainer.querySelector(
        'input[name^="stars"]:checked'
      ).value;

      // Append the star rating to the form data with a unique identifier
      formData.append(ratingContainer.id + "-starRating", starRating);

      console.log(`Rating for ${ratingContainer.id}: ${starRating}`);
    });

  // Get the value of the "Suggestions" textarea
  const suggestions = document.querySelector(
    'textarea[name="Suggestions"]'
  ).value;

  // Append the "Suggestions" to the form data
  formData.append("Suggestions", suggestions);

  // Log the entire form data
  for (let pair of formData.entries()) {
    console.log(pair[0] + ": " + pair[1]);
  }

  // Submit the form data
  fetch(scriptURL, { method: "POST", body: formData })
    .then((response) => response.json())
    .then((data) => {
      console.log("Thank you! Your form is submitted successfully.");
      // Reload the page after a short delay
    })
    .catch((error) => console.error("Error!", error.message));
});

//  show fullscreen message

const fullscreenMessage = document.querySelector(".fullscreen-msg");

function showFullscreenMessage() {
  fullscreenMessage.style.display = "block";
  setTimeout(() => {
    window.location.href = "/index.html";
  }, 10000);
}
