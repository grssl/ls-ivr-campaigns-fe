import * as React from "react";
import { useDispatch } from "react-redux";
import APICall, { decriptApiKeys } from "../components/Api/APICall";
import { setUserLoginData } from "../reducers/actions/action";
import { toast, ToastContainer } from "react-toastify";


export default function LoginPage() {
  const dispatch = useDispatch();
  const [MyOtp, setMyOtp] = React.useState("")
  const [ShowOtp, setShowOtp] = React.useState(false)
  const [UserLoginDataTemp, setUserLoginDataTemp] = React.useState({})

  const [LoginInput, setLoginInput] = React.useState({})

  const handleSubmit = (event) => {
    event.preventDefault();

    APICall("/auth/login", "POST", LoginInput)
      .then((response) => {
        if (response.status) {
          const tmpDecript = decriptApiKeys(response.data);
          if (tmpDecript.status) {
            const decodeJson = JSON.parse(tmpDecript.data);
            if (decodeJson.userId !== undefined) {
              toast.success("Login OTP Send successful");
              setShowOtp(true)
              setUserLoginDataTemp({
                encript: tmpDecript.data,
                noEncript: response.data
              })
            } else {
              toast.error("Login failed");
            }
          }

        } else {

          toast.error("Login failed");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.statusCode === 400) {
          toast.error(err.message);
        } else {
          console.log(err);
        }
      });


  };


  const handleSubmitOtp = (event) => {
    event.preventDefault();
    const TempUserData = JSON.parse(UserLoginDataTemp.encript)
    console.log("UserLoginDataTemp", UserLoginDataTemp.encript);
    const OTP = TempUserData.OTP;
    console.log("Login", MyOtp, OTP);
    if (OTP === MyOtp) {
      toast.success("Login successful");
      dispatch(setUserLoginData(TempUserData));
      localStorage.setItem("isLogin", UserLoginDataTemp.noEncript);
      window.location.reload();
    } else {
      toast.error("OTP Not Match");
    }
  }
  const inputChange = (event) => {
    const { name, value } = event.target;
    setLoginInput(v => ({ ...v, [name]: value }))
  }

  return (
    <>
      <ToastContainer />
      <section className="h-screen" style={{ backgroundImage: `url(${require("../assets/background.jpg")})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
        <div className="px-6 h-full text-gray-800">
          <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
            <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
              {/* <img src={require("../assets/background.jpg")} className="w-full"
                alt="Sample" /> */}
            </div>
            <div className="xl:ml-20 xl:w-3/12 lg:w-3/12 md:w-8/12 mb-12 md:mb-0 p-10 bg-gray-500 rounded-3xl  shadow-red-800 shadow-2xl">
              <form onSubmit={ShowOtp ? handleSubmitOtp : handleSubmit} method="post">
                <div className="flex flex-row items-center justify-center lg:justify-center">
                  <p className="text-3xl mb-0 mr-4 uppercase text-white font-extrabold">Sign in</p>
                </div>
                <div
                  className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <p className="text-center font-semibold mx-4 mb-0"></p>
                </div>
                {
                  ShowOtp ?
                    <div className="mb-6">
                      <input type="text"
                        onChange={(event) => setMyOtp(event.target.value)}
                        name="otp"
                        value={MyOtp}
                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="exampleFormControlInput2"
                        placeholder="Enter OTP" />
                    </div>
                    :
                    <>

                      <div className="mb-6">
                        <input type="text"
                          onChange={inputChange}
                          name="userName"
                          value={LoginInput.userName}
                          className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id="exampleFormControlInput2"
                          placeholder="Email address" />
                      </div>
                      <div className="mb-6">
                        <input type="password"
                          onChange={inputChange}
                          name="password"
                          value={LoginInput.password}
                          className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id="exampleFormControlInput2"
                          placeholder="Password" />
                      </div>
                    </>}
                {/* <div className="flex justify-between items-center mb-6">
                  <div className="form-group form-check">
                    <input type="checkbox"
                      className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      id="exampleCheck2" />
                    <label className="form-check-label inline-block text-gray-800" htmlFor="exampleCheck2">Remember me</label>
                  </div>
                  <a href="#!" className="text-gray-800">Forgot password?</a>
                </div> */}
                <div className="text-center lg:text-center">
                  <button type="submit"
                    className="rounded-3xl inline-block px-16 py-3 bg-red-700 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                    {ShowOtp ? "Verify OTP" : "Login"}
                  </button>
                  {/* <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                    Don't have an account?
                    <a href="#!"
                      className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out">Register</a>
                  </p> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
