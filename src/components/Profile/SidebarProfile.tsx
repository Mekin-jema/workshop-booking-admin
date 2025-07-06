import React from "react";
import { Link } from "react-router-dom";

import {
  Lock,
  BookOpenCheck,
  ShieldCheck,
  LogOut,
} from "lucide-react";

type Props = {
  user: any;
  active: number;
  setActive: (active: number) => void;
  avatar: string | null;
  logoutHandler: () => void;
};

const SidebarProfile: React.FC<Props> = ({
  user,
  active,
  setActive,
  logoutHandler,
}) => {
  const avatarUrl = ""

  return (
    <div className="w-full">
      {/* My Account */}
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 1
          ? "dark:bg-slate-800 bg-white border-b border-[#d6d3d3] dark:border-[#727272]"
          : "bg-transparent"
          }`}
        onClick={() => setActive(1)}
      >
        <img
          src={avatarUrl}
          alt="avatar"
          className="w-[30px] h-[30px] rounded-full"
        />
        <h5 className="pl-2 md:block hidden text-black dark:text-white">
          My Account
        </h5>
      </div>

      {/* Change Password */}
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 2
          ? "dark:bg-slate-800 bg-white border-b border-[#d6d3d3] dark:border-[#727272]"
          : "bg-transparent"
          }`}
        onClick={() => setActive(2)}
      >
        <Lock
          size={20}
          className={`${active === 2
            ? "text-black dark:text-white"
            : "text-gray-500 dark:text-gray-400"
            }`}
        />
        <h5 className="pl-2 md:block hidden text-black dark:text-white">
          Change Password
        </h5>
      </div>

      {/* Enrolled Courses */}
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 3
          ? "dark:bg-slate-800 bg-white border-b border-[#d6d3d3] dark:border-[#727272]"
          : "bg-transparent"
          }`}
        onClick={() => setActive(3)}
      >
        <BookOpenCheck
          size={20}
          className={`${active === 3
            ? "text-black dark:text-white"
            : "text-gray-500 dark:text-gray-400"
            }`}
        />
        <h5 className="pl-2 md:block hidden text-black dark:text-white">
          Enrolled Courses
        </h5>
      </div>

      {/* Admin Panel Link */}
      {user?.role === "admin" && (
        <Link
          to="/admin"
          className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 4
            ? "dark:bg-slate-800 bg-white border-b border-[#d6d3d3] dark:border-[#727272]"
            : "bg-transparent"
            }`}
          onClick={() => setActive(4)}
        >
          <ShieldCheck
            size={20}
            className={`${active === 4
              ? "text-black dark:text-white"
              : "text-gray-500 dark:text-gray-400"
              }`}
          />
          <h5 className="pl-2 md:block hidden text-black dark:text-white">
            Admin Dashboard
          </h5>
        </Link>
      )}

      {/* Logout */}
      <div
        className="w-full flex items-center px-3 py-4 cursor-pointer bg-transparent"
        onClick={logoutHandler}
      >
        <LogOut size={20} className="text-gray-500 dark:text-gray-400" />
        <h5 className="pl-2 md:block hidden text-black dark:text-white">
          Logout
        </h5>
      </div>
    </div>
  );
};

export default SidebarProfile;
