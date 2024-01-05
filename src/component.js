// // Component.js
// // import React, { useEffect, useState } from 'react';
// import axios from 'axios';


// const RecipeComponent = () => {
//   const [recipes, setRecipes] = useState([]);

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/recipes');
//         setRecipes(response.data);
//       } catch (error) {
//         console.error('Error fetching recipes:', error);
//       }
//     };

//     fetchRecipes();
//   }, []);

//   return (
//     <div>
//       <h1>Recipes</h1>
//       <ul>
//         {recipes.map((recipe) => (
//           <li key={recipe._id}>{recipe.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default RecipeComponent;

