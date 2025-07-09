export const Pagination = ({
  page,
  currentPage,
  totalPages,
  loading,
  onPageChange,
}) => {
  const isFirst = page === 1;
  const isLast = page === totalPages;

  return (
    <div className="flex justify-center items-center my-5 space-x-4">
      <button
        disabled={isFirst || loading}
        onClick={() => onPageChange(page - 1)}
        className={`px-5 py-2 text-sm font-medium rounded-full transition-colors duration-200 
          ${
            isFirst || loading
              ? "bg-indigo-100 text-indigo-300 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
      >
        Prev
      </button>

      <span className="text-sm font-semibold text-indigo-700">
        Page {currentPage} of {totalPages}
      </span>

      <button
        disabled={isLast || loading}
        onClick={() => onPageChange(page + 1)}
        className={`px-5 py-2 text-sm font-medium rounded-full transition-colors duration-200 
          ${
            isLast || loading
              ? "bg-indigo-100 text-indigo-300 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
      >
        Next
      </button>
    </div>
  );
};
