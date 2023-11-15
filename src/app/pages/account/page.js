'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Account() {
  const userDisplay = JSON.parse(localStorage.getItem('user'));
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('user');
    router.push('/pages/login');
    location.replace('/pages/login');
  };

  const maskText = (textToMask) => {
    const maskedText = '*'.repeat(textToMask.length);
    return maskedText;
  };

  if (!userDisplay) {
    router.push('/pages/login');
    location.replace('/pages/login');
  } else {
    return (
      <div className='accountBgCounter'>
        <div className='accountContainer'>
          <div className='w-full flex gap-6'>
            <div className='imgFrame'>
              <img
                className='avatar'
                src={userDisplay.avatar}
                alt={userDisplay.name}
                width={128}
                height={128}
              />
            </div>
            <div className='userInfo'>
              <div className='accountTitle'>Account</div>
              <div className='name'>Name: {userDisplay.name}</div>
              <div className='email'>Email: {userDisplay.email}</div>
              <div className='role'>Role: {userDisplay.role}</div>
              <div className='password'>
                Password: {maskText(userDisplay.password)}
              </div>
            </div>
          </div>

          <div className='w-full'>
            <button className='logoutButton' onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}
