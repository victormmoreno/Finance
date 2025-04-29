import { useState } from 'react';
import useStore from '../../store/useStore';
import moduleLabels from '../../constants/moduleLabels';


const useCategoryList = () => {
    const { categories, removeCategory, setAlert, hideAlert, addCategory } = useStore();
    const [selectedCategories, setSelectedCategories] = useState([]);
    const module = moduleLabels['category'];

    

    const handleDelete = (category) => {
        removeCategory(category);
        setAlert(`La categoría "${category}" ha sido borrada!`, 'delete');

        setTimeout(() => {
            hideAlert();
        }, 3000);
    };

    const toggleSelectCategory = (category) => {
        setSelectedCategories((prevSelected) =>
          prevSelected.includes(category)
            ? prevSelected.filter((c) => c !== category)
            : [...prevSelected, category]
        );
      };

    const clearSelection = () => {
        setSelectedCategories([]);
    };

      
    
      const handleBulkDelete = (selectedRowIds) => {
        // console.log(selectedRowIds);
        let msj = '';
        if (selectedRowIds.length > 1) {
            msj = 'Se han borrado ' +  selectedRowIds.length + ' ' + module.plural + '!';
        } else {
            msj = 'Se ha borrado ' +  selectedRowIds.length + ' ' + module.singular + '!';
        }


        const selectedCategories = categories.filter(t => selectedRowIds.includes(t));
        selectedCategories.forEach(category => {
            handleDelete(category);
        });


        setAlert(msj, 'delete');
      };

    const handleNewCategory = () => {
        const newCategoryName = 'Nueva categoría';
        addCategory(newCategoryName);
        setAlert(`Se agregó una nueva categoría!`, 'create');

        setTimeout(() => {
            hideAlert();
        }, 3000);
    };

    return {
        categories,
        handleDelete,
        handleNewCategory,
        setAlert,
        hideAlert,
        toggleSelectCategory,
        selectedCategories,
        setSelectedCategories,
        handleBulkDelete,
        clearSelection
    };
};

export default useCategoryList;