import {useTranslation} from "react-i18next";

export const Pagination = ({ currentPage, lastPage, onPageChange }) => {
  const { t } = /** @type {any} */ useTranslation('common');

  if (lastPage === 1) {
    return null;
  }
  const handleClick = (page) => {
    if (page >= 1 && page <= lastPage && page !== currentPage) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];

    for (let i = 1; i <= lastPage; i++) {
      pages.push(
        <li
          key={i}
          className={`page-item ${i === currentPage ? "active" : ""}`}
        >
          <a
            className="page-link"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleClick(i);
            }}
          >
            {i}
          </a>
        </li>
      );
    }

    return pages;
  };

  return (
    <div className="card-inner">
      <div className="nk-block-between-md g-3">
        <div className="g">
          <ul className="pagination justify-content-center justify-content-md-start">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <a
                className="page-link"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(currentPage - 1);
                }}
              >
                {t('PreviousPage')}
              </a>
            </li>

            {renderPageNumbers()}

            <li
              className={`page-item ${
                currentPage === lastPage ? "disabled" : ""
              }`}
            >
              <a
                className="page-link"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(currentPage + 1);
                }}
              >
                {t('NextPage')}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
