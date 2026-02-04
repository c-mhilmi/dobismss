import React from 'react';
import clsx from 'clsx'; // Assuming clsx is available or I can write a helper

// Simple helper since I can't rely on clsx being installed if build fails but I put it in package.json
const cn = (...classes) => classes.filter(Boolean).join(' ');

const StatusBadge = ({ status }) => {
    const styles = {
        pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
        processing: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
        completed: 'bg-green-500/10 text-green-500 border-green-500/20',
        cancelled: 'bg-red-500/10 text-red-500 border-red-500/20',
    };

    const defaultStyle = 'bg-slate-500/10 text-slate-500 border-slate-500/20';

    return (
        <span className={cn(
            'px-2.5 py-0.5 rounded-full text-xs font-medium border uppercase tracking-wider',
            styles[status] || defaultStyle
        )}>
            {status}
        </span>
    );
};

export default StatusBadge;
