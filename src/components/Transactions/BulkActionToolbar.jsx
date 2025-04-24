import React, { useState } from 'react';
import { Button, Badge } from 'flowbite-react';

const BulkActionToolbar = ({ selectedCount, onDelete }) => {
  // const localSelectedCount = selectedCount;
  if (selectedCount === 0) return null;
  
  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700 rounded mb-4">
      <Badge color="info">{selectedCount} selected</Badge>
      <Button color="failure" onClick={onDelete}>
        Delete Selected
      </Button>
    </div>
  );
};

export default BulkActionToolbar;
