import React, { useState } from 'react';
import { FaSignInAlt, FaUsers, FaUserTie, FaChevronLeft } from 'react-icons/fa';
import { LogoIcon } from '../components/icons';
import { useAuth } from '../contexts/AuthContext';

interface LoginPageProps {
    onLogin: (userId: number) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const { users } = useAuth();
    const [loginRole, setLoginRole] = useState<'admin' | 'contractor' | null>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLoginAttempt = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.role === loginRole);
        if (user) {
            // Password check is skipped for this simulation
            onLogin(user.id);
        } else {
            setError('Invalid credentials for the selected role.');
        }
    };
    
    const handleRoleSelect = (role: 'admin' | 'contractor') => {
        setLoginRole(role);
        setError('');
        setEmail('');
        setPassword('');
    }
    
    const handleBack = () => {
        setLoginRole(null);
        setError('');
    }

    if (!loginRole) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
                <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl text-center">
                    <LogoIcon className="w-24 h-24 mx-auto text-primary mb-4" />
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-800 font-heading">Rosado Commercial Advisors</h1>
                    <p className="text-slate-500 mt-2 mb-8">Please select your role to continue.</p>
                    <div className="space-y-4">
                        <button
                            onClick={() => handleRoleSelect('admin')}
                            className="w-full flex items-center justify-center gap-3 p-4 bg-primary text-white rounded-lg shadow-sm hover:bg-primary-hover transition-all duration-200"
                        >
                            <FaUserTie className="w-6 h-6" />
                            <span className="font-semibold text-lg">Login as Administrator</span>
                        </button>
                        <button
                            onClick={() => handleRoleSelect('contractor')}
                            className="w-full flex items-center justify-center gap-3 p-4 bg-secondary text-white rounded-lg shadow-sm hover:bg-slate-600 transition-all duration-200"
                        >
                             <FaUsers className="w-6 h-6" />
                            <span className="font-semibold text-lg">Login as Contractor</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
         <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl relative">
                <button onClick={handleBack} className="absolute top-4 left-4 flex items-center text-sm font-medium text-slate-500 hover:text-primary">
                    <FaChevronLeft className="w-5 h-5"/>
                    Back
                </button>
                <div className="text-center mb-8">
                    {loginRole === 'admin' ? <FaUserTie className="w-16 h-16 mx-auto text-primary mb-3" /> : <FaUsers className="w-16 h-16 mx-auto text-secondary mb-3" />}
                    <h1 className="text-3xl font-bold text-slate-800 font-heading capitalize">{loginRole} Login</h1>
                </div>
                
                <form onSubmit={handleLoginAttempt} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
                        <input 
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-primary focus:border-primary"
                            placeholder={loginRole === 'admin' ? 'moni@rosado.com' : 'info@coastal.com'}
                            required
                        />
                    </div>
                     <div>
                        <label htmlFor="password"  className="block text-sm font-medium text-slate-700">Password</label>
                        <input 
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-primary focus:border-primary"
                            placeholder="••••••••"
                            required
                        />
                         <p className="mt-1 text-xs text-slate-400">Hint: Any password will work for the simulation.</p>
                    </div>
                    
                    {error && <p className="text-sm text-danger text-center">{error}</p>}

                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 p-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-hover transition-colors disabled:bg-slate-400"
                        disabled={!email || !password}
                    >
                        <FaSignInAlt className="w-5 h-5" />
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;