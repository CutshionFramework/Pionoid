import axios from 'axios';

class AxiosInstance {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.instance = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'text/plain',
      },
      withCredentials: true,
    });
  }

  async request(endPoint, options = {}) {
    try {
      const response = await this.instance.request({
        url: endPoint,
        ...options,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(`HTTP error! status: ${error.response.status}`);
      } else {
        throw new Error('Network error');
      }
    }
  }
}

// Use the proxy endpoint
const httpClient = new AxiosInstance(process.env.REACT_APP_API_URL);

export const robotAPI = {
  get: (endPoint, options) =>
    httpClient.request(endPoint, { ...options, method: 'GET' }),
  post: (endPoint, body, options) =>
    httpClient.request(endPoint, { ...options, method: 'POST', data: body }),
};
