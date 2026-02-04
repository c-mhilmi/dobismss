import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

const MOCK_SERVICES = [
    { id: 's1', name: 'Wash & Fold', price: 1.50, unit: 'kg', description: 'Everyday laundry, washed, dried and folded.', icon: 'Shirt' },
    { id: 's2', name: 'Dry Cleaning', price: 5.00, unit: 'item', description: 'Special care for delicate fabrics.', icon: 'Sparkles' },
    { id: 's3', name: 'Ironing Only', price: 2.00, unit: 'item', description: 'Professional pressing for crisp clothes.', icon: 'ArrowRight' },
    { id: 's4', name: 'Comforter/Bedding', price: 12.00, unit: 'item', description: 'Deep clean for bulky bedding items.', icon: 'Layers' },
];

const INITIAL_ORDERS = [
    {
        id: 'ord_001',
        userId: 'u1',
        customerName: 'May Customer',
        status: 'completed',
        total: 15.00,
        date: '2024-02-01',
        items: [{ serviceId: 's1', name: 'Wash & Fold', quantity: 10, price: 1.50 }]
    },
    {
        id: 'ord_002',
        userId: 'u1',
        customerName: 'May Customer',
        status: 'processing',
        total: 25.00,
        date: '2024-02-04',
        items: [{ serviceId: 's2', name: 'Dry Cleaning', quantity: 5, price: 5.00 }]
    },
    {
        id: 'ord_003',
        userId: 'u99',
        customerName: 'Guest User',
        status: 'pending',
        total: 6.00,
        date: '2024-02-05',
        items: [{ serviceId: 's3', name: 'Ironing Only', quantity: 3, price: 2.00 }]
    },
];

export const DataProvider = ({ children }) => {
    const { user, updateUserBalance } = useAuth();
    const [services] = useState(MOCK_SERVICES);
    const [orders, setOrders] = useState(INITIAL_ORDERS);
    const [notifications, setNotifications] = useState([]);

    // Load orders ? maybe localstorage? For now memory is fine.

    const createOrder = (orderItems, totalAmount) => {
        return new Promise((resolve, reject) => {
            // Check balance
            if (user.balance < totalAmount) {
                reject(new Error('Insufficient balance'));
                return;
            }

            const newOrder = {
                id: `ord_${Date.now()}`,
                userId: user.id,
                customerName: user.name,
                status: 'pending',
                total: totalAmount,
                date: new Date().toISOString().split('T')[0],
                items: orderItems
            };

            setOrders(prev => [newOrder, ...prev]);

            // Deduct balance
            const newBalance = user.balance - totalAmount;
            updateUserBalance(newBalance);

            // Notify
            addNotification(`Order placed successfully! ID: ${newOrder.id}`);
            resolve(newOrder);
        });
    };

    const updateOrderStatus = (orderId, newStatus) => {
        setOrders(prev => prev.map(o => {
            if (o.id === orderId) {
                return { ...o, status: newStatus };
            }
            return o;
        }));
        // If we wanted to notify the user of that order, we could check user.id but this is global mock
    };

    const addCredit = (amount) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newBal = (user?.balance || 0) + parseFloat(amount);
                updateUserBalance(newBal);
                addNotification(`Successfully added $${amount} to wallet.`);
                resolve(newBal);
            }, 1000);
        });
    };

    const addNotification = (msg) => {
        const notif = { id: Date.now(), message: msg, read: false };
        setNotifications(prev => [notif, ...prev]);
        // Auto dismiss
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== notif.id));
        }, 5000);
    };

    const stats = {
        totalRevenue: orders.reduce((acc, curr) => acc + curr.total, 0),
        totalOrders: orders.length,
        activeOrders: orders.filter(o => ['pending', 'processing'].includes(o.status)).length
    };

    const value = {
        services,
        orders,
        createOrder,
        updateOrderStatus,
        addCredit,
        notifications,
        stats
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};
