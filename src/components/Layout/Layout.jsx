import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
    return (
        <div className="flex min-h-screen bg-[var(--bg-app)] text-[var(--text-main)] overflow-hidden">
            <Sidebar />
            <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen relative">
                {/* Background Gradients */}
                <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
                    <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-[-10%] left-[20%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px]"></div>
                </div>

                <div className="relative z-10 max-w-6xl mx-auto animate-fade-in">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
