// index.js
function fetchRecipes() {
  return fetch('http://localhost:3000/recipe/recipes')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
}

function displayRecipeButtons(recipes) {
  const buttonsContainer = document.getElementById('recipeButtons');
  buttonsContainer.innerHTML = '';

  recipes.forEach(recipe => {
    const button = document.createElement('button');
    button.textContent = recipe.title;

    button.addEventListener('click', () => displayRecipeDetails(recipe));

    buttonsContainer.appendChild(button);
  });
}

function displayRecipeDetails(recipe) {
  const detailsContainer = document.getElementById('resultContainer');
  detailsContainer.innerHTML = '';

  // Create a heading for the recipe title
  const titleHeading = document.createElement('h2');
  titleHeading.textContent = recipe.title;
  detailsContainer.appendChild(titleHeading);

  // Create a list for instructions
  const instructionsList = document.createElement('ul');

  // Split instructions string into an array of steps
  const instructionSteps = recipe.instructions.split('\n');

  // Iterate over each step and create a list item
  instructionSteps.forEach(step => {
    const listItem = document.createElement('li');
    listItem.textContent = step.trim(); // Trim to remove any leading/trailing spaces
    instructionsList.appendChild(listItem);
  });

  // Append the instructions list to the details container
  detailsContainer.appendChild(instructionsList);

  // Create a list for ingredients
  const ingredientsList = document.createElement('ul');

  // Iterate over each ingredient and create a list item
  recipe.ingredients.forEach(ingredient => {
    const listItem = document.createElement('li');
    listItem.textContent = ingredient.trim(); // Trim to remove any leading/trailing spaces
    ingredientsList.appendChild(listItem);
  });

  // Append the ingredients list to the details container
  detailsContainer.appendChild(ingredientsList);
}

document.getElementById('fetchButton').addEventListener('click', function () {
  fetchRecipes()
    .then(recipes => {
      displayRecipeButtons(recipes);
    })
    .catch(error => {
      console.error('Error in fetchRecipes:', error);
      document.getElementById('resultContainer').textContent = 'Error fetching recipes: ' + error.message;
    });
});
