import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again';
  _message = '';

  _generateMarkup() {
    //_data is an array with the search results (id, image, publisher, title)
    //Using .render only to return the string, without adding it to the DOM
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
