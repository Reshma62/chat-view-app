import React, { useState } from "react";
import Flex from "./Flex";
import Icons from "./Icons";
import { AiOutlineHome, AiFillMessage, AiFillSetting } from "react-icons/ai";
import { MdOutlineNotifications, MdCloudUpload } from "react-icons/md";
import { SlLogout } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";
import { userLoginInfo, userProfileUpdate } from "../slices/userSlices";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import Cropper from "react-cropper";
import { FallingLines } from "react-loader-spinner";
import "cropperjs/dist/cropper.css";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import {
  getDatabase,
  ref as databaseRef,
  child,
  push,
  update,
} from "firebase/database";

const Sidebar = ({ active }) => {
  const auth = getAuth();
  const db = getDatabase();
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(false);
  let handleModalClose = () => {
    setModalShow(false);
  };

  function toggleModal() {
    //  setIsOpen( !isOpen );
    setModalShow(!modalShow);
  }
  let data = useSelector((state) => state.alluserLoginInfo.userInfo);

  let handleLogOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
        localStorage.removeItem("allUserLoginInfo");
        dispatch(userLoginInfo(null));
      })
      .catch((error) => {
        // An error happened.
      });
    /*  */
  };
  let handleModalOpen = () => {
    setModalShow(true);
  };

  const [image, setImage] = useState("");
  const [cropData, setCropData] = useState("");
  const [cropper, setCropper] = useState("");
  const uploadImg = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };
  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
    const storage = getStorage();
    const storageRef = ref(storage, "profilePic/" + auth.currentUser.uid);
    // Data URL string
    const message4 = cropper.getCroppedCanvas().toDataURL();
    uploadString(storageRef, message4, "data_url").then((snapshot) => {
      getDownloadURL(storageRef).then((downloadURL) => {
        updateProfile(auth.currentUser, {
          photoURL: downloadURL,
        })
          .then(() => {
            update(databaseRef(db, "users/" + auth.currentUser.uid), {
              profile_picture: downloadURL,
            });
            dispatch(userProfileUpdate(downloadURL));
            setModalShow(false);
          })
          .catch((error) => {
            // An error occurred
            // ...
          });
      });
    });
  };
  return (
    <div className="">
      <div className="bg-[#5F35F5] h-screen rounded-xl">
        <div className={`h-[70%]`}>
          <Flex className=" items-center justify-center] mb-20 flex-col">
            <div className="relative group">
              <div className="w-[120px] h-[120px] rounded-full">
                <img
                  src={data && data.photoURL}
                  alt=""
                  className="mx-auto  mt-6 rounded-full"
                />
              </div>
              <div
                onClick={toggleModal}
                className=" opacity-0 group-hover:opacity-100 absolute w-[120px] h-[120px] mt-6 bg-[rgba(0,0,0,.4)] rounded-full top-0 left-0 flex justify-center items-center "
              >
                <MdCloudUpload className="text-white text-3xl  rounded-full" />
              </div>
            </div>
            <h2 className="mt-8 text-white font-nunito font-semibold text-xl">
              {data && data.displayName}
            </h2>
          </Flex>
          <Flex className=" flex-col h-full gap-y-8">
            <Link to={`/`} className=" text-primary relative z-10 ml-9 py-4">
              <AiOutlineHome
                className={`${
                  active == "home" ? "text-[#5F35F5]" : "text-[#BAD1FF]"
                } mx-auto text-5xl`}
              />
              <div
                className={`absolute ${
                  active == "home" ? "bg-white" : "bg-transparent"
                } w-full h-full top-0 left-0 -z-10 rounded-tl-lg rounded-bl-lg`}
              ></div>
              <div className="absolute bg-[#5F35F5] w-[8px] h-full right-0 top-0 -z-10 rounded-tl-lg rounded-bl-lg"></div>
            </Link>
            <Link
              to={`/message`}
              className=" text-primary relative z-10 ml-9 py-4"
            >
              <AiFillMessage
                className={`${
                  active == "message" ? "text-[#5F35F5]" : "text-[#BAD1FF]"
                } mx-auto text-5xl`}
              />
              <div
                className={`absolute ${
                  active == "message" ? "bg-white" : "bg-transparent"
                } w-full h-full top-0 left-0 -z-10 rounded-tl-lg rounded-bl-lg`}
              ></div>
              <div className="absolute bg-[#5F35F5] w-[8px] h-full right-0 top-0 -z-10 rounded-tl-lg rounded-bl-lg"></div>
            </Link>
            <Link
              to={`/notification`}
              className=" text-primary relative z-10 ml-9 py-4"
            >
              <MdOutlineNotifications
                className={`${
                  active == "notification" ? "text-[#5F35F5]" : "text-[#BAD1FF]"
                } mx-auto text-5xl`}
              />
              <div
                className={`absolute ${
                  active == "notification" ? "bg-white" : "bg-transparent"
                } w-full h-full top-0 left-0 -z-10 rounded-tl-lg rounded-bl-lg`}
              ></div>
              <div className="absolute bg-[#5F35F5] w-[8px] h-full right-0 top-0 -z-10 rounded-tl-lg rounded-bl-lg"></div>
            </Link>
            <Link
              to={`/settings`}
              className=" text-primary relative z-10 ml-9 py-4"
            >
              <AiFillSetting
                className={`${
                  active == "settings" ? "text-[#5F35F5]" : "text-[#BAD1FF]"
                } mx-auto text-5xl`}
              />
              <div
                className={`absolute ${
                  active == "settings" ? "bg-white" : "bg-transparent"
                } w-full h-full top-0 left-0 -z-10 rounded-tl-lg rounded-bl-lg`}
              ></div>
              <div className="absolute bg-[#5F35F5] w-[8px] h-full right-0 top-0 -z-10 rounded-tl-lg rounded-bl-lg"></div>
            </Link>
            <Link
              onClick={handleLogOut}
              className=" text-primary relative z-10 ml-9 py-4 mt-auto"
            >
              <SlLogout
                className={` text-[#BAD1FF]
               mx-auto text-5xl`}
              />
              <div
                className={`absolute  bg-transparent
               w-full h-full top-0 left-0 -z-10 rounded-tl-lg rounded-bl-lg`}
              ></div>
              <div className="absolute bg-[#5F35F5] w-[8px] h-full right-0 top-0 -z-10 rounded-tl-lg rounded-bl-lg"></div>
            </Link>
          </Flex>
        </div>
      </div>
      {modalShow && (
        <div className="w-full h-screen absolute bg-primary/75 top-0 left-0 z-50 flex justify-center items-center">
          <div className="bg-white  py-5 px-8 w-2/4 rounded-xl">
            <h3 className="text-2xl font-pop font-semibold mb-5">
              Please upload your profile pic
            </h3>
            {image && (
              <Cropper
                style={{ height: 300, width: "100%" }}
                initialAspectRatio={1}
                preview=".img-preview"
                src={image}
                viewMode={1}
                guides={true}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={false}
                responsive={true}
                checkOrientation={false}
                onInitialized={(instance) => {
                  setCropper(instance);
                }}
              />
            )}
            {image ? (
              <div className="w-[100px] h-[100px] mx-auto rounded-full overflow-hidden mb-5">
                <div className="img-preview w-full h-full"></div>
              </div>
            ) : (
              <div className="w-[100px] h-[100px] mx-auto rounded-full overflow-hidden mb-5">
                <img className="w-full h-full" src={data && data.photoURL} />
              </div>
            )}

            <input className="mb-5" type="file" onChange={uploadImg} />
            <br />
            {loading ? (
              <button className="bg-primary px-7 py-5 rounded font-nunito font-semibold text-white text-xl mr-5 inline-block">
                <p className="flex text-xl">
                  Please Wait
                  <FallingLines
                    color="#fff"
                    width="30"
                    visible={true}
                    ariaLabel="falling-lines-loading"
                  />
                </p>
              </button>
            ) : (
              <button
                onClick={getCropData}
                className="bg-primary px-7 py-5 rounded font-nunito font-semibold text-white text-xl mr-5"
              >
                Upload
              </button>
            )}

            <button
              onClick={handleModalClose}
              className="bg-primary px-7 py-5 rounded font-nunito font-semibold text-white text-xl mr-5"
            >
              Cancle
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
