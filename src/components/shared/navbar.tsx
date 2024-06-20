import { FaRegEye } from 'react-icons/fa';
import { IoMdStopwatch } from 'react-icons/io';

import Logo from '../icons/Logo';

const Navbar = () => {
  return (
    <header className=" py-3 bg-white shadow sticky top-0 z-[9999]">
      <nav className="flex justify-between items-center  container mx-auto xs:px-5 sm:px-5 xs:flex-col sm:flex-col xs:items-start sm:items-start xs:gap-3 sm:gap-3 ">
        <div className=" flex items-center gap-4">
          <span className=" bg-secondary  h-full px-4 py-5 rounded-md">
            <Logo />
          </span>
          <div>
            <h5 className="font-[500] text-xl text-black ">
              Frontend developer
            </h5>
            <span className="font-light text-sm text-[#8C8CA1]">
              Skill assessment test
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className=" bg-primaryLight rounded-md flex items-center gap-2 px-4 py-2 text-primary font-[700]">
            <IoMdStopwatch />
            29:10
            <span className="font-light text-sm">time left</span>
          </span>
          <div className=" bg-primaryLight p-2 rounded-full">
            <FaRegEye className=" text-primary" />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
