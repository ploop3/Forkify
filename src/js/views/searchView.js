class SearchView {
  #partentEl = document.querySelector('.search');

  #clearInput() {
    this.#partentEl.querySelector('.search__field').value = '';
  }

  getQuery() {
    const query = this.#partentEl.querySelector('.search__field').value;
    this.#clearInput();
    return query;
  }

  /**
   * Listening for 'submit' event, whenever they click the search button or press Enter
   * When we submit a 'form' we first need to prevent the default action,
   * otherwise the page will reload
   */
  addHandlerSearch(handler) {
    this.#partentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
