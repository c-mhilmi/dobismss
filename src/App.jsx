import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';

// Customer
import CustomerDashboard from './pages/customer/CustomerDashboard';
import MyOrders from './pages/customer/MyOrders';
import Wallet from './pages/customer/Wallet';

// Staff
import StaffDashboard from './pages/staff/StaffDashboard';
import CreateInvoice from './pages/staff/CreateInvoice';

// Admin
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <DataProvider>
                    <Routes>
                        <Route path="/login" element={<Login />} />

                        <Route path="/" element={<Layout />}>
                            <Route index element={<Navigate to="/login" replace />} />

                            {/* Customer Routes */}
                            <Route element={<ProtectedRoute allowedRoles={['customer']} />}>
                                <Route path="customer" element={<CustomerDashboard />} />
                                <Route path="customer/orders" element={<MyOrders />} />
                                <Route path="customer/wallet" element={<Wallet />} />
                            </Route>

                            {/* Staff Routes */}
                            <Route element={<ProtectedRoute allowedRoles={['staff']} />}>
                                <Route path="staff" element={<StaffDashboard />} />
                                <Route path="staff/invoice" element={<CreateInvoice />} />
                            </Route>

                            {/* Admin Routes */}
                            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                                <Route path="admin" element={<AdminDashboard />} />
                                <Route path="admin/users" element={<div className="text-white">User Management (Placeholder)</div>} />
                                <Route path="admin/settings" element={<div className="text-white">System Settings (Placeholder)</div>} />
                            </Route>
                        </Route>
                    </Routes>
                </DataProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
