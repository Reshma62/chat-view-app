import React from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
const Headings = ({onClick, heding}) => {
  return (
    <div className="relative flex items-center mb-8 justify-between">
      <h2 className="font-nunito font-bold text-xl ">{heding}</h2>
      <BsThreeDotsVertical
        onClick={onClick}
        className=" text-2xl text-[#5F35F5] cursor-pointer"
      />
    </div>
  );
}

export default Headings