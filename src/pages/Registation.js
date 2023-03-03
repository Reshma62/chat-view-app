import React, { useState } from "react";
import Flex from "../components/Flex";
import InputBox from "../components/InputBox";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { userLoginInfo } from "../slices/userSlices";
import { useDispatch } from "react-redux";
import { FallingLines } from "react-loader-spinner";
const Registation = () => {
  const auth = getAuth();
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const db = getDatabase();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [emailerror, setEmailerror] = useState("");
  const [passerror, setPasserror] = useState("");
  const [fullNameerror, setFullNameerror] = useState("");
  const [loading, setLoading] = useState(false);

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
    if (fullName && email && pass) {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          updateProfile(auth.currentUser, {
            displayName: fullName,
            photoURL: "assets/default.png",
          })
            .then(() => {
              toast.success(
                "Registation SuccessFull. Please veryfi your Email"
              );
              sendEmailVerification(auth.currentUser);
              setFullName("");
              setEmail("");
              setPass("");
              // dispatch( userLoginInfo( user ) );
              // localStorage.setItem("allUserLoginInfo", JSON.stringify(user))

              setTimeout(() => {
                navigate("/login");
              }, 2000);
              setLoading(false);
            })
            .then(() => {
              set(ref(db, "users/" + user.uid), {
                username: user.displayName,
                email: user.email,
                profile_picture: user.photoURL,
              });
            })
            .catch((error) => {
              // An error occurred
              // ...
            });
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
          if (errorMessage.includes("auth/email-already-in-use")) {
            setEmailerror("Email already in use");
          }
          setLoading(false);
          // ..
        });
    }
  };

  return (
    <div className="max-h-screen w-full">
      <ToastContainer position="bottom-center" />
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
              {loading ? (
                <div className="bg-primary  md:w-96 w-full rounded-full flex justify-center">
                  <FallingLines
                    color="#fff"
                    width="70"
                    visible={true}
                    ariaLabel="falling-lines-loading"
                  />
                </div>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="bg-primary text-white w-full rounded-full py-6 font-nunito font-semibold text-xl"
                >
                  Sign Up
                </button>
              )}
              <p className="font-nunito font-normal text-xl text-center mt-9">
                Already have an account ?{" "}
                <Link to={"/login"} className=" font-bold  text-[#EA6C00]">
                  Sign In
                </Link>{" "}
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
