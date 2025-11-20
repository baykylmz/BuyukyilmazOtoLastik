import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import LanguageSwitcher from '../components/LanguageSwitcher';
import ThemeToggle from '../components/ThemeToggle';

interface LoginFormData {
  email: string;
  password: string;
}

interface SignupFormData {
  name: string;
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [signupData, setSignupData] = useState<SignupFormData>({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const validateName = (name: string): boolean => {
    return name.length >= 2;
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: {[key: string]: string} = {};

    if (!validateEmail(loginData.email)) {
      newErrors.loginEmail = t('auth.validation.invalidEmail');
    }
    if (!validatePassword(loginData.password)) {
      newErrors.loginPassword = t('auth.validation.passwordTooShort');
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      await login(loginData.email, loginData.password);
      // Redirect to the main application
      navigate('/tires');
    } catch (error) {
      console.error('Login error:', error);
      setErrors({
        general: t('auth.validation.loginFailed')
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: {[key: string]: string} = {};

    if (!validateName(signupData.name)) {
      newErrors.signupName = t('auth.validation.nameTooShort');
    }
    if (!validateEmail(signupData.email)) {
      newErrors.signupEmail = t('auth.validation.invalidEmail');
    }
    if (!validatePassword(signupData.password)) {
      newErrors.signupPassword = t('auth.validation.passwordTooShort');
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      await signup(signupData.name, signupData.email, signupData.password);
      // Redirect to the main application after successful signup
      navigate('/tires');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Signup error:', err);
      // Handle specific error messages from the backend
      if (err.response?.data?.message) {
        setErrors({
          general: err.response.data.message
        });
      } else if (err.response?.status === 409) {
        setErrors({
          general: t('auth.validation.emailExists')
        });
      } else {
        setErrors({
          general: t('auth.validation.signupFailed')
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginChange = (field: keyof LoginFormData, value: string) => {
    setLoginData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[`login${field.charAt(0).toUpperCase() + field.slice(1)}`]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`login${field.charAt(0).toUpperCase() + field.slice(1)}`];
        return newErrors;
      });
    }
  };

  const handleSignupChange = (field: keyof SignupFormData, value: string) => {
    setSignupData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[`signup${field.charAt(0).toUpperCase() + field.slice(1)}`]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`signup${field.charAt(0).toUpperCase() + field.slice(1)}`];
        return newErrors;
      });
    }
  };

  const switchTab = (tab: 'login' | 'signup') => {
    setActiveTab(tab);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Enhanced Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-blue-400/10 dark:to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-500/20 to-pink-500/20 dark:from-purple-400/10 dark:to-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 dark:from-cyan-400/5 dark:to-blue-400/5 rounded-full blur-2xl animate-pulse delay-500"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-br from-green-500/10 to-cyan-500/10 dark:from-green-400/5 dark:to-cyan-400/5 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]"></div>

      {/* Enhanced Header */}
      <div className="relative sm:mx-auto sm:w-full sm:max-w-md animate-fadeIn">
        <div className="flex justify-center items-center space-x-4 mb-8">
          <Link to="/" className="text-3xl font-bold bg-gradient-to-r from-primary-600 via-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-primary-700 hover:via-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
            {t('public.companyName')}
          </Link>
          <div className="flex items-center space-x-2 p-2 rounded-full bg-white/10 dark:bg-slate-800/30 backdrop-blur-sm border border-white/20 dark:border-slate-700/50">
            <ThemeToggle variant="icon" />
            <LanguageSwitcher />
          </div>
        </div>
        
        {/* Welcome message with typing animation effect */}
        <div className="text-center space-y-3">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-slate-800 via-blue-800 to-slate-800 dark:from-white dark:via-blue-200 dark:to-white bg-clip-text text-transparent animate-slideInDown">
            {t('auth.title')}
          </h2>
          <p className="text-lg text-muted-foreground dark:text-slate-400 animate-slideInUp animate-delay-200">
            {activeTab === 'login' ? t('auth.login.subtitle') : t('auth.signup.subtitle')}
          </p>
        </div>

        {/* Trust indicators */}
        <div className="flex justify-center items-center space-x-6 mt-6 animate-fadeIn animate-delay-400">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground dark:text-slate-400">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>{t('auth.secure')}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground dark:text-slate-400">
            <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>{t('auth.instant')}</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mt-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700/50 p-8 animate-slideInUp animate-delay-600">
          {/* Tab Buttons */}
          <div className="flex space-x-1 mb-6 bg-slate-100 dark:bg-slate-700 rounded-xl p-1">
            <button
              onClick={() => switchTab('login')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'login'
                  ? 'bg-white dark:bg-slate-600 text-primary-600 dark:text-primary-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {t('auth.login.title')}
            </button>
            <button
              onClick={() => switchTab('signup')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'signup'
                  ? 'bg-white dark:bg-slate-600 text-primary-600 dark:text-primary-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {t('auth.signup.title')}
            </button>
          </div>

          {/* Login Form */}
          {activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="login-email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  {t('auth.login.email')} *
                </label>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={loginData.email}
                  onChange={(e) => handleLoginChange('email', e.target.value)}
                  placeholder={t('auth.placeholders.email')}
                  className={`
                    w-full px-4 py-3 rounded-xl border-2 transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-primary-500/20
                    ${errors.loginEmail 
                      ? 'border-red-300 focus:border-red-500 bg-red-50 dark:bg-red-900/20' 
                      : 'border-slate-200 dark:border-slate-600 focus:border-primary-500 bg-white dark:bg-slate-700'
                    }
                    dark:text-slate-100 dark:placeholder-slate-400
                  `}
                  disabled={isLoading}
                />
                {errors.loginEmail && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.loginEmail}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="login-password" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  {t('auth.login.password')} *
                </label>
                <input
                  id="login-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={loginData.password}
                  onChange={(e) => handleLoginChange('password', e.target.value)}
                  placeholder={t('auth.placeholders.password')}
                  className={`
                    w-full px-4 py-3 rounded-xl border-2 transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-primary-500/20
                    ${errors.loginPassword 
                      ? 'border-red-300 focus:border-red-500 bg-red-50 dark:bg-red-900/20' 
                      : 'border-slate-200 dark:border-slate-600 focus:border-primary-500 bg-white dark:bg-slate-700'
                    }
                    dark:text-slate-100 dark:placeholder-slate-400
                  `}
                  disabled={isLoading}
                />
                {errors.loginPassword && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.loginPassword}</p>
                )}
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('auth.login.signingIn')}
                  </div>
                ) : (
                  t('auth.login.button')
                )}
              </button>
            </form>
          )}

          {/* Signup Form */}
          {activeTab === 'signup' && (
            <form onSubmit={handleSignupSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="signup-name" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  {t('auth.signup.name')} *
                </label>
                <input
                  id="signup-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={signupData.name}
                  onChange={(e) => handleSignupChange('name', e.target.value)}
                  placeholder={t('auth.placeholders.name')}
                  className={`
                    w-full px-4 py-3 rounded-xl border-2 transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-primary-500/20
                    ${errors.signupName 
                      ? 'border-red-300 focus:border-red-500 bg-red-50 dark:bg-red-900/20' 
                      : 'border-slate-200 dark:border-slate-600 focus:border-primary-500 bg-white dark:bg-slate-700'
                    }
                    dark:text-slate-100 dark:placeholder-slate-400
                  `}
                  disabled={isLoading}
                />
                {errors.signupName && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.signupName}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="signup-email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  {t('auth.signup.email')} *
                </label>
                <input
                  id="signup-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={signupData.email}
                  onChange={(e) => handleSignupChange('email', e.target.value)}
                  placeholder={t('auth.placeholders.email')}
                  className={`
                    w-full px-4 py-3 rounded-xl border-2 transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-primary-500/20
                    ${errors.signupEmail 
                      ? 'border-red-300 focus:border-red-500 bg-red-50 dark:bg-red-900/20' 
                      : 'border-slate-200 dark:border-slate-600 focus:border-primary-500 bg-white dark:bg-slate-700'
                    }
                    dark:text-slate-100 dark:placeholder-slate-400
                  `}
                  disabled={isLoading}
                />
                {errors.signupEmail && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.signupEmail}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="signup-password" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  {t('auth.signup.password')} *
                </label>
                <input
                  id="signup-password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={signupData.password}
                  onChange={(e) => handleSignupChange('password', e.target.value)}
                  placeholder={t('auth.placeholders.password')}
                  className={`
                    w-full px-4 py-3 rounded-xl border-2 transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-primary-500/20
                    ${errors.signupPassword 
                      ? 'border-red-300 focus:border-red-500 bg-red-50 dark:bg-red-900/20' 
                      : 'border-slate-200 dark:border-slate-600 focus:border-primary-500 bg-white dark:bg-slate-700'
                    }
                    dark:text-slate-100 dark:placeholder-slate-400
                  `}
                  disabled={isLoading}
                />
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{t('auth.signup.passwordHint')}</p>
                {errors.signupPassword && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.signupPassword}</p>
                )}
              </div>

              {/* Signup Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('auth.signup.creating')}
                  </div>
                ) : (
                  t('auth.signup.button')
                )}
              </button>
            </form>
          )}

          {/* General Error */}
          {errors.general && (
            <div className={`mt-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 ${activeTab === 'signup' && errors.general === t('auth.signup.success') ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : ''}`}>
              <div className="flex">
                {activeTab === 'signup' && errors.general === t('auth.signup.success') ? (
                  <svg className="h-5 w-5 text-green-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-red-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
                <div className="ml-3">
                  <p className={`text-sm ${activeTab === 'signup' && errors.general === t('auth.signup.success') ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}`}>{errors.general}</p>
                </div>
              </div>
            </div>
          )}

          {/* Back to Home Link */}
          <div className="mt-6 text-center">
            <Link 
              to="/" 
              className="inline-flex items-center text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {t('auth.backToHome')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 