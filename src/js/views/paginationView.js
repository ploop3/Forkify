import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      // + to convert it to a number
      const gotoPage = +btn.dataset.goto;

      handler(gotoPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //Page 1, and there are other pages
    if (currentPage === 1 && numPages > 1)
      return this._generateMarkupPreview(currentPage + 1, 'next');

    //Last page
    if (currentPage === numPages && numPages > 1)
      return this._generateMarkupPreview(currentPage - 1, 'prev');

    //Other middle page
    if (currentPage < numPages) {
      return (
        this._generateMarkupPreview(currentPage - 1, 'prev') +
        this._generateMarkupPreview(currentPage + 1, 'next')
      );
    }

    //Page 1, and there NO other pages
    return '';
  }
  //Direction = 'prev' | 'next'
  _generateMarkupPreview(page, direction) {
    return `
    <button data-goto="${page}" class="btn--inline pagination__btn--${direction}">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-${
      direction === 'prev' ? 'left' : 'right'
    }"></use>
      </svg>
      <span>Page ${page}</span>
    </button>
    `;
  }
}

export default new PaginationView();
