import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface LoginButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  mode?: 'login' | 'signup';
}

const LoginButton: React.FC<LoginButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  className = '',
  mode = 'login'
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = () => {
    if (mode === 'signup') {
      navigate('/auth?tab=signup');
    } else {
      navigate('/auth?tab=login');
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-primary-600 to-primary-500 text-white hover:from-primary-700 hover:to-primary-600 shadow-lg hover:shadow-xl dark:shadow-blue-500/20';
      case 'secondary':
        return 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground border border-border hover:border-accent dark:bg-slate-800/50 dark:hover:bg-slate-700 dark:border-slate-700/50';
      case 'ghost':
        return 'text-muted-foreground hover:text-foreground hover:bg-accent dark:hover:bg-slate-800/50';
      default:
        return 'bg-gradient-to-r from-primary-600 to-primary-500 text-white hover:from-primary-700 hover:to-primary-600 shadow-lg hover:shadow-xl dark:shadow-blue-500/20';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm';
      case 'md':
        return 'px-4 py-2 text-sm';
      case 'lg':
        return 'px-6 py-3 text-base';
      default:
        return 'px-4 py-2 text-sm';
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`
        inline-flex items-center justify-center rounded-md font-medium 
        transition-all duration-200 transform hover:scale-105 
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 
        dark:focus:ring-offset-slate-900
        ${getVariantClasses()} 
        ${getSizeClasses()}
        ${className}
      `}
    >
      {mode === 'signup' ? t('auth.signup.title') : t('public.auth.login')}
    </button>
  );
};

export default LoginButton; 