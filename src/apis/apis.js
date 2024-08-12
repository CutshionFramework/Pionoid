import { robotAPI } from './axiosInstance';

const BASE_URL = process.env.REACT_APP_API_URL;

export const saveIpAddress = async (ipAddress) => {
  try {
    // endpoint example : const endpoint = `${BASE_URL}/users`;
    //                  : const endpoint = `${BASE_URL}/posts`;
    const endpoint = `${BASE_URL}`; // can be omitted now that just using base url.

    // params example : const params = `${userid}/profile`;
    //                : const params = `${postid}/text`;
    const params = `set_ip`;

    // body(=Data you want to send) example : Function Parameter
    const res = await robotAPI.post(endpoint, params, ipAddress);
    return res;
  } catch (error) {
    console.error('Error saving IP address:', error);
    throw error;
  }
};

export const savePosition = async () => {
  try {
    const params = `/save_robot_status`;
    const res = await robotAPI.get(params);
    return res;
  } catch (error) {
    console.error('Error saving position:', error);
    throw error;
  }
};

export const updatePosition = async (originalName, updatedItem) => {
  try {
    const params = `/update_robot_status/${encodeURIComponent(originalName)}`;
    const res = await robotAPI.put(params, updatedItem);
    return res;
  } catch (error) {
    console.error('Error updating position:', error);
    throw error;
  }
};

export const deletePosition = async (name) => {
  try {
    const params = `/delete_robot_status/${encodeURIComponent(name)}`;
    const res = await robotAPI.get(params);
    return res;
  } catch (error) {
    console.error('Error deleting position:', error);
    throw error;
  }
};

export const robotRunSaveMovements = async (times) => {
  try {
    const params = `/run_saved_movements/${times}`;
    const res = await robotAPI.get(params);
    return res;
  } catch (error) {
    console.error('Error running saved movements:', error);
    throw error;
  }
};

export const shutDown = async () => {
  try {
    const params = `/shut_down`;
    const res = await robotAPI.get(params);
    return res;
  } catch (error) {
    console.error('Error shutting down:', error);
    throw error;
  }
};

export const robotLogin = async () => {
  try {
    const params = `/login_in`;
    const res = await robotAPI.get(params);
    return res;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const robotLogout = async () => {
  try {
    const params = `/login_out`;
    const res = await robotAPI.get(params);
    return res;
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

export const robotPowerOn = async () => {
  try {
    const params = `/power_on`;
    const res = await robotAPI.get(params);
    return res;
  } catch (error) {
    console.error('Error powering on:', error);
    throw error;
  }
};

export const robotPowerOff = async () => {
  try {
    const params = `/power_off`;
    const res = await robotAPI.get(params);
    return res;
  } catch (error) {
    console.error('Error powering off:', error);
    throw error;
  }
};

export const robotEnable = async () => {
  try {
    const params = `/enable_robot`;
    const res = await robotAPI.get(params);
    return res;
  } catch (error) {
    console.error('Error enabling robot:', error);
    throw error;
  }
};

export const robotDisable = async () => {
  try {
    const params = `/disable_robot`;
    const res = await robotAPI.get(params);
    return res;
  } catch (error) {
    console.error('Error disabling robot:', error);
    throw error;
  }
};

export const getDigitalOutputStatus = async () => {
  try {
    const params = `/digital_output_status`;
    const res = await robotAPI.get(params);
    return res;
  } catch (error) {
    console.error('Error getting digital output status:', error);
    throw error;
  }
};

export const setDigitalOutput = async (index) => {
  try {
    const params = `/use_digital_output/${index}`;
    const res = await robotAPI.get(params);
    return res;
  } catch (error) {
    console.error('Error using digital output:', error);
    throw error;
  }
};

export const setDigitalInput = async (index) => {
  try {
    const params = `/use_digital_input/${index}`;
    const res = await robotAPI.get(params);
    return res;
  } catch (error) {
    console.error('Error using digital input:', error);
    throw error;
  }
};
