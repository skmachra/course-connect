import { Link } from 'react-router-dom';

const Header = ({ user, onLogout }) => {
    return (
        <nav className="bg-blue-600 p-4 text-white shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <h1 className="text-2xl font-bold">
                    <Link to="/" className="hover:text-gray-200 transition duration-200">Course Connect</Link>
                </h1>
                <ul className="flex space-x-6">
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
                                <button onClick={onLogout} className="hover:text-gray-200 transition duration-200">
                                    Logout
                                </button>
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
            </div>
        </nav>
    );
};

export default Header;
