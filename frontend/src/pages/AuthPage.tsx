import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import LanguageSwitcher from '../components/LanguageSwitcher';
import ThemeToggle from '../components/ThemeToggle';

interface FormData {
  email: string;
  password: string;
  name?: string;
}

const AuthPage: React.FC = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState<FormData>({
    email: '',
    password: ''
  });
  const [signupData, setSignupData] = useState<FormData>({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Set initial tab based on URL parameter
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'signup') {
      setActiveTab('signup');
    } else if (tab === 'login') {
      setActiveTab('login');
    }
  }, [searchParams]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const validateName = (name: string): boolean => {
    return name.trim().length >= 2;
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

    if (!validateName(signupData.name || '')) {
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
      // Mock successful signup - in real app this would call signup service
      console.log('Signup attempt:', signupData);
      
      // Show success message and switch to login
      alert(t('auth.signup.success'));
      setActiveTab('login');
      
      // Pre-fill email in login form
      setLoginData(prev => ({ ...prev, email: signupData.email }));
      
      // Reset signup form
      setSignupData({ name: '', email: '', password: '' });
    } catch (error) {
      console.error('Signup error:', error);
      setErrors({
        general: t('auth.validation.signupFailed')
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginChange = (field: keyof FormData, value: string) => {
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

  const handleSignupChange = (field: keyof FormData, value: string) => {
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
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
            </svg>
            <span>{t('auth.instant')}</span>
          </div>
        </div>
      </div>

      <div className="relative mt-12 sm:mx-auto sm:w-full sm:max-w-6xl animate-slideInUp animate-delay-600">
        <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl dark:shadow-black/40 border border-white/20 dark:border-slate-700/50 py-10 px-6 sm:px-12 overflow-hidden">
          {/* Card background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-blue-50/30 to-purple-50/50 dark:from-slate-800/50 dark:via-blue-900/20 dark:to-purple-900/30"></div>
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
          {/* Tab Switcher - Both Mobile and Desktop */}
          <div className="mb-8">
            <div className="flex max-w-md mx-auto bg-muted dark:bg-slate-800/50 rounded-lg p-1 border dark:border-slate-700/50">
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === 'login'
                    ? 'bg-card text-primary-600 shadow-sm dark:bg-slate-700 dark:text-blue-400 dark:shadow-blue-500/20'
                    : 'text-muted-foreground hover:text-foreground dark:hover:text-slate-300'
                }`}
              >
                {t('auth.login.title')}
              </button>
              <button
                onClick={() => setActiveTab('signup')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === 'signup'
                    ? 'bg-card text-primary-600 shadow-sm dark:bg-slate-700 dark:text-blue-400 dark:shadow-blue-500/20'
                    : 'text-muted-foreground hover:text-foreground dark:hover:text-slate-300'
                }`}
              >
                {t('auth.signup.title')}
              </button>
            </div>
          </div>

          {/* General Error Display */}
          {errors.general && (
            <div className="max-w-md mx-auto mb-6">
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md dark:bg-red-900/20 dark:border-red-800 dark:text-red-300">
                {errors.general}
              </div>
            </div>
          )}

          {/* Single Form Layout - Both Desktop and Mobile */}
          <div className="max-w-md mx-auto">
            {activeTab === 'login' ? (
              <form className="space-y-6" onSubmit={handleLoginSubmit}>
                <div>
                  <label htmlFor="login-email" className="label dark:text-slate-300">
                    {t('auth.login.email')} <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      id="login-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={loginData.email}
                      onChange={(e) => handleLoginChange('email', e.target.value)}
                      className={`input dark:bg-slate-800/50 dark:border-slate-600 dark:focus:border-blue-400 dark:focus:ring-blue-400/20 ${
                        errors.loginEmail ? 'ring-destructive dark:ring-red-400' : ''
                      }`}
                      placeholder={t('auth.placeholders.email')}
                    />
                    {errors.loginEmail && (
                      <p className="mt-1 text-sm text-destructive dark:text-red-400">{errors.loginEmail}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="login-password" className="label dark:text-slate-300">
                    {t('auth.login.password')} <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      id="login-password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={loginData.password}
                      onChange={(e) => handleLoginChange('password', e.target.value)}
                      className={`input dark:bg-slate-800/50 dark:border-slate-600 dark:focus:border-blue-400 dark:focus:ring-blue-400/20 ${
                        errors.loginPassword ? 'ring-destructive dark:ring-red-400' : ''
                      }`}
                      placeholder={t('auth.placeholders.password')}
                    />
                    {errors.loginPassword && (
                      <p className="mt-1 text-sm text-destructive dark:text-red-400">{errors.loginPassword}</p>
                    )}
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary w-full dark:shadow-blue-500/20 hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Loading...</span>
                      </div>
                    ) : (
                      t('auth.login.button')
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <form className="space-y-6" onSubmit={handleSignupSubmit}>
                <div>
                  <label htmlFor="signup-name" className="label dark:text-slate-300">
                    {t('auth.signup.name')} <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      id="signup-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={signupData.name}
                      onChange={(e) => handleSignupChange('name', e.target.value)}
                      className={`input dark:bg-slate-800/50 dark:border-slate-600 dark:focus:border-blue-400 dark:focus:ring-blue-400/20 ${
                        errors.signupName ? 'ring-destructive dark:ring-red-400' : ''
                      }`}
                      placeholder={t('auth.placeholders.name')}
                    />
                    {errors.signupName && (
                      <p className="mt-1 text-sm text-destructive dark:text-red-400">{errors.signupName}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="signup-email" className="label dark:text-slate-300">
                    {t('auth.signup.email')} <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      id="signup-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={signupData.email}
                      onChange={(e) => handleSignupChange('email', e.target.value)}
                      className={`input dark:bg-slate-800/50 dark:border-slate-600 dark:focus:border-blue-400 dark:focus:ring-blue-400/20 ${
                        errors.signupEmail ? 'ring-destructive dark:ring-red-400' : ''
                      }`}
                      placeholder={t('auth.placeholders.email')}
                    />
                    {errors.signupEmail && (
                      <p className="mt-1 text-sm text-destructive dark:text-red-400">{errors.signupEmail}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="signup-password" className="label dark:text-slate-300">
                    {t('auth.signup.password')} <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      id="signup-password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={signupData.password}
                      onChange={(e) => handleSignupChange('password', e.target.value)}
                      className={`input dark:bg-slate-800/50 dark:border-slate-600 dark:focus:border-blue-400 dark:focus:ring-blue-400/20 ${
                        errors.signupPassword ? 'ring-destructive dark:ring-red-400' : ''
                      }`}
                      placeholder={t('auth.placeholders.password')}
                    />
                    {errors.signupPassword && (
                      <p className="mt-1 text-sm text-destructive dark:text-red-400">{errors.signupPassword}</p>
                    )}
                    <p className="mt-1 text-xs text-muted-foreground dark:text-slate-400">{t('auth.signup.passwordHint')}</p>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 dark:from-emerald-500 dark:to-green-500 dark:hover:from-emerald-600 dark:hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-emerald-400 transition-all duration-200 transform hover:scale-105 dark:shadow-emerald-500/20 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Loading...</span>
                      </div>
                    ) : (
                      t('auth.signup.button')
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Back to Home Link */}
          <div className="mt-8 text-center">
            <Link
              to="/"
              className="text-sm text-primary-600 hover:text-primary-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200 hover:underline"
            >
              {t('auth.backToHome')}
            </Link>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage; 