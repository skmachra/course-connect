import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ user, onLogout }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-blue-600 p-4 text-white shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <h1 className="text-2xl font-bold">
                    <Link to="/" className="hover:text-gray-200 transition duration-200">Course Connect</Link>
                </h1>

                {/* Mobile Menu Toggle Button */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-white focus:outline-none">
                        {isMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-6">
                    {user ? (
                        <>
                            <li>
                                <Link to="/" className="hover:text-gray-200 transition duration-200">Home</Link>
                            </li>
                            <li>
                                <Link to="/search" className="hover:text-gray-200 transition duration-200">Search</Link>
                            </li>
                            <li>
                                <Link to="/addcourse" className="hover:text-gray-200 transition duration-200">Add Course</Link>
                            </li>
                            <li>
                                <button onClick={onLogout} className="hover:text-gray-200 transition duration-200">Logout</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/" className="hover:text-gray-200 transition duration-200">Home</Link>
                            </li>
                            <li>
                                <Link to="/login" className="hover:text-gray-200 transition duration-200">Login</Link>
                            </li>
                            <li>
                                <Link to="/register" className="hover:text-gray-200 transition duration-200">Register</Link>
                            </li>
                        </>
                    )}
                </ul>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <ul className="flex flex-col space-y-4 md:hidden absolute bg-blue-600 w-full left-0 top-16 text-center">
                        {user ? (
                            <>
                                <li>
                                    <Link to="/" className="hover:text-gray-200 transition duration-200 block py-2">Home</Link>
                                </li>
                                <li>
                                    <Link to="/search" className="hover:text-gray-200 transition duration-200 block py-2">Search</Link>
                                </li>
                                <li>
                                    <Link to="/addcourse" className="hover:text-gray-200 transition duration-200 block py-2">Add Course</Link>
                                </li>
                                <li>
                                    <button onClick={onLogout} className="hover:text-gray-200 transition duration-200 block py-2">Logout</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/" className="hover:text-gray-200 transition duration-200 block py-2">Home</Link>
                                </li>
                                <li>
                                    <Link to="/login" className="hover:text-gray-200 transition duration-200 block py-2">Login</Link>
                                </li>
                                <li>
                                    <Link to="/register" className="hover:text-gray-200 transition duration-200 block py-2">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Header;

