import * as model from './model.js';
import recipeView from './views/recipeView.js';

//For Polyfiling
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

/**
 * Loading a recipe from the API
 */
const controlRecipes = async function () {
  try {
    //Get the recipe hash ID from the URL
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    // 1. Loading recipe
    await model.loadRecipe(id);

    // 2. Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    alert(error);
  }
};

/**
 * Each recipe has a hash ID.
 * This are the listener for loading the recipe on lod and ifthe hash change in the URL
 */

['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);

// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);
