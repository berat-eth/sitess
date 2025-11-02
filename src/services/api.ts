/**
 * Backend API Service
 * Next.js frontend'den backend API'sine istek yapmak için kullanılır
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

class ApiClient {
  private baseURL: string;
  private token: string | null = null;
  private apiKey: string | null = null;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
    
    // Browser'da çalışıyorsa localStorage'dan token'ı al
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
      this.apiKey = localStorage.getItem('api_key');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    retryCount = 0
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    // JWT token veya API key ekle
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    } else if (this.apiKey) {
      headers['X-API-Key'] = this.apiKey;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      let data: ApiResponse<T>;
      try {
        data = await response.json();
      } catch (e) {
        // If response is not JSON, create error response
        data = {
          success: false,
          message: response.statusText || 'API request failed',
        } as ApiResponse<T>;
      }

      // Handle 401 Unauthorized - try to refresh token
      if (response.status === 401 && retryCount === 0 && this.token && endpoint !== '/auth/refresh') {
        try {
          const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refresh_token') : null;
          if (refreshToken) {
            await this.refreshToken(refreshToken);
            // Retry the request once
            return this.request<T>(endpoint, options, retryCount + 1);
          }
        } catch (refreshError) {
          // Refresh failed, clear auth
          this.clearAuth();
          if (typeof window !== 'undefined') {
            localStorage.removeItem('refresh_token');
          }
        }
      }

      if (!response.ok) {
        const error = new Error(data.message || 'API request failed') as any;
        error.status = response.status;
        error.data = data;
        throw error;
      }

      return data;
    } catch (error: any) {
      console.error('API request error:', error);
      throw error;
    }
  }

  setToken(token: string | null) {
    this.token = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('auth_token', token);
      } else {
        localStorage.removeItem('auth_token');
      }
    }
  }

  setApiKey(apiKey: string | null) {
    this.apiKey = apiKey;
    if (typeof window !== 'undefined') {
      if (apiKey) {
        localStorage.setItem('api_key', apiKey);
      } else {
        localStorage.removeItem('api_key');
      }
    }
  }

  clearAuth() {
    this.setToken(null);
    this.setApiKey(null);
  }

  // Auth endpoints
  async register(userData: { name: string; email: string; password: string }) {
    return this.request<{ user: any; token: string; refreshToken: string }>(
      '/auth/register',
      {
        method: 'POST',
        body: JSON.stringify(userData),
      }
    );
  }

  async login(email: string, password: string) {
    const response = await this.request<{ user: any; token: string; refreshToken: string }>(
      '/auth/login',
      {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }
    );
    
    if (response.data?.token) {
      this.setToken(response.data.token);
    }
    
    return response;
  }

  async logout() {
    const response = await this.request('/auth/logout', { method: 'POST' });
    this.clearAuth();
    return response;
  }

  async refreshToken(refreshToken: string) {
    const response = await this.request<{ user: any; token: string; refreshToken: string }>(
      '/auth/refresh',
      {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
      }
    );
    
    if (response.data?.token) {
      this.setToken(response.data.token);
    }
    
    return response;
  }

  async getProfile() {
    return this.request<{ user: any }>('/auth/profile');
  }

  // API Keys endpoints
  async listApiKeys() {
    return this.request<{ apiKeys: any[] }>('/api-keys');
  }

  async createApiKey(keyData: {
    name: string;
    description?: string;
    rate_limit?: number;
    expires_at?: string;
  }) {
    return this.request<{ apiKey: any; key: string }>('/api-keys', {
      method: 'POST',
      body: JSON.stringify(keyData),
    });
  }

  async updateApiKey(id: number, updates: {
    name?: string;
    description?: string;
    rate_limit?: number;
    is_active?: boolean;
  }) {
    return this.request<{ apiKey: any }>(`/api-keys/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteApiKey(id: number) {
    return this.request(`/api-keys/${id}`, { method: 'DELETE' });
  }

  async revokeApiKey(id: number) {
    return this.request(`/api-keys/${id}/revoke`, { method: 'POST' });
  }

  // Subscriptions endpoints
  async listSubscriptions(page = 1, limit = 10) {
    return this.request<{ subscriptions: any[] }>(
      `/subscriptions?page=${page}&limit=${limit}`
    );
  }

  async getSubscription(id: number) {
    return this.request<{ subscription: any }>(`/subscriptions/${id}`);
  }

  async createSubscription(subscriptionData: {
    plan_id: string;
    plan_name: string;
    price: number;
    currency?: string;
  }) {
    return this.request<{ subscription: any }>('/subscriptions', {
      method: 'POST',
      body: JSON.stringify(subscriptionData),
    });
  }

  async updateSubscription(id: number, updates: any) {
    return this.request<{ subscription: any }>(`/subscriptions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  // Projects endpoints
  async listProjects(page = 1, limit = 10) {
    return this.request<{ projects: any[] }>(
      `/projects?page=${page}&limit=${limit}`
    );
  }

  async getProject(id: number) {
    return this.request<{ project: any }>(`/projects/${id}`);
  }

  async createProject(projectData: {
    title: string;
    description?: string;
    budget?: number;
    client?: string;
  }) {
    return this.request<{ project: any }>('/projects', {
      method: 'POST',
      body: JSON.stringify(projectData),
    });
  }

  async updateProject(id: number, updates: any) {
    return this.request<{ project: any }>(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteProject(id: number) {
    return this.request(`/projects/${id}`, { method: 'DELETE' });
  }

  // Reports endpoints
  async listReports(page = 1, limit = 10) {
    return this.request<{ reports: any[] }>(
      `/reports?page=${page}&limit=${limit}`
    );
  }

  async getReport(id: number) {
    return this.request<{ report: any }>(`/reports/${id}`);
  }

  async downloadReport(id: number) {
    // Note: This would typically trigger a download, handle appropriately
    const token = this.token || this.apiKey;
    const url = `${this.baseURL}/reports/${id}/download`;
    window.open(
      `${url}?${token ? `token=${token}` : ''}`,
      '_blank'
    );
  }

  // Payments endpoints
  async listPayments(page = 1, limit = 10) {
    return this.request<{ payments: any[] }>(
      `/payments?page=${page}&limit=${limit}`
    );
  }

  async getPayment(id: number) {
    return this.request<{ payment: any }>(`/payments/${id}`);
  }
}

// Singleton instance
export const apiClient = new ApiClient();
export default apiClient;
