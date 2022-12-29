
import { setUserLoginData } from '../../reducers/actions/action';
var CryptoJS = require("crypto-js");


const APICall = async (url, req = "GET", data = {}) => {
  url = process.env.REACT_APP_API_PREFIX + url;

  var myHeaders = new Headers();
  myHeaders.append(
    process.env.REACT_APP_API_KEY,
    process.env.REACT_APP_API_KEY_VALUE
  );
  myHeaders.append("Content-Type", "application/json");
  var callApiPOST = "";



  if (req === "POST") {
    callApiPOST = await fetch(url, {
      method: req,
      headers: myHeaders,
      body: JSON.stringify(data),
    });
  } else {
    callApiPOST = await fetch(url, {
      method: req,
      headers: myHeaders,
    });
  }
  return callApiPOST.json();
};

const LogoutFunctionHandler = async () => {
  localStorage.removeItem("isLogin");
  window.location = "/";
};

const explodeDataWithRowTable = (data, setApiData, rerunData = false) => {
  let rowsArray = [];
  let valuesArray = [];
  let completeData = [];
  if (Array.isArray(data)) {
    completeData = data.map((d, i) => {
      rowsArray.push(Object.keys(d));
      valuesArray.push(Object.values(d));
      return { ...d, id: i + 1, };
    });

  }
  let tableHeader = []
  if (rowsArray.length > 0) {
    tableHeader = rowsArray[0].map((row) => ({
      accessor: row,
      Header: row,
    }));
  }

  const temp = {
    row: tableHeader,
    dataWithRows: completeData,
    onlyData: valuesArray,
  };

  if (rerunData) {
    return temp;
  } else {
    setApiData(temp);
  }
};

const decriptApiKeys = (data) => {
  const output = {
    status: false,
    data: {}
  }
  var bytes = CryptoJS.AES.decrypt(data, process.env.REACT_APP_API_DECRIPT_KEY);
  var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  if (decryptedData.length > 0) {
    output.status = true;
    output.data = decryptedData;
  }
  return output;
};
const encriptDataApi = (data) => {
  var encriptText = CryptoJS.AES.encrypt(
    data,
    process.env.REACT_APP_API_DECRIPT_KEY
  ).toString();
  return encriptText;
}


const UpdateLocalStorageAuthData = (data, dispatch, isRid = true) => {
  if (isRid) {
    data.rid = 0;
  }
  const encriptData = encriptDataApi(JSON.stringify(data));
  dispatch(setUserLoginData(data));
  localStorage.setItem("isLogin", encriptData);
}

export default APICall;
export {
  LogoutFunctionHandler,
  explodeDataWithRowTable,
  decriptApiKeys,
  encriptDataApi,
  UpdateLocalStorageAuthData,
};
