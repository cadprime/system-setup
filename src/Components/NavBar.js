import Link from "next/link";
import { signin, signIn, signOut, useSession } from "next-auth/client";
import { useState } from "react";

function NavBar() {
  const [session] = useSession();
  const [navClick, setNavClick] = useState(false);

  function handleClick() {
    setNavClick(!navClick);
  }
  return (
    <nav className="bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <div>
              <a
                href="/"
                className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900"
              >
                <svg
                  className="h-6 w-6 mr-1 text-blue-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                <span className="font-bold">Cadprime</span>
              </a>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              <a
                href="#"
                className="py-5 px-3 text-gray-700 hover:text-gray-900"
              >
                Features
              </a>
              <a
                href="#"
                className="py-5 px-3 text-gray-700 hover:text-gray-900"
              >
                Pricing
              </a>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {session ? (
              <>
                <div className="flex flex-auto items-center">
                  <img
                    className="rounded-full w-12 object-contain"
                    src={session?.user.image}
                    alt="Profile pic"
                  />
                  <div className="flex flex-col ml-3 ">
                    <p className="text-sm">{session?.user.email}</p>
                    <p className="text-xs text-yellow-800" onClick={signOut}>
                      Logout?
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <a
                href=""
                className="py-2 px-3 bg-blue-400 hover:bg-blue-300 text-yellow-900 hover:text-yellow-800 rounded transition duration-300"
                onClick={signIn}
              >
                Login
              </a>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button className="mobile-menu-button" onClick={handleClick}>
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`mobile-menu md:hidden ${!navClick && "hidden"}`}>
        <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">
          Features
        </a>
        <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">
          Pricing
        </a>
      </div>
    </nav>

    //   <div className="flex">
    //     <div className="flex flex-auto">
    //       <img
    //         className="rounded-full w-12 object-contain"
    //         src={session?.user.image}
    //         alt="Profile pic"
    //       />
    //       <div className="flex flex-col ml-3">
    //         <p className="text-sm">{session?.user.email}</p>
    //         <p className="text-md text-yellow-800">
    //           {session ? `Hello ${session?.user.name}` : "Sign in"}
    //         </p>
    //       </div>
    //     </div>
    //     <ul className="flex flex-1">
    //       <li className="mr-6">
    //         <a className="text-blue-500 hover:text-blue-800" href="#">
    //           Active
    //         </a>
    //       </li>
    //       <li className="mr-6">
    //         <a className="text-blue-500 hover:text-blue-800" href="#">
    //           Link
    //         </a>
    //       </li>
    //       <li className="mr-6">
    //         <a className="text-blue-500 hover:text-blue-800" href="#">
    //           Link
    //         </a>
    //       </li>
    //       <li className="mr-6">
    //         <a className="text-gray-400 cursor-not-allowed" href="#">
    //           Disabled
    //         </a>
    //       </li>
    //     </ul>
    //   </div>
    //   {session ? (
    //     <div className="flex">
    //       <Link className="mr-6" href="/">
    //         <a>Home</a>
    //       </Link>
    //       <Link className="mr-6" href="/profile">
    //         <a>Profile</a>
    //       </Link>
    //       <button
    //         className="py-2 px-6 rounded-full text-white bg-red-600 hover:bg-red-400"
    //         onClick={signOut}
    //       >
    //         Logout
    //       </button>
    //     </div>
    //   ) : (
    //     <button
    //       className="py-2 mx-auto px-6 rounded-full text-white bg-yellow-600 hover:bg-yellow-400"
    //       onClick={signIn}
    //     >
    //       Sign in
    //     </button>
    //   )}
    // </div>
  );
}

export default NavBar;
