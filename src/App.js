import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Auths from "./auth";
import MainPage from "./modual";
import LoginPage from "./modual/LoginPage";
import NotFoundPage from "./modual/NotFoundPage";
import ForgotPassword from "./modual/ForgotPassword";
import { setActiveRole } from "./reducers/actions/action";
import { useEffect } from "react";
import AutodaillerScreen from "./popupscreen/AutodaillerScreen";
import InboundScreen from './popupscreen/InbondScreen';
const App = () => {
  const { data, isLogin } = useSelector((state) => state.UserDataReducer);
  var curentRol = data.role;
  var giveAccess = [];
  const dispatch = useDispatch();
  if (data?.role !== undefined) {
    const curentRolData = Auths.filter(
      (auth) => auth.role === curentRol.toUpperCase() || auth.name === curentRol.toUpperCase()
    )[0];
    giveAccess = Auths.filter((auth) =>
      curentRolData.access.includes(auth.key)
    );
    curentRol = curentRolData.role;
  }

  useEffect(() => {
    if (data.length > 0) {
      dispatch(setActiveRole(Auths.filter(
        (auth) => auth.role === curentRol.toUpperCase() || auth.name === curentRol.toUpperCase()
      )))
    }
  }, [curentRol, dispatch, data])

  return (
    <>
      <Routes>
        {isLogin ? (
          <Route path="/" element={<MainPage />}>
            {giveAccess.map((list, i) => (
              <Route
                index
                path={`${list.role.toLowerCase()}/*`}
                element={list.filePath}
                key={i}
              />
            ))}
            <Route
              exact
              path="/"
              element={<Navigate to={curentRol.toLowerCase()} />}
            />
          </Route>
        ) : (
          <>
            <Route path="/" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </>
        )}
        <Route path="autodialer/:sipId/:contactNumber/:callId/:callType/:RID" element={<AutodaillerScreen />} />
        <Route path="inbound" element={<InboundScreen />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>

  );
};

export default App;
