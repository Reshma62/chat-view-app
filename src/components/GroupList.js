import React from 'react'
import Button from './Button';
import FriendsPattren from './FriendsPattren';
import Headings from './Headings';

const GroupList = () => {
  return (
    <div className="mt-10 h-[400px] shadow-xl p-6 rounded-2xl bg-white overflow-y-scroll">
      <Headings heding="Groups List" />
      <FriendsPattren
        names={`Friends Name`}
        others="Hi Guys, Wassup!"
        imgHere={"assets/img.png"}
      >
        <Button Text={"Join"} />
      </FriendsPattren>
    </div>
  );
}

export default GroupList