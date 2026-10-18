// 1. Show a greeting based on the time of day
const hour = new Date().getHours();
let message;

if (hour < 12) {
  message = "Good morning! ☀️";
} else if (hour < 18) {
  message = "Good afternoon! 🌤️";
} else {
  message = "Good evening! 🌙";
}

document.getElementById("greeting").textContent = message;

// 2. Switch between light and dark mode
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeBtn.textContent = "Light mode";
  } else {
    themeBtn.textContent = "Dark mode";
  }
});

// 3. Switch the picture between my two interests
const interestImg = document.getElementById("interestImg");
const imageBtn = document.getElementById("imageBtn");

imageBtn.addEventListener("click", function () {
  if (interestImg.getAttribute("src") === "images/rubic.png") {
    interestImg.src = "images/cooking.jpg";
    interestImg.alt = "Cooking";
    imageBtn.textContent = "Show Rubik's Cube";
  } else {
    interestImg.src = "images/rubic.png";
    interestImg.alt = "Rubik's Cube";
    imageBtn.textContent = "Show cooking";
  }
});
