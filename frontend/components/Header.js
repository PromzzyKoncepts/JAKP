"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const Header = () => {
  return (
    <div>
      <div
        className={`bg-[#21217860] hidden   backdrop-blur-md bg-opacity-50 fixed left-0 right-0 w-fit px-10  text-lg font-sniglet rounded-full mx-auto z-50 shadow-lg transition-all duration-500 md:flex items-center gap-20  top-2`}
      >
        <a target='_blank' href="https://lovetoons.org/index.php"><Image src="/lovetoons.png" width={130} height={130} alt="Jesus answers kids prayers logo" /></a>
        <div className="flex items-center gap-10 justify-center py-3">
          <a target='_blank'  href={`https://lovetoons.org/contact.php`} className="text-white hover:text-slate-800 hover:border hover:border-white transition-all duration-500 ease hover:font-bold hover:bg-gradient-to-tr from-[#EE7822] to-[#EFB741] active:bg-gradient-to-bl hover:rounded-full hover:px-5 hover:py-2">
            About
          </a>
         
          <a target='_blank'  href={`https://lovetoons.org/videos.php`} className="text-white hover:text-slate-800 hover:border hover:border-white transition-all duration-500 ease hover:font-bold hover:bg-gradient-to-tr from-[#EE7822] to-[#EFB741] active:bg-gradient-to-bl hover:rounded-full hover:px-5 hover:py-2">
            Videos
          </a>
          <a target='_blank'  href={`https://lovetoons.org/comic.php`} className="text-white hover:text-slate-800 hover:border hover:border-white  transition-all duration-500 ease hover:font-bold hover:bg-gradient-to-tr from-[#EE7822] to-[#EFB741] active:bg-gradient-to-bl hover:rounded-full hover:px-5 hover:py-2">
            Comics
          </a>
          <a target='_blank'  href={`https://lovetoons.org/sponsor.php`} className="text-white hover:text-slate-800 hover:border hover:border-white  transition-all duration-500 ease hover:font-bold hover:bg-gradient-to-tr from-[#EE7822] to-[#EFB741] active:bg-gradient-to-bl hover:rounded-full hover:px-5 hover:py-2">
            Sponsor
          </a>
          <a target='_blank'  href={`https://lovetoons.org/games.php`} className="text-white hover:text-slate-800 hover:border hover:border-white  transition-all duration-500 ease hover:font-bold hover:bg-gradient-to-tr from-[#EE7822] to-[#EFB741] active:bg-gradient-to-bl hover:rounded-full hover:px-5 hover:py-2">
            Games
          </a>
          
        </div>

      </div>
     
    </div>
  );
};

export default Header;
