import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

//For Polyfiling
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';

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

    //1. Update bookmarks view
    bookmarksView.update(model.state.bookmarks);

    // 2. Loading recipe
    await model.loadRecipe(id);

    // 3. Rendering recipe
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

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    //0. Show loading spinner
    addRecipeView.renderSpinner();

    //1. Upload recipe data
    await model.uploadRecipe(newRecipe);

    //2. Render recipe
    recipeView.render(model.state.recipe);

    //3. Display success message
    addRecipeView.renderMessage();

    //4.Render Bookmarks view
    bookmarksView.render(model.state.bookmarks);

    //5. Change ID in URL
    //Change URL without reloading the page
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //6.Close recipe editor view
    setTimeout(() => {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (error) {
    addRecipeView.renderError(error);
  }
};

/**
 * Publisher-Subscriber pattern
 */
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
