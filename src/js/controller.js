import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';

//For Polyfiling
import 'core-js/stable';
import 'regenerator-runtime/runtime';

//Parcel Hot module reloading
if (module.hot) {
  module.hot.accept();
}

/**
 * Loading a recipe from the API
 */
const controlRecipes = async function () {
  try {
    //Get the recipe hash ID from the URL
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    //0. Update results view to highlight selected search result
    // if it is the same as the currently loaded hash
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

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
    resultsView.renderSpinner();

    //1. Get search query
    const query = searchView.getQuery();
    if (!query) return;

    //2. Load search
    await model.loadSearchResults(query);

    //3. Render results
    resultsView.render(model.getSearchResultsPage(), true);

    //4. Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (error) {
    console.error(error);
  }
};

const controlPagination = function (gotoPage) {
  //1. Render NEW results
  resultsView.render(model.getSearchResultsPage(gotoPage));

  //2. Render NEW pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //1. Update the recipe servings (in state)
  model.updateServings(newServings);
  //2. Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1. Add/remove bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }

  //2. Update reicpe view
  recipeView.update(model.state.recipe);

  //3. Render bookmarks view
  bookmarksView.render(model.state.bookmarks);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
