// import axios from 'axios';

// class AxiosInstance {
//   constructor(baseUrl) {
//     this.baseUrl = baseUrl;
//     this.instance = axios.create({
//       baseURL: this.baseUrl,
//       headers: {
//         'Content-Type': 'text/plain',
//       },
//       withCredentials: true,
//     });
//   }

//   async request(endPoint, options = {}) {
//     try {
//       const response = await this.instance.request({
//         url: endPoint,
//         ...options,
//       });
//       return response.data;
//     } catch (error) {
//       if (error.response) {
//         throw new Error(`HTTP error! status: ${error.response.status}`);
//       } else {
//         throw new Error('Network error');
//       }
//     }
//   }
// }

// // Use the proxy endpoint
// const httpClient = new AxiosInstance(process.env.REACT_APP_API_URL);

// export const robotAPI = {
//   get: (endPoint, options) =>
//     httpClient.request(endPoint, { ...options, method: 'GET' }),
//   post: (endPoint, body, options) =>
//     httpClient.request(endPoint, { ...options, method: 'POST', data: body }),
//   delete: (endPoint, options) =>
//     httpClient.request(endPoint, { ...options, method: 'DELETE' }),
// };
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

  async request(endpoint, method, params = '', query = '', data = null) {
    const apiUrl = params
      ? `${endpoint}/${params}${query ? `?${query}` : ''}`
      : endpoint;
    const headers = { 'Content-Type': 'text/plain' };

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
  get: (endpoint, params = '', query = '') =>
    httpClient.request(endpoint, 'GET', params, query),

  post: (endpoint, params = '', data) =>
    httpClient.request(endpoint, 'POST', params, data),

  put: (endpoint, params = '', data) =>
    httpClient.request(endpoint, 'PUT', params, data),

  delete: (endpoint, params = '', data = {}) =>
    httpClient.request(endpoint, 'DELETE', params, data),

  patch: (endpoint, params = '', data) =>
    httpClient.request(endpoint, 'PATCH', params, data),
};
