import React from 'react'
import {FiSearch} from "react-icons/fi"
import { BsThreeDotsVertical } from "react-icons/bs";
const Search = () => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search"
        className="border rounded-3xl py-5 px-5 w-full pl-20"
      />
      <FiSearch className="absolute top-1/2 -translate-y-1/2 left-6 text-2xl" />
      <BsThreeDotsVertical className="absolute top-1/2 -translate-y-1/2 right-6 text-2xl text-[#5F35F5]" />
    </div>
  );
}

export default Search