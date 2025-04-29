import { useState } from 'react';

const useTable = (data) => {
  const [selectedRowIds, setSelectedRowIds] = useState([]);

  const toggleSelectAll = () => {
    if (selectedRowIds.length === data.length) {
      setSelectedRowIds([]);
    } else {
      setSelectedRowIds(data.map(row => row.id));
    }
  };

  const toggleSelectRow = (id) => {
    let newSelected;
    if (selectedRowIds.includes(id)) {
      newSelected = selectedRowIds.filter(rowId => rowId !== id);
    } else {
      newSelected = [...selectedRowIds, id];
    }
    setSelectedRowIds(newSelected);
  };

  const clearSelection = () => {
    setSelectedRowIds([]);
  };

  return {
    selectedRowIds,
    toggleSelectAll,
    toggleSelectRow,
    clearSelection,
  };
};

export default useTable;
