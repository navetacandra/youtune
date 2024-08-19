import React from "react";

const Navbar = () => {
  return (
    <div className='fixed top-0 left-0 w-screen bg-[#272d54] items-center md:hidden inline-block'>
      <div className='flex items-center px-5 py-4'>
        <img
          id='logo'
          src={"/mainLogo.svg"}
          alt='logo'
          width={100}
          height={100}
          className='text-white items-center justify-center text-center h-12 w-12'
        />
        <h1 className='text-[#ffffff] font-bold font-poppins text-2xl items-center ml-2'>
          YouTunee
        </h1>
      </div>
    </div>
  );
};

export default Navbar;
