import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';

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
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    //1. Get search query
    const query = searchView.getQuery();
    if (!query) return;

    //2. Load search
    await model.loadSearchResults(query);
    console.log(model.state.search.results);
    //3. Render results
  } catch (error) {
    console.error(error);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
