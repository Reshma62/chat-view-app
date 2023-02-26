import React from "react";

const InputBox = ( { type, label, onChange, errorMessage } ) => {

  return (
    <div className="relative  mb-14">
      <input
        type={type}
        onChange={onChange}
        name=""
        id=""
        className="border-2 border-solid border-[#11175D]/[.3] w-full py-7 pl-14 rounded-lg font-nunito font-semibold text-xl text-primary"
      />
      <p className="absolute -top-3 bg-white px-6 left-10 text-primary/75 font-nunito font-semibold text-sm">
        {label}
      </p>
      
    </div>
  );
};

export default InputBox;
