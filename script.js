document.addEventListener("DOMContentLoaded", function () {
  const tagLine = document.querySelector(".tag-line");
  const tagLineH1 = document.querySelector(".tag-line h1");
  const description = document.querySelector(".description");
  const video = document.getElementById("videoBackground");
  const nav = document.querySelector("nav");
  const rules = document.querySelector(".rules");
  const gameRedirectContainer = document.querySelector(
    ".game-redirect-container"
  );

  let isScrolled = false;
  let autoScrollCount = 0;

  // Pause the video at the start

  const targetId = "homeSection";
  const targetElement = document.getElementById(targetId);

  window.scrollTo({
    top: targetElement.offsetTop,
    behavior: "smooth",
  });

  video.addEventListener("timeupdate", function () {
    if (video.currentTime >= 0.9 * video.duration && autoScrollCount < 1) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      autoScrollCount++;
      console.log("Scrolling : Auto Scroll Count = " + autoScrollCount);
    }
  });

  let lastScrollPos = 0;

  // Smooth scroll functionality
  const scrollLinks = document.querySelectorAll('a[href^="#"]');

  scrollLinks.forEach((scrollLink) => {
    scrollLink.addEventListener("click", function (e) {
      e.preventDefault();

      isScrolled = true;

      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
    });
  });

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

    if (currentScrollPos === 0) {
      isScrolled = false;
    }

    // Automatically scroll down by 70px when the user scrolls a little bit greater than 0
    if (currentScrollPos > 0 && currentScrollPos <= 70) {
      if (isScrolled) return;
      const targetId = "homeSection";
      const targetElement = document.getElementById(targetId);

      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
      isScrolled = true;
    }

    // Adjust the pixel value as needed to control when the animation should trigger
    if (currentScrollPos > 0) {
      tagLine.style.padding = "50px 0px";
      tagLineH1.style.margin = "25px 30px";
      description.style.left = 0;
      description.style.marginTop = "20rem";
      description.style.opacity = 1;
      if (window.innerWidth > 850) {
        gameRedirectContainer.style.right = "20px";
        gameRedirectContainer.style.bottom = "10px";
        gameRedirectContainer.style.height = "30%";
        gameRedirectContainer.style.width = "25%";
        rules.style.display = "none";
        rules.style.opacity = 0;
      } else {
        if (autoScrollCount < 1) {
          setTimeout(() => {
            gameRedirectContainer.style.bottom = "-2%";
          }, 3000);
        } else {
          gameRedirectContainer.style.bottom = "-2%";
        }
      }
      // Start playing the video when scrolling
      if (video.paused) {
        video.play();
      }
    } else {
      tagLine.style.padding = "10px 0px";
      tagLineH1.style.margin = "0px 30px";
      description.style.marginTop = "17rem";
      if (window.innerWidth > 850) {
        gameRedirectContainer.style.bottom = "100px";
        gameRedirectContainer.style.transition = "all 0.5s ease-in-out";
        gameRedirectContainer.style.height = "70%";
        gameRedirectContainer.style.width = "40%";
        rules.style.display = "flex";
        rules.style.opacity = 1;
      } else {
        gameRedirectContainer.style.bottom = "7%";
      }
    }
  });
});

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

function comingSoon(a) {
  a.textContent = "Coming Soon!";
  setTimeout(() => {
    a.textContent = "Ai Counselling";
  }, 1000);
}
