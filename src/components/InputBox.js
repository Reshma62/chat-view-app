import React from 'react'

const InputBox = ({type,label,onChange}) => {
  return (
    <div className="relative w-96">
      <input
        type={type}
        onChange={onChange}
        name=""
        id=""
        className="border-2 border-solid border-[#11175D]/[.3] w-full"
      />
      <p>{label}</p>
    </div>
  );
}

export default InputBox