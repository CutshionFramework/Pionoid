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
        'Content-Type': 'application/json',
      },
    });
  }
}

//const httpClient = new AxiosInstance(process.env.REACT_APP_BASE_URL || '');
const httpClient = new AxiosInstance('/_mock');

export const robotAPI = httpClient.instance('/ex.json');
