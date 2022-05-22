import Link from 'next/link';
import React from 'react';

const LINKS = [
  { name: 'Architecture', href: '/architecture' },
  { name: 'Nature', href: '/nature' },
  { name: 'Experimental', href: '/experimental' },
  { name: 'Wallpapers', href: '/wallpapers' },
  { name: 'Film', href: '/film' },
];

export const Header: React.FC = () => {
  return (
    <header className='header-container'>
      <nav className='header-nav'>
        <ul className='header-nav-list'>
          {LINKS.map((item) => (
            <li className='header-nav-item'>
              <Link href={item.href}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
      {/* <div className='header-seacrh'>
        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z'
            stroke='#fff'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path d='M22 22L20 20' stroke='#fff' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
        <input type='text' className='header-search-input' />
      </div> */}
    </header>
  );
};

export default Header;
