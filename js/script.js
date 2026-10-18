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

// 2. Live clock that updates every second
const clock = document.getElementById("clock");

function updateClock() {
  clock.textContent = new Date().toLocaleTimeString();
}

updateClock();
setInterval(updateClock, 1000);

// 3. Dark mode that is remembered with localStorage
const themeBtn = document.getElementById("themeBtn");

function applyTheme(theme) {
  document.body.classList.toggle("dark", theme === "dark");
  themeBtn.textContent = theme === "dark" ? "Light mode" : "Dark mode";
}

applyTheme(localStorage.getItem("theme") || "light");

themeBtn.addEventListener("click", function () {
  const newTheme = document.body.classList.contains("dark") ? "light" : "dark";
  localStorage.setItem("theme", newTheme);
  applyTheme(newTheme);
});

// 4. Switch the picture between my two interests
const interests = [
  { src: "images/rubic.png", alt: "Rubik's Cube", label: "Show Rubik's Cube" },
  { src: "images/cooking.jpg", alt: "Cooking", label: "Show cooking" }
];
let current = 0;

const interestImg = document.getElementById("interestImg");
const imageBtn = document.getElementById("imageBtn");

imageBtn.addEventListener("click", function () {
  current = (current + 1) % interests.length;
  const next = (current + 1) % interests.length;

  interestImg.src = interests[current].src;
  interestImg.alt = interests[current].alt;
  imageBtn.textContent = interests[next].label;
});

// 5. Show a random fun fact from an array
const facts = [
  "A standard Rubik's Cube has over 43 quintillion possible positions.",
  "Any Rubik's Cube position can be solved in 20 moves or fewer.",
  "Cooking onions slowly turns their natural sugars sweet (caramelisation).",
  "Salt makes food taste less bitter and brings out other flavours."
];

const factBtn = document.getElementById("factBtn");
const factText = document.getElementById("fact");

let lastIndex = -1;

factBtn.addEventListener("click", function () {
  let randomIndex;

  // keep picking until we get a different fact from last time
  do {
    randomIndex = Math.floor(Math.random() * facts.length);
  } while (randomIndex === lastIndex);

  lastIndex = randomIndex;
  factText.textContent = facts[randomIndex];
});

// 6. Get a random recipe from TheMealDB API
const recipeBtn = document.getElementById("recipeBtn");
const recipeResult = document.getElementById("recipeResult");

async function getRandomRecipe() {
  recipeResult.textContent = "Loading recipe...";

  try {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const meal = data.meals[0]; // the API returns an array with one meal
    const link = meal.strSource || meal.strYoutube;

    recipeResult.innerHTML = `
      <h3>${meal.strMeal}</h3>
      <p><strong>Category:</strong> ${meal.strCategory} |
         <strong>Cuisine:</strong> ${meal.strArea}</p>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="300">
      ${link ? `<p><a href="${link}" target="_blank">View full recipe</a></p>` : ""}
    `;
  } catch (error) {
    recipeResult.textContent = "Sorry, the recipe could not be loaded. Please try again.";
    console.error(error);
  }
}

recipeBtn.addEventListener("click", getRandomRecipe);
