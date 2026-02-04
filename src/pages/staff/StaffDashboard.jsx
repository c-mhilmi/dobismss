import React from 'react';
import { useData } from '../../context/DataContext';
import StatusBadge from '../../components/UI/StatusBadge';
import { Smartphone, CheckCircle, Clock, Package } from 'lucide-react';

const StaffDashboard = () => {
    const { orders, updateOrderStatus } = useData();

    // Sort by newest first
    const activeOrders = orders.sort((a, b) => new Date(b.date) - new Date(a.date));

    const handleStatusChange = (orderId, currentStatus) => {
        const flow = ['pending', 'processing', 'completed'];
        const idx = flow.indexOf(currentStatus);
        if (idx < flow.length - 1) {
            updateOrderStatus(orderId, flow[idx + 1]);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Active Orders Management</h2>
                <span className="text-[var(--text-muted)]">{activeOrders.length} Total Records</span>
            </div>

            <div className="glass-panel overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[var(--glass-border)] bg-white/5">
                                <th className="p-4 text-sm font-medium text-[var(--text-secondary)]">Order ID</th>
                                <th className="p-4 text-sm font-medium text-[var(--text-secondary)]">Customer</th>
                                <th className="p-4 text-sm font-medium text-[var(--text-secondary)]">Items</th>
                                <th className="p-4 text-sm font-medium text-[var(--text-secondary)]">Total</th>
                                <th className="p-4 text-sm font-medium text-[var(--text-secondary)]">Status</th>
                                <th className="p-4 text-sm font-medium text-[var(--text-secondary)]">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--glass-border)]">
                            {activeOrders.map(order => (
                                <tr key={order.id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-4 font-mono text-sm text-[var(--text-muted)]">#{order.id.slice(-6).toUpperCase()}</td>
                                    <td className="p-4">
                                        <div className="font-medium text-white">{order.customerName}</div>
                                        <div className="text-xs text-[var(--text-muted)]">{order.userId}</div>
                                    </td>
                                    <td className="p-4 text-sm text-[var(--text-muted)]">
                                        {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                                    </td>
                                    <td className="p-4 font-medium text-white">${order.total.toFixed(2)}</td>
                                    <td className="p-4"><StatusBadge status={order.status} /></td>
                                    <td className="p-4">
                                        {order.status !== 'completed' && (
                                            <button
                                                onClick={() => handleStatusChange(order.id, order.status)}
                                                className="text-xs btn btn-secondary py-1 px-3"
                                            >
                                                Next Stage
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StaffDashboard;
