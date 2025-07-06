// import ThemeSwitcher from "@/app/utils/ThemeSwitcher";
import { Bell } from "lucide-react";
import { useState } from "react";




const DashboardHeader = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="w-full flex items-center justify-end p-6 fixed top-5 right-0">
        {/* <ThemeSwitcher /> */}
        <div
          className="relative cursor-pointer m-2"
          onClick={() => setOpen(!open)}
        >
          <Bell className="text-2xl cursor-pointer dark:text-white text-black " />

          <span className=" absolute -top-2 -right-2 bg-[#3ccba0]  rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white">
            3
          </span>
        </div>
        {open && (
          <div className="w-[350px] h-[50px] dark:bg-[#111c43] bg-wh shadow-xl absolute top-16 z-10 rounded">
            <h5 className=" text-center text-[20px] font-Poppins text-black dark:text-white p-3 ">
              Notificatins
            </h5>
            <div className=" dark:bg-[#2d3a4ea1] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f]">
              <div className=" w-full flex items-center justify-between p-2">
                <p className="text-black dark:text-white">
                  New Questions Recived
                </p>
                <p className="text-black dark:text-white cursor-pointer">
                  Mark as read
                </p>
              </div>
              <p className="px-2 text-black dark:text-white">
                You have 3 Notification from the user Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Velit iure laboriosam cum alias
                obcaecati, ad rem vero, in quae placeat exercitationem,
                quibusdam quam repellendus? Aliquam harum quo itaque. Dolore,
                doloribus?
              </p>
              <p className=" p-2 text-black dark:text-white text-[14px]">
                {" "}
                5 days ago
              </p>
            </div>
            <div className=" dark:bg-[#2d3a4ea1] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f]">
              <div className=" w-full flex items-center justify-between p-2">
                <p className="text-black dark:text-white">
                  New Questions Recived
                </p>
                <p className="text-black dark:text-white cursor-pointer">
                  Mark as read
                </p>
              </div>
              <p className="px-2 text-black dark:text-white">
                You have 3 Notification from the user Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Velit iure laboriosam cum alias
                obcaecati, ad rem vero, in quae placeat exercitationem,
                quibusdam quam repellendus? Aliquam harum quo itaque. Dolore,
                doloribus?
              </p>
              <p className=" p-2 text-black dark:text-white text-[14px]">
                {" "}
                5 days ago
              </p>
            </div>
            <div className=" dark:bg-[#2d3a4ea1] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f]">
              <div className=" w-full flex items-center justify-between p-2">
                <p className="text-black dark:text-white">
                  New Questions Recived
                </p>
                <p className="text-black dark:text-white cursor-pointer">
                  Mark as read
                </p>
              </div>
              <p className="px-2 text-black dark:text-white">
                You have 3 Notification from the user Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Velit iure laboriosam cum alias
                obcaecati, ad rem vero, in quae placeat exercitationem,
                quibusdam quam repellendus? Aliquam harum quo itaque. Dolore,
                doloribus?
              </p>
              <p className=" p-2 text-black dark:text-white text-[14px]">
                {" "}
                5 days ago
              </p>
            </div>
            <div className=" dark:bg-[#2d3a4ea1] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f]">
              <div className=" w-full flex items-center justify-between p-2">
                <p className="text-black dark:text-white">
                  New Questions Recived
                </p>
                <p className="text-black dark:text-white cursor-pointer">
                  Mark as read
                </p>
              </div>
              <p className="px-2 text-black dark:text-white">
                You have 3 Notification from the user Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Velit iure laboriosam cum alias
                obcaecati, ad rem vero, in quae placeat exercitationem,
                quibusdam quam repellendus? Aliquam harum quo itaque. Dolore,
                doloribus?
              </p>
              <p className=" p-2 text-black dark:text-white text-[14px]">
                {" "}
                5 days ago
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
