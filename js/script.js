// 1. Greeting based on the time of day
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

// 2. Live clock
const clock = document.getElementById("clock");

function updateClock() {
  clock.textContent = new Date().toLocaleTimeString();
}

updateClock();
setInterval(updateClock, 1000);

// 3. Dark mode using Bootstrap's built-in colour modes, remembered with localStorage
const themeBtn = document.getElementById("themeBtn");

function applyTheme(theme) {
  document.documentElement.setAttribute("data-bs-theme", theme);
  themeBtn.textContent = theme === "dark" ? "Light mode" : "Dark mode";
}

applyTheme(localStorage.getItem("theme") || "light");

themeBtn.addEventListener("click", function () {
  const current = document.documentElement.getAttribute("data-bs-theme");
  const newTheme = current === "dark" ? "light" : "dark";
  localStorage.setItem("theme", newTheme);
  applyTheme(newTheme);
});

// 4. Switch the picture between my two interests
const interests = [
  { src: "images/rubic.png", alt: "A collection of Rubik's Cubes", label: "Show Rubik's Cube" },
  { src: "images/cooking.jpg", alt: "Some of the food I have cooked", label: "Show cooking" }
];
let currentImage = 0;

const interestImg = document.getElementById("interestImg");
const imageBtn = document.getElementById("imageBtn");

imageBtn.addEventListener("click", function () {
  currentImage = (currentImage + 1) % interests.length;
  const next = (currentImage + 1) % interests.length;

  interestImg.src = interests[currentImage].src;
  interestImg.alt = interests[currentImage].alt;
  imageBtn.textContent = interests[next].label;
});

// 5. Random fun fact (never the same one twice in a row)
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

  do {
    randomIndex = Math.floor(Math.random() * facts.length);
  } while (randomIndex === lastIndex);

  lastIndex = randomIndex;
  factText.textContent = facts[randomIndex];
});

// 6. Recipe search form using TheMealDB API
const recipeForm = document.getElementById("recipeForm");
const ingredientInput = document.getElementById("ingredient");
const recipeStatus = document.getElementById("recipeStatus");
const recipeResults = document.getElementById("recipeResults");

// Builds one Bootstrap card for a meal.
// I create elements with textContent instead of innerHTML, which is safer for data from an API.
function createRecipeCard(meal) {
  const col = document.createElement("div");
  col.className = "col";

  const card = document.createElement("div");
  card.className = "card h-100";

  const img = document.createElement("img");
  img.src = meal.strMealThumb;
  img.alt = meal.strMeal;
  img.className = "card-img-top recipe-img";

  const body = document.createElement("div");
  body.className = "card-body";

  const title = document.createElement("h3");
  title.className = "h6 card-title";
  title.textContent = meal.strMeal;

  const link = document.createElement("a");
  link.href = "https://www.themealdb.com/meal/" + meal.idMeal;
  link.target = "_blank";
  link.className = "btn btn-sm btn-outline-primary";
  link.textContent = "View recipe";

  body.append(title, link);
  card.append(img, body);
  col.append(card);
  return col;
}

recipeForm.addEventListener("submit", async function (event) {
  event.preventDefault(); // stop the page from reloading

  const ingredient = ingredientInput.value.trim();
  if (ingredient === "") {
    recipeStatus.textContent = "Please enter an ingredient.";
    return;
  }

  recipeStatus.textContent = "Searching...";
  recipeResults.innerHTML = "";

  try {
    const url = "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + encodeURIComponent(ingredient);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    // The API returns { meals: null } when nothing matches
    if (!data.meals) {
      recipeStatus.textContent = `No recipes found for "${ingredient}". Try another ingredient.`;
      return;
    }

    const meals = data.meals.slice(0, 8); // show the first 8 results
    recipeStatus.textContent = `Showing ${meals.length} of ${data.meals.length} recipes with "${ingredient}".`;

    meals.forEach(function (meal) {
      recipeResults.append(createRecipeCard(meal));
    });
  } catch (error) {
    recipeStatus.textContent = "Sorry, recipes could not be loaded. Please try again.";
    console.error(error);
  }
});

// 7. Contact form with Bootstrap validation
const contactForm = document.getElementById("contactForm");
const contactSuccess = document.getElementById("contactSuccess");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!contactForm.checkValidity()) {
    contactForm.classList.add("was-validated"); // shows Bootstrap's red/green messages
    return;
  }

  // There is no server yet, so just thank the user
  const name = document.getElementById("name").value.trim();
  contactSuccess.textContent = `Thank you, ${name}! Your message has been received.`;
  contactSuccess.classList.remove("d-none");

  contactForm.reset();
  contactForm.classList.remove("was-validated");
});
