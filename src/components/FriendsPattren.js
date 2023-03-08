import React from 'react'
import Flex from './Flex';

const FriendsPattren = ({ names, others, imgHere, children, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="mb-5 border-b border-solid border-[#ddd] pb-3"
    >
      <Flex className="gap-x-7 items-center">
        <div className="w-[80px] h-[80px]">
          <img src={imgHere} alt="" className="rounded-full" />
        </div>
        <div>
          <h2 className="font-nunito font-bold text-xl ">{names}</h2>
          <p className="font-nunito font-normal text-sm text-[#4D4D4D]/75">
            {others}
          </p>
        </div>
        <div className="ml-auto">
          {/* <Button Text={buttonText} /> */}
          {children}
        </div>
      </Flex>
    </div>
  );
};

export default FriendsPattren