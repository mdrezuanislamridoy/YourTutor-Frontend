
export default function Pagination({
  totalPages,
  handlePageChange,
  pageNumber,
}: {
  totalPages: number;
  handlePageChange: (newPage: number) => void;
  pageNumber: number;
}) {
  return (
    <div>
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            onClick={() => handlePageChange(pageNumber - 1)}
            disabled={pageNumber === 1}
            className="px-5 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-700 font-medium">
            Page {pageNumber} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(pageNumber + 1)}
            disabled={pageNumber === totalPages}
            className="px-5 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
