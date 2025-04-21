import useStore from '../store/useStore';
import sampleTransactions from '../data/sampleTransactions';

const useInitializeTransactions = () => {
    const addTransaction = useStore((state) => state.addTransaction);
    const transactions = useStore((state) => state.transactions);

    if (transactions.length === 0) {
        sampleTransactions.forEach(transaction => {
            if (!transactions.find(t => t.id === transaction.id)) {
                addTransaction(transaction);
            }
        });
    }
};

export default useInitializeTransactions;
