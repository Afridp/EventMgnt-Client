import { useState } from "react";

// eslint-disable-next-line react/prop-types
function Pagination({ datasPerPage, totalData, paginate }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(Math.ceil(totalData / datasPerPage));

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const prev = () => {
    if (currentPage > 1) {
      paginate((prev) => prev - 1);
      setCurrentPage((prev) => prev - 1);
    }
  };

  const next = () => {
    if (currentPage < totalPages) {
      paginate((prev) => prev + 1);
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div>
      <ol className="flex justify-center gap-1 text-xs font-medium">
        {pageNumbers[currentPage - 1] === 1 ? (
          <></>
        ) : (
          <li>
            <a
              href="#"
              className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-400 bg-white text-gray-900 rtl:rotate-180"
              onClick={prev}
            >
              <span className="sr-only">Prev Page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </li>
        )}

        <li>
          <a
            href="#"
            className={`block h-8 w-8 rounded border border-gray-100 bg-red-800 text-center leading-8 text-white `}
          >
            {pageNumbers[currentPage - 1]}
          </a>
        </li>
        {pageNumbers[currentPage - 1] === totalPages ? (
          <></>
        ) : (
          <li>
            <a
              href="#"
              className="inline-flex h-8 w-8 items-center  justify-center rounded border border-gray-400 bg-white text-gray-900 rtl:rotate-180"
              onClick={next}
            >
              <span className="sr-only">Next Page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </li>
        )}
      </ol>
    </div>
  );
}

export default Pagination;
