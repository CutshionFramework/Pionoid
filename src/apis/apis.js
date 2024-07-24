import { robotAPI } from './axiosInstance';

export const robotLogin = async () => {
  const res = await robotAPI.get(``);
  return res.data.robot_login;
};

export const robotLogout = async () => {
  const res = await robotAPI.get(``);
  return res.data.robot_logout;
};

export const robotPowerOn = async () => {
  const res = await robotAPI.get(``);
  return res.data.robot_power_on;
};

export const robotPowerOff = async () => {
  const res = await robotAPI.get(``);
  return res.data.robot_power_off;
};

export const robotEnable = async () => {
  const res = await robotAPI.get(``);
  return res.data.robot_enable;
};

export const robotDisable = async () => {
  const res = await robotAPI.get(``);
  return res.data.robot_disable;
};
