// recipe.js

// Function to format recipe details with bullet points
function formatRecipeDetails(recipe) {
    const formattedInstructions = recipe.instructions
      .split('\n')
      .map(step => `• ${step.trim()}`)
      .join('<br>');
  
    const formattedIngredients = recipe.ingredients
      .map(ingredient => `• ${ingredient.trim()}`)
      .join('<br>');
  
    return `<h2>${recipe.title}</h2>
            <p><strong>Ingredients:</strong><br>${formattedIngredients}</p>
            <p><strong>Instructions:</strong><br>${formattedInstructions}</p>`;
  }
  