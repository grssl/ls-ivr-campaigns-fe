import { ACTIVE_ROLE_DATA, SET_USERLOGIN_DATA } from "./actionType";
export const setUserLoginData = (data) => {
  return {
    type: SET_USERLOGIN_DATA,
    payload: data,
  };
};

export const setActiveRole = (data) => {
  return {
    type: ACTIVE_ROLE_DATA,
    payload: data,
  };
};
