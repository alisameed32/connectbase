import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
// import LocomotiveScroll from 'locomotive-scroll'; // Disabled to fix scroll conflict

const AuthLayout = ({ children, title, subtitle }) => {
  // useEffect(() => {
  //   const scroll = new LocomotiveScroll();
  //   return () => {
  //       if (scroll) scroll.destroy();
  //   }
  // }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-hidden relative">
      <Link 
        to="/" 
        className="absolute top-6 left-6 z-50 flex items-center gap-2 text-sm font-medium transition-colors text-gray-600 hover:text-gray-900 lg:text-white/80 lg:hover:text-white"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Website</span>
      </Link>
      {/* Left Side - Hero/Branding */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white flex-col justify-between p-16"
      >
        {/* Background Patterns */}
        <div className="absolute inset-0 overflow-hidden">
             <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-purple-500/40 rounded-full mix-blend-screen filter blur-[80px] animate-blob"></div>
             <div className="absolute top-[40%] -right-[10%] w-[60%] h-[60%] bg-indigo-500/40 rounded-full mix-blend-screen filter blur-[80px] animate-blob animation-delay-2000"></div>
             <div className="absolute -bottom-[10%] left-[20%] w-[40%] h-[40%] bg-pink-500/30 rounded-full mix-blend-screen filter blur-[80px] animate-blob animation-delay-4000"></div>
        </div>

        {/* Logo Area */}
        <div className="z-10">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 font-bold text-3xl tracking-tight"
          >
            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 shadow-lg">
               <Globe className="w-7 h-7 text-white" />
            </div>
            ConnectBase
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="z-10 max-w-xl">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-5xl font-extrabold mb-6 leading-tight tracking-tight relative"
          >
            Start Your Journey with <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-pink-200">
                ConnectBase
            </span> Today.
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-base text-indigo-100/80 mb-8 leading-relaxed max-w-md"
          >
             Join thousands of developers and teams leveraging our platform to streamline communication and boost productivity.
          </motion.p>
          
          <motion.div 
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.6 }}
             className="space-y-4"
          >
             <div className="flex items-center gap-3 text-indigo-100">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/10">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="font-medium">Effortless Contact Organization</span>
             </div>
             <div className="flex items-center gap-3 text-indigo-100">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/10">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="font-medium">Secure Contact Storage</span>
             </div>
             <div className="flex items-center gap-3 text-indigo-100">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/10">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="font-medium">Smart Contact Insights</span>
             </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="z-10 flex justify-between items-center text-sm text-indigo-200/60 font-medium">
            <span>© {new Date().getFullYear()} ConnectBase Inc.</span>
            <div className="flex gap-6">
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
                <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
        </div>
      </motion.div>

      {/* Right Side - Form Container */}
      <div className="flex-1 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 lg:w-1/2 bg-white relative">
         <motion.div
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.6 }}
           className="w-full max-w-[400px] space-y-4"
         >
            <div className="text-center mb-6">
              <h2 className="text-3xl font-black text-gray-900 tracking-tighter mb-2">
                {title}
              </h2>
              <p className="text-sm text-gray-500 font-medium">
                {subtitle}
              </p>
            </div>
            
            <AnimatePresence mode='wait'>
                {children}
            </AnimatePresence>
         </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;
