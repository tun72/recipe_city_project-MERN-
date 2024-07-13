import { Link } from "react-router-dom";

function Pagination({ pagination }) {
  // const { currentPage, pages, next, previous } = pagination === null;

  return (
    <>
      {pagination && (
        <div className="flex items-center justify-center px-4 py-3 sm:px-6 rounded-lg">
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm bg-white"
            aria-label="Pagination"
          >
            <Link
              to={
                pagination.previous
                  ? "/?page=" + (pagination.currentPage - 1)
                  : "/?page=" + pagination.currentPage
              }
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" />
              </svg>
            </Link>

            {pagination.pages.map((page) => {
              if (page == pagination.currentPage) {
                return (
                  <Link
                    key={page}
                    to={"/?page=" + page}
                    aria-current="page"
                    className="relative z-10 inline-flex items-center bg-orange-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                  >
                    {page}
                  </Link>
                );
              }
              return (
                <Link
                  key={page}
                  to={"/?page=" + page}
                  className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  {page}
                </Link>
              );
            })}

            <Link
              to={
                pagination.next
                  ? "/?page=" + (pagination.currentPage + 1)
                  : "/?page=" + pagination.currentPage
              }
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" />
              </svg>
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}

export default Pagination;
