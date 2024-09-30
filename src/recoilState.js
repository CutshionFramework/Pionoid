import { atom } from 'recoil';

// 이미지 상태를 관리하는 Recoil atom 정의
export const imageState = atom({
  key: 'imageState',
  default: `${process.env.PUBLIC_URL}/assets/images/jaka_robot_arm.png`,
});

export const brandState = atom({
  key: 'brandState',
  default: `JakaRobot`,
});
