import React from "react";
import Image from "next/image";

const navbar = () => {
  return (
    <div>
      {/* logo */}
      <div className="flex">
        {/* <Image
          src="/assets/logo.png"
          alt="logo"
          width={100}
          height={100}
        ></Image> */}
        <div className="flex">
          <h2 className="text-3xl font-bold">Kantin</h2>
        </div>
      </div>
      <div />
    </div>
  );
};

export default navbar;
