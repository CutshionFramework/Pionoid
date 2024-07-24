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

const httpClient = new AxiosInstance('/mock');

export const robotAPI = httpClient.instance('/robot.json');
