import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Plus, Minus, ShoppingBag, X, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const CustomerDashboard = () => {
    const { services, createOrder } = useData();
    const { user } = useAuth();
    const [cart, setCart] = useState({}); // { serviceId: quantity }
    const [isProcessing, setIsProcessing] = useState(false);

    const cartTotal = Object.entries(cart).reduce((total, [id, qty]) => {
        const service = services.find(s => s.id === id);
        return total + (service?.price || 0) * qty;
    }, 0);

    const updateCart = (serviceId, delta) => {
        setCart(prev => {
            const current = prev[serviceId] || 0;
            const next = Math.max(0, current + delta);
            if (next === 0) {
                const { [serviceId]: _, ...rest } = prev;
                return rest;
            }
            return { ...prev, [serviceId]: next };
        });
    };

    const handleCheckout = async () => {
        if (Object.keys(cart).length === 0) return;
        setIsProcessing(true);

        // Construct order items
        const items = Object.entries(cart).map(([id, qty]) => {
            const s = services.find(srv => srv.id === id);
            return { serviceId: id, name: s.name, quantity: qty, price: s.price };
        });

        try {
            await createOrder(items, cartTotal);
            setCart({});
            // Success feedback handled by context notification, but we can also show local success
        } catch (err) {
            alert(err.message); // Simple alert for now
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Service Selection */}
            <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">Select Services</h2>
                    <span className="text-sm text-[var(--text-muted)]">Wallet Balance: ${user?.balance?.toFixed(2)}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map(service => (
                        <div key={service.id} className="glass-panel p-5 hover:bg-white/5 transition-colors group relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                {/* Placeholder for Dynamic Icon implementation if needed */}
                            </div>

                            <h3 className="text-lg font-semibold text-white">{service.name}</h3>
                            <p className="text-[var(--text-muted)] text-sm mb-4 h-10">{service.description}</p>

                            <div className="flex items-center justify-between mt-4">
                                <span className="text-[var(--secondary)] font-bold">${service.price.toFixed(2)} <span className="text-xs text-[var(--text-muted)] font-normal">/ {service.unit}</span></span>

                                <div className="flex items-center gap-3 bg-black/30 rounded-lg p-1">
                                    <button
                                        onClick={() => updateCart(service.id, -1)}
                                        className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/10 text-white transition-colors"
                                        disabled={!cart[service.id]}
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="w-4 text-center text-sm font-medium">{cart[service.id] || 0}</span>
                                    <button
                                        onClick={() => updateCart(service.id, 1)}
                                        className="w-8 h-8 flex items-center justify-center rounded-md bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] transition-colors shadow-lg shadow-indigo-500/20"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
                <div className="glass-panel p-6 sticky top-8">
                    <div className="flex items-center gap-2 mb-6">
                        <ShoppingBag className="text-[var(--primary)]" />
                        <h3 className="text-xl font-bold text-white">Current Order</h3>
                    </div>

                    {Object.keys(cart).length === 0 ? (
                        <div className="text-center py-10 text-[var(--text-muted)] border border-dashed border-[var(--glass-border)] rounded-xl">
                            <p>Your cart is empty.</p>
                            <p className="text-xs mt-1">Select services to proceed.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                                {Object.entries(cart).map(([id, qty]) => {
                                    const service = services.find(s => s.id === id);
                                    return (
                                        <div key={id} className="flex justify-between items-center text-sm p-2 bg-white/5 rounded-lg border border-white/5">
                                            <div>
                                                <div className="text-white font-medium">{service.name}</div>
                                                <div className="text-[var(--text-muted)] text-xs">${service.price} x {qty}</div>
                                            </div>
                                            <div className="text-white font-mono">${(service.price * qty).toFixed(2)}</div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="border-t border-[var(--glass-border)] pt-4 space-y-2">
                                <div className="flex justify-between text-[var(--text-muted)]">
                                    <span>Subtotal</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold text-white mt-2">
                                    <span>Total</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleCheckout}
                                disabled={isProcessing}
                                className="w-full btn btn-primary mt-4 py-3 text-lg"
                            >
                                {isProcessing ? 'Processing...' : `Pay $${cartTotal.toFixed(2)}`}
                            </button>

                            {user.balance < cartTotal && (
                                <p className="text-xs text-[var(--danger)] text-center mt-2">
                                    Insufficient balance. Please top up.
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomerDashboard;
