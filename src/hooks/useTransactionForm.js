import { useState } from 'react';
import useStore from '../store/useStore';

const useTransactionForm = (onClose) => {
  const addTransaction = useStore((state) => state.addTransaction);
  const categoriesFromStore = useStore((state) => state.categories);
  const categories = categoriesFromStore || [];
  

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!description || description.trim().length < 3) {
      newErrors.description = 'La descripción debe tener al menos 3 caracteres.';
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      newErrors.amount = 'El monto debe ser un número mayor que cero.';
    }

    if (!date) {
      newErrors.date = 'La fecha es obligatoria.';
    } else if (new Date(date) > new Date()) {
      newErrors.date = 'La fecha no puede ser futura.';
    }

    if (!category) {
      newErrors.category = 'La categoría es obligatoria.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newTransaction = {
      id: Date.now(),
      description: description.trim(),
      amount: parseFloat(amount),
      date,
      category,
    };

    addTransaction(newTransaction);
    onClose();
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
  };
};

export default useTransactionForm;
