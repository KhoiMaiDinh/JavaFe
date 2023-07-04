import React, {useRef, useState, useEffect} from 'react';
// import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';
// import { FcGoogle } from 'react-icons/fc';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import Facebook_Icon from '../assets/icons8-facebook.svg'

import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentToken, selectCurrentUser, setCredentials, setUserInfo } from '../features/auth/authSlice';
import { useLoginMutation, useGetUserInfoMutation } from '../features/auth/authApiSlice';
// import { client } from '../client';

const Login = () => {
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [login, { isLoading }] = useLoginMutation();
  const [getUserInfo] = useGetUserInfoMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      login({ user, pwd }).unwrap()
      .then(token => {
        dispatch(setCredentials({ accessToken: token.access_token, user: null}));
        return getUserInfo({token: token.access_token}).unwrap();
      })
      .then((res) => {
        dispatch(setUserInfo({ user: res}))
        // localStorage.setItem('profile')
        setUser("");
        setPwd("");
        navigate("/");
      })
      .catch(err => console.log(err.message))
      
    } catch (err) {
      console.log({err})
      if (!err?.originalStatus) {
        // isLoading: true until timeout occurs
        setErrMsg("No Server Response");
      } else if (err.originalStatus === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.originalStatus === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setUser(e.target.value);

  const handlePwdInput = (e) => setPwd(e.target.value);

  const loginWithFacebook = async() => {

  }


const content = isLoading ? (
  <h1>Loading...</h1>
) : (
  <section className="login">
    <p
      ref={errRef}
      className={errMsg ? "errmsg" : "offscreen"}
      aria-live="assertive"
    >
      {errMsg}
    </p>

    <form onSubmit={handleSubmit}>
        <div className="flex justify-start h-screen">
          <div className=" relative w-1/2 h-full">
            <div className="absolute top-[20%] left-[10%] flex flex-col">
              <h1 className="text-4xl text-white font-extrabold my-4">
                Share your photos to the world
              </h1>
              <p className="text-xl text-white font-normal">
                Start for free and be creative
              </p>
            </div>
            <video
              src={shareVideo}
              type="video/mp4"
              loop
              controls={false}
              muted
              autoPlay
              className="w-full h-full object-cover"
            />

            {/* logo */}
            <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">
              {/* <div className="p-5">
            <img src={logo} width="130px" />
          </div> */}
            </div>
          </div>

          {/* login */}
          <div className="w-1/2 h-full bg-[#ffffff] flex flex-col p-20  justify-between items-center">
            <div>
              <img src={logo} width="130px" />
              {/* <h1 className='text-x1 text-[#f5f5f5] font-semibold'>Share photos</h1> */}
            </div>

            <div className="w-full flex flex-col max-w-[500px]">
              <div className="w-full flex flex-col mb-2">
                <h3 className="text-3xl font-semibold mb-4 ">Login</h3>
                <p className="text-base mb-2 ">
                  Welcome Back! Please enter your details.
                </p>
              </div>

              <div className="w-full flex flex-col">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus: outline-none"
                  //
                    id="email"
                    ref={userRef}
                    value={user}
                    onChange={handleUserInput}
                    autoComplete="off"
                    required
                ></input>

                <input
                  type="password"
                  placeholder="Password"
                  className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus: outline-none"
                  //
                  id="password"
                  onChange={handlePwdInput}
                  value={pwd}
                  required
                ></input>
              </div>

              <div className="w-full flex items-center justify-between">
                <div className="w-full flex items-center">
                  <input type="checkbox" className="w-4 h-4 mr-2" />
                  <p className="text-sm">Remember me for 30 days</p>
                </div>
                <p className="text-sm font-medium whitespace-nowrap cursor-pointe underline underline-offset-2">
                  Forgot Password ?
                </p>
              </div>

              <div className="w-flex flex flex-col my-4">
                <button className="w-full text-white my-2 font-semibold bg-[#060606] rounded-md p-4 text-center flex items-center justify-center cursor-pointer">
                  Log In
                </button>
                <button className="w-full text-[#060606] my-2 font-semibold bg-white border-2 border-black rounded-md p-4 text-center flex items-center justify-center cursor-pointer">
                  Sign Up
                </button>
              </div>

              <div className="w-full flex items-center justify-center relative py2">
                <div className="w-full h-[1px] bg-black"></div>
              </div>

              <a href={"https://localhost:8080/oauth2/authorize/facebook?redirect_uri=https://localhost:3000/oauth2/redirect"} className='w-full text-[#060606] my-2 font-semibold bg-white border-2 border-black rounded-md p-4 text-center flex  items-center justify-center cursor-pointer'>
                <img src={Facebook_Icon}/>
                Sign in with Facebook
              </a>
            </div>

            <div className="w-full flex items-center justify-center">
              <p className="text-sm font-normal text-[#060606] ">
                Don't have an account?{" "}
                <span className="font-semibold underline underline-offset-2 cursor-pointer ">
                  Sign up for free
                </span>
              </p>
            </div>
          </div>
        </div>
      </form>
    </section>
  );

  
  return content;
};

export default Login;