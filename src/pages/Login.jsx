import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shirt } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        try {
            const user = await login(email, password);
            if (user.role === 'admin') navigate('/admin');
            else if (user.role === 'staff') navigate('/staff');
            else navigate('/customer');
        } catch (err) {
            setError('Invalid credentials. Try may@test.com / 123');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="glass-panel p-8 w-full max-w-md relative z-10 animate-fade-in">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 mb-4 shadow-lg shadow-indigo-500/30">
                        <Shirt className="text-white w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">Welcome Back</h2>
                    <p className="text-[var(--text-muted)] mt-2">Sign in to Dobi POS System</p>
                </div>

                {error && (
                    <div className="p-3 mb-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-200 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Email Address</label>
                        <input
                            type="email"
                            className="input-field"
                            placeholder="e.g. may@test.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Password</label>
                        <input
                            type="password"
                            className="input-field"
                            placeholder="••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full btn btn-primary mt-2"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="mt-6 pt-6 border-t border-[var(--glass-border)] text-center text-sm text-[var(--text-muted)]">
                    <p>Demo Accounts:</p>
                    <div className="grid grid-cols-1 gap-1 mt-2 text-xs">
                        <code className="bg-black/30 px-2 py-1 rounded">Customer: may@test.com / 123</code>
                        <code className="bg-black/30 px-2 py-1 rounded">Staff: staff@dobi.com / 123</code>
                        <code className="bg-black/30 px-2 py-1 rounded">Admin: admin@dobi.com / 123</code>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
