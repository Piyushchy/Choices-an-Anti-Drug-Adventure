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

function downloadCertificate() {
  const resultDiv = document.getElementById("result");
  const certificateImg = resultDiv.querySelector("img");

  if (!certificateImg) {
    console.error("Certificate image not found");
    return;
  }

  const canvas = document.createElement("canvas");
  canvas.width = certificateImg.width;
  canvas.height = certificateImg.height;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(certificateImg, 0, 0);

  const downloadLink = document.createElement("a");
  downloadLink.href = canvas.toDataURL("image/png");
  downloadLink.download = "Certificate.png";
  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);

  downloadLink.click();

  document.body.removeChild(downloadLink);
}

async function uploadToImgur(imageData) {
  const clientId = process.env.IMGUR_CLIENT_ID;

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
