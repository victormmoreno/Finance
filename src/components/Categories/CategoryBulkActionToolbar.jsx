import React, { useState } from 'react';
import BulkActionToolbar from '../Generals/BulkActionToolbar';

// const CategoryBulkActionToolbar = (props) => {
//   return <BulkActionToolbar {...props} moduleType="category" />;
// };

// export default CategoryBulkActionToolbar;

const CategoryBulkActionToolbar = ({ selectedCategories, handleDelete }) => {



  return (
    <>
      <BulkActionToolbar
        selectedCount={selectedCategories.length}
        onDelete={handleDelete}
        moduleType="category"
      />
      {/* <div className="flex flex-wrap shadow-lg rounded-lg items-center">
        {categories.map((category) => (
          <div
            key={category}
            className={`max-w-sm p-7 m-3 cursor-pointer rounded border ${
              selectedCategories.includes(category)
                ? 'bg-blue-200 dark:bg-blue-700'
                : 'bg-white dark:bg-gray-800'
            }`}
            onClick={() => toggleSelectCategory(category)}
          >
            {category}
          </div>
        ))}
      </div> */}
    </>
  );
};

export default CategoryBulkActionToolbar;
