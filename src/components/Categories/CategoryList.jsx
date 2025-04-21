import useStore from '../../store/useStore';
import DeleteButton from '../Generals/Buttons/DeleteButton';
import SimpleAlert from '../Generals/Alerts/SimpleAlert';

const CategoryList = () => {
    const { categories, removeCategory, alert, setAlert, hideAlert } = useStore();

    const handleDelete = (category) => {
        removeCategory(category);
        setAlert(`La categoría "${category}" ha sido borrada!`, 'delete');
        
        // Hide the alert after a few seconds
        setTimeout(() => {
            hideAlert();
        }, 3000);
    };

  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2 dark:text-white">Categorías</h2>
      {alert.visible && <SimpleAlert className="alert fade-in" alertType={alert.type} />}
      <ul className="list-disc list-inside">
        {categories.map((category) => (
          <li key={category} className="flex justify-between items-center mb-1">
            <span className="dark:text-gray-300">{category}</span>
            <DeleteButton
              item={category} removeItem={handleDelete} disabled={alert.visible}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
