import { useState } from 'react';
import useStore from '../store/useStore';
import { isRequired, minLength, isPositiveNumber, isNotFutureDate } from '../utils/validation';

const useTransactionForm = (initialTransaction, onClose) => {
  const addTransaction = useStore((state) => state.addTransaction);
  const updateTransaction = useStore((state) => state.updateTransaction);
  const categoriesFromStore = useStore((state) => state.categories);
  const categories = categoriesFromStore || [];
  

  const [description, setDescription] = useState(initialTransaction ? initialTransaction.description : '');
  const [amount, setAmount] = useState(initialTransaction ? initialTransaction.amount : '');
  const [date, setDate] = useState(initialTransaction ? initialTransaction.date : '');
  const [category, setCategory] = useState(initialTransaction ? initialTransaction.category : (categories.length > 0 ? categories[0] : ''));

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
      id: initialTransaction ? initialTransaction.id : Date.now(),
      description: description.trim(),
      amount: parseFloat(amount),
      date,
      category,
    };

    if (initialTransaction) {
      updateTransaction(transactionData);
    } else {
      addTransaction(transactionData);
    }
    onClose();
  };

  const isFormValid = () => {
    // Check if all fields are valid by running validateField without side effects
    const fields = { description, amount, date, category };
    return Object.entries(fields).every(([fieldName, value]) => {
      // Run validation logic without setting errors state
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
    resetForm,
  };
};

export default useTransactionForm;
