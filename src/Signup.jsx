import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import start from '../assets/startup.png';

function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(user => user.email === formData.email)) {
      newErrors.email = 'Email already exists';
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
    const newUser = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    navigate('/login');
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Image */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gray-100">
        <div className="sticky top-0 h-screen flex items-center justify-center p-8">
          <img src={start} alt="Startup" className="w-lvh h-lvh" />
        </div>
      </div>

      {/* Signup Form */}
      <div className="flex-1 flex items-center justify-center bg-white p-6">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-3xl font-bold text-left mb-6">Create Account</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { name: 'firstName', placeholder: 'First Name' },
              { name: 'lastName', placeholder: 'Last Name' },
              { name: 'email', placeholder: 'Email', type: 'email' },
              { name: 'password', placeholder: 'Password', type: 'password' },
              { name: 'confirmPassword', placeholder: 'Confirm Password', type: 'password' },
            ].map(({ name, placeholder, type = 'text' }) => (
              <div key={name}>
                <input
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-full"
                />
                {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition duration-300"
 >
              Sign Up
            </button>
          </form>
          <p className="text-center mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
