import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { TiClipboard } from "react-icons/ti";
import { IoLogoBuffer } from "react-icons/io";

const Layout = ({ children }) => {
  const router = useRouter();

  const menuItems = [
    {
      href: "/",
      title: "Homepage",
      icon: <MdOutlineDashboard />,
    },
    {
      href: "/Invoice",
      title: "Invoice",
      icon: <TiClipboard />,
    },
  ];
  return (
    <div className="min-h-screen flex flex-col">
      {/* <header className="bg-gray-400  sticky top-0 h-[73px] flex justify-center items-center font-semibold uppercase drop-shadow-xl">
        Invoice
      </header> */}
      <div className="flex flex-col md:flex-row flex-1">
        <aside className="bg-green-400 w-full md:w-16 drop-shadow-lg">
          <nav>
            <ul>
              <li className="flex mt-2 p-2 text-5xl text-white ">
                <IoLogoBuffer />
              </li>
              <div className="border-[1px] border-black bg-black"></div>
              {menuItems.map(({ href, title, icon }) => (
                <li className="m-3" key={title}>
                  <Link href={href}>
                    <a
                      className={`flex p-2 bg-green-400 rounded hover:bg-green-600 cursor-pointer ${
                        router.asPath === href && "bg-green-800 text-yellow-500"
                      }`}
                    >
                      <span className="text-2xl">{icon}</span>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main className="flex-1 overflow-hidden h-screen">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
