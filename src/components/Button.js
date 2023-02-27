import React from 'react'

const Button = ({Text,className}) => {
  return (
    <button
      className={`${className} font-semibold font-nunito px-4 py-2 bg-[#5F35F5] text-white text-xl rounded-xl`}
    >
      {Text}
    </button>
  );
}

export default Button