import { useState } from 'react';
import useStore from '../../store/useStore';
import useInitializeTransactions from '../../hooks/useInitializeTransactions';

const useTransactionList = () => {
    const { transactions, alert } = useStore();
    useInitializeTransactions();

    const totalAmount = transactions.reduce((total, transaction) => total + Number(transaction.amount), 0);
    const currentPage = useStore((state) => state.currentPage);
    const setCurrentPage = useStore((state) => state.setCurrentPage);

    const itemsPerPage = 15;
    const totalPages = Math.ceil(transactions.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentTransactions = transactions.slice(startIndex, startIndex + itemsPerPage);

    const columns = [
        { key: 'description', title: 'Transacción', dataIndex: 'description' },
        { key: 'category', title: 'Categoría', dataIndex: 'category' },
        { key: 'amount', title: 'Monto', dataIndex: 'amount' },
        { key: 'date', title: 'Fecha de la transacción', dataIndex: 'date' },
    ];

    const bulkActionsEnabled = true;

    // const footer = (
    //     <tr className="font-semibold text-gray-900 dark:text-white">
    //         <th scope="row" className="px-6 py-3 text-base" colSpan={2}>Total</th>
    //         <td className="px-6 py-3">
    //             {transactions.reduce((total, transaction) => total + Number(transaction.amount), 0)}
    //         </td>
    //     </tr>
    // );

    // const renderRowActions = (transaction) => (
    //     <>
    //         <DeleteButton
    //             item={transaction}
    //             removeItem={handleDelete}
    //             disabled={alert.visible}
    //         />
    //         <EditButton
    //             item={transaction}
    //             editItem={() => handleEditClick(transaction)}
    //             disabled={alert.visible}
    //         />
    //     </>
    // );
    return {
        currentPage,
        setCurrentPage,
        totalPages,
        currentTransactions,
        columns,
        transactions,
        totalAmount,
        bulkActionsEnabled,
        // renderRowActions,
    }
}
export default useTransactionList;