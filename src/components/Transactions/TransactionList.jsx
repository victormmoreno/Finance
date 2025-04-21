import { useState } from 'react';
import useStore from '../../store/useStore';
import DeleteButton from '../Generals/Buttons/DeleteButton';
import useInitializeTransactions from '../../hooks/useInitializeTransactions';
import SimpleAlert from '../Generals/Alerts/SimpleAlert';
import TransactionForm from './TransactionForm';
import ModalWrapper from '../Generals/ModalWrapper';
import CreateButton from '../Generals/Buttons/CreateButton';
import useTransactionForm from '../../hooks/useTransactionForm';

const TransactionList = () => {
    const { transactions, removeTransaction, alert, setAlert, hideAlert } = useStore();
    useInitializeTransactions();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
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
    } = useTransactionForm(() => setIsModalOpen(false));

    const handleDelete = (transaction) => {
        removeTransaction(transaction.id);
        setAlert(`La transacción "${transaction.description}" ha sido borrada!`);
        
        setTimeout(() => {
            hideAlert();
        }, 3000);
    };

    const handleAddClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="relative overflow-x-auto">
            {alert.visible && <SimpleAlert className="alert fade-in" alertType={alert.type} />}
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Transacción</th>
                        <th scope="col" className="px-6 py-3">Monto</th>
                        <th scope="col" className="px-6 py-3">Fecha de la transacción</th>
                        <th scope="col" className="px-6 py-3">Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(transaction => (
                        <tr key={transaction.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-6 py-4">{transaction.description}</td>
                            <td className="px-6 py-4">{transaction.amount}</td>
                            <td className="px-6 py-4">{transaction.date}</td>
                            <td className="px-6 py-4">
                                <DeleteButton 
                                    item={transaction} 
                                    removeItem={handleDelete} 
                                    disabled={alert.visible} 
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <CreateButton 
                handleAddClick={handleAddClick}
            />

            <ModalWrapper show={isModalOpen} onClose={handleCloseModal} title="Registrar Nueva Transacción">
                <TransactionForm
                    description={description}
                    setDescription={setDescription}
                    amount={amount}
                    setAmount={setAmount}
                    date={date}
                    setDate={setDate}
                    category={category}
                    setCategory={setCategory}
                    categories={categories}
                    errors={errors}
                    handleSubmit={handleSubmit}
                    onClose={handleCloseModal}
                />
            </ModalWrapper>
        </div>
    );
};

export default TransactionList;