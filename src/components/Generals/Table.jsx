import React, { useState } from 'react';
import useTable from '../../hooks/generals/useTable';
import { Table as FlowbiteTable, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Checkbox } from 'flowbite-react';

const Table = ({ columns, data, renderRowActions, footer, bulkActionsEnabled = false, onSelectionChange }) => {


  const {
    selectedRowIds, 
    toggleSelectAll, 
    toggleSelectRow 
  } = useTable(data, onSelectionChange);
  // const [selectedRowIds, setSelectedRowIds] = useState([]);

  // const toggleSelectAll = () => {
  //   if (selectedRowIds.length === data.length) {
  //     setSelectedRowIds([]);
  //     if (onSelectionChange) onSelectionChange([]);
  //   } else {
  //     const allIds = data.map(row => row.id);
  //     setSelectedRowIds(allIds);
  //     if (onSelectionChange) onSelectionChange(data);
  //   }
  // };

  // const toggleSelectRow = (id) => {
  //   let newSelected;
  //   if (selectedRowIds.includes(id)) {
  //     newSelected = selectedRowIds.filter(rowId => rowId !== id);
  //   } else {
  //     newSelected = [...selectedRowIds, id];
  //   }
  //   setSelectedRowIds(newSelected);
  //   if (onSelectionChange) {
  //     const selectedRows = data.filter(row => newSelected.includes(row.id));
  //     onSelectionChange(selectedRows);
  //   }
  // };


  return (
    <>
      <FlowbiteTable className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <TableHead>
          <TableRow>
            {bulkActionsEnabled && (
              <TableHeadCell className="py-2">
                <Checkbox
                  checked={selectedRowIds.length === data.length && data.length > 0}
                  onChange={toggleSelectAll}
                  aria-label="Select all rows"
                />
              </TableHeadCell>
            )}
            {columns.map((col) => (
              <TableHeadCell key={col.key} scope="col" className="px-6 py-3">
                {col.title}
              </TableHeadCell>
            ))}
            {renderRowActions && <TableHeadCell scope="col" className="px-6 py-3">Opciones</TableHeadCell>}
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          {data.map((row) => (
            <TableRow
              key={row.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              {bulkActionsEnabled && (
                <TableCell className="px-6 py-2">
                  <Checkbox
                    checked={selectedRowIds.includes(row.id)}
                    onChange={() => toggleSelectRow(row.id)}
                    aria-label={`Select row ${row.id}`}
                  />
                </TableCell>
              )}
              {columns.map((col) => (
                <TableCell key={col.key} className="px-6 py-4">
                  {row[col.dataIndex]}
                </TableCell>
              ))}
              {renderRowActions && (
                <TableCell className="px-6 py-4 flex flex-wrap gap-2">
                  {renderRowActions(row)}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
        {footer && (
          <tfoot>
            {footer}
          </tfoot>
        )}
      </FlowbiteTable>
    </>
  );
};

export default Table;
