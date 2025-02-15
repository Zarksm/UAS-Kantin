import React from "react";
import { CiEdit } from "react-icons/ci";

const General = () => {
  return (
    <div className="bg-white rounded-lg p-6 mb-6 font-poppins">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1 flex-1">
          <p className="font-semibold">Your Photo</p>
          <p className="font-light text-xs">
            This will be displayed on your profile
          </p>
        </div>
        <div className="items-center gap-5 justify-start flex flex-1">
          <div className="w-20 h-20 bg-gray-200 rounded-full cursor-pointer flex items-center justify-center group relative">
            <CiEdit
              size={25}
              className="text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
            />
          </div>
          <div className="flex gap-4 items-center">
            <h2 className="text-sm text-blue-500 cursor-pointer font-medium">
              Update
            </h2>
            <h2 className="text-sm text-red-500 cursor-pointer font-medium">
              Delete
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default General;
