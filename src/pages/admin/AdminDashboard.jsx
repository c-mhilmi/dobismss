import React from 'react';
import { useData } from '../../context/DataContext';
import { TrendingUp, Users, ShoppingBag, DollarSign } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="glass-panel p-6">
        <div className="flex items-start justify-between">
            <div>
                <p className="text-[var(--text-muted)] text-sm">{title}</p>
                <h3 className="text-3xl font-bold text-white mt-2">{value}</h3>
            </div>
            <div className={`p-3 rounded-xl bg-${color}-500/10 text-${color}-400`}>
                <Icon size={24} />
            </div>
        </div>
    </div>
);

const AdminDashboard = () => {
    const { stats, orders } = useData();

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white">System Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Revenue" value={`$${stats.totalRevenue.toFixed(2)}`} icon={DollarSign} color="green" />
                <StatCard title="Total Orders" value={stats.totalOrders} icon={ShoppingBag} color="blue" />
                <StatCard title="Active Orders" value={stats.activeOrders} icon={TrendingUp} color="yellow" />
                <StatCard title="Total Users" value="3" icon={Users} color="purple" />
            </div>

            <div className="glass-panel p-6">
                <h3 className="text-lg font-bold text-white mb-4">Recent Transactions</h3>
                <div className="space-y-4">
                    {orders.slice(0, 5).map(order => (
                        <div key={order.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full ${order.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                                <div>
                                    <div className="text-sm font-medium text-white">Order #{order.id}</div>
                                    <div className="text-xs text-[var(--text-muted)]">{order.customerName}</div>
                                </div>
                            </div>
                            <div className="font-mono text-sm text-[var(--accent-primary)]">
                                +${order.total.toFixed(2)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
