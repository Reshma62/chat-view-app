import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Flex from "../components/Flex";
import InputBox from "../components/InputBox";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { userLoginInfo } from "../slices/userSlices";
import { useDispatch } from "react-redux";
import { FallingLines } from "react-loader-spinner";
import { getDatabase, ref, set, onValue, push } from "firebase/database";
const Login = () => {
  const auth = getAuth();
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const db = getDatabase();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [emailerror, setEmailerror] = useState("");
  const [passerror, setPasserror] = useState("");
  const [loading, setLoading] = useState(false);

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

    if (email && pass) {
      setLoading(true);
      signInWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

          setEmail("");
          setPass("");
          dispatch(userLoginInfo(user));
          localStorage.setItem("allUserLoginInfo", JSON.stringify(user));
          toast.success("Login SuccessFull. Please wait for redriction");
          setTimeout(() => {
            navigate("/");
          }, 2000);
          setLoading(false);
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
          if (errorMessage.includes("auth/user-not-found")) {
            setEmailerror("Email is wrong");
          }
          if (errorMessage.includes("auth/wrong-password")) {
            setPasserror("Password is wrong");
          }
          setLoading(false);
        });
    }
  };
  const provider = new GoogleAuthProvider();
  let loginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const userRef = ref(db, "users/" + auth.currentUser.uid);
        onValue(userRef, (snapshot) => {
          const currentUser = snapshot.val();

          if (currentUser.email === user.email) {
            alert(
              `You already have an account ${currentUser.email}. Please Login with Email and Password`
            );
            /* toast(
              `You already have an account ${currentUser.email}. Please Login with Email and Password`
            ); */
          }
          {
            navigate("/");
          }
        });
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error);
      });
  };
  return (
    <div className="max-h-screen w-full">
      <ToastContainer position="bottom-center" />
      <Flex className={` items-center justify-center h-screen`}>
        <Flex className="w-1/2 flex-col items-center">
          <div>
            <h2 className="text-primary font-nunito font-bold text-4xl">
              Login to your account!
            </h2>
            <div
              onClick={loginWithGoogle}
              className="flex items-center justify-center border-[#11175D]/[.3] border-solid border-2 gap-x-3 py-6 w-[300px] my-7 rounded-xl"
            >
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
                  Login to Continue
                </button>
              )}
              <p className="font-nunito font-normal text-xl text-center mt-9">
                Don't have an account ?
                <Link
                  to={"/registation"}
                  className=" font-bold  text-[#EA6C00]"
                >
                  {" "}
                  Sign up
                </Link>{" "}
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
