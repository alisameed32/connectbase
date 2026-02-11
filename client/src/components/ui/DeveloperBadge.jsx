import React from 'react';

const DeveloperBadge = () => {
    return (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100] bg-white/90 backdrop-blur-sm p-3 sm:p-4 rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.08)] border border-slate-200/60 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_8px_25px_rgb(0,0,0,0.12)] cursor-default">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-0.5">ConnectBase</h3>
            <p className="text-[10px] sm:text-xs text-slate-500 font-medium mb-1">
                Developed by <span className="text-indigo-600 font-bold hover:underline cursor-pointer">Ali Sameed</span>
            </p>
            <p className="text-[10px] text-slate-400 font-medium tracking-wide">
                2026 
            </p>
        </div>
    );
};

// Mobile version that is less intrusive (bottom center or smaller)
// Actually, I'll make the main one responsive.
// Changed hidden sm:block to just block, but maybe scale down on mobile.

export default DeveloperBadge;
