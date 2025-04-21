import React from 'react';
import { Sidebar, SidebarItems, SidebarItemGroup } from 'flowbite-react';
import { NavLink, Outlet } from 'react-router-dom';
import { HiOutlineHome, HiOutlineCurrencyDollar } from "react-icons/hi";
import { BiSolidCategoryAlt } from "react-icons/bi";

const Layout = () => {
  const navItems = [
    { to: '/', icon: HiOutlineHome, label: 'Inicio' },
    { to: '/transactions', icon: HiOutlineCurrencyDollar, label: 'Transacciones' },
    { to: '/categories', icon: BiSolidCategoryAlt, label: 'Categorias' },
  ];
  return (
    <div className="flex h-screen">
      <Sidebar className="w-64" aria-label="Sidebar with navigation">
        <SidebarItems>
          <SidebarItemGroup>
          {navItems.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center space-x-2 p-2 rounded ${
                    isActive ? 'text-blue-600 font-bold bg-blue-100' : 'text-gray-600 hover:bg-gray-100'
                  }`
                }
                style={{ textDecoration: 'none' }}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </NavLink>
            ))}
          </SidebarItemGroup>
        </SidebarItems>
      </Sidebar>
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;