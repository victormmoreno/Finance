import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Generals/Layout';
import Home from './components/Home';
import TransactionList from './components/Transactions/TransactionList';
import CategoryList from './components/Categories/CategoryList';
import CategoryForm from './components/Categories/CategoryForm';
import AlertClearer from './components/Generals/Alerts/AlertClearer';
import './App.css';

const App = () => {
    return (
        <Router>
            <AlertClearer />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="transactions" element={<TransactionList />} />
                    <Route path="categories" element={
                        <>
                            <CategoryForm />
                            <CategoryList />
                        </>
                    } />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;