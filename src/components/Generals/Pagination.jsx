import { Button } from "flowbite-react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center gap-4 mt-4">
      <Button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        color='light'
        className="px-4 py-2 rounded-lg disabled:opacity-50 cursor-pointer"
      >
        Anterior
      </Button>
      <span className="px-4 py-2">
        Página {currentPage} de {totalPages}
      </span>
      <Button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        color='light'
        className="px-4 py-2 rounded-lg disabled:opacity-50 cursor-pointer"
      >
        Siguiente
      </Button>
    </div>
  );
};

export default Pagination;
