import { useState } from 'react';
import useStore from '../../store/useStore';
import { isRequired, minLength, isPositiveNumber, isNotFutureDate } from '../../utils/validation';

const useTransactionForm = () => {
  const addTransaction = useStore((state) => state.addTransaction);
  const updateTransaction = useStore((state) => state.updateTransaction);
  const removeTransaction = useStore((state) => state.removeTransaction);
  const setAlert = useStore((state) => state.setAlert);
  const hideAlert = useStore((state) => state.hideAlert);
  const categoriesFromStore = useStore((state) => state.categories);
  const categories = categoriesFromStore || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState(categories.length > 0 ? categories[0] : '');

  const [errors, setErrors] = useState({});

  const resetForm = (transaction) => {
    setDescription(transaction ? transaction.description : '');
    setAmount(transaction ? transaction.amount : '');
    setDate(transaction ? transaction.date : '');
    setCategory(transaction ? transaction.category : (categories.length > 0 ? categories[0] : ''));
    setErrors({});
  };

  const validate = () => {
    const fields = { description, amount, date, category };
    const newErrors = {};

    Object.entries(fields).forEach(([fieldName, value]) => {
      const error = validateField(fieldName, value) ? '' : errors[fieldName];
      if (error) {
        newErrors[fieldName] = error;
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const validateField = (fieldName, value) => {
    let error = '';

    switch (fieldName) {
      case 'description':
        if (!isRequired(value) || !minLength(value, 3)) {
          error = 'La descripción debe tener al menos 3 caracteres.';
        }
        break;
      case 'amount':
        if (!isRequired(value) || !isPositiveNumber(value)) {
          error = 'El monto debe ser un número mayor que cero.';
        }
        break;
      case 'date':
        if (!isRequired(value)) {
          error = 'La fecha es obligatoria.';
        } else if (!isNotFutureDate(value)) {
          error = 'La fecha no puede ser futura.';
        }
        break;
      case 'category':
        if (!isRequired(value)) {
          error = 'La categoría es obligatoria.';
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));

    return error === '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const transactionData = {
      id: selectedTransaction ? selectedTransaction.id : Date.now(),
      description: description.trim(),
      amount: parseFloat(amount),
      date,
      category,
    };

    if (selectedTransaction) {
      updateTransaction(transactionData);
      setAlert(`La transacción "${transactionData.description}" ha sido actualizada.`, 'info');
    } else {
      addTransaction(transactionData);
      setAlert(`La transacción "${transactionData.description}" ha sido agregada.`, 'create');
    }
    setTimeout(() => {
      hideAlert();
    }, 3000);
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  const handleDelete = (transaction) => {
    removeTransaction(transaction.id);
    setAlert(`La transacción "${transaction.description}" ha sido borrada!`, 'delete');
    setTimeout(() => {
      hideAlert();
    }, 3000);
  };

  const handleEditClick = (transaction) => {
    setSelectedTransaction(transaction);
    resetForm(transaction);
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setSelectedTransaction(null);
    resetForm(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  const isFormValid = () => {
    const fields = { description, amount, date, category };
    return Object.entries(fields).every(([fieldName, value]) => {
      switch (fieldName) {
        case 'description':
          return isRequired(value) && minLength(value, 3);
        case 'amount':
          return isRequired(value) && isPositiveNumber(value);
        case 'date':
          return isRequired(value) && isNotFutureDate(value);
        case 'category':
          return isRequired(value);
        default:
          return true;
      }
    });
  };

  return {
    isModalOpen,
    selectedTransaction,
    description,
    setDescription,
    amount,
    setAmount,
    date,
    setDate,
    category,
    setCategory,
    categories,
    errors,
    handleSubmit,
    validateField,
    isFormValid,
    handleDelete,
    handleEditClick,
    handleAddClick,
    handleCloseModal,
  };
};

export default useTransactionForm;
