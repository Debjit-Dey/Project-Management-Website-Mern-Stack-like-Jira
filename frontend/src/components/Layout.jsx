import React, { useState } from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-indigo-900">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 transition-all duration-300 w-full overflow-x-hidden">
        {/* Mobile toggle button */}
        <div className="lg:hidden mb-4">
          <button
            className="text-white text-lg font-semibold"
            onClick={() => setIsSidebarOpen((prev) => !prev)}
          >
            {isSidebarOpen ? "✖ Close Menu" : "☰ Open Menu"}
          </button>
        </div>

        {children}
      </main>
    </div>
  );
};

export default Layout;
