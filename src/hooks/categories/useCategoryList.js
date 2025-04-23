import useStore from '../../store/useStore';

const useCategoryList = () => {
    const { categories, removeCategory, setAlert, hideAlert, addCategory } = useStore();

    const handleDelete = (category) => {
        removeCategory(category);
        setAlert(`La categoría "${category}" ha sido borrada!`, 'delete');

        setTimeout(() => {
            hideAlert();
        }, 3000);
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
    };
};

export default useCategoryList;