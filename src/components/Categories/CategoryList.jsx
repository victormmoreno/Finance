import useStore from '../../store/useStore';
import { useState } from 'react';
import DeleteButton from '../Generals/Buttons/DeleteButton';
import SimpleAlert from '../Generals/Alerts/SimpleAlert';
import { Button, Card } from "flowbite-react";
import { IoMdAdd } from "react-icons/io";
import EditButton from '../Generals/Buttons/EditButton';

const CategoryList = () => {
    const { categories, removeCategory, alert, setAlert, hideAlert, updateCategory } = useStore();
    const [isEditing, setIsEditing] = useState(null);
    const [editedCategoryName, setEditedCategoryName] = useState('');

    const handleDelete = (category) => {
        removeCategory(category);
        setAlert(`La categoría "${category}" ha sido borrada!`, 'delete');

        setTimeout(() => {
            hideAlert();
        }, 3000);
    };

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

        if (categories.includes(trimmedName) && trimmedName == oldCategory) {
            setIsEditing(null);
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

    return (
        <>
            <h2 className="text-lg font-semibold mb-2 dark:text-white">Categorías</h2>
            
            {/* {alert.visible && <SimpleAlert className="alert fade-in fade-out fixed bottom-8 right-8" alertType={alert.type} />} */}
            <div className="flex flex-wrap">
                {categories.map((category) => (
                    <Card className="max-w-sm p-7 m-3" key={category}>
                        {/* <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center justify-between"> */}
                            {isEditing === category ? (
                                <>
                                    <input
                                        type="text"
                                        value={editedCategoryName}
                                        onChange={(e) => setEditedCategoryName(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
                                        placeholder="Ingrese el nombre de la categoría"
                                    />
                                    <br />
                                    <div className="flex gap-2 ml-2">
                                        <button
                                            onClick={() => handleSaveClick(category)}
                                            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                                        >
                                            Guardar
                                        </button>
                                        <button
                                            onClick={handleCancelClick}
                                            className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <span>{category}</span>
                                    <EditButton
                                        item={category}
                                        editItem={() => handleEditClick(category)}
                                        // disabled={alert.visible}
                                    />
                                </>
                            )}
                        {/* </h5> */}

                        <DeleteButton
                            item={category} removeItem={handleDelete} disabled={alert.visible}
                        />
                    </Card>
                ))}
                <Button
                    color="green"
                    className="cursor-pointer rounded-full w-30 h-30 m-7"
                >
                    <IoMdAdd className="h-10 w-10" />
                </Button>
            </div>
        </>
    );
};

export default CategoryList;
