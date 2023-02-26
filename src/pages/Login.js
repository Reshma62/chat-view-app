import React, { useState } from "react";
import Flex from "../components/Flex";
import InputBox from "../components/InputBox";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [emailerror, setEmailerror] = useState("");
  const [passerror, setPasserror] = useState("");

  let handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailerror("");
  };
  let handlePassword = (e) => {
    setPass(e.target.value);
    setPasserror("");
  };
  let handleSubmit = () => {
    if (!pass) {
      setPasserror("Password is Requried");
    }
    /* else {

      if (!/^(?=.*[a-z])/.test(pass)) {
        setPasserror("lowercase is required");
      } else if (!/^(?=.*[A-Z])/.test(pass)) {
        setPasserror("Uppercase is required");
      } else if (!/^(?=.*[0-9])/.test(pass)) {
        setPasserror("Number is required");
      } else if (!/^(?=.*[!@#$%^&*])/.test(pass)) {
        setPasserror("Symbol is required");
      } else if (!/^(?=.{8,})/.test(pass)) {
        setPasserror("At least 8 charecter need ");
      }
    } */
    if (!email) {
      setEmailerror("Email is Requried");
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailerror("Email is not valid");
    }
  };
  return (
    <div className="max-h-screen w-full">
      <Flex className={` items-center justify-center h-screen`}>
        <Flex className="w-1/2 flex-col items-center">
          <div>
            <h2 className="text-primary font-nunito font-bold text-4xl">
              Login to your account!
            </h2>
            <div className="flex items-center justify-center border-[#11175D]/[.3] border-solid border-2 gap-x-3 py-6 w-[300px] my-7 rounded-xl">
              <div>
                <img src="assets/google.png" alt="" />
              </div>
              <p className="text-black/30 font-nunito font-normal text-2xl">
                Login with Google
              </p>
            </div>

            <div className="w-[450px]">
              <InputBox
                onChange={handleEmail}
                type={"text"}
                label="Email Address"
              />
              {emailerror && (
                <p className="bg-red-500 px-3 rounded-md text-white -mt-10 mb-10 py-2">
                  {emailerror}
                </p>
              )}

              <InputBox
                onChange={handlePassword}
                type={"text"}
                label="Password"
              />
              {passerror && (
                <p className="bg-red-500 px-3 rounded-md text-white -mt-10 mb-10 py-2">
                  {passerror}
                </p>
              )}

              <button
                onClick={handleSubmit}
                className="bg-primary text-white w-full rounded-full py-6 font-nunito font-semibold text-xl"
              >
                Login to Continue
              </button>
              <p className="font-nunito font-normal text-xl text-center mt-9">
                Don't have an account ?
                <span className=" font-bold  text-[#EA6C00]"> Sign up</span>{" "}
              </p>
            </div>
          </div>
        </Flex>
        <div className="w-1/2">
          <img
            className="h-screen w-full object-cover"
            src="assets/login.png"
            alt=""
          />
        </div>
      </Flex>
    </div>
  );
};

export default Login;
