import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle2, LogOut, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      setUser(loggedInUser);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
    
      <div className="w-full md:w-64 bg-[#40156a] text-white p-4 flex flex-row md:flex-col justify-between items-center md:items-start gap-4 md:gap-0">
        <div className="w-full">
          <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-8 text-center md:text-left">
            Dashboard
          </h1>
          <div className="flex md:flex-col gap-4 w-full justify-center md:justify-start">
            <Link
              to="/"
              className="flex items-center gap-2 hover:bg-purple-700 p-2 rounded w-full justify-center md:justify-start"
            >
              <Home size={20} /> <span>Home</span>
            </Link>
            <div className="flex items-center gap-2 hover:bg-purple-700 p-2 rounded w-full justify-center md:justify-start cursor-pointer">
              <UserCircle2 size={20} /> <span>Profile</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="bg-purple-700 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-purple-800 transition w-full justify-center md:justify-start"
        >
          <LogOut size={18} /> <span>Logout</span>
        </button>
      </div>

      <div className="flex-1 p-4 md:p-10">
        <h2 className="text-2xl md:text-4xl font-bold text-[#40156a] mb-4">
          Welcome{user ? `, ${user.firstName}` : ''}
        </h2>
        <p className="text-gray-600 text-base md:text-lg mb-6 md:mb-10">
          We’re glad to see you back! Here’s your profile summary:
        </p>

        {user && (
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-md w-full max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                {user.firstName[0]}
                {user.lastName[0]}
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-lg md:text-xl font-semibold">
                  {user.firstName} {user.lastName}
                </h3>
                <p className="text-gray-600 text-sm md:text-base">{user.email}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
