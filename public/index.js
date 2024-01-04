let recipesLoaded = false;

    // Function to fetch all recipes
    function fetchRecipes() {
    const token = localStorage.getItem('token')
    const headers = new Headers({
        'Authorization': `Bearer ${token}`, // Replace 'Bearer ${token}' with your actual authorization token
        'Content-Type': 'application/json', // Adjust content type if needed
        });
      return fetch('http://localhost:3000/recipe/recipes', {
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
        'Authorization': `Bearer ${token}`, // Replace 'Bearer ${token}' with your actual authorization token
        'Content-Type': 'application/json', // Adjust content type if needed
        });
      return fetch('http://localhost:3000/recipe/recipes', {
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
      return fetch(`http://localhost:3000/recipe/recipes/${recipeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
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

    // Function to display recipes as buttons
    function displayRecipeButtons(recipes) {
      const buttonsContainer = document.getElementById('recipeButtons');
      buttonsContainer.style.display = 'block'; // Show the recipe buttons

  // Add title for the recipe page
  const titleElement = document.createElement('h2');
  titleElement.textContent = 'Here are some delicious recipes for you!';
  buttonsContainer.appendChild(titleElement);

      recipes.forEach(recipe => {
        const button = document.createElement('button');
        button.textContent = recipe.title;


        button.addEventListener('click', () => displayRecipeDetails(recipe));

        buttonsContainer.appendChild(button);
      });
    }

    // Function to display details of a specific recipe
    function displayRecipeDetails(recipe) {
      const detailsContainer = document.getElementById('recipeDetails');
      detailsContainer.innerHTML = `<h2>${recipe.title}</h2>
                                     <img src="${recipe.image}" alt="${recipe.title} Image" style="max-width: 100%;">
                                     <p><strong>Ingredients:</strong></p>
                                     <ul>${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}</ul>
                                     <p><strong>Instructions:</strong></p>
                                     <p>${recipe.instructions.replace(/\n/g, '<br>')}</p>`;

      // Show the navigation link
      document.getElementById('navigationLink').style.display = 'block';
      document.getElementById('welcomePage').style.display = 'none';
    }

    // Function to navigate to the recipes page
    function navigateToRecipes() {
      // Fetch recipes only if not loaded before
      if (!recipesLoaded) {
        fetchRecipes()
          .then(recipes => {
            // Display the recipes buttons
            displayRecipeButtons(recipes);
            recipesLoaded = true;
          })
          .catch(error => {
            console.error('Error fetching recipes:', error);
          });
      }

      // Hide the welcome page
      document.getElementById('welcomePage').style.display = 'none';
      document.getElementById('recipeButtons').style.display = 'block';
    }

    // Function to go back to the home page
    function goBackToWelcome() {
      // Hide the recipe details, navigation link, and Go Back button
      document.getElementById('recipeDetails').innerHTML = '';
      document.getElementById('navigationLink').style.display = 'none';

      // Show the welcome page
      document.getElementById('welcomePage').style.display = 'block';
      document.getElementById('recipeButtons').style.display = 'none';
    }