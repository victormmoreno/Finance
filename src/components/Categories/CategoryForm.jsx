import { useState } from 'react';
import useStore from '../../store/useStore';

const CategoryForm = () => {
  const [categoryName, setCategoryName] = useState('');
  const { categories, alert, setAlert, hideAlert } = useStore();
  const addCategory = useStore((state) => state.addCategory);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = categoryName.trim();
    if (trimmedName === '') return;

    if (categories.includes(trimmedName)) {
      setAlert(`La categoría "${trimmedName}" ya está registrada.`, 'warning');
      setTimeout(() => {
        hideAlert();
      }, 3000);
      return;
    }

    addCategory(trimmedName);
    setCategoryName('');
    setAlert(`La categoría "${trimmedName}" ha sido registrada!`, 'create');
    setTimeout(() => {
      hideAlert();
    }, 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <label htmlFor="categoryName" className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
        Nueva Categoría
      </label>
      <input
        type="text"
        id="categoryName"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
        placeholder="Ingrese el nombre de la categoría"
      />
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Agregar Categoría
      </button>
    </form>
  );
};

export default CategoryForm;