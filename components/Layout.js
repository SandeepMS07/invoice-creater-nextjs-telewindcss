import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { MdOutlineDashboard, MdCancel } from "react-icons/md";
import { TiClipboard } from "react-icons/ti";
// import { FiArrowUpRight } from "react-icons/fi";
import { ImMenu } from "react-icons/im";
import Image from "next/image";

const Layout = ({ children, login }) => {
  const [nav, setNav] = useState(false);
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
  const handleClick = () => setNav(!nav);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-[#17013b] sticky top-0 h-[72px] md:hidden flex justify-start items-center drop-shadow-xl z-[900]">
        <div className="flex md:hidden flex-row items-center justify-between">
          {/* <p className="ml-8 text-white font-semibold uppercase">Invoice</p> */}
          <div className="md:hidden" onClick={handleClick}>
            {!nav ? (
              <ImMenu className="w-10 text-2xl text-white" />
            ) : (
              <MdCancel className="w-10 text-2xl text-white" />
            )}
          </div>
          <div className="md:hidden ml-72 w-full">
            <Image
              src="/assets/images/logobluecion.png"
              alt=""
              height="40px"
              width="40px"
              className="text-white"
            />
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row flex-1">
        <aside className="bg-darkViolet w-full  md:w-16 drop-shadow-lg">
          <nav>
            <Link href="/" passHref>
              <li className="md:flex mt-2 p-2 text-5xl hidden">
                <Image
                  src="/assets/images/logobluecion.png"
                  alt=""
                  height="50px"
                  width="50px"
                  className="text-white"
                />
              </li>
            </Link>
            <hr className="hidden md:flex" />
            

            {/**
             * menu 
             *   */}
            <ul className="hidden md:flex flex-col mt-8 mb-8">
              {menuItems.map(({ href, title, icon }) => (
                <li className="m-3" key={title}>
                  <Link href={href}>
                    <a
                      className={`flex p-2 bg-darkViolet rounded hover:bg-blue-800 cursor-pointer ${
                        router.asPath === href && "bg-blue-600"
                      }`}
                    >
                      <span className="text-2xl text-white">{icon}</span>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>

          {/**
           * small menu 
           */}
            <ul
              className={!nav ? "hidden" : "absolute bg-darkViolet w-full px-8"}
            >
              {menuItems.map(({ href, title, icon }) => (
                <li className="m-3" key={title}>
                  <Link href={href}>
                    <a
                      className={`flex md:hidden p-2 sticky bg-darkViolet rounded hover:bg-blue-800 z-[900] cursor-pointer ${
                        router.asPath === href && "bg-blue-600"
                      }`}
                    >
                      <div className="flex flex-row items-center justify-center">
                        <span className="text-2xl text-white">{icon}</span>
                        <span className="ml-5 text-white">{title}</span>
                      </div>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="flex-1 overflow-auto w-full xl:h-[10px] h-screen">{children}</main>
      </div>
    </div>
  );
};

export default Layout;

// export async function getServerSideProps(context) {
//   const res = await fetch("../pages/login");
//   return {
//     props: {
//       login,
//     },
//   };
// } 