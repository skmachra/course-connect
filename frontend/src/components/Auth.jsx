import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import conf from './conf';

const Auth = ({ onAuth }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');
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
        if(!isLogin){
        if (response.ok) {
            // Redirect to the login page or auto-login here
            alert('Registration successful! Redirecting to login...');
            navigate('/login'); // Redirect to the login page
        } else {
            // Display error message
            setError(data.message || 'Something went wrong!');
        }}
        if (data.message) {
            onAuth(data.user); // Pass user info to parent component
        }
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
        <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            onChange={handleChange} 
            required 
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
            type="submit" 
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 ease-in-out"
        >
            {isLogin ? 'Login' : 'Register'}
        </button>
        <button 
            type="button" 
            onClick={() => setIsLogin(!isLogin)} 
            className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
            Switch to {isLogin ? 'Register' : 'Login'}
        </button>
    </form>
</div>

    );
};

export default Auth;
