import dayjs from "dayjs";
import { decriptApiKeys } from "../../components/Api/APICall";

const initialState = {
  data: {},
  isLogin: false,
  ActiveRole: [],
};

const UserDataReducer = (state = initialState, { type, payload }) => {
  const locallData = localStorage.getItem("isLogin");
  if (locallData) {
    const decodeData = decriptApiKeys(locallData);
    if (decodeData.status) {
      let decode = JSON.parse(decodeData.data);
      if (dayjs(decode.expiryDate) >= dayjs()) {
        state.data = decode;
        state.isLogin = locallData ? true : false;

        // console.log("locallData",decode);
      } else {
        localStorage.removeItem("isLogin");
      }
    }
  }
  switch (type) {
    case "SET_USERLOGIN_DATA":
      return { ...state, data: payload };
    case "ACTIVE_ROLE_DATA":
      return { ...state, ActiveRole: payload };
    default:
      return state;
  }
};

export default UserDataReducer;
