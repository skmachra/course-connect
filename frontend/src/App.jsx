import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Search from './components/Search';
import UserProfile from './components/UserProfile';
import AddCourse from './components/AddCourse';
import Login from './components/Login';
import Home from './components/Home';
import Header from './components/Header';
import Register from './components/Register';
import Footer from './components/Footer';
import VerifyEmail from './components/VerifyEmail';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

const App = () => {
    const [user, setUser] = useState(null);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
        }
    } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        setUser(null);
    }
    }, []);

    const handleLogin = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <Router>
            <div className="container mx-auto">
                <Header user={user} onLogout={handleLogout} />
                <Routes>
                    <Route path="/" element={<Home user={user} />} />
                    <Route path="/login" element={<Login onAuth={handleLogin} />} />
                    <Route path="/register" element={<Register onAuth={handleLogin} />} />
                    <Route path="/verify/:token" element={<VerifyEmail />} />
                    <Route path="/forgotpassword" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/addcourse" element={user ? <AddCourse userId={user._id} /> : <Navigate to="/" />} />
                    <Route path="/profile" element={user ? <UserProfile user={user} /> : <Navigate to="/" />} />
                    <Route path="/search" element={user ? <Search onSearchResults={setSearchResults} /> : <Navigate to="/" />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
