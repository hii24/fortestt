'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './styles.module.css';
import ButtonLogout from '@/app/components/buttonLogout/buttonLogout';

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({
    History: true,
    Management: true,
  });

  const toggleDropdown = (name: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const sidebarItems = [
    {
      icon: '/icons/document.svg',
      name: 'History',
      isDropdown: true,
      children: [
        { icon: '/icons/arrows.svg', name: 'Exchange', path: '/admin/dashboard/exchange' },
        { icon: '/icons/chart.svg', name: 'Orders', path: '/admin/dashboard/orders' },
        { icon: '/icons/card.svg', name: 'Deposit', path: '/admin/dashboard/deposit' },
        { icon: '/icons/card-receive.svg', name: 'Withdrawal', path: '/admin/dashboard/withdrawal' },
        { icon: '/icons/transfer.svg', name: 'Transfer', path: '/admin/dashboard/transfer' },
        {
          icon: '/icons/wallet-money.svg',
          name: 'Affiliate Payouts',
          path: '/admin/dashboard/affiliate-payouts',
        },
      ],
    },
    {
      icon: '/icons/data-tree.svg',
      name: 'Management',
      isDropdown: true,
      topDevider: true,
      children: [
        { icon: '/icons/people.svg', name: 'General', path: '/admin/dashboard/general' },
        { icon: '/icons/coin.svg', name: 'Coins', path: '/admin/dashboard/coins' },
      ],
    },
  ];

  return (
    <div
      className="w-60 min-w-fit min-h-fit px-3 shadow-md flex flex-col rounded-xl"
      style={{ backgroundColor: '#FFFAFA' /* height: 'calc(100vh - 60px)' */ }}>
      <Link href={'/'} className="flex items-center p-4">
        <Image src="/images/logo.png" alt="Logo" width={54} height={54} priority className="mr-2" />
        Lizex
      </Link>
      <nav className="flex-1 overflow-y-auto flex flex-col gap-2 items-center mt-2">
        {sidebarItems.map((item, index) => (
          <div key={index} className="group w-full">
            {item.topDevider && <hr className="border-t border-black my-2" />}

            <div
              className={`${styles.sidebarItem} flex w-full items-center py-3 cursor-pointer hover:bg-blue-50 transition-colors justify-between ${
                openDropdowns[item.name] ? styles.active : ''
              }`}
              onClick={() => toggleDropdown(item.name)}>
              <div className="flex items-center space-x-3">
                <Image
                  src={item.icon}
                  alt=""
                  width={24}
                  height={24}
                  className={openDropdowns[item.name] ? 'invert' : ''}
                />
                <span className={`text-sm ${openDropdowns[item.name] ? 'text-white' : 'text-gray-700'}`}>
                  {item.name}
                </span>
              </div>
              <svg
                className={`w-4 h-4 transform transition-transform ${
                  openDropdowns[item.name] ? 'rotate-180' : 'rotate-0'
                } ${openDropdowns[item.name] ? 'text-white' : 'text-gray-700'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {openDropdowns[item.name] && (
              <div className="mt-1 flex flex-col gap-1 rounded-lg">
                {item.children?.map((child, childIndex) => {
                  const isActive = pathname === child.path;
                  return (
                    <Link key={childIndex} href={child.path}>
                      <div
                        className={`${styles.sidebarItem} flex items-center px-3 py-2 rounded hover:bg-blue-100 ${
                          isActive ? styles.activeColor : ''
                        }`}>
                        {child.icon && <Image src={child.icon} alt="" width={18} height={18} />}
                        <span className="ml-2 text-sm">{child.name}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </nav>
      <div className="flex max-w-full">
        <ButtonLogout style={{ padding: '8px' }} redirect="/" />
      </div>
    </div>
  );
};

export default Sidebar;
