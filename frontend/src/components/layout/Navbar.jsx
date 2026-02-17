import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <nav className="glass-panel sticky top-4 mx-4 z-50 px-6 py-4 mb-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-cta-500 rounded-lg shadow-lg shadow-primary-500/30 flex items-center justify-center text-white font-bold text-lg">
                        T
                    </div>
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-primary-500">
                        TaskFlow
                    </h1>
                </div>

                <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block">
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Welcome back</p>
                        <p className="font-bold text-gray-800">{user?.name}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="btn-secondary text-xs px-4 py-2"
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
