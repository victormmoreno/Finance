import useTransactionForm from '../../hooks/transactions/useTransactionForm';
import useTransactionList from '../../hooks/transactions/useTransactionList';
import useTable from '../../hooks/generals/useTable';
import { useState } from 'react';
import TransactionForm from './TransactionForm';
import Table from '../Generals/Table';
import Pagination from '../Generals/Pagination';
import CreateButton from '../Generals/Buttons/CreateButton';
import ModalWrapper from '../Generals/Modals/ModalWrapper';
import DeleteButton from '../Generals/Buttons/DeleteButton';
import EditButton from '../Generals/Buttons/EditButton';
import BulkActionToolbar from './BulkActionToolbar';

const TransactionList = () => {
    const {
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
    } = useTransactionForm();

    const {
        currentPage,
        setCurrentPage,
        totalPages,
        currentTransactions,
        columns,
        transactions,
        totalAmount,
        bulkActionsEnabled,
        handleBulkDelete,
    } = useTransactionList({ handleDelete });
    
    const {
        selectedRowIds,
        toggleSelectAll,
        toggleSelectRow,
        clearSelection,
    } = useTable(currentTransactions);
    


    const renderRowActions = (transaction) => (
        <>
            <DeleteButton
                item={transaction}
                removeItem={handleDelete}
                disabled={false}
            />
            <EditButton
                item={transaction}
                editItem={() => handleEditClick(transaction)}
                disabled={false}
            />
        </>
    );

    const footer = (
        <tr className="font-semibold text-gray-900 dark:text-white">
            <th scope="row" className="px-6 py-3 text-base" colSpan={2}>Total</th>
            <td className="px-6 py-3">{totalAmount}</td>
        </tr>
    );

    return (
        <>
            <BulkActionToolbar selectedCount={selectedRowIds.length} onDelete={() => { handleBulkDelete(selectedRowIds); clearSelection(); }} />
            <Table
                columns={columns}
                data={currentTransactions}
                renderRowActions={renderRowActions}
                footer={footer}
                bulkActionsEnabled={bulkActionsEnabled}
                selectedRowIds={selectedRowIds}
                toggleSelectAll={toggleSelectAll}
                toggleSelectRow={toggleSelectRow}
            />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
            <div className="fixed bottom-8 right-8">
                <CreateButton handleAddClick={handleAddClick} />
            </div>

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
