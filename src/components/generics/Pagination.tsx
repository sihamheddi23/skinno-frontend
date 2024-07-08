import React from "react";

type PaginationProps = {
  pages: number;
  current_page: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  pages,
  current_page,
  onPageChange,
}) => {
  // start: previous page, end: next page
  const threePages =
    current_page - 1 == 0
      ? [2, 3]
      : current_page < pages
      ? [current_page - 1, current_page, current_page + 1]
      : [current_page - 2, current_page - 1];

  return (
    <div className="flex justify-center gap-3 my-3">
      {current_page > 1 && (
        <button
          className="bg-gray-800 text-white px-3 py-1 rounded-full"
          onClick={() => onPageChange(current_page - 1)}
        >
          {"<<"} previous
        </button>
      )}
      <button
        className={
          current_page == 1
            ? "bg-violet-800 text-white px-3 py-1 rounded-full"
            : "bg-gray-800 text-white px-3 py-1 rounded-full"
        }
        onClick={() => onPageChange(1)}
      >
        1
      </button>
      {current_page > 2 && <p>...</p>}
      {threePages.map(
        (page) =>
          page != 1 &&
          page != pages && (
            <button
              onClick={() => onPageChange(page)}
              key={page}
              className={
                page === current_page
                  ? "bg-violet-800 text-white px-3 py-1 rounded-full"
                  : "bg-gray-800 text-white px-3 py-1 rounded-full"
              }
            >
              {page}
            </button>
          )
      )}
      {current_page < pages - 2 && <p>...</p>}
      <button
        className={
          current_page == pages
            ? "bg-violet-800 text-white px-3 py-1 rounded-full"
            : "bg-gray-800 text-white px-3 py-1 rounded-full"
        }
        onClick={() => onPageChange(pages)}
      >
        {pages}
      </button>

      {current_page < pages && (
        <button
          className="bg-gray-800 text-white px-3 py-1 rounded-full"
          onClick={() => onPageChange(current_page + 1)}
        >
          next {">>"}
        </button>
      )}
    </div>
  );
};

export default Pagination;
