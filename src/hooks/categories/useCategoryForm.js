import { useState } from 'react';
import useStore from '../../store/useStore';

const useCategoryForm = () => {
    const { categories, updateCategory, setAlert, hideAlert } = useStore();
    const [isEditing, setIsEditing] = useState(null);
    const [editedCategoryName, setEditedCategoryName] = useState('');

    const handleEditClick = (category) => {
        setIsEditing(category);
        setEditedCategoryName(category);
    };

    const handleSaveClick = (oldCategory) => {
        const trimmedName = editedCategoryName.trim();
        if (trimmedName === '') {
            setAlert('El nombre de la categoría no puede estar vacío.', 'warning');
            setTimeout(() => {
                hideAlert();
            }, 3000);
            return;
        }

        if (categories.includes(trimmedName) && trimmedName !== oldCategory) {
            setAlert(`La categoría "${trimmedName}" ya está registrada.`, 'info');
            setTimeout(() => {
                hideAlert();
            }, 3000);
            return;
        }
        updateCategory(oldCategory, trimmedName);
        setIsEditing(null);
        setAlert(`La categoría "${oldCategory}" ha sido actualizada a "${trimmedName}".`, 'create');
        setTimeout(() => {
            hideAlert();
        }, 3000);
    };

    const handleCancelClick = () => {
        setIsEditing(null);
        setEditedCategoryName('');
    };

    return {
        isEditing,
        editedCategoryName,
        setEditedCategoryName,
        handleEditClick,
        handleSaveClick,
        handleCancelClick,
    };
};

export default useCategoryForm;
