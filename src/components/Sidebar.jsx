import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { 
  FaUsers, 
  FaBoxOpen, 
  FaFileContract, 
  FaWarehouse, 
  FaUserCog, 
  FaShoppingCart, 
  FaFileInvoiceDollar 
} from "react-icons/fa";

const Sidebar = ({ isOpen }) => {
  const [sidebarItems, setSidebarItems] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const sidebarData = [
      {
        key: "customers",
        name: "Customers",
        path: "/home/customers",
        icon: <FaUsers className="w-5 h-5" />,
        defaultSelected: true,
        dataDomain: "customers",
        description: "Scenarios related to Customer (Accounts).",
        actions: ["left-drawer-menu-link-click", "left-drawer-menu-link-", "key-press"],
      },
      {
        key: "products",
        name: "Products",
        path: "/home/products",
        icon: <FaBoxOpen className="w-5 h-5" />,
        defaultSelected: false,
        dataDomain: "products",
        description: "Scenarios related to Products",
        actions: ["left-drawer-menu-link-click", "left-drawer-menu-link-", "key-press"],
      },
      {
        key: "contracts",
        name: "Contracts",
        path: "/home/contracts",
        icon: <FaFileContract className="w-5 h-5" />,
        defaultSelected: false,
        dataDomain: "contracts",
        description: "Scenarios related to Contracts",
        actions: ["left-drawer-menu-link-click", "left-drawer-menu-link-", "key-press"],
      },
      {
        key: "stock-status",
        name: "Stock Status",
        path: "/home/stock-status",
        icon: <FaWarehouse className="w-5 h-5" />,
        defaultSelected: false,
        dataDomain: "stock-status",
        description: "Scenarios related to Stock Status",
        actions: ["left-drawer-menu-link-click", "left-drawer-menu-link-", "key-press"],
      },
      {
        key: "account-settings",
        name: "Account Setting",
        path: "/home/account-settings",
        icon: <FaUserCog className="w-5 h-5" />,
        defaultSelected: false,
        dataDomain: "account-settings",
        description: "Scenarios related to Account Setting",
        actions: ["left-drawer-menu-link-click", "left-drawer-menu-link-", "key-press"],
      },
      {
        key: "orders",
        name: "Orders",
        path: "/home/orders",
        icon: <FaShoppingCart className="w-5 h-5" />,
        defaultSelected: false,
        dataDomain: "orders",
        description: "Scenarios related to Orders",
        actions: ["left-drawer-menu-link-click", "left-drawer-menu-link-", "key-press"],
      },
      {
        key: "invoices",
        name: "Invoices",
        path: "/home/invoices",
        icon: <FaFileInvoiceDollar className="w-5 h-5" />,
        defaultSelected: false,
        dataDomain: "invoices",
        description: "Scenarios related to Invoices",
        actions: ["click", "key-press"],
      },
    ];

    setSidebarItems(sidebarData);

    if (location.pathname === "/" || location.pathname === "/home") {
      const defaultItem = sidebarData.find(item => item.defaultSelected);
      if (defaultItem) {
        navigate(defaultItem.path, { replace: true });
      }
    }
  }, [location.pathname, navigate]);

  return (
    <div className={`bg-slate-700 text-white h-full transition-all duration-300 ${isOpen ? "w-64" : "w-16"} overflow-hidden`}>
      <div className="p-4 text-lg font-bold truncate">
        {isOpen ? "Logo" : "L"}
      </div>
      <ul className="space-y-1 p-2">
        {sidebarItems.map((item) => (
          <li key={item.key}>
            <NavLink
              to={item.path}
              
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded hover:bg-slate-400 transition ${
                  isActive ? "bg-slate-600 font-semibold" : ""
                }`
              }
              title={!isOpen ? item.name : ""}
              data-domain={item.dataDomain}
            >
              {item.icon}
              {isOpen && (
                <span className="ml-3 truncate">
                  {item.name}
                </span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;