import React from "react";

const Navbar = () => {
  return (
    <nav
      className="relative flex w-full flex-nowrap items-center justify-between py-2 text-neutral-500 shadow-dark-mild hover:text-neutral-700 focus:text-neutral-700 bg-sky-400 lg:flex-wrap lg:justify-start lg:py-4"
      data-twe-navbar-ref
    >
      <div className="flex w-full flex-wrap items-center justify-between px-3 ">
        <div className="ms-2">
          <a className="text-4xl text-white courgette-regular" href="#">
            GPT Typing practice
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
