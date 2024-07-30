import { robotAPI } from './axiosInstance';

// export const robotLogin = async () => {
//   const res = await robotAPI.get(``);
//   return res.data.robot_login;
// };

// export const robotLogout = async () => {
//   const res = await robotAPI.get(``);
//   return res.data.robot_logout;
// };

// export const robotPowerOn = async () => {
//   const res = await robotAPI.get(``);
//   return res.data.robot_power_on;
// };

// export const robotPowerOff = async () => {
//   const res = await robotAPI.get(``);
//   return res.data.robot_power_off;
// };

// export const robotEnable = async () => {
//   const res = await robotAPI.get(``);
//   return res.data.robot_enable;
// };

// export const robotDisable = async () => {
//   const res = await robotAPI.get(``);
//   return res.data.robot_disable;
// };

// export const robotRunSaveMovements = async () => {
//   const res = await robotAPI.get(``);
//   return res.data.robot_run_save_movements;
// };

// export const savePosition = async () => {
//   const res = await robotAPI.get(``);
//   return res.data.save_position;
// };

// export const shutDown = async () => {
//   const res = await robotAPI.get(``);
//   return res.data.shut_down;
// };

// export const saveIpAddress = async () => {
//   const res = await robotAPI.get(``);
//   return res.data.save_ip_address;
// };

//------------------------------------------
export const robotLogin = async () => {
  const res = await robotAPI.get(`/login_in`);
  return res.data.robot_login;
};

export const robotLogout = async () => {
  const res = await robotAPI.get(`/login_out`);
  return res.data.robot_logout;
};

export const robotPowerOn = async () => {
  const res = await robotAPI.get(`/power_on`);
  return res.data.robot_power_on;
};

export const robotPowerOff = async () => {
  const res = await robotAPI.get(`/power_off`);
  return res.data.robot_power_off;
};

export const robotEnable = async () => {
  const res = await robotAPI.get(`/enable_robot`);
  return res.data.robot_enable;
};

export const robotDisable = async () => {
  const res = await robotAPI.get(`/disable_robot`);
  return res.data.robot_disable;
};

export const robotRunSaveMovements = async () => {
  const res = await robotAPI.get(`/run_saved_movements`);
  return res.data.robot_run_save_movements;
};

export const savePosition = async () => {
  const res = await robotAPI.get(`/save_robot_status`);
  return res.data.save_position;
};

export const shutDown = async () => {
  const res = await robotAPI.get(`/shut_down`);
  return res.data.shut_down;
};

export const saveIpAddress = async () => {
  const res = await robotAPI.get(`set_ip`);
  return res.data.save_ip_address;
};
