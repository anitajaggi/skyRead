export const Pagination = ({
  page,
  currentPage,
  totalPages,
  loading,
  onPageChange,
}) => {
  return (
    <div className="flex justify-end items-center p-4">
      {/* Previous Button */}
      <button
        disabled={page === 1 || loading}
        onClick={() => onPageChange(page - 1)}
        className={`px-3 py-1 mr-2 rounded-full ${
          page === 1 || loading
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-red-600 text-white hover:bg-red-700"
        }`}
      >
        Prev
      </button>

      {/* Current Page Info */}
      <span className="mx-2 text-sm text-gray-700">
        Page {currentPage} of {totalPages}
      </span>

      {/* Next Button */}
      <button
        disabled={page === totalPages || loading}
        onClick={() => onPageChange(page + 1)}
        className={`px-3 py-1 ml-2 rounded-full ${
          page === totalPages || loading
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-red-600 text-white hover:bg-red-700"
        }`}
      >
        Next
      </button>
    </div>
  );
};
