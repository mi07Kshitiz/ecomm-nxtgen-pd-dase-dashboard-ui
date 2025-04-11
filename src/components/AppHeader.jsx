import React from "react";
import { FaBars } from "react-icons/fa";

const AppHeader = ({ toggleSidebar }) => {
  return (
    <header className="bg-slate-700 shadow-md p-4 flex justify-between items-center">
      <button 
        onClick={toggleSidebar} 
        className="text-white hover:text-gray-200 transition-colors"
        aria-label="Toggle sidebar"
      >
        <FaBars className="w-5 h-5" />
      </button>
      <h1 className="text-xl font-semibold text-white mx-auto">DASE Dashboard</h1>
    </header>
  );
};

export default AppHeader;