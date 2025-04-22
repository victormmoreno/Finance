const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center gap-4 mt-4">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Anterior
      </button>
      <span className="px-4 py-2">
        Página {currentPage} de {totalPages}
      </span>
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;
