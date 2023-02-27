import React from 'react'
import Button from './Button';
import FriendsPattren from './FriendsPattren';
import Headings from './Headings';

const FriendsList = () => {
  return (
    <div className="mt-10 h-[472px] shadow-xl p-6 rounded-2xl bg-white overflow-y-scroll">
      <Headings heding="Friends" />
      <FriendsPattren
        names={`Friends Name`}
        others="Hi Guys, Wassup!"
        imgHere={"assets/img.png"}
      >
        <div className="flex">
          <Button Text={"Block"} className="bg-red-500 text-sm ml-2" />
        </div>
      </FriendsPattren>

    </div>
  );
}

export default FriendsList