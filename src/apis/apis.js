import { robotAPI } from './axiosInstance';

const BASE_URL = process.env.REACT_APP_API_URL;

export const getRobotSessions = async () => {
  try {
    const endpoint = `${BASE_URL}`;
    const params = `get_robot_sessions`;
    const res = await robotAPI.get(endpoint, params);
    return res;
  } catch (error) {
    console.error('Error saving position:', error);
    throw error;
  }
};

export const saveIpAddress = async (ipAddress, robotType = 'JakaRobot') => {
  try {
    const endpoint = `${BASE_URL}`;
    const params = `set_ip`;

    // IP와 로봇 타입을 데이터로 전송
    const data = {
      ip: ipAddress,
      robot_type: robotType,
    };

    const res = await robotAPI.post(endpoint, params, data);

    // 서버로부터 받은 토큰을 로컬 스토리지에 저장
    if (res.token) {
      localStorage.setItem('token', res.token);
    }

    return res.data;
  } catch (error) {
    console.error('Error saving IP address and robot type:', error);
    throw error;
  }
};

export const savePosition = async () => {
  try {
    const endpoint = `${BASE_URL}`;
    const params = `save_robot_status`;
    const res = await robotAPI.get(endpoint, params);
    return res;
  } catch (error) {
    console.error('Error saving position:', error);
    throw error;
  }
};

export const updatePosition = async (originalName, updatedItem) => {
  try {
    const endpoint = `${BASE_URL}`;
    const params = `update_robot_status/${encodeURIComponent(originalName)}`;
    const res = await robotAPI.put(endpoint, params, updatedItem);
    return res;
  } catch (error) {
    console.error('Error updating position:', error);
    throw error;
  }
};

export const deletePosition = async (name) => {
  try {
    const endpoint = `${BASE_URL}`;
    const params = `delete_robot_status/${encodeURIComponent(name)}`;
    const res = await robotAPI.get(endpoint, params);
    return res;
  } catch (error) {
    console.error('Error deleting position:', error);
    throw error;
  }
};

export const robotRunSaveMovements = async (times) => {
  try {
    const endpoint = `${BASE_URL}`;
    const params = `run_saved_movements/${times}`;
    const res = await robotAPI.get(endpoint, params);
    return res;
  } catch (error) {
    console.error('Error running saved movements:', error);
    throw error;
  }
};

export const shutDown = async () => {
  try {
    const endpoint = `${BASE_URL}`;
    const params = `shut_down`;
    const res = await robotAPI.post(endpoint, params);
    return res;
  } catch (error) {
    console.error('Error shutting down:', error);
    throw error;
  }
};

export const robotLogin = async () => {
  try {
    const endpoint = `${BASE_URL}`;
    const params = `login_in`;
    const res = await robotAPI.post(endpoint, params);
    return res;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const robotLogout = async () => {
  try {
    const endpoint = `${BASE_URL}`;
    const params = `login_out`;
    const res = await robotAPI.post(endpoint, params);
    return res;
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

export const robotPowerOn = async () => {
  try {
    const endpoint = `${BASE_URL}`;
    const params = `power_on`;
    const res = await robotAPI.post(endpoint, params);
    return res;
  } catch (error) {
    console.error('Error powering on:', error);
    throw error;
  }
};

export const robotPowerOff = async () => {
  try {
    const endpoint = `${BASE_URL}`;
    const params = `power_off`;
    const res = await robotAPI.post(endpoint, params);
    return res;
  } catch (error) {
    console.error('Error powering off:', error);
    throw error;
  }
};

export const robotEnable = async () => {
  try {
    const endpoint = `${BASE_URL}`;
    const params = `enable_robot`;
    const res = await robotAPI.post(endpoint, params);
    return res;
  } catch (error) {
    console.error('Error enabling robot:', error);
    throw error;
  }
};

export const robotDisable = async () => {
  try {
    const endpoint = `${BASE_URL}`;
    const params = `disable_robot`;
    const res = await robotAPI.post(endpoint, params);
    return res;
  } catch (error) {
    console.error('Error disabling robot:', error);
    throw error;
  }
};

export const getDigitalOutputStatus = async () => {
  try {
    const endpoint = `${BASE_URL}`;
    const params = `digital_output_status`;
    const res = await robotAPI.get(endpoint, params);
    return res;
  } catch (error) {
    console.error('Error getting digital output status:', error);
    throw error;
  }
};

export const setDigitalOutput = async (index) => {
  try {
    const endpoint = `${BASE_URL}`;
    const params = `use_digital_output/${index}`;
    const res = await robotAPI.get(endpoint, params);
    return res;
  } catch (error) {
    console.error('Error using digital output:', error);
    throw error;
  }
};

export const setDigitalInput = async (index) => {
  try {
    const endpoint = `${BASE_URL}`;
    const params = `use_digital_input/${index}`;
    const res = await robotAPI.get(endpoint, params);
    return res;
  } catch (error) {
    console.error('Error using digital input:', error);
    throw error;
  }
};
