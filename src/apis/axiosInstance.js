import axios from 'axios';

class AxiosInstance {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.instance = axios.create({
      baseURL: this.baseUrl,
      withCredentials: true,
    });
  }

  getToken() {
    return localStorage.getItem('token');
  }

  async request(endpoint, method, params = '', query = null, data = null) {
    const apiUrl = params
      ? `${endpoint}/${params}${query ? `?${query}` : ''}`
      : endpoint;

    const headers = {
      Authorization: `Bearer ${this.getToken()}`,
    };

    // Check if data is FormData
    if (!(data instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    try {
      const response = await this.instance.request({
        url: apiUrl,
        method,
        headers,
        data,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error(`HTTP error! status: ${error.response.status}`);
        throw new Error(`HTTP error! status: ${error.response.status}`);
      } else {
        console.error('Network error');
        throw new Error('Network error');
      }
    }
  }
}

// BASE URL
const httpClient = new AxiosInstance(process.env.REACT_APP_API_URL);

export const robotAPI = {
  get: (endpoint, params = '', query = null) =>
    httpClient.request(endpoint, 'GET', params, query),

  post: (endpoint, params = '', data = null) =>
    httpClient.request(endpoint, 'POST', params, null, data),

  put: (endpoint, params = '', data = null) =>
    httpClient.request(endpoint, 'PUT', params, null, data),

  delete: (endpoint, params = '', data = null) =>
    httpClient.request(endpoint, 'DELETE', params, null, data),

  patch: (endpoint, params = '', data = null) =>
    httpClient.request(endpoint, 'PATCH', params, null, data),
};
