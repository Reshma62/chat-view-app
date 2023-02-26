import React from "react";
import Flex from "../components/Flex";
import InputBox from "../components/InputBox";

const Registation = () => {
  return (
    <div className="max-h-screen w-full">
      <Flex className={` items-center justify-center h-screen`}>
        <Flex className="w-1/2 flex-col items-center">
          <div>
            <h2 className="text-primary font-nunito font-bold text-4xl">
              Get started with easily register
            </h2>
            <p>Free register and you can enjoy it</p>
            <InputBox
              type={"text"}
              label="Email Address
"
            />
          </div>
        </Flex>
        <div className="w-1/2">
          <img
            className="h-screen w-full object-cover"
            src="assets/login.png"
            alt=""
          />
        </div>
      </Flex>
    </div>
  );
};

export default Registation;
