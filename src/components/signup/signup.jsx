import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './signup.css';
import Header from '../header/header';
import { authAPI } from '../../services/api';
import { useSelector } from "react-redux";
import axios from "axios";
import Footer from '../footer/footer';


const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        phoneNumber: '',
        emailAddress: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');


    const APIURL = useSelector((state) => state.APIURL?.url);

    console.log(APIURL,"api url")

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');
      
        const data = {
          first_name: formData.firstName?.trim(),
          phone: formData.phoneNumber?.trim(),
          email: formData.emailAddress?.trim(),
          password: formData.password,
        };
      
        try {
          const res = await axios.post(`${APIURL}/api/register/`, data, {
            headers: { 'Content-Type': 'application/json' },
            // with JWT you do NOT need withCredentials or CSRF here
          });
      
          if (res.status === 201 || res.status === 200) {
            const { user, tokens, message } = res.data || {};
      
            if (tokens?.access) localStorage.setItem('access_token', tokens.access);
            if (tokens?.refresh) localStorage.setItem('refresh_token', tokens.refresh);
      
            setSuccess(message || 'Account created successfully! Redirecting to sign in...');
            setFormData({ firstName: '', phoneNumber: '', emailAddress: '', password: '' });
      
            setTimeout(() => navigate('/signin'), 1500);
          } else {
            setError('Registration failed. Please try again.');
          }
        } catch (err) {
          console.error('Registration error:', err);
          const data = err.response?.data;
      
          if (data) {
            if (data.email?.[0]) return setError(`Email: ${data.email[0]}`);
            if (data.phone?.[0]) return setError(`Phone: ${data.phone[0]}`);
            if (data.username?.[0]) return setError(`Username: ${data.username[0]}`);
            if (data.password?.[0]) return setError(`Password: ${data.password[0]}`);
            if (data.detail) return setError(data.detail);
            if (typeof data === 'string') return setError(data);
            return setError('Registration failed. Please check your details.');
          }
      
          if (err.request) {
            setError('Network error. Please check your connection and try again.');
          } else {
            setError('An unexpected error occurred. Please try again.');
          }
        } finally {
          setIsLoading(false);
        }
      };
      
      

    return (
        <div className="signup-container">
            <Header/>

            <div style={{
               marginTop:"2px",
                width:"777px",
                height:"590px",

            }} className="signup-card">
                <h1 className="signup-title">Create an Account</h1>
                
                {/* Error Message */}
                {error && (
                    <div className="error-message-container">
                        <p className="error-message-text">{error}</p>
                    </div>
                )}

                {/* Success Message */}
                {success && (
                    <div className="success-message-container">
                        <p className="success-message-text">{success}</p>
                    </div>
                )}
                
                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <input
                       
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="Enter first name"
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            placeholder="Enter phone number"
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="emailAddress" className="form-label">Email Address</label>
                        <input
                            type="email"
                            id="emailAddress"
                            name="emailAddress"
                            value={formData.emailAddress}
                            onChange={handleInputChange}
                            placeholder="Enter email address"
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Enter password"
                            className="form-input"
                            required
                        />
                    </div>

                    <button type="submit" className="signup-button" disabled={isLoading}>
                        {isLoading ? 'Creating Account...' : 'Create an Account'}
                    </button>
                </form>

                <p className="login-link">
                    Already have an account? <Link to="/signin" className="signin-link">Sign in</Link>
                </p>
                
            </div>

            <div className="copyright">
                © 2025 Etomosphere. All rights reserved
            </div>
            <Footer/>
        </div>
    );
};

export default Signup;
