'use client'
import Image from 'next/image';
import { useState,useEffect } from 'react';

export default function Footer() {
  const pathName = window.location.pathname;
  const [hideDiv,setHideDiv] = useState(false); 

   useEffect(() => {
     if (pathName === '/pages/login') {
       setHideDiv(true);
     }
   });

  return (
    <footer
      className={`footerContainer w-full p-4 text-center text-white text-3xl flex gap-10 justify-between ${
        hideDiv ? 'hidden' : 'block'
      }`}
    >
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
        <div className='socialIcons'>
          <div className='icon'>x</div>
          <div className='icon'>f</div>
          <div className='icon'>l</div>
          <div className='icon'>i</div>
        </div>
      </div>
      <div className='column p-4'>
        <p className='footerTitle '>Quick Links</p>
        <p className='footerLink '>Dummy Link</p>
        <p className='footerLink'>Dummy Link</p>
        <p className='footerLink'>Dummy Link</p>
        <p className='footerLink'>Dummy Link</p>
      </div>
      <div className='column p-4'>
        <p className='footerTitle '>important links</p>
        <p className='footerLink '>Dummy Link</p>
        <p className='footerLink'>Dummy Link</p>
        <p className='footerLink'>Dummy Link</p>
        <p className='footerLink'>Dummy Link</p>
      </div>
      <div className='column p-4'>
        <p className='footerTitle '>Get in touch</p>
        <p className='text-gray-400 font-normal text-lg text-left'>
          Some important in formation about getting touch with the owners of
          this fake one line business
        </p>
      </div>
    </footer>
  );
}
