import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const NavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);

    // Define all functions at the top of the component
    function handleLogout() {
        localStorage.removeItem("User");
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    }

    function handleLogin() {
        navigate("/login");
    }

    function handleSignUp() {
        navigate("/signup");
    }

    function handlePreferences() {
        navigate("/preferences");
    }

    function handleNavigation(path) {
        navigate(path);
    }

    useEffect(() => {
        const storedUser = localStorage.getItem("User");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Determine what buttons to show
    const renderAuthButtons = () => {
        if (user) {
            return (
                <div className="flex items-center gap-4">
                    <p className="text-gray-600">{`Hello ${user.name || user.email}`}</p>
                    <button 
                        onClick={handlePreferences}
                        className="text-gray-600 hover:text-black px-4 py-2 rounded-lg hover:bg-gray-100"
                    >
                        Preferences
                    </button>
                    <button 
                        onClick={handleLogout} 
                        className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800"
                    >
                        Log Out
                    </button>
                </div>
            );
        }
        return (
            <>
                <button 
                    onClick={handleLogin} 
                    className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800"
                >
                    Log In
                </button>
                <button 
                    onClick={handleSignUp} 
                    className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-100"
                >
                    Register
                </button>
            </>
        );
    };

    // Navigation items with active state
    const navItems = [
        { label: 'My Events', path: '/my-events',},
        { label: 'Admin', path: '/admin',  }
    ];

    return (
        <nav className="w-full flex justify-between items-center p-4 bg-white shadow-md">
            {/* Logo and Navigation Links */}
            <div className="flex items-center gap-6">
                <img
                    src="/logo.svg"
                    alt="Campus Event Management Logo"
                    className="h-8 cursor-pointer"
                    onClick={() => navigate('/')}
                />
                <ul className="flex gap-6 text-gray-600 font-medium">
                    {navItems.map((item) => (
                        (!item.requiresAuth || user.isAdmin) && (
                            <li 
                                key={item.path}
                                onClick={() => handleNavigation(item.path)}
                                className={`cursor-pointer hover:text-black transition-colors ${
                                    location.pathname === item.path ? 'text-black' : ''
                                }`}
                            >
                                {item.label}
                            </li>
                        )
                    ))}
                </ul>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2">
                <input
                    type="text"
                    placeholder="Search events..."
                    className="bg-transparent outline-none text-gray-600 w-64"
                />
                <button className="text-gray-500">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>

            {/* Auth Buttons */}
            <div className="flex gap-4">
                {renderAuthButtons()}
            </div>
        </nav>
    );
};

export default NavBar;