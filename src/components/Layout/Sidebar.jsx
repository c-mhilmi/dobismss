import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    LayoutDashboard,
    ShoppingBag,
    CreditCard,
    LogOut,
    Users,
    ClipboardList,
    Settings
} from 'lucide-react';

const Sidebar = () => {
    const { user, logout } = useAuth();

    const getLinks = (role) => {
        switch (role) {
            case 'customer':
                return [
                    { to: '/customer', icon: <LayoutDashboard size={20} />, label: 'Services' },
                    { to: '/customer/orders', icon: <ShoppingBag size={20} />, label: 'My Orders' },
                    { to: '/customer/wallet', icon: <CreditCard size={20} />, label: 'Wallet' },
                ];
            case 'staff':
                return [
                    { to: '/staff', icon: <ClipboardList size={20} />, label: 'Active Orders' },
                    { to: '/staff/invoice', icon: <Users size={20} />, label: 'Customer Invoice' },
                ];
            case 'admin':
                return [
                    { to: '/admin', icon: <LayoutDashboard size={20} />, label: 'Overview' },
                    { to: '/admin/users', icon: <Users size={20} />, label: 'Manage Users' },
                    { to: '/admin/settings', icon: <Settings size={20} />, label: 'System' },
                ];
            default:
                return [];
        }
    };

    const links = getLinks(user?.role);

    return (
        <aside className="w-64 glass-panel h-screen fixed left-0 top-0 flex flex-col border-r border-r-[var(--glass-border)] rounded-none z-50">
            <div className="p-6 border-b border-[var(--glass-border)]">
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                    Dobi.
                </h1>
                <p className="text-xs text-[var(--text-muted)] mt-1">Premium Laundry POS</p>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {links.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        end={link.to === '/customer' || link.to === '/staff' || link.to === '/admin'} // Exact match for roots
                        className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
              ${isActive
                                ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.2)]'
                                : 'text-[var(--text-muted)] hover:bg-white/5 hover:text-[var(--text-main)]'}
            `}
                    >
                        {link.icon}
                        <span className="font-medium">{link.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-[var(--glass-border)] bg-black/20">
                <div className="flex items-center gap-3 mb-4 px-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
                        {user?.name?.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate text-white">{user?.name}</p>
                        <p className="text-xs text-[var(--text-muted)] capitalize">{user?.role}</p>
                    </div>
                </div>

                <button
                    onClick={logout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm text-[var(--danger)] hover:bg-[var(--danger)]/10 transition-colors border border-transparent hover:border-[var(--danger)]/20"
                >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
