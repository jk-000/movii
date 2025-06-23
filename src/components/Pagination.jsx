const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  const maxPageButtons = 5;

  let startPage = Math.max(currentPage - 2, 1);
  let endPage = Math.min(currentPage + 2, totalPages);

  if (totalPages > maxPageButtons) {
    if (currentPage <= 3) {
      endPage = Math.min(maxPageButtons, totalPages);
    } else if (currentPage + 2 >= totalPages) {
      startPage = Math.max(totalPages - maxPageButtons + 1, 1);
    }
  }

  if (startPage > 1) pages.push(1);
  if (startPage > 2) pages.push("...");

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (endPage < totalPages - 1) pages.push("...");
  if (endPage < totalPages) pages.push(totalPages);

  return (
    <div className="flex flex-wrap justify-center mt-8 gap-2">
      {/* Left Arrow */}
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="px-4 py-2 rounded-md text-sm font-medium border bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
        >
          &lt;
        </button>
      )}

      {/* Page Buttons */}
      {pages.map((page, index) =>
        page === "..." ? (
          <span
            key={index}
            className="px-4 py-2 text-sm font-medium text-gray-500"
          >
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 rounded-md text-sm font-medium border ${
              currentPage === page
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-800 border-gray-300 hover:bg-blue-100 hover:text-blue-700 cursor-pointer"
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* Right Arrow */}
      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="px-4 py-2 rounded-md text-sm font-medium border bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
        >
          &gt;
        </button>
      )}
    </div>
  );
};

export default Pagination;
