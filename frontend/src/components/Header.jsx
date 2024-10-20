import { Link } from 'react-router-dom';

const Header = ({ user, onLogout }) => {
    return (
        <nav className="bg-blue-600 p-4 text-white shadow-md">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                {/* Logo */}
                <h1 className="text-2xl font-bold mb-4 md:mb-0">
                    <Link to="/" className="hover:text-gray-200 transition duration-200">Course Connect</Link>
                </h1>
                <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
                    {user ? (
                        <>
                            <li>
                                <Link to="/" className="hover:text-gray-200 transition duration-200 px-4 py-2">Home</Link>
                            </li>
                            <li>
                                <Link to="/search" className="hover:text-gray-200 transition duration-200 px-4 py-2">Search</Link>
                            </li>
                            <li>
                                <Link to="/addcourse" className="hover:text-gray-200 transition duration-200 px-4 py-2">Add Course</Link>
                            </li>
                            <li>
                                <button onClick={onLogout} className="hover:text-gray-200 transition duration-200 px-4 py-2">
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/" className="hover:text-gray-200 transition duration-200 px-4 py-2">Home</Link>
                            </li>
                            <li>
                                <Link to="/login" className="hover:text-gray-200 transition duration-200 px-4 py-2">Login</Link>
                            </li>
                            <li>
                                <Link to="/register" className="hover:text-gray-200 transition duration-200 px-4 py-2">Register</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Header;

