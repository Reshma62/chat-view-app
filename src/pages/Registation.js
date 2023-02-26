import React, { useState } from "react";
import Flex from "../components/Flex";
import InputBox from "../components/InputBox";

const Registation = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [emailerror, setEmailerror] = useState("");
  const [passerror, setPasserror] = useState("");
  const [fullNameerror, setFullNameerror] = useState("");

  let handleFullName = (e) => {
    setFullName(e.target.value);
    setFullNameerror("");
  };
  let handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailerror("");
  };
  let handlePassword = (e) => {
    setPass(e.target.value);
    setPasserror("");
  };
  let handleSubmit = () => {
    if (!fullName) {
      setFullNameerror("Full Name is Requried");
    }
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
              Get started with easily register
            </h2>
            <p className="text-black/30 font-nunito font-normal text-2xl mb-10">
              Free register and you can enjoy it
            </p>
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
                onChange={handleFullName}
                type={"text"}
                label="Full Name
"
              />
              {fullNameerror && (
                <p className="bg-red-500 px-3 rounded-md text-white -mt-10 mb-10 py-2">
                  {fullNameerror}
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
                Sign Up
              </button>
              <p className="font-nunito font-normal text-xl text-center mt-9">
                Already have an account ?{" "}
                <span className=" font-bold  text-[#EA6C00]">Sign In</span>{" "}
              </p>
            </div>
          </div>
        </Flex>
        <div className="w-1/2">
          <img
            className="h-screen w-full object-cover"
            src="assets/signup.png"
            alt=""
          />
        </div>
      </Flex>
    </div>
  );
};

export default Registation;
