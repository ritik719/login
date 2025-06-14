import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Menu, X, LogOut, Home } from 'lucide-react';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (loggedInUser) {
      setUser(loggedInUser);
      setAllUsers(users);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* Top Navbar */}
      <nav className="bg-[#40156a] text-white flex items-center justify-between px-4 py-3 fixed top-0 left-0 w-full z-50">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:underline flex items-center gap-1">
            <Home size={18} />
            Home
          </Link>
          <div className="text-right">
            <p className="font-semibold">{user?.firstName} {user?.lastName}</p>
            <p className="text-sm">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-purple-700 hover:bg-purple-800 px-3 py-1 rounded flex items-center gap-1"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Animated Mobile Dropdown */}
      <div
        className={`md:hidden bg-[#40156a] text-white px-4 py-3 absolute top-[56px] w-full z-40 transition-all duration-300 origin-top ${
          menuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'
        }`}
        style={{ transformOrigin: 'top' }}
      >
        <Link to="/" className="block py-1 hover:underline">
          Home
        </Link>
        <div className="mt-2">
          <p className="font-semibold">{user?.firstName} {user?.lastName}</p>
          <p className="text-sm">{user?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-purple-700 hover:bg-purple-800 px-3 py-2 mt-3 rounded flex items-center gap-1"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>

      {/* Main Content (with navbar offset) */}
      <main className="pt-20 px-4 md:px-10">
        <h2 className="text-2xl md:text-4xl font-bold text-[#40156a] mb-4">
          Welcome{user ? `, ${user.firstName}` : ''}
        </h2>
        <p className="text-gray-600 mb-6 text-base md:text-lg">
          We’re glad to see you back! Here are the other users:
        </p>

        {/* Responsive Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="w-full text-left text-sm sm:text-base">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-3">SR No</th>
                <th className="px-4 py-3">Initials</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
              </tr>
            </thead>
            <tbody>
              {allUsers
                .filter((u) => u.email !== user?.email)
                .map((u, index) => (
                  <tr
                    key={index}
                    className="border-t hover:bg-gray-100 transition"
                  >
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">
                      <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-sm sm:text-lg">
                        {u.firstName[0]}{u.lastName[0]}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium">
                      {u.firstName} {u.lastName}
                    </td>
                    <td className="px-4 py-3">{u.email}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
