import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import LocomotiveScroll from 'locomotive-scroll';
import { 
    ArrowRight, CheckCircle2, Zap, Shield, Globe, Users, 
    BarChart3, Layout, ChevronDown, ChevronUp, Github, Twitter, Linkedin 
} from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();
    const scrollRef = useRef(null);

    // Initialize Locomotive Scroll
    useEffect(() => {
        // Initialize Locomotive Scroll V5
        const scroll = new LocomotiveScroll({
            lenisOptions: {
                smoothTouch: true,
            }
        });
        
        return () => {
             scroll.destroy();
        }
    }, []);

    return (
        <div className="font-sans text-slate-900 bg-linear-to-br from-slate-50 via-white to-indigo-50/30 overflow-x-hidden selection:bg-indigo-500 selection:text-white">
            {/* Navbar - Fixed outside scroll context */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-indigo-50/50 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <div className="w-8 h-8 bg-linear-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">
                            C
                        </div>
                        ConnectBase
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
                        <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
                        <a href="#pricing" className="hover:text-indigo-600 transition-colors">Pricing</a>
                        <a href="#faq" className="hover:text-indigo-600 transition-colors">FAQ</a>
                    </div>
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => navigate('/auth')}
                            className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors hidden sm:block"
                        >
                            Log in
                        </button>
                        <button 
                            onClick={() => navigate('/auth')}
                            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-full shadow-lg shadow-indigo-500/20 transition-all hover:-translate-y-0.5"
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="relative z-0">


            {/* Hero Section */}
            <section className="relative pt-32 pb-40 overflow-hidden">
                {/* Modern Gradient Background */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-125 h-125 bg-purple-200/30 rounded-full blur-[100px] mix-blend-multiply animate-blob"></div>
                    <div className="absolute top-0 right-1/4 w-125 h-125 bg-indigo-200/30 rounded-full blur-[100px] mix-blend-multiply animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-32 left-1/3 w-125 h-125 bg-pink-200/30 rounded-full blur-[100px] mix-blend-multiply animate-blob animation-delay-4000"></div>
                </div>
                
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-100 shadow-sm text-indigo-700 text-xs font-bold uppercase tracking-wide mb-8 hover:scale-105 transition-transform cursor-default"
                    >
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                        New v2.0 is live
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-6xl md:text-8xl font-black text-slate-900 tracking-tight leading-tight mb-8"
                    >
                        Relationships are <br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-600 via-indigo-600 to-cyan-500 animate-gradient-x">
                            your superpower.
                        </span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto mb-12 leading-relaxed font-medium"
                    >
                        ConnectBase helps forward-thinking teams manage contacts, track interactions, and build stronger networks with zero friction.
                    </motion.p>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6"
                    >
                        <button 
                            onClick={() => navigate('/auth')}
                            className="px-10 py-5 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-bold rounded-2xl shadow-xl shadow-indigo-600/30 transition-all hover:-translate-y-1 hover:shadow-2xl flex items-center gap-3 group"
                        >
                            Start for free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="px-10 py-5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-lg font-bold rounded-2xl transition-all hover:-translate-y-1 hover:shadow-lg hover:border-indigo-100">
                            View Demo
                        </button>
                    </motion.div>

                    {/* Hero Visual */}
                    <motion.div 
                        initial={{ opacity: 0, y: 100, scale: 0.9 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.4, type: "spring" }}
                        className="mt-24 relative mx-auto max-w-6xl"
                    >
                        {/* Gradient Glow Effects */}
                        <div className="absolute -inset-1 bg-linear-to-r from-violet-600 to-indigo-600 rounded-2xl blur opacity-30 animate-pulse"></div>
                        <div className="absolute -top-12 -right-12 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                        
                        {/* Main Dashboard Preview */}
                        <div className="relative rounded-xl bg-white p-6 shadow-2xl overflow-hidden ring-1 ring-slate-900/5 text-left">
                           {/* Header */}
                           <div className="flex justify-between items-center mb-8">
                                <h3 className="text-2xl font-bold text-slate-800">Contacts</h3>
                                <button className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-lg shadow-md shadow-indigo-500/20 flex items-center gap-2">
                                    <span className="text-lg leading-none">+</span> Create contact
                                </button>
                           </div>

                           {/* Toolbar */}
                           <div className="flex gap-4 mb-6">
                                <div className="flex-1 relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    <div className="block w-full pl-10 pr-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-500">Search contacts...</div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="px-4 py-2 border border-slate-200 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-50 flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                                        Import
                                    </button>
                                    <button className="px-4 py-2 border border-slate-200 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-50 flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                        Export
                                    </button>
                                </div>
                           </div>

                           {/* Table Header */}
                           <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-slate-50/50 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                <div className="col-span-3">Name</div>
                                <div className="col-span-3">Email</div>
                                <div className="col-span-2">Phone Number</div>
                                <div className="col-span-2">Job Title</div>
                                <div className="col-span-2 text-right">Actions</div>
                           </div>

                           {/* Table Rows */}
                           <div className="divide-y divide-slate-50">
                                {[
                                    { name: 'John Doe', email: 'john.doe@example.com', phone: '145658656749', role: 'Software Engineer', roleColor: 'bg-indigo-50 text-indigo-700', letters: 'JD', color: 'bg-amber-100 text-amber-700' },
                                    { name: 'Sarah Khan', email: 'sarah.khan@example.com', phone: '9812345678', role: 'Project Manager', roleColor: 'bg-purple-50 text-purple-700', letters: 'SK', color: 'bg-emerald-100 text-emerald-700' },
                                    { name: 'Ali Raza', email: 'ali.raza@example.com', phone: '923001234567', role: 'UI/UX Designer', roleColor: 'bg-blue-50 text-blue-700', letters: 'AR', color: 'bg-pink-100 text-pink-700' },
                                    { name: 'David Smith', email: 'david.smith@example.com', phone: '15551234567', role: 'Business Analyst', roleColor: 'bg-slate-100 text-slate-700', letters: 'DS', color: 'bg-indigo-100 text-indigo-700' },
                                ].map((contact, i) => (
                                    <div key={i} className="grid grid-cols-12 gap-4 px-4 py-4 items-center hover:bg-slate-50 transition-colors cursor-default group">
                                        <div className="col-span-3 flex items-center gap-3">
                                            <div className={`w-9 h-9 rounded-full ${contact.color} flex items-center justify-center text-xs font-bold`}>{contact.letters}</div>
                                            <span className="text-sm font-semibold text-slate-700">{contact.name}</span>
                                        </div>
                                        <div className="col-span-3 text-sm text-slate-500">{contact.email}</div>
                                        <div className="col-span-2 text-sm text-slate-500">{contact.phone}</div>
                                        <div className="col-span-2">
                                            <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${contact.roleColor}`}>
                                                {contact.role}
                                            </span>
                                        </div>
                                        <div className="col-span-2 flex justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                            <div className="w-8 h-8 rounded flex items-center justify-center hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 transition-colors"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg></div>
                                            <div className="w-8 h-8 rounded flex items-center justify-center hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 transition-colors"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></div>
                                            <div className="w-8 h-8 rounded flex items-center justify-center hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></div>
                                        </div>
                                    </div>
                                ))}
                           </div>

                           <div className="px-4 py-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                                Showing 1 to 4 of 4 results
                                <div className="flex gap-1">
                                    <div className="w-8 h-8 border border-slate-200 rounded flex items-center justify-center hover:bg-slate-50">‹</div>
                                    <div className="w-8 h-8 border border-slate-200 rounded flex items-center justify-center hover:bg-slate-50">›</div>
                                </div>
                           </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 bg-white relative overflow-hidden">
                <div 
                    className="absolute -right-64 top-0 w-200 h-200 bg-slate-50/50 rounded-full blur-3xl opacity-50 pointer-events-none" 
                    data-scroll 
                    data-scroll-speed="-2"
                ></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-3">Powerful Features</h2>
                        <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Everything you need to grow</h3>
                        <p className="text-xl text-slate-500 font-medium">ConnectBase includes all the essential tools to managing your professional network without the clutter.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            { icon: Users, title: 'Smart Contact Management', desc: 'Organize contacts with custom fields, tags, and intelligent filtering.' },
                            { icon: Zap, title: 'Instant Collaboration', desc: 'Share lists and notes with your team in real-time. No more silos.' },
                            { icon: Shield, title: 'Enterprise Security', desc: 'Bank-grade encryption keeps your sensitive contact data safe.' },
                            { icon: Globe, title: 'Accessible Anywhere', desc: 'Access your network from any device with our cloud-first platform.' },
                            { icon: BarChart3, title: 'Insightful Analytics', desc: 'Visualize your network growth and interaction patterns.' },
                            { icon: Layout, title: 'Intuitive Interface', desc: 'A user experience designed for speed and simplicity.' },
                        ].map((feature, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all group cursor-default backdrop-blur-sm"
                            >
                                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-indigo-600 transition-colors duration-300 ring-1 ring-slate-100 group-hover:ring-indigo-500">
                                    <feature.icon className="w-8 h-8 text-indigo-600 group-hover:text-white transition-colors duration-300" />
                                </div>
                                <h4 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">{feature.title}</h4>
                                <p className="text-slate-500 leading-relaxed font-medium">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-32 bg-slate-50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-indigo-100/50 via-transparent to-transparent opacity-60"></div>
                
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-24">
                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter">Simple, transparent pricing</h2>
                        <p className="text-xl text-slate-500 font-medium">Start for free, scale as you grow.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
                        {/* Free Tier */}
                        <motion.div 
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative h-fit"
                        >
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Starter</h3>
                            <div className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">$0 <span className="text-lg text-slate-400 font-medium">/mo</span></div>
                            <p className="text-slate-500 mb-8 font-medium">Perfect for individuals just starting out.</p>
                            <button className="w-full py-4 px-4 bg-slate-50 text-slate-700 font-bold rounded-2xl hover:bg-slate-100 transition-colors mb-8 border border-slate-200">Get Started</button>
                            <ul className="space-y-4">
                                {['Up to 500 contacts', 'Basic analytics', 'Community support'].map(item => (
                                    <li key={item} className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                                        <div className="p-1 bg-emerald-100 rounded-full">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Pro Tier */}
                        <motion.div 
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-white p-10 rounded-3xl border-2 border-indigo-600 shadow-2xl shadow-indigo-500/20 relative z-20 scale-105"
                        >
                            <div className="absolute top-0 right-10 -translate-y-1/2 bg-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-lg shadow-indigo-600/30">Most Popular</div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Professional</h3>
                            <div className="text-5xl font-black text-slate-900 mb-4 tracking-tight">$29 <span className="text-lg text-slate-400 font-medium">/mo</span></div>
                            <p className="text-slate-500 mb-8 font-medium">For growing teams that need more power.</p>
                            <button 
                                onClick={() => navigate('/auth')}
                                className="w-full py-4 px-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-600/20 mb-8"
                            >
                                Try Free for 14 Days
                            </button>
                            <ul className="space-y-4">
                                {['Unlimited contacts', 'Advanced reporting', 'Priority support', 'Team sharing', 'API Access'].map(item => (
                                    <li key={item} className="flex items-center gap-3 text-sm text-slate-900 font-bold">
                                        <div className="p-1 bg-indigo-100 rounded-full">
                                            <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Enterprise Tier */}
                        <motion.div 
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative h-fit"
                        >
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Enterprise</h3>
                            <div className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Custom</div>
                            <p className="text-slate-500 mb-8 font-medium">For large organizations with complex needs.</p>
                            <button className="w-full py-4 px-4 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 transition-colors mb-8">Contact Sales</button>
                            <ul className="space-y-4">
                                {['Dedicated account manager', 'SSO & Advanced Security', 'Custom integrations', 'SLA'].map(item => (
                                    <li key={item} className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                                        <div className="p-1 bg-indigo-50 rounded-full">
                                            <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="py-24 bg-white relative z-10">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-12">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {[
                            { q: "Can I import my existing contacts?", a: "Yes! ConnectBase supports CSV import so you can migrate your data in seconds." },
                            { q: "Is my data secure?", a: "Absolutely. We use industry-standard encryption and never sell your data to third parties." },
                            { q: "Can I try before I buy?", a: "Yes, our Professional plan comes with a 14-day free trial. No credit card required." },
                        ].map((faq, idx) => (
                            <FaqItem key={idx} question={faq.q} answer={faq.a} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Modern Footer */}
            <footer className="bg-[#1e1b4b] text-white pt-20 pb-10 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-12 mb-16">
                        <div className="col-span-1 md:col-span-1">
                            <div className="flex items-center gap-2 font-bold text-xl tracking-tight mb-6">
                                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">C</div>
                                ConnectBase
                            </div>
                            <p className="text-indigo-200/80 text-sm leading-relaxed">
                                Empowering teams to build better relationships through intelligent contact management.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-6">Product</h4>
                            <ul className="space-y-4 text-indigo-200/80 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-6">Company</h4>
                            <ul className="space-y-4 text-indigo-200/80 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-6">Legal</h4>
                            <ul className="space-y-4 text-indigo-200/80 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-indigo-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-indigo-300 text-sm">© 2024 ConnectBase Inc. All rights reserved.</p>
                        <div className="flex gap-6">
                           {/* Social Placeholders */}
                           <a href="#" className="text-indigo-300 hover:text-white transition-colors"><Twitter className="w-5 h-5"/></a>
                           <a href="#" className="text-indigo-300 hover:text-white transition-colors"><Github className="w-5 h-5"/></a>
                           <a href="#" className="text-indigo-300 hover:text-white transition-colors"><Linkedin className="w-5 h-5"/></a>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    </div>
    );
};

const FaqItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-left"
            >
                <span className="font-bold text-slate-800">{question}</span>
                {isOpen ? <ChevronUp className="w-5 h-5 text-indigo-600" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>
            <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="p-6 pt-0 text-slate-500 text-sm leading-relaxed">
                    {answer}
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
