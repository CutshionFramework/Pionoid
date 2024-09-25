import { robotAPI } from './axiosInstance';

const BASE_URL = process.env.REACT_APP_API_URL;

// export const getRobotMoves = async () => {
//   try {
//     const endpoint = `${BASE_URL}`;
//     const params = `get_moves`;

//     const timestamp = new Date().getTime();
//     const query = `t=${timestamp}`;
//     const res = await robotAPI.get(endpoint, params, query);
//     return res;
//   } catch (error) {
//     console.error('Error saving position:', error);
//     throw error;
//   }
// };
export const getRobotMoves = async () => {
  try {
    const endpoint = `${BASE_URL}`;
    const params = `get_moves`;
    const res = await robotAPI.get(endpoint, params);
    return res;
  } catch (error) {
    console.error('Error saving position:', error);
    throw error;
  }
};

export const saveIpAddress = async (ipAddress, robotType) => {
  try {
    const endpoint = `${BASE_URL}`;
    const params = `set_ip`;

    const data = {
      ip: ipAddress,
      robot_type: robotType,
    };

    const res = await robotAPI.post(endpoint, params, data);

    if (res.token) {
      localStorage.setItem('token', res.token);
    }

    return res.data;
  } catch (error) {
    console.error('Error saving IP address and robot type:', error);
    throw error;
  }
};

export const saveMove = async () => {
  try {
    const endpoint = `${BASE_URL}`;
    const params = `save_move`;
    const res = await robotAPI.post(endpoint, params);
    return res;
  } catch (error) {
    console.error('Error saving position:', error);
    throw error;
  }
};

export const updateMove = async (originalName, updatedItem) => {
  try {
    const endpoint = `${BASE_URL}`;
    const params = `update_move`;
    const data = {
      originalName: originalName,
      updatedItem: updatedItem,
    };
    const res = await robotAPI.put(endpoint, params, data);
    return res;
  } catch (error) {
    console.error('Error updating position:', error);
    throw error;
  }
};

export const deleteMove = async (name) => {
  try {
    const endpoint = `${BASE_URL}`;
    const params = `delete_move`;
    const data = {
      move_name: name,
    };
    const res = await robotAPI.delete(endpoint, params, data);
    return res;
  } catch (error) {
    console.error('Error deleting position:', error);
    throw error;
  }
};

export const copyMove = async (originalName) => {
  try {
    const endpoint = `${BASE_URL}`;
    const params = `copy_move`;
    const data = {
      originalName: originalName,
    };
    const res = await robotAPI.post(endpoint, params, data);
    return res;
  } catch (error) {
    console.error('Error saving position:', error);
    throw error;
  }
};

export const runAllMoves = async (times = 1) => {
  try {
    const endpoint = `${BASE_URL}`;
    const params = `run_all_moves`;
    const data = {
      times: times,
    };
    const res = await robotAPI.post(endpoint, params, data);
    return res;
  } catch (error) {
    console.error('Error running saved movements:', error);
    throw error;
  }
};

export const updateMoveOrder = async (moveName, newIndex) => {
  try {
    const endpoint = `${BASE_URL}`;
    const params = `reorder_moves`;
    const data = {
      move_name: moveName,
      new_index: newIndex,
    };
    const res = await robotAPI.post(endpoint, params, data);
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

export const voiceCommand = async (formData) => {
  try {
    const endpoint = `${BASE_URL}`;
    const params = `voice_command`;
    // 'Content-Type'은 axios가 자동으로 설정하므로, 따로 설정할 필요 없음
    const res = await robotAPI.post(endpoint, params, formData);
    return res;
  } catch (error) {
    console.error('Error saving position:', error);
    throw error;
  }
};

// ------------------------------------

export const getIOStatus = async () => {
  try {
    const endpoint = `${BASE_URL}`;
    const params = `get_io_status`;
    const res = await robotAPI.get(endpoint, params);
    return res;
  } catch (error) {
    console.error('Error getting digital output status:', error);
    throw error;
  }
};

export const setIO = async (tabName, type, index, value) => {
  try {
    const endpoint = `${BASE_URL}`;
    const params = `set_io_status`;
    const data = {
      io_type: tabName,
      io_signal_type: type,
      index: index,
      value: value,
    };
    const res = await robotAPI.post(endpoint, params, data);
    return res;
  } catch (error) {
    console.error('Error using digital output:', error);
    throw error;
  }
};
