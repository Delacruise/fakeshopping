'use client'
import Image from 'next/image';

export default function Navigation() {
    const checkActiveMenu = () => {
        var pathName = window.location.pathname;
        if (pathName.includes('product')) {
          return 'products';
        }

        if (pathName.includes('contact')) {
          return 'contact';
        }

        if (pathName.includes('account')) {
          return 'account';
        }

        if (pathName.includes('cart') || pathName.includes('checkout')) {
          return 'cart';
        }

        if (pathName.includes('/') ) {
          return 'home';
        }
            
    };

  return (
    <div className='navContainer '>
      <nav className='flex items-center w-full'>
        <a href='/' className='p-2 mr-4 inline-flex items-center'>
          <Image src='/logo.png' alt='Logo' width={50} height={50} />
        </a>
        <button
          className='text-white inline-flex p-3 hover:bg-gray-900 rounded lg:hidden ml-auto hover:text-white outline-none nav-toggler'
          data-target='#navigation'
        >
          <i className='material-icons'>menu</i>
        </button>
        <div
          className='hidden top-navbar w-full lg:inline-flex lg:flex-grow lg:w-auto text-base'
          id='navigation'
        >
          <div className='lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto gap-10'>
            <a
              href='/'
              className={`menuItem ${
                checkActiveMenu() === 'home' ? 'active' : ''
              }`}
            >
              <span>Home</span>
            </a>
            <a
              href='/pages/products'
              className={`menuItem ${
                checkActiveMenu() === 'products' ? 'active' : ''
              }`}
            >
              <span>Products</span>
            </a>
            <a
              href='/pages/contact'
              className={`menuItem ${
                checkActiveMenu() === 'contact' ? 'active' : ''
              }`}
            >
              <span>Contact Us</span>
            </a>
            <a
              href='/pages/cart'
              className={`menuItem ${
                checkActiveMenu() === 'cart' ? 'active' : ''
              }`}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                class='w-6 h-6'
              >
                <path d='M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z' />
              </svg>
            </a>
            <a
              href='/pages/account'
              className={`menuItem ${
                checkActiveMenu() === 'account' ? 'active' : ''
              }`}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                class='w-6 h-6'
              >
                <path
                  fill-rule='evenodd'
                  d='M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z'
                  clip-rule='evenodd'
                />
              </svg>
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}
