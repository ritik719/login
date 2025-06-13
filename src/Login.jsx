import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import start from '../assets/startup.png';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.password) newErrors.password = 'Password is required';

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(
      (user) => user.email === formData.email && user.password === formData.password
    );
    if (!user) {
      newErrors.form = 'Invalid email or password';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(
      (user) => user.email === formData.email && user.password === formData.password
    );
    localStorage.setItem('loggedInUser', JSON.stringify(user));

    navigate('/home');
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Image */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gray-100">
        <div className="sticky top-0 h-screen flex items-center justify-center p-8">
          <img src={start} alt="Startup" className="w-full max-w-md" />
        </div>
      </div>

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center bg-white p-6">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-3xl font-bold text-center mb-6">Welcome back!</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-full"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-full"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            {errors.form && <p className="text-red-500 text-sm text-center">{errors.form}</p>}

            <button
              type="submit"
              className="w-full bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition duration-300"
            >
              Login
            </button>
          </form>
          <p className="text-center mt-4">
            Don&apos;t have an account?{' '}
            <Link to="/" className="text-purple-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
