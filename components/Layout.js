import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { TiClipboard } from "react-icons/ti";
import { FiArrowUpRight } from "react-icons/fi";

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
      {/* <header className="bg-[#17013b] sticky top-0 h-[72px] flex justify-start items-center drop-shadow-xl">
        <p className="ml-8 text-white font-semibold uppercase">Invoice</p>
      </header> */}

      <div className="flex flex-col md:flex-row flex-1">
        <aside className="bg-darkViolet w-full md:w-16 drop-shadow-lg">
          <nav>
            <li className="flex mt-2 p-2 text-5xl text-eastSide ">
              <FiArrowUpRight />
            </li>
            <hr />

            <ul className="mt-8 mb-8">
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
          </nav>
        </aside>

        <main className="flex-1 overflow-hidden  h-screen">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
