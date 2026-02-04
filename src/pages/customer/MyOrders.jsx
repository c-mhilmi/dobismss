import React from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import StatusBadge from '../../components/UI/StatusBadge';
import { Package, Calendar } from 'lucide-react';

const MyOrders = () => {
    const { orders } = useData();
    const { user } = useAuth();

    // Filter orders for this user
    const myOrders = orders.filter(o => o.userId === user.id);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">My Orders</h2>

            {myOrders.length === 0 ? (
                <div className="text-center py-20 text-[var(--text-muted)]">
                    <Package size={48} className="mx-auto mb-4 opacity-50" />
                    <p>No orders yet. Start a new laundry service!</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {myOrders.map(order => (
                        <div key={order.id} className="glass-panel p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-lg font-bold text-white">#{order.id.slice(-6).toUpperCase()}</span>
                                    <StatusBadge status={order.status} />
                                </div>
                                <div className="flex items-center gap-4 text-sm text-[var(--text-muted)]">
                                    <span className="flex items-center gap-1"><Calendar size={14} /> {order.date}</span>
                                    <span>•</span>
                                    <span>{order.items.length} Items</span>
                                </div>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {order.items.slice(0, 3).map((item, idx) => (
                                        <span key={idx} className="bg-white/5 px-2 py-1 rounded text-xs text-slate-300 border border-white/5">
                                            {item.quantity}x {item.name}
                                        </span>
                                    ))}
                                    {order.items.length > 3 && <span className="text-xs text-[var(--text-muted)] self-center">+{order.items.length - 3} more</span>}
                                </div>
                            </div>

                            <div className="border-t md:border-t-0 md:border-l border-[var(--glass-border)] pt-4 md:pt-0 md:pl-6 w-full md:w-auto flex flex-row md:flex-col justify-between items-center md:items-end gap-2">
                                <span className="text-sm text-[var(--text-muted)]">Total Amount</span>
                                <span className="text-2xl font-bold text-[var(--primary)]">${order.total.toFixed(2)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrders;
