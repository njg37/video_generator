import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Music Video Generator</h1>
      <ul className="flex space-x-4">
        <li>
          <a href="#upload" className="hover:underline">
            Upload Music
          </a>
        </li>
        <li>
          <a href="#customizer" className="hover:underline">
            Video Customizer
          </a>
        </li>
        <li>
          <a href="#preview" className="hover:underline">
            Preview Player
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
