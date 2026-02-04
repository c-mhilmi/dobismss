import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { CreditCard, Wallet as WalletIcon, ArrowUpRight } from 'lucide-react';

const Wallet = () => {
    const { user } = useAuth();
    const { addCredit } = useData();
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);

    const handleTopUp = async (e) => {
        e.preventDefault();
        if (!amount || amount <= 0) return;
        setLoading(true);
        await addCredit(amount);
        setAmount('');
        setLoading(false);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Balance Card */}
            <div className="glass-panel p-8 bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border-indigo-500/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-32 bg-indigo-500/20 blur-[80px] rounded-full point-events-none"></div>

                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8">
                        <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md">
                            <WalletIcon className="text-white h-6 w-6" />
                        </div>
                        <span className="text-indigo-200 text-sm font-medium tracking-wider">PREPAID BALANCE</span>
                    </div>

                    <div className="space-y-1">
                        <h2 className="text-4xl font-bold text-white tracking-tight">${user?.balance?.toFixed(2)}</h2>
                    </div>

                    <div className="mt-8 flex gap-4 text-sm text-indigo-200">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            Active Account
                        </div>
                    </div>
                </div>
            </div>

            {/* Top Up Form */}
            <div className="glass-panel p-8">
                <h3 className="text-xl font-bold text-white mb-6">Add Funds</h3>

                <form onSubmit={handleTopUp} className="space-y-4">
                    <div>
                        <label className="block text-sm text-[var(--text-secondary)] mb-2">Amount ($)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">$</span>
                            <input
                                type="number"
                                min="1"
                                step="0.01"
                                className="input-field pl-8"
                                placeholder="0.00"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-4">
                        {[10, 50, 100].map(val => (
                            <button
                                key={val}
                                type="button"
                                onClick={() => setAmount(val)}
                                className="py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-sm text-[var(--text-muted)] hover:text-white transition-colors"
                            >
                                ${val}
                            </button>
                        ))}
                    </div>

                    <button
                        type="submit"
                        className="w-full btn btn-primary flex justify-between"
                        disabled={loading}
                    >
                        <span>Top Up Now</span>
                        {loading ? <span>Processing...</span> : <ArrowUpRight size={18} />}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Wallet;
