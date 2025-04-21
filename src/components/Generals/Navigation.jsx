import { NavLink } from 'react-router-dom';
import { Sidebar, SidebarItemGroup, SidebarItems } from "flowbite-react";
import { HiOutlineHome } from "react-icons/hi";
import { TbTransactionBitcoin } from "react-icons/tb";
import { BiSolidCategoryAlt } from "react-icons/bi";

const Navigation = () => {
  const navItems = [
    { to: '/', icon: HiOutlineHome, label: 'Inicio' },
    { to: '/transactions', icon: TbTransactionBitcoin, label: 'Transacciones' },
    { to: '/categories', icon: BiSolidCategoryAlt, label: 'Categorias' },
  ];

  return (
    <>
      <Sidebar aria-label="Default sidebar example" className='w-full x-full'>
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
    </>
  );
};

export default Navigation;