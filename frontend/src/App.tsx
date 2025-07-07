import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import LoginPage from './pages/LoginPage';
import TireListPage from './pages/TireListPage';
import CustomerListPage from './pages/CustomerListPage';
import QRScannerPage from './pages/QRScannerPage';
import PublicHomePage from './pages/PublicHomePage';
import AuthPage from './pages/AuthPage';
import Navigation from './components/Navigation';
import { useTranslation } from 'react-i18next';
import { PrivateRoute, AdminRoute, UnauthorizedMessage } from './components/PrivateRoute';

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Bir şeyler ters gitti</h1>
            <p className="text-muted-foreground mb-4">Sayfa yüklenirken bir hata oluştu.</p>
            <button 
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              Sayfayı Yenile
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    document.title = i18n.t('title');
  }, [i18n.language, location.pathname]);

  const isPublicRoute = location.pathname === '/' || location.pathname === '/auth';

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ErrorBoundary>
        {user && !isPublicRoute && <Navigation />}
        <main className={user && !isPublicRoute ? 'pt-16' : ''}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicHomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            
            {/* Protected Routes */}
            <Route path="/login" element={
              user ? <Navigate to="/tires" replace /> : <LoginPage />
            } />
            
            <Route path="/tires" element={
              <PrivateRoute>
                <TireListPage />
              </PrivateRoute>
            } />
            
            <Route path="/customers" element={
              <AdminRoute>
                <CustomerListPage />
              </AdminRoute>
            } />
            
            <Route path="/qr-scanner" element={
              <PrivateRoute>
                <QRScannerPage />
              </PrivateRoute>
            } />
            
            <Route path="/unauthorized" element={<UnauthorizedMessage />} />
            
            {/* Redirect authenticated users from root to tires */}
            <Route path="*" element={
              user ? <Navigate to="/tires" replace /> : <Navigate to="/" replace />
            } />
          </Routes>
        </main>
      </ErrorBoundary>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="tire-management-theme">
      <AppContent />
    </ThemeProvider>
  );
};

export default App; 