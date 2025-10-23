import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import image6 from '../../assets/image6.png';
import './signin.css';
import Header from '../header/header';
import { useSelector } from "react-redux";
import axios from "axios";

const Signin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        emailAddress: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const APIURL = useSelector((state) => state.APIURL?.url);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (error) {
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');

        try {
            // Prepare data for API call
            const loginData = {
                email: formData.emailAddress,
                password: formData.password
            };

            console.log('Submitting login data:', loginData);
            
            // Call the login API
            const response = await axios.post(`${APIURL}/api/login/`, loginData);
            
            console.log('Login successful:', response);
            console.log('Response data:', response.data);
            setSuccess('Login successful! Redirecting...');
            
            // Store auth token if provided
            if (response.data.tokens && response.data.tokens.access) {
                localStorage.setItem('authToken', response.data.tokens.access);
                console.log('Auth token stored:', response.data.tokens.access);
            } else {
                console.log('No auth token in response');
            }
            
            // Store user data if provided
            if (response.data.user) {
                localStorage.setItem('userData', JSON.stringify(response.data.user));
                console.log('User data stored:', response.data.user);
            } else {
                console.log('No user data in response');
            }

            // Clear form
            setFormData({
                emailAddress: '',
                password: ''
            });

            // Check for redirect URL after login
            const redirectUrl = localStorage.getItem('redirectAfterLogin');
            
            // Redirect to home page or stored redirect URL after 1 second
            setTimeout(() => {
                if (redirectUrl) {
                    // Clear the redirect URL from localStorage
                    localStorage.removeItem('redirectAfterLogin');
                    navigate(redirectUrl);
                } else {
                    navigate('/');
                }
            }, 1000);

        } catch (error) {
            console.error('Login error:', error);
            
            // Handle different types of errors
            if (error.response?.data) {
                // Server returned error response
                const errorData = error.response.data;
                if (errorData.email) {
                    setError(`Email: ${errorData.email[0]}`);
                } else if (errorData.password) {
                    setError(`Password: ${errorData.password[0]}`);
                } else if (errorData.non_field_errors) {
                    setError(errorData.non_field_errors[0]);
                } else if (errorData.detail) {
                    setError(errorData.detail);
                } else {
                    setError('Login failed. Please check your credentials.');
                }
            } else if (error.request) {
                // Network error
                setError('Network error. Please check your connection and try again.');
            } else {
                // Other error
                setError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="signin-container">
            {/* Brand Header */}
            <Header/>

            <div style={{
              
                height:"500px",
                
            }} className="signin-content">
                {/* Left Side - Image Collage */}
                <div  className="image-section">
                    <img src={image6} alt="Etomosphere lifestyle collage" className="collage-image" />
                </div>

                {/* Right Side - Login Form */}
                <div className="form-section">
                    <div className="login-form-container">
                        <h1 className="login-title">Login</h1>
                        <p className="login-subtitle">Sign in to your account</p>
                        
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
                        
                        <form className="login-form" onSubmit={handleSubmit}>
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

                            <div className="forgot-password">
                                <a href="#" className="forgot-link">Forgot password?</a>
                            </div>

                            <button type="submit" className="signin-button" disabled={isLoading}>
                                {isLoading ? 'Signing In...' : 'Sign In'}
                            </button>
                        </form>

                        <div className="account-links">
                           
                            <p className="account-text">
                                Don't have an account? <Link to="/signup" className="account-link">Sign up</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="copyright">
                © 2025 Etomosphere. All rights reserved
            </div>
        </div>
    );
};

export default Signin;
