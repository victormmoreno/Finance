import { create } from 'zustand';

const useStore = create((set) => ({
    transactions: [],
    removeTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter(transaction => transaction.id !== id)
    })),
    addTransaction: (transaction) => set((state) => ({ transactions: [...state.transactions, transaction] })),
    categories: ['Food', 'Utilities', 'Transportation', 'Health', 'Entertainment', 'Clothing', 'Education'],
    addCategory: (category) => set((state) => ({
        categories: [...state.categories, category]
    })),
    removeCategory: (category) => set((state) => ({
        categories: state.categories.filter(c => c !== category)
    })),
    alert: { visible: false, message: '' },
    // setAlert: (message) => set({ alert: { visible: true, message } }),
    setAlert: (message, type = 'info') => set({ alert: { visible: true, message, type } }),
    hideAlert: () => set({ alert: { visible: false, message: '' } }),
}));

export default useStore;
