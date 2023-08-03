import View from './View.js';
import previewView from './previewView.js';
import PreviewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
  _message = '';

  _generateMarkup() {
    //_data is an array with the bookmarks
    //Using .render only to return the string, without adding it to the DOM
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
