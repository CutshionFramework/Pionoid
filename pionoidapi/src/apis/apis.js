//replace this old code with the new code below and apply the calls from the components
class FetchInstance {
  constructor(baseUrl) {
      this.baseUrl = baseUrl;
  }

  setBaseUrl(baseUrl) {
      this.baseUrl = baseUrl;
  }

  async request(endPoint, options = {}) {
      const url = this.baseUrl + endPoint;
      const defaultOptions = {
          headers: {
              'Content-Type': 'text/plain', 
          },
          credentials: 'include',   
      };

      const finalOptions = { ...defaultOptions, ...options };

      const response = await fetch(url, finalOptions);
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
          return response.json();
      }
      return response.text(); // Handle non-JSON response
  }
}

const httpClient = new FetchInstance('http://localhost:8080');

export const setBaseUrl = (baseUrl) => {
  httpClient.setBaseUrl(baseUrl);
};

export const robotAPI = {
  get: (endPoint, options) => httpClient.request(endPoint, { ...options, method: 'GET' }),
  post: (endPoint, body, options) => httpClient.request(endPoint, { ...options, method: 'POST', body: JSON.stringify(body) }),
};

export const robotRunSaveMovements = async (times) => {
  try {
      const res = await robotAPI.get(`/run_saved_movements/${times}`);
      return res;
  } catch (error) {
      console.error('Error running saved movements:', error);
      throw error;
  }
};

export const savePosition = async () => {
  try {
      const res = await robotAPI.get(`/save_robot_status`);
      return res;
  } catch (error) {
      console.error('Error saving position:', error);
      throw error;
  }
};

export const shutDown = async () => {
  try {
      const res = await robotAPI.get(`/shut_down`);
      return res;
  } catch (error) {
      console.error('Error shutting down:', error);
      throw error;
  }
};

export const saveIpAddress = async (ipAddress) => {
  try {
      const res = await robotAPI.post(`/set_ip`, { ipAddress });
      return res;
  } catch (error) {
      console.error('Error saving IP address:', error);
      throw error;
  }
};

export const robotLogin = async () => {
  try {
      const res = await robotAPI.get(`/login_in`);
      return res;
  } catch (error) {
      console.error('Error logging in:', error);
      throw error;
  }
};

export const robotLogout = async () => {
  try {
      const res = await robotAPI.get(`/login_out`);
      return res;
  } catch (error) {
      console.error('Error logging out:', error);
      throw error;
  }
};

export const robotPowerOn = async () => {
  try {
      const res = await robotAPI.get(`/power_on`);
      return res;
  } catch (error) {
      console.error('Error powering on:', error);
      throw error;
  }
};

export const robotPowerOff = async () => {
  try {
      const res = await robotAPI.get(`/power_off`);
      return res;
  } catch (error) {
      console.error('Error powering off:', error);
      throw error;
  }
};

export const robotEnable = async () => {
  try {
      const res = await robotAPI.get(`/enable_robot`);
      return res;
  } catch (error) {
      console.error('Error enabling robot:', error);
      throw error;
  }
};

export const robotDisable = async () => {
  try {
      const res = await robotAPI.get(`/disable_robot`);
      return res;
  } catch (error) {
      console.error('Error disabling robot:', error);
      throw error;
  }
};

export const digitalOutputStatus = async () => {
  try {
      const res = await robotAPI.get(`/digital_output_status`);
      return res;
  } catch (error) {
      console.error('Error getting digital output status:', error);
      throw error;
  }
};

export const useDigitalOutput1 = async () => {
  try {
      const res = await robotAPI.get(`/use_digital_output1`);
      return res;
  } catch (error) {
      console.error('Error using digital output 1:', error);
      throw error;
  }
};

export const useDigitalOutput2 = async () => {
  try {
      const res = await robotAPI.get(`/use_digital_output2`);
      return res;
  } catch (error) {
      console.error('Error using digital output 2:', error);
      throw error;
  }
};