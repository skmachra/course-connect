import { Link } from 'react-router-dom';

const Home = ({ user }) => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-md w-full relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-500 opacity-50 rounded-lg"></div>
                <div className="relative z-10">
                    {user ? (
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Welcome back, {user.name}!</h1>
                            <p className="mt-4 text-gray-800">Ready to search for courses?</p>
                            <div className="mt-4 relative z-10">
                                <Link to="/search" className="bg-white text-blue-500 border border-blue-500 p-2 rounded hover:bg-blue-500 hover:text-white transition duration-200">
                                    Go to Search
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Welcome to CourseConnect!</h1>
                            <p className="mt-4 text-gray-800">Please login or register to access course materials and connect with others.</p>
                            <div className="mt-4 relative z-10">
                                <Link to="/login" className="bg-white text-blue-500 border border-blue-500 p-2 rounded hover:bg-blue-500 hover:text-white transition duration-200">
                                    Login
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
