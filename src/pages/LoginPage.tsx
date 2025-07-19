import React, { useState } from 'react';
import { BuildingIcon, UserTieIcon, MailIcon, LockClosedIcon } from '../components/icons';
import { useAuth } from '../contexts/AuthContext';
import { User } from '../types';

interface LoginPageProps {
    onLogin: (userId: number) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const { users } = useAuth();
    const [role, setRole] = useState<'admin' | 'contractor'>('admin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLoginAttempt = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.role === role);
        if (user) {
            onLogin(user.id);
        } else {
            setError('Invalid credentials for the selected role.');
        }
    };
    
    // Auto-fill form for demo purposes
    const setCredentials = (selectedRole: 'admin' | 'contractor') => {
        setRole(selectedRole);
        setError('');
        if (selectedRole === 'admin') {
            setEmail('antonio@rca.com');
            setPassword('password123');
        } else {
            setEmail('info@coastal.com');
            setPassword('password123');
        }
    }

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Left Panel */}
            <div className="hidden lg:flex w-1/2 flex-col items-center justify-center bg-slate-800 text-white p-12">
                <BuildingIcon className="w-20 h-20 text-primary" />
                <h1 className="mt-6 text-4xl font-bold font-heading text-center">RCA Practice Manager</h1>
                <p className="mt-2 text-slate-300 text-center">Your unified platform for client, project, and practice management.</p>
            </div>

            {/* Right Panel */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
                <div className="w-full max-w-sm">
                    <div className="lg:hidden text-center mb-8">
                         <BuildingIcon className="w-12 h-12 text-primary mx-auto" />
                         <h1 className="mt-4 text-3xl font-bold font-heading text-slate-800">RCA Manager</h1>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-slate-800 font-heading">Sign in to your account</h2>
                    <p className="text-slate-500 mt-1 mb-6">Welcome back! Please enter your details.</p>

                    <div className="grid grid-cols-2 gap-2 bg-slate-200 p-1 rounded-lg mb-6">
                        <button
                            onClick={() => setCredentials('admin')}
                            className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${role === 'admin' ? 'bg-white text-primary shadow-sm' : 'text-slate-500'}`}
                        >
                            Administrator
                        </button>
                        <button
                            onClick={() => setCredentials('contractor')}
                            className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${role === 'contractor' ? 'bg-white text-primary shadow-sm' : 'text-slate-500'}`}
                        >
                            Contractor / Client
                        </button>
                    </div>

                    <form onSubmit={handleLoginAttempt} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
                            <div className="relative mt-1">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <MailIcon className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full rounded-md border-slate-300 pl-10 shadow-sm focus:border-primary focus:ring-primary"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>
                         <div>
                            <label htmlFor="password"  className="block text-sm font-medium text-slate-700">Password</label>
                            <div className="relative mt-1">
                                 <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <LockClosedIcon className="h-5 w-5 text-slate-400" />
                                </div>
                                <input 
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full rounded-md border-slate-300 pl-10 shadow-sm focus:border-primary focus:ring-primary"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>
                        
                        {error && <p className="text-sm text-danger text-center font-medium">{error}</p>}
                        
                         <p className="text-xs text-slate-400 text-center pt-2">Hint: Any password will work. Credentials are auto-filled for this demo when you select a role.</p>

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center p-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-hover transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
                            disabled={!email || !password}
                        >
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;