import axios from 'axios';

class AxiosInstance {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.instance = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json', // JSON으로 수정
      },
      withCredentials: true,
    });
  }

  // 토큰을 로컬 스토리지나 상태에서 가져오는 함수
  getToken() {
    return localStorage.getItem('token'); // 토큰을 저장한 위치에 따라 수정
  }

  async request(endpoint, method, params = '', query = null, data = null) {
    const apiUrl = params
      ? `${endpoint}/${params}${query ? `?${query}` : ''}`
      : endpoint;

    const headers = {
      'Content-Type': 'application/json', // text/plain에서 JSON으로 변경
      Authorization: `Bearer ${this.getToken()}`, // Authorization 헤더 추가
    };

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
