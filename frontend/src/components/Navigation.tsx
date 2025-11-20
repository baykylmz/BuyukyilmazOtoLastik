import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';

const Navigation: React.FC = () => {
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  // Determine if user is admin/staff or customer
  const isAdmin = user?.role === 'ADMIN' || user?.role === 'STAFF';
  const isCustomer = user?.role === 'CUSTOMER';

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  if (!user) return null;

  return (
    <nav className="bg-card/90 backdrop-blur-md shadow-sm border-b border-border dark:border-slate-700/50 dark:shadow-lg dark:shadow-black/10 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex items-center min-w-0">
              <Link
                to={isAdmin ? "/tires" : "/vehicles"}
                className="flex items-center space-x-2 text-xl font-bold text-foreground hover:scale-105 transition-transform duration-200 truncate max-w-[60vw] sm:max-w-none"
              >
                <img src="/logo.svg" alt="Company Logo" className="h-8 w-auto" />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {/* Admin/Staff Navigation */}
              {isAdmin && (
                <>
                  <Link
                    to="/users"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-200 ${
                      isActive('/users')
                        ? 'border-primary-500 text-primary-600 dark:text-blue-400 dark:border-blue-400 bg-primary-50/50 dark:bg-blue-500/10'
                        : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border dark:hover:text-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    {t('navigation.users', 'Users')}
                  </Link>
                  <Link
                    to="/tires"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-200 ${
                      isActive('/tires')
                        ? 'border-primary-500 text-primary-600 dark:text-blue-400 dark:border-blue-400 bg-primary-50/50 dark:bg-blue-500/10'
                        : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border dark:hover:text-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    {t('navigation.tires')}
                  </Link>
                  <Link
                    to="/qr-scanner"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-200 ${
                      isActive('/qr-scanner')
                        ? 'border-primary-500 text-primary-600 dark:text-blue-400 dark:border-blue-400 bg-primary-50/50 dark:bg-blue-500/10'
                        : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border dark:hover:text-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    {t('navigation.qrScanner')}
                  </Link>
                </>
              )}

              {/* Customer Navigation */}
              {isCustomer && (
                <>
                  <Link
                    to="/vehicles"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-200 ${
                      isActive('/vehicles')
                        ? 'border-primary-500 text-primary-600 dark:text-blue-400 dark:border-blue-400 bg-primary-50/50 dark:bg-blue-500/10'
                        : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border dark:hover:text-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    {t('navigation.myVehicles')}
                  </Link>
                  <Link
                    to="/appointments"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-200 ${
                      isActive('/appointments')
                        ? 'border-primary-500 text-primary-600 dark:text-blue-400 dark:border-blue-400 bg-primary-50/50 dark:bg-blue-500/10'
                        : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border dark:hover:text-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    {t('navigation.myAppointments')}
                  </Link>
                </>
              )}
            </div>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            <ThemeToggle variant="icon" />
            <LanguageSwitcher />
            <div className="text-sm text-muted-foreground dark:text-slate-400 bg-muted dark:bg-slate-800/50 px-3 py-1 rounded-full border dark:border-slate-700/50">
              {user.email}
            </div>
            <button
              onClick={handleLogout}
              className="bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground dark:bg-slate-800/50 dark:hover:bg-slate-700 dark:hover:text-slate-300 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 border dark:border-slate-700/50 hover:shadow-sm transform hover:scale-105"
            >
              {t('navigation.logout')}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center space-x-2 shrink-0">
            <ThemeToggle variant="icon" className="text-foreground" />
            <LanguageSwitcher />
            <button
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              className="text-foreground hover:text-foreground p-2 transition-all duration-200 hover:scale-110 dark:hover:text-blue-400 hover:bg-accent dark:hover:bg-slate-800/50 rounded-md"
           >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1 bg-card/95 backdrop-blur-sm border-t border-border dark:border-slate-700/50 dark:bg-slate-900/95">
          {/* Admin/Staff Mobile Navigation */}
          {isAdmin && (
            <>
              <Link
                to="/users"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-all duration-200 ${
                  isActive('/users')
                    ? 'bg-primary-50 dark:bg-blue-900/20 border-primary-500 text-primary-700 dark:text-blue-300 dark:border-blue-400'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted hover:border-border dark:hover:text-slate-300 dark:hover:bg-slate-800/50 dark:hover:border-slate-600'
                }`}
              >
                {t('navigation.users', 'Users')}
              </Link>
              <Link
                to="/tires"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-all duration-200 ${
                  isActive('/tires')
                    ? 'bg-primary-50 dark:bg-blue-900/20 border-primary-500 text-primary-700 dark:text-blue-300 dark:border-blue-400'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted hover:border-border dark:hover:text-slate-300 dark:hover:bg-slate-800/50 dark:hover:border-slate-600'
                }`}
              >
                {t('navigation.tires')}
              </Link>
              <Link
                to="/qr-scanner"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-all duration-200 ${
                  isActive('/qr-scanner')
                    ? 'bg-primary-50 dark:bg-blue-900/20 border-primary-500 text-primary-700 dark:text-blue-300 dark:border-blue-400'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted hover:border-border dark:hover:text-slate-300 dark:hover:bg-slate-800/50 dark:hover:border-slate-600'
                }`}
              >
                {t('navigation.qrScanner')}
              </Link>
            </>
          )}

          {/* Customer Mobile Navigation */}
          {isCustomer && (
            <>
              <Link
                to="/vehicles"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-all duration-200 ${
                  isActive('/vehicles')
                    ? 'bg-primary-50 dark:bg-blue-900/20 border-primary-500 text-primary-700 dark:text-blue-300 dark:border-blue-400'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted hover:border-border dark:hover:text-slate-300 dark:hover:bg-slate-800/50 dark:hover:border-slate-600'
                }`}
              >
                {t('navigation.myVehicles')}
              </Link>
              <Link
                to="/appointments"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-all duration-200 ${
                  isActive('/appointments')
                    ? 'bg-primary-50 dark:bg-blue-900/20 border-primary-500 text-primary-700 dark:text-blue-300 dark:border-blue-400'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted hover:border-border dark:hover:text-slate-300 dark:hover:bg-slate-800/50 dark:hover:border-slate-600'
                }`}
              >
                {t('navigation.myAppointments')}
              </Link>
            </>
          )}

          <div className="border-t border-border dark:border-slate-700/50 pt-4 pb-3">
            <div className="flex items-center px-4">
              <div className="text-base font-medium text-foreground dark:text-white bg-muted dark:bg-slate-800/50 px-3 py-2 rounded-md border dark:border-slate-700/50">{user.email}</div>
            </div>
            <div className="mt-3 space-y-1">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleLogout();
                }}
                className="block w-full text-left px-4 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200 dark:hover:text-slate-300 dark:hover:bg-slate-800/50 border-l-4 border-transparent hover:border-border dark:hover:border-slate-600"
              >
                {t('navigation.logout')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 