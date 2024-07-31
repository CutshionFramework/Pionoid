import axios from 'axios';

class AxiosInstance {
  baseUrl;

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  instance(endPoint) {
    return axios.create({
      baseURL: this.baseUrl + endPoint,
      headers: {
        'Content-Type': 'text/plain',
      },
      withCredentials: true,
    });
  }
}

// Use the proxy endpoint
const httpClient = new AxiosInstance('/robotAPI');
export const robotAPI = httpClient.instance('');