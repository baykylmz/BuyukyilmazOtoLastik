import axios from 'axios';

const API_URL = '/api/auth';

interface LoginResponse {
  status: string;
  data: {
    token: string;
    user: {
      id: string;
      email: string;
      role: string;
      name: string;
    };
  };
}

interface SignupResponse {
  status: string;
  data: {
    token: string;
    user: {
      id: string;
      email: string;
      role: string;
      name: string;
    };
  };
  message: string;
}

export const login = async (email: string, password: string): Promise<{ token: string; user: { id: string; email: string; role: string; name: string } }> => {
  const response = await axios.post<LoginResponse>(`${API_URL}/login`, { email, password });
  return {
    token: response.data.data.token,
    user: response.data.data.user
  };
};

export const signup = async (name: string, email: string, password: string): Promise<{ token: string; user: { id: string; email: string; role: string; name: string } }> => {
  const response = await axios.post<SignupResponse>(`${API_URL}/signup`, { name, email, password });
  return {
    token: response.data.data.token,
    user: response.data.data.user
  };
};

export const logout = () => {
  // Clear any auth-related data
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Add auth token to all requests
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Enhanced response interceptor to handle token expiration
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear auth data and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Only redirect if we're not already on the login page
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authService = {
  getToken(): string | null {
    return localStorage.getItem('token');
  },

  getUser(): { id: string; email: string; role: string; name: string } | null {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        return JSON.parse(userData);
      } catch (error) {
        return null;
      }
    }
    return null;
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  isAdmin(): boolean {
    const user = this.getUser();
    return user?.role === 'ADMIN';
  },

  // Initialize auth state from localStorage
  initializeAuth() {
    const token = this.getToken();
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }
}; 