class SearchView {
  _partentEl = document.querySelector('.search');

  _clearInput() {
    this._partentEl.querySelector('.search__field').value = '';
  }

  getQuery() {
    const query = this._partentEl.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  /**
   * Listening for 'submit' event, whenever they click the search button or press Enter
   * When we submit a 'form' we first need to prevent the default action,
   * otherwise the page will reload
   */
  addHandlerSearch(handler) {
    this._partentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
