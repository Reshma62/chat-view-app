import { Children, useState } from "react";

function Modal({ onClick, children, title }) {
  const [isOpen, setIsOpen] = useState(false);

  /* function toggleModal() {
    setIsOpen(!isOpen);
  } */

  return (
    <>
      {/* The overlay */}
      {/* {isOpen && ( */}
      <div className="absolute z-50 inset-0">
        <div className="flex items-center justify-center pt-4 px-4  text-center sm:block sm:p-0">
          <div
            className="absolute inset-0 transition-opacity"
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          {/* The modal */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className="inline-block w-1/3 bg-red-500 rounded-lg text-left  shadow-xl transform transition-all ">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              {/* Modal content goes here */}
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-2xl font-nunito font-semibold mb-5"
                  id="modal-headline"
                >
                  {title}
                </h3>
                <div className="mt-2">{children}</div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  onClick={onClick}
                >
                  Close
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* )} */}

      {/* The button that opens the modal */}
      {/*  <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={toggleModal}
      >
        Open Modal
      </button> */}
    </>
  );
}
export default Modal;