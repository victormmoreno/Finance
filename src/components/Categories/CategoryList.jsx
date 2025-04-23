import useStore from '../../store/useStore';
import DeleteButton from '../Generals/Buttons/DeleteButton';
import { Card } from "flowbite-react";
import EditButton from '../Generals/Buttons/EditButton';
import CreateButton from '../Generals/Buttons/CreateButton';
import useCategoryList from '../../hooks/categories/useCategoryList';
import useCategoryForm from '../../hooks/categories/useCategoryForm';

const CategoryList = () => {
    const { alert } = useStore();


    const {
        categories,
        handleDelete,
        handleNewCategory,
        // setAlert,
        // hideAlert,
    } = useCategoryList();

    const {
        isEditing,
        editedCategoryName,
        setEditedCategoryName,
        handleEditClick,
        handleSaveClick,
        handleCancelClick,
    } = useCategoryForm();

    return (
        <>
            <h2 className="text-lg font-semibold mb-2 dark:text-white">Categorías</h2>
            <div className="flex flex-wrap shadow-lg rounded-lg items-center">
                {categories.map((category) => (
                    <Card className="max-w-sm p-7 m-3" key={category}>
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
                                            className="cursor-pointer px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                                        >
                                            Guardar
                                        </button>
                                        <button
                                            onClick={handleCancelClick}
                                            className="cursor-pointer px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
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
                                        disabled={alert.visible}
                                    />
                                </>
                            )}
                        <DeleteButton
                            item={category} removeItem={handleDelete} disabled={alert.visible}
                        />
                    </Card>
                ))}
                <div className='m-5'>
                    <CreateButton
                        handleAddClick={handleNewCategory}
                    />
                </div>
            </div>
        </>
    );
};

export default CategoryList;
