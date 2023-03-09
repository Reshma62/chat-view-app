import React, { useEffect, useState } from "react";
import {
  BsThreeDotsVertical,
  BsTriangleFill,
  BsCamera,
  BsFillMicFill,
} from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import { GrGallery } from "react-icons/gr";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import { useSelector } from "react-redux";
const Chat = () => {
  const db = getDatabase();
  let data = useSelector((state) => state.alluserLoginInfo.userInfo);
  const [msg, setMsg] = useState("");
  const [singleMess, setSingleMess] = useState([]);
  const [groupMess, setGroupMess] = useState([]);
  const [groupMember, setGroupMember] = useState([]);
  let activeChat = useSelector((state) => state.activeUserChat.activeUserInfo);
  console.log(activeChat);
  let handleMessage = (e) => {
    setMsg(e.target.value);
  };
  let handleSendMessage = () => {
    if (!msg) {
      console.log("write");
    } else {
      if (activeChat.status == "single") {
        set(push(ref(db, "singleMessage")), {
          whoSendId: data.uid,
          whoSendName: data.displayName,
          receiverId: activeChat.id,
          reciverName: activeChat.name,
          mess: msg,
          photo: activeChat.profilePhoto,
          date: `${new Date().getFullYear()} - ${
            new Date().getMonth() + 1
          } - ${new Date().getDate()}  ${new Date().getHours()}:${new Date().getMinutes()}`,
        }).then(() => {
          setMsg("");
        });
      } else {
        console.log("AMI Group");
        set(push(ref(db, "groupMessage")), {
          whoSendId: data.uid,
          whoSendName: data.displayName,
          receiverId: activeChat.id,
          reciverName: activeChat.name,
          mess: msg,
          adminId: activeChat.adminId,
          photo: activeChat.profilePhoto,
          date: `${new Date().getFullYear()} - ${
            new Date().getMonth() + 1
          } - ${new Date().getDate()}  ${new Date().getHours()}:${new Date().getMinutes()}`,
        }).then(() => {
          setMsg("");
        });
      }
    }
  };
  useEffect(() => {
    const singleMess = ref(db, "singleMessage");
    onValue(singleMess, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (
          (data.uid == item.val().whoSendId &&
            item.val().receiverId == activeChat.id) ||
          (data.uid == item.val().receiverId &&
            item.val().whoSendId == activeChat.id)
        ) {
          arr.push(item.val());
        }
      });
      setSingleMess(arr);
    });
  }, [activeChat]);
  useEffect(() => {
    const groupMess = ref(db, "groupMessage");
    onValue(groupMess, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val());
      });
      setGroupMess(arr);
    });
  }, [activeChat]);
  useEffect(() => {
    const groupMembers = ref(db, "acceptGroupReq");
    onValue(groupMembers, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().groupId + item.val().userId);
      });
      setGroupMember(arr);
    });
  }, []);

  return (
    <div className="shadow-xl bg-white rounded-2xl  py-6">
      {/* <ToastContainer position="bottom-center" /> */}
      {/* Profile Name and Pic Start */}
      <div className=" mx-14 flex gap-x-8 border-b border-solid border-[rgba(0,0,0,0.25)] pb-6 items-center mb-14">
        <div className="relative w-[75px] h-[75px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
          <img
            src={activeChat && activeChat.profilePhoto}
            alt=""
            className="rounded-full"
          />
          <div className="bg-green-500 absolute w-[15px] h-[15px] rounded-full bottom-[7px] right-0"></div>
        </div>
        <div>
          <h3 className="font-pop font-semibold text-2xl">
            {activeChat && activeChat.name}{" "}
          </h3>
          <p className="font-pop font-normal text-sm text-[rgba(0, 0, 0, 0.85)]">
            Online
          </p>
        </div>
        <div className="items-end grow text-right">
          <BsThreeDotsVertical className=" inline-flex text-2xl text-primary" />
        </div>
      </div>
      {/* Profile Name and Pic End */}
      {/* Messageing Start */}

      <div className=" px-14 h-[640px]  overflow-y-scroll overflow-x-hidden no-scrollbar">
        {/* Send Message Start */}
        {activeChat && activeChat.status == "single" ? (
          singleMess.map((item) =>
            item.whoSendId == data.uid ? (
              <div className="text-right">
                <div className="mb-7 ">
                  <div className="flex gap-x-5 justify-end">
                    <div className="bg-primary px-5 py-3 inline-block rounded-lg relative text-left">
                      <p className="font-pop font-medium text-base text-white">
                        {item.mess}
                      </p>

                      <BsTriangleFill className="absolute right-[-8px] bottom-0 text-primary" />
                    </div>
                    <div className="self-end">
                      <img
                        src={data && data.photoURL}
                        alt=""
                        className="w-[25px] h-[25px] rounded-full"
                      />
                    </div>
                  </div>

                  <p className="font-pop font-medium text-sm text-[rgba(0,0,0,0.25)] mt-2">
                    Today, 2:01pm
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-left">
                <div className="mb-7">
                  <div className="flex gap-x-5">
                    <div className="self-end">
                      <img
                        src={activeChat && activeChat.profilePhoto}
                        alt=""
                        className="w-[25px] h-[25px] rounded-full"
                      />
                    </div>
                    <div className="bg-[#F1F1F1] px-5 py-3 inline-block rounded-lg relative">
                      <p className="font-pop font-medium text-base text-black">
                        {item.mess}
                      </p>
                      <BsTriangleFill className="absolute left-[-8px] bottom-0 text-[#F1F1F1]" />
                    </div>
                  </div>

                  <p className="font-pop font-medium text-sm text-[rgba(0,0,0,0.25)] mt-2">
                    Today, 2:01pm
                  </p>
                </div>
              </div>
            )
          )
        ) : data.uid == activeChat.adminId ||
          groupMember.includes(activeChat.id + data.uid) ? (
          groupMess.map((item) =>
            item.whoSendId == data.uid
              ? item.receiverId == activeChat.id && (
                  <div className="text-right">
                    <div className="mb-7 ">
                      <div className="flex gap-x-5 justify-end">
                        <div className="bg-primary px-5 py-3 inline-block rounded-lg relative text-left">
                          <p className="font-pop font-medium text-base text-white">
                            {item.mess}
                          </p>

                          <BsTriangleFill className="absolute right-[-8px] bottom-0 text-primary" />
                        </div>
                        <div className="self-end">
                          <img
                            src={data && data.photoURL}
                            alt=""
                            className="w-[25px] h-[25px] rounded-full"
                          />
                        </div>
                      </div>

                      <p className="font-pop font-medium text-sm text-[rgba(0,0,0,0.25)] mt-2">
                        Today, 2:01pm
                      </p>
                    </div>
                  </div>
                )
              : item.receiverId == activeChat.id && (
                  <div className="text-left">
                    <div className="mb-7">
                      <div className="flex gap-x-5">
                        <div className="self-end">
                          <img
                            src={activeChat && activeChat.profilePhoto}
                            alt=""
                            className="w-[25px] h-[25px] rounded-full"
                          />
                        </div>
                        <div className="bg-[#F1F1F1] px-5 py-3 inline-block rounded-lg relative">
                          <p className="font-pop font-medium text-base text-black">
                            {item.mess}
                          </p>
                          <BsTriangleFill className="absolute left-[-8px] bottom-0 text-[#F1F1F1]" />
                        </div>
                      </div>

                      <p className="font-pop font-medium text-sm text-[rgba(0,0,0,0.25)] mt-2">
                        Today, 2:01pm
                      </p>
                    </div>
                  </div>
                )
          )
        ) : (
          <h1>you are not group Member</h1>
        )}

        {/* Send Message End */}
        {/* Receive Message Start */}
        {/*  <div className="text-left">
          <div className="mb-7">
            <div className="bg-[#F1F1F1] px-5 py-3 inline-block rounded-lg relative">
              <p className="font-pop font-medium text-base text-black">
                Hey There !
              </p>
              <BsTriangleFill className="absolute left-[-8px] bottom-0 text-[#F1F1F1]" />
            </div>
            <p className="font-pop font-medium text-sm text-[rgba(0,0,0,0.25)] mt-2">
              Today, 2:01pm
            </p>
          </div>
          <div className="mb-7">
            <div className="bg-[#F1F1F1] px-5 py-3 inline-block rounded-lg relative">
              <p className="font-pop font-medium text-base text-black">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Maiores quibusdam nemo, culpa natus dicta mollitia voluptas
                commodi temporibus eligendi optio corrupti provident animi nobis
                quisquam quaerat excepturi sunt? Blanditiis, corporis.
              </p>
              <BsTriangleFill className="absolute left-[-8px] bottom-0 text-[#F1F1F1]" />
            </div>
            <p className="font-pop font-medium text-sm text-[rgba(0,0,0,0.25)] mt-2">
              Today, 2:01pm
            </p>
          </div>
        </div> */}
        {/* Receive Message End */}

        {/* Send Img Start */}
        {/*   <div className="mb-7 text-right">
          <div className="w-64 bg-primary p-3 inline-block rounded-lg relative text-left">
            <ModalImage small={"images/login.png"} large={"images/login.png"} />
            <img src="assets/login.png" alt="" />
            <BsTriangleFill className="absolute right-[-8px] bottom-0 text-primary" />
          </div>
          <p className="font-pop font-medium text-sm text-[rgba(0,0,0,0.25)] mt-2">
            Today, 2:01pm
          </p>
        </div> */}
        {/* Send Img End */}
        {/* Receive Img Start */}
        {/*   <div className="mb-7 text-left">
          <div className="w-64 bg-[#f1f1f1] p-3 inline-block rounded-lg relative text-left">
            {<ModalImage small={"images/login.png"} large={"images/login.png"} />}

            <BsTriangleFill className="absolute left-[-8px] bottom-0 text-[#f1f1f1]" />
          </div>
          <p className="font-pop font-medium text-sm text-[rgba(0,0,0,0.25)] mt-2">
            Today, 2:01pm
          </p>
        </div> */}
        {/* Receive Img End*/}
        {/* Receive audio Start */}
        {/*   <div className="mb-7 text-left">
          <div className="w-64 inline-block rounded-lg text-left">
            <audio controls></audio>
          </div>
          <p className="font-pop font-medium text-sm text-[rgba(0,0,0,0.25)] mt-2">
            Today, 2:01pm
          </p>
        </div> */}
        {/* Receive audio End */}
        {/* Receive video Start */}
        {/*  <div className="mb-7 text-left">
          <div className="w-64 inline-block rounded-lg text-left">
            <video controls></video>
          </div>
          <p className="font-pop font-medium text-sm text-[rgba(0,0,0,0.25)] mt-2">
            Today, 2:01pm
          </p>
        </div> */}
        {/* Receive video End */}
        {/* Send audio Start */}
        {/* <div className="mb-7 text-right">
          <div className="w-64 inline-block rounded-lg text-left">
            <audio controls></audio>
          </div>
          <p className="font-pop font-medium text-sm text-[rgba(0,0,0,0.25)] mt-2">
            Today, 2:01pm
          </p>
        </div> */}
        {/* Send audio End */}
        {/* <div className="mb-7 text-right">
          <div className="w-64 inline-block rounded-lg text-left">
            <video controls></video>
          </div>
          <p className="font-pop font-medium text-sm text-[rgba(0,0,0,0.25)] mt-2">
            Today, 2:01pm
          </p>
        </div> */}
        {/* Send video End */}
      </div>
      {/* Messageing End */}
      {activeChat && activeChat.status == "single" ? (
        <div className=" flex gap-x-5 mx-14 border-t-2 pt-8 border-solid border-[rgba(0,0,0,0.25)] ">
          <div className="relative w-[95%] ">
            <>
              <input
                onChange={handleMessage}
                type="text"
                value={msg}
                className="bg-[#f1f1f1] w-full pl-5 py-4 rounded-lg"
              />

              <BsCamera className="absolute right-3 text-2xl top-[50%] translate-y-[-50%]" />

              <HiOutlineEmojiHappy className="absolute right-12 text-2xl top-[50%] translate-y-[-50%]" />

              <div className="absolute top-[-450px] right-0">
                {/* <EmojiPicker
                    onEmojiClick={(emoji) => handleSendEmoji(emoji)}
                  /> */}
              </div>

              <BsFillMicFill className="absolute right-20 text-2xl top-[50%] translate-y-[-50%]" />
              <div className="w-full absolute right-20 text-2xl top-[50%] translate-y-[-50%]">
                {/* <AudioRecorder onRecordingComplete={addAudioElement} /> */}
              </div>

              <label>
                <input className="hidden" type="file" name="" id="" />
                <GrGallery className="absolute right-28 text-2xl top-[50%] translate-y-[-50%]" />
              </label>
            </>

            {/* <div className="absolute top-0 left-0 w-full flex justify-between">
              <audio controls src={`audioUrl`} className="w-[450px]"></audio>
              <div className="flex gap-x-5">
                <button
                  className="px-4 py-2.5 bg-primary rounded-lg text-white font-bold"
                >
                  Send Audio
                </button>
                <button
                  className="px-4 py-2.5 bg-primary rounded-lg text-white font-bold"
                >
                  Delete Audio
                </button>
              </div>
            </div> */}
          </div>
          {/* <AudioRecorder onRecordingComplete={addAudioElement} /> */}
          <button
            onClick={handleSendMessage}
            className="p-4 bg-primary rounded-lg text-white font-bold"
          >
            <FiSend />
          </button>
        </div>
      ) : (
        (data.uid == activeChat.adminId ||
          groupMember.includes(activeChat.id + data.uid)) && (
          <div className=" flex gap-x-5 mx-14 border-t-2 pt-8 border-solid border-[rgba(0,0,0,0.25)] ">
            <div className="relative w-[95%] ">
              <>
                <input
                  onChange={handleMessage}
                  type="text"
                  value={msg}
                  className="bg-[#f1f1f1] w-full pl-5 py-4 rounded-lg"
                />

                <BsCamera className="absolute right-3 text-2xl top-[50%] translate-y-[-50%]" />

                <HiOutlineEmojiHappy className="absolute right-12 text-2xl top-[50%] translate-y-[-50%]" />

                <div className="absolute top-[-450px] right-0">
                  {/* <EmojiPicker
                    onEmojiClick={(emoji) => handleSendEmoji(emoji)}
                  /> */}
                </div>

                <BsFillMicFill className="absolute right-20 text-2xl top-[50%] translate-y-[-50%]" />
                <div className="w-full absolute right-20 text-2xl top-[50%] translate-y-[-50%]">
                  {/* <AudioRecorder onRecordingComplete={addAudioElement} /> */}
                </div>

                <label>
                  <input className="hidden" type="file" name="" id="" />
                  <GrGallery className="absolute right-28 text-2xl top-[50%] translate-y-[-50%]" />
                </label>
              </>

              {/* <div className="absolute top-0 left-0 w-full flex justify-between">
              <audio controls src={`audioUrl`} className="w-[450px]"></audio>
              <div className="flex gap-x-5">
                <button
                  className="px-4 py-2.5 bg-primary rounded-lg text-white font-bold"
                >
                  Send Audio
                </button>
                <button
                  className="px-4 py-2.5 bg-primary rounded-lg text-white font-bold"
                >
                  Delete Audio
                </button>
              </div>
            </div> */}
            </div>
            {/* <AudioRecorder onRecordingComplete={addAudioElement} /> */}
            <button
              onClick={handleSendMessage}
              className="p-4 bg-primary rounded-lg text-white font-bold"
            >
              <FiSend />
            </button>
          </div>
        )
      )}
      {}
    </div>
  );
};

export default Chat;
