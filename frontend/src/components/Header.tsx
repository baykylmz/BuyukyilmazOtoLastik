import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LoginButton from './LoginButton';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const { t } = useTranslation();

  return (
    <header className="bg-card/80 backdrop-blur-md shadow-sm border-b border-border dark:border-slate-700/50 dark:shadow-lg dark:shadow-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-foreground dark:text-white bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
              {t('public.companyName')}
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#services" className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 dark:hover:text-blue-400">
              {t('public.navigation.services')}
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 dark:hover:text-blue-400">
              {t('public.navigation.contact')}
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <ThemeToggle variant="icon" />
            <LanguageSwitcher />
            <LoginButton variant="primary" size="md" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 