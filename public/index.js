let recipesLoaded = false;
let allRecipes = null;
let individualRecipe_Id = null;
const token = localStorage.getItem('token');

// Function to fetch all recipes
function fetchRecipes() {
  const token = localStorage.getItem('token');
  const headers = new Headers({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  });
  return fetch('https://backendbalkanrecipes-9d325c3004a0.herokuapp.com/recipe/recipes', {
    method: 'GET',
    headers: headers,
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
}

// Function to create a new recipe
function createRecipe(newRecipe) {
  const headers = new Headers({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  });
  return fetch('https://backendbalkanrecipes-9d325c3004a0.herokuapp.com/recipe/recipes', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(newRecipe),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
}








// Function to update a recipe
function updateRecipe(recipeId, updatedRecipe) {
  const headers = new Headers({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  });
  return fetch(`https://backendbalkanrecipes-9d325c3004a0.herokuapp.com/recipe/recipes/${individualRecipe_Id}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(updatedRecipe),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
}

function handleCreateRecipe() {
  const form = document.getElementById('createRecipeForm');
  const formData = new FormData(form);

  const newRecipe = {
      title: formData.get('title'),
      ingredients: formData.get('ingredients').split(',').map(ingredient => ingredient.trim()),
      instructions: formData.get('instructions'),
      image: formData.get('image'),
  };

  createRecipe(newRecipe)
      .then(createdRecipe => {
          console.log('Recipe created successfully:', createdRecipe);
          // Navigate back to the home page after creating a recipe
          window.location.href = '../index.html';
      })
      .catch(error => {
          console.error('Error creating recipe:', error);
      });
}


// Function to display recipes as buttons
function displayRecipeButtons(recipes) {
  const buttonsContainer = document.getElementById('recipeButtons');
  buttonsContainer.style.display = 'block';

  const titleElement = document.createElement('h2');
  titleElement.textContent = 'Here are some delicious recipes for you!';
  titleElement.style.color = 'white';
  titleElement.style.fontFamily = 'YourScriptFont, cursive';
  // Set the font size to a specific value, for example, '24px'
  titleElement.style.fontSize = '50px';
  buttonsContainer.appendChild(titleElement);

  recipes.forEach(recipe => {
    const button = document.createElement('button');
    button.textContent = recipe.title;

    button.addEventListener('click', () => displayRecipeDetails(recipe));

    buttonsContainer.appendChild(button);
  });

  // Show the create new recipe form
  const createRecipeFormContainer = document.getElementById('createRecipeFormContainer');
  createRecipeFormContainer.style.display = 'block';
}

// Function to display details of a specific recipe
function displayRecipeDetails(recipe) {
  updateRecipeForm(recipe.id, true);
  individualRecipe_Id = recipe._id;

  const detailsContainer = document.getElementById('recipeDetails');
  detailsContainer.innerHTML = `<h2>${recipe.title}</h2>
                                 <img src="${recipe.image}" alt="${recipe.title} Image" style="max-width: 100%;">
                                 <p><strong>Ingredients:</strong></p>
                                 <ul>${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}</ul>
                                 <p><strong>Instructions:</strong></p>
                                 <p>${recipe.instructions.replace(/\n/g, '<br>')}</p>`;

  document.getElementById('navigationLink').style.display = 'block';
  document.getElementById('welcomePage').style.display = 'none';

  const recipeID = document.createElement('');
  recipeID.textContent = recipe._id;
  detailsContainer.appendChild(recipeID);
  console.log(recipeID);
}

// Function to navigate to the recipes page
function navigateToRecipes() {
  if (!recipesLoaded) {
    fetchRecipes()
      .then(recipes => {
        console.log(recipes);
        displayRecipeButtons(recipes);
        recipesLoaded = true;
        allRecipes = recipes;
      })
      .catch(error => {
        console.error('Error fetching recipes:', error);
      });
  }

  document.getElementById('welcomePage').style.display = 'none';
  document.getElementById('recipeButtons').style.display = 'block';
}

// Function to go back to the home page
function goBackToWelcome() {
  document.getElementById('recipeDetails').innerHTML = '';
  document.getElementById('navigationLink').style.display = 'none';

  document.getElementById('welcomePage').style.display = 'block';
  document.getElementById('recipeButtons').style.display = 'none';

  updateRecipeForm(null, false);
}

// Function to create a form dynamically
function updateRecipeForm(recipeId, showForm) {
  const formContainer = document.getElementById('formContainer');
  formContainer.innerHTML = '';

  if (showForm) {
    const form = document.createElement('form');
    form.id = 'recipeForm';

    const ingredientsInput = createInputElement('text', 'ingredients', 'Edit Ingredients (comma-separated)');
    const instructionsInput = createInputElement('textarea', 'instructions', 'Edit Instructions');

    form.appendChild(ingredientsInput);
    form.appendChild(instructionsInput);

    const submitButton = document.createElement('button');
    submitButton.type = 'button';
    submitButton.textContent = 'Submit Edit';
    submitButton.addEventListener('click', () => handleFormSubmit(recipeId));

    form.appendChild(submitButton);

    formContainer.appendChild(form);
  }
}

// Helper function to create input elements
function createInputElement(type, name, placeholder) {
  const input = document.createElement('input');
  input.type = type;
  input.name = name;
  input.placeholder = placeholder;
  input.required = true;

  return input;
}

// Function to handle form submission
function handleFormSubmit(recipeId) {
  const form = document.getElementById('recipeForm');
  const formData = new FormData(form);
  console.log(allRecipes);

  const updatedRecipe = {
    ingredients: formData.get('ingredients').split(',').map(ingredient => ingredient.trim()),
    instructions: formData.get('instructions'),
  };

  updateRecipe(recipeId, updatedRecipe)
    .then(updatedRecipe => {
      console.log('Recipe updated successfully:', updatedRecipe);
    })
    .catch(error => {
      console.error('Error updating recipe:', error);
    });
}
function toggleCreateRecipeForm() {
  const createRecipeFormContainer = document.getElementById('createRecipeFormContainer');
  createRecipeFormContainer.style.display = createRecipeFormContainer.style.display === 'none' ? 'block' : 'none';
}