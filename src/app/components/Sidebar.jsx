"use client";
import {
  MdOutlineNoFood,
  MdDashboard,
  MdOutlineFoodBank,
  MdFoodBank,
} from "react-icons/md";
import { BiFoodMenu } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname(); // Get the current path

  const Links = [
    // {
    //   name: "Dashboard",
    //   link: "/dashboard",
    //   icons: <MdDashboard />,
    // },
    {
      name: "Menu",
      link: "/dashboard/food",
      icons: <BiFoodMenu />,
    },
    {
      name: "Orders",
      link: "/dashboard/orders",
      icons: <MdOutlineFoodBank />,
    },
    {
      name: "Settings",
      link: "/dashboard/settings",
      icons: <IoSettingsOutline />,
    },
    {
      name: "Logout",
      link: "/",
      icons: <CiLogout />,
    },
  ];

  return (
    <nav className="bg-white w-64 p-5 h-screen overflow-hidden font-poppins">
      <h2 className="text-2xl font-semibold mb-5 flex gap-3 items-center justify-center">
        <span>
          <MdOutlineNoFood />
        </span>
        Kanteen
      </h2>
      <div className="h-auto flex flex-col items-center my-6">
        <div>
          <Image src="/assets/pp.png" alt="logo" width={150} height={150} />
        </div>
        <div className="text-center">
          <h2 className="font-semibold text-xl">John Doe</h2>
          <p className="text-sm">Good Afternoon :c</p>
        </div>
      </div>

      {Links.map((link) => (
        <Link
          href={link.link}
          key={link.name}
          className={`flex items-center gap-3 p-3 rounded-md hover:bg-gray-100 ${
            pathname === link.link ||
            (link.link === "/dashboard/food" &&
              pathname.startsWith("/dashboard/food"))
              ? "font-semibold bg-gray-100"
              : ""
          }`}
        >
          <span className="text-xl">{link.icons}</span>
          <span>{link.name}</span>
        </Link>
      ))}
    </nav>
  );
};

export default Sidebar;
