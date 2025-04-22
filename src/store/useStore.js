import { create } from 'zustand';

const useStore = create((set) => ({
    transactions: [],
    removeTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter(transaction => transaction.id !== id)
    })),
    addTransaction: (transaction) => set((state) => ({ transactions: [...state.transactions, transaction] })),
    updateTransaction: (updatedTransaction) => set((state) => ({
        transactions: state.transactions.map(transaction =>
            transaction.id === updatedTransaction.id ? updatedTransaction : transaction
        )
    })),
    categories: ['Food', 'Utilities', 'Transportation', 'Health', 'Entertainment', 'Clothing', 'Education'],
    addCategory: (category) => set((state) => ({
        categories: [...state.categories, category]
    })),
    removeCategory: (category) => set((state) => ({
        categories: state.categories.filter(c => c !== category)
    })),
    updateCategory: (oldCategory, newCategory) => set((state) => ({
        categories: state.categories.map(c => c === oldCategory ? newCategory : c)
    })),
    alert: { visible: false, message: '' },
    // setAlert: (message) => set({ alert: { visible: true, message } }),
    setAlert: (message, type = 'warning') => set({ alert: { visible: true, message, type } }),
    hideAlert: () => set({ alert: { visible: false, message: '' } }),
    currentPage: 1,
    setCurrentPage: (page) => set({ currentPage: page }),
}));

export default useStore;
