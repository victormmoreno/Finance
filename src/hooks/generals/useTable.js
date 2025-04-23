import { useState } from 'react';
  
const useTable = (data, onSelectionChange) => {
  
  const [selectedRowIds, setSelectedRowIds] = useState([]);

  const toggleSelectAll = () => {
    if (selectedRowIds.length === data.length) {
      setSelectedRowIds([]);
      if (onSelectionChange) onSelectionChange([]);
    } else {
      const allIds = data.map(row => row.id);
      setSelectedRowIds(allIds);
      if (onSelectionChange) onSelectionChange(data);
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
    if (onSelectionChange) {
      const selectedRows = data.filter(row => newSelected.includes(row.id));
      onSelectionChange(selectedRows);
    }
  };

  return { 
    selectedRowIds, 
    toggleSelectAll, 
    toggleSelectRow 
  }

}
export default useTable;