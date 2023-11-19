'use client';
import { SocialIcon } from 'react-social-icons';
import { useState, useEffect } from 'react';

export default function Footer() {
  const pathName = window.location.pathname;
  const [hideDiv, setHideDiv] = useState(false);

  useEffect(() => {
    if (pathName === '/pages/login') {
      setHideDiv(true);
    }
  });

  return (
    <footer className={`footerContainer ${hideDiv ? 'hidden' : 'block'}`}>
      <div className='flex w-full p-4 text-center text-white text-3xl  gap-10 justify-between'>
        <div className='column p-4'>
          <img
            src='/logo.png'
            alt='Logo'
            width={150}
            height={150}
            onError={(e) => {
              e.target.src = '/default.jpg';
            }}
          />
        </div>
        <div className='column p-4'>
          <p className='footerTitle '>Quick Links</p>
          <p className='footerLink '>Your Account</p>
          <p className='footerLink'>Your Orders</p>
          <p className='footerLink'>Your Address</p>
          <p className='footerLink'>Your Wishlist</p>
        </div>
        <div className='column p-4'>
          <p className='footerTitle '>important links</p>
          <p className='footerLink '>Help</p>
          <p className='footerLink'>Terms & Conditions</p>
          <p className='footerLink'>Shipping & Delivery</p>
          <p className='footerLink'>Return Policy</p>
        </div>
        <div className='column p-4'>
          <p className='footerTitle '>Get in touch</p>
          <p className='text-gray-400 font-normal text-lg text-left'>
            Some important in formation about getting touch with the owners of
            this fake one line business
          </p>
        </div>
      </div>

      <div className='socialIcons'>
        <div className='icon'>
          <SocialIcon fallback='facebook' bgColor='#333' fgColor='#fff' />
        </div>
        <div className='icon'>
          <SocialIcon fallback='twitter' bgColor='#333' fgColor='#fff' />
        </div>
        <div className='icon'>
          <SocialIcon fallback='tiktok' bgColor='#333' fgColor='#fff' />
        </div>
        <div className='icon'>
          <SocialIcon fallback='youtube' bgColor='#333' fgColor='#fff' />
        </div>
      </div>
    </footer>
  );
}
