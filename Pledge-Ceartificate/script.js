var globalImgUrl = "";

var certificateUrl = "";
var formatedCertificateurl = "";
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

function comingSoon(a) {
  a.textContent = "Coming Soon!";
  setTimeout(() => {
    a.textContent = "Ai Counselling";
  }, 1000);
}

// Ceaftificate generator
let antiDrugConsent = false;

const buttonHover = document.querySelector(".button-hovered");

function toggleConsent() {
  antiDrugConsent = !antiDrugConsent;
  console.log(antiDrugConsent);
  if (antiDrugConsent) {
    const getcertificate = document.querySelector(".name-input-button");
    getcertificate.style.backgroundColor = "#0edf23";
    getcertificate.style.opacity = "1";
    getcertificate.style.cursor = "pointer";
  } else {
    const getcertificate = document.querySelector(".name-input-button");
    getcertificate.style.backgroundColor = "gray";
    getcertificate.style.opacity = "0.5";
    getcertificate.style.cursor = "not-allowed";
  }
}

function generateCertificate() {
  const name = document.getElementById("name-input").value;
  const resultDiv = document.getElementById("result");
  const tempImg = document.querySelector(".temp-img");

  if (!antiDrugConsent) {
    resultDiv.textContent =
      "Please give your consent, by clicking the checkbox";
    return;
  }

  if (name === "") {
    resultDiv.textContent = "Please enter your name";
    return;
  }

  tempImg.style.display = "none";

  const canvas = document.createElement("canvas");
  canvas.width = 1000;
  canvas.height = 1300;

  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.src = "assets/certificate.png";

  img.onload = async function () {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.font = "110px Cormorant Garamond";
    ctx.fontWeight = "bold";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(name, canvas.width / 2, 735);

    const imgURL = canvas.toDataURL("image/png");
    globalImgUrl = imgURL;
    setTimeout(() => {
      FormtCeartificateURL();
    }, 3000);

    const certificateImg = new Image();
    certificateImg.src = imgURL;
    resultDiv.innerHTML = "";
    resultDiv.appendChild(certificateImg);

    const uploadedImageUrl = await uploadToImgur(imgURL);

    if (uploadedImageUrl) {
      const certificateImg = new Image();
      certificateImg.src = uploadedImageUrl;
      resultDiv.innerHTML = "";
      resultDiv.appendChild(certificateImg);
    } else {
      console.error("Failed to upload image to Imgur");
    }
  };

  const shareContainer = document.querySelector(".share-container");
  shareContainer.style.display = "flex";
}

async function uploadToImgur(imageData) {
  const clientId = "d0e21d10d6a0ef5";

  try {
    const response = await fetch("https://api.imgur.com/3/image", {
      method: "POST",
      headers: {
        Authorization: `Client-ID ${clientId}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: imageData.split(",")[1], // Extracting base64 data from the data URL
      }),
    });

    const data = await response.json();

    if (data.success) {
      const imageUrl = data.data.link;
      console.log("Image uploaded to Imgur:", imageUrl);
      certificateUrl = imageUrl;
      return imageUrl;
    } else {
      console.error("Imgur upload failed:", data.data.error);
      return null;
    }
  } catch (error) {
    console.error("Error uploading to Imgur:", error.message);
    return null;
  }
}

function downloadCertificate() {
  const link = document.createElement("a");
  link.download = "certificate.png";
  link.href = globalImgUrl;
  link.click();
}

function FormtCeartificateURL() {
  var temp = certificateUrl;
  // remove last 4 characters from the string
  temp = temp.slice(0, -4);
  // extract last 7 characters from the string
  temp = temp.slice(-7);
  console.log("temp: ", temp);

  formatedCertificateurl = "https://imgur.com/" + temp;

  console.log("formatedCertificateurl: ", formatedCertificateurl);
}

function whatsappShare() {
  // Check if the formatted Imgur URL is available
  if (formatedCertificateurl) {
    const url = `https://api.whatsapp.com/send?text=Just Became a part of the Anti Drug Movement here is my certificate 📜: ${formatedCertificateurl}%0AExperience the project and stand against drug addiction on: sudo-choices.vercel.app`;
    window.open(url, "_blank");
  } else {
    // If the formatted Imgur URL is not available, use the project link without the certificate
    const url = `https://api.whatsapp.com/send?text=Experience the project and stand against drug addiction on: sudo-choices.vercel.app`;
    window.open(url, "_blank");
  }
}

function instagramShare() {
  // create a post on instagram

  // Check if the formatted Imgur URL is available
  if (formatedCertificateurl) {
    const url = `https://www.instagram.com/create/details/?source=instagram_web_create_flow&image_url=${formatedCertificateurl}&caption=Just Became a part of the Anti Drug Movement here is my certificate 📜%0AExperience the project and stand against drug addiction on: sudo-choices.vercel.app`;
    window.open(url, "_blank");
  } else {
    // If the formatted Imgur URL is not available, use the project link without the certificate
    const url = `https://www.instagram.com/create/details/?source=instagram_web_create_flow&caption=Experience the project and stand against drug addiction on: sudo-choices.vercel.app`;
    window.open(url, "_blank");
  }
}
