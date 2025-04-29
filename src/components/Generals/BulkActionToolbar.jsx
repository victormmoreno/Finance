import React from 'react';
import { Button, Badge } from 'flowbite-react';
import moduleLabels from '../../constants/moduleLabels';

const BulkActionToolbar = ({ selectedCount, onDelete, moduleType }) => {
  if (selectedCount === 0) return null;

  const { singular, plural, gender } = moduleLabels[moduleType] || {};
  if (!singular || !plural || !gender) {
    // Predeterminado
    return (
      <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700 rounded mb-4">
        <Badge color="info">
          {selectedCount} registros {selectedCount > 1 ? 'seleccionados' : 'seleccionado'}
        </Badge>
        <Button color="red" className={`cursor-pointer`} onClick={onDelete}>
          Borrar seleccionados
        </Button>
      </div>
    );
  }

  // Determine the correct word for "seleccionado" based on gender and plural
  let selectionWord = 'seleccionado'; // default masculine singular
  if (gender === 'f') {
    selectionWord = selectedCount > 1 ? 'seleccionadas' : 'seleccionada';
  } else {
    selectionWord = selectedCount > 1 ? 'seleccionados' : 'seleccionado';
  }

  const itemName = selectedCount > 1 ? plural : singular;

  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700 rounded mb-4">
      <Badge color="info">
        {selectedCount} {itemName} {selectionWord}
      </Badge>
      <Button color="red" className={`cursor-pointer`} onClick={onDelete}>
        Borrar seleccionados
      </Button>
    </div>
  );
};

export default BulkActionToolbar;
