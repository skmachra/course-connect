import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import conf from './conf';

const Login = ({ onAuth }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');
    const [showResend, setShowResend] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        yearOfStudy: '',
        branch: '',
        courses: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `${conf.apiUrl}/api/users/${isLogin ? 'login' : 'register'}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (response.ok) {
            navigate('/');
        } else {
            switch (response.status) {
                case 401:
                    setError(data.error || 'Invalid email or password.');
                    break;
                case 403:
                    setError(data.error || 'Access forbidden. Please verify your email.');
                    setShowResend(true);
                    break;
                case 500:
                    setError(data.error || 'Internal server error. Please try again later.');
                    break;
                default:
                    setError('An unexpected error occurred. Please try again.');
                    break;
            }
        }
        if (data.message) {
            onAuth(data.user);
        }
    };

    const handleResendVerification = async () => {
        const response = await fetch(`${conf.apiUrl}/api/users/resend-verification`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert('Verification email resent. Please check your inbox.');
        } else {
            alert('Failed to resend verification email.');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">{isLogin ? 'Login' : 'Register'}</h2>
                {!isLogin && (
                    <>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Name" 
                            onChange={handleChange} 
                            required 
                            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input 
                            type="text" 
                            name="yearOfStudy" 
                            placeholder="Year of Study" 
                            onChange={handleChange} 
                            required 
                            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input 
                            type="text" 
                            name="branch" 
                            placeholder="Branch" 
                            onChange={handleChange} 
                            required 
                            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </>
                )}
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    onChange={handleChange} 
                    required 
                    className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="relative">
                    <input 
                        type={showPassword ? 'text' : 'password'} 
                        name="password" 
                        placeholder="Password"
                        onChange={handleChange} 
                        className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button 
                        type="button" 
                        onClick={togglePasswordVisibility} 
                        className="absolute right-3 top-3 focus:outline-none"
                    >
                        <img 
                            src={showPassword ?'https://cdn-icons-png.flaticon.com/512/159/159604.png' : 'https://cdn-icons-png.flaticon.com/512/10812/10812267.png'} 
                            alt="Toggle Password Visibility" 
                            className="w-5 h-5"
                        />
                    </button>
                </div>
                <button 
                    type="submit" 
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 ease-in-out"
                >
                    {isLogin ? 'Login' : 'Register'}
                </button>
                {error && <div className="text-red-600 mb-4">{error}</div>}
                {showResend && (
                    <div>
                        <button 
                            onClick={handleResendVerification}
                            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 ease-in-out"
                        >
                            Resend Verification Email
                        </button>
                    </div>
                )}
                <div className="flex justify-between mt-4">
                    <button 
                        type="button" 
                        onClick={() => navigate('/forgotpassword')}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                        Forgot Password?
                    </button>
                    <button 
                        type="button" 
                        onClick={() => navigate('/register')} 
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                        Switch to {isLogin ? 'Register' : 'Login'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
