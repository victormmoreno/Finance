import { useState } from 'react';
import useStore from '../../store/useStore';
import DeleteButton from '../Generals/Buttons/DeleteButton';
import useInitializeTransactions from '../../hooks/useInitializeTransactions';
// import SimpleAlert from '../Generals/Alerts/SimpleAlert';
import TransactionForm from './TransactionForm';
import ModalWrapper from '../Generals/Modals/ModalWrapper';
import CreateButton from '../Generals/Buttons/CreateButton';
import useTransactionForm from '../../hooks/useTransactionForm';
import EditButton from '../Generals/Buttons/EditButton';
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import Pagination from '../Generals/Pagination';

const TransactionList = () => {
    const { transactions, removeTransaction, alert, setAlert, hideAlert } = useStore();
    useInitializeTransactions();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const currentPage = useStore((state) => state.currentPage);
    const setCurrentPage = useStore((state) => state.setCurrentPage);

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
        validateField,
        isFormValid,
        resetForm
    } = useTransactionForm(selectedTransaction, () => setIsModalOpen(false));

    const handleDelete = (transaction) => {
        removeTransaction(transaction.id);
        setAlert(`La transacción "${transaction.description}" ha sido borrada!`, `delete`);

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

    // Pagination calculations
    const itemsPerPage = 15;
    const totalPages = Math.ceil(transactions.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentTransactions = transactions.slice(startIndex, startIndex + itemsPerPage);

    return (
        <>
            {/* {alert.visible && <SimpleAlert className="alert fade-in" alertType={alert.type} />} */}
            <Table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <TableHead>
                    <TableRow>
                        <TableHeadCell scope="col" className="px-6 py-3">Transacción</TableHeadCell>
                        <TableHeadCell scope="col" className="px-6 py-3">Monto</TableHeadCell>
                        <TableHeadCell scope="col" className="px-6 py-3">Fecha de la transacción</TableHeadCell>
                        <TableHeadCell scope="col" className="px-6 py-3">Opciones</TableHeadCell>
                    </TableRow>
                </TableHead>
                <TableBody className="divide-y" >
                    {currentTransactions.map(transaction => (
                        <TableRow
                            key={transaction.id}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                            <TableCell className="px-6 py-4">{transaction.description}</TableCell>
                            <TableCell className="px-6 py-4">{transaction.amount}</TableCell>
                            <TableCell className="px-6 py-4">{transaction.date}</TableCell>
                            <TableCell className="px-6 py-4 flex flex-wrap gap-2">
                                <DeleteButton
                                    item={transaction}
                                    removeItem={handleDelete}
                                    disabled={alert.visible}
                                />
                                <EditButton
                                    item={transaction}
                                    editItem={() => handleEditClick(transaction)}
                                    disabled={alert.visible}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <tfoot>
                    <tr className="font-semibold text-gray-900 dark:text-white">
                        <th scope="row" className="px-6 py-3 text-base">Total</th>
                        <td className="px-6 py-3">
                            {transactions.reduce((total, transaction) => total + Number(transaction.amount), 0)}
                        </td>
                    </tr>
                </tfoot>
            </Table>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
            <CreateButton
                handleAddClick={handleAddClick}
            />

            <ModalWrapper show={isModalOpen} onClose={handleCloseModal} title={selectedTransaction ? "Editar Transacción" : "Registrar Nueva Transacción"}>
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
                    validateField={validateField}
                    isFormValid={isFormValid}
                    onClose={handleCloseModal}
                />
            </ModalWrapper>
        </>
    );
};

export default TransactionList;
