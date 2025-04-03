import { Link } from "react-router-dom";
import { useState } from "react";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <nav className="bg-black border-gray-700 h-[14vh] py-8 p-6 lg:px-12">
        <div className="flex items-center justify-between  ">
          <Link to="/" className="flex items-center ">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-8 sm:h-10"
              alt="Logo"
            />
            <span className="text-2xl font-bold text-white">Shop</span>
          </Link>

          <div className="hidden lg:flex items-center space-x-8 ml-10 text-lg">
          <Link to="/home" className="text-white hover:text-gray-400">Home</Link>
            <Link to="/products" className="text-white hover:text-gray-400">Products</Link>
            <Link to="/users" className="text-white hover:text-gray-400">Users</Link>
          </div>

          <div className="flex items-center lg:ml-auto">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-white focus:outline-none ml-4"
            >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              )}
            </button>
          </div>
        </div>

        <div
          className={`fixed top-0 left-0 w-full h-full bg-gray-900 text-white transform ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          } transition-all duration-300 ease-in-out lg:hidden z-50 overflow-y-auto`}
        >
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-4 right-6 text-white text-3xl"
          >
            &times;
          </button>
          <div className="flex flex-col items-center justify-center h-full space-y-6 text-2xl">
            <Link to="/products" className="hover:text-gray-400" onClick={() => setMenuOpen(false)}>Products</Link>
            <Link to="/users" className="hover:text-gray-400" onClick={() => setMenuOpen(false)}>Users</Link>
            <Link to="/home" className="hover:text-gray-400" onClick={() => setMenuOpen(false)}>Home</Link>
          </div>
        </div>
      </nav>
    </header>
  );
};
