'use client';
import React from 'react';
import LoginAPI from '../../api/login/route';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [emailInput, setEmailInput] = useState();
  const [passwordInput, setPasswordInput] = useState();
  const [hideSection, setHideSection] = useState(true);
  const [errorInput, setErrorInput] = useState(false);
  const [loginRedirect, setLoginRedirect] = useState(false);
  const router = useRouter();

  const loginForm = () => {
    if (emailInput !== undefined && passwordInput !== undefined) {
      login({ emailInput, passwordInput });
      setErrorInput(false);
    } else {
      setHideSection(false);
      setErrorInput(true);
    }
  };

  const updateInputs = () => {
    setPasswordInput('changeme');
    setEmailInput('john@mail.com');
    setHideSection(true);
    setErrorInput(false);
  };

  const login = async (lgCrd) => {
    try {
      const loginRes = await LoginAPI({
        email: lgCrd.emailInput,
        password: lgCrd.passwordInput,
      });
      if (loginRes.status != 500) {
        setLoggedIn(loginRes);
        localStorage.setItem('isLoggedIn', JSON.stringify(loginRes));
        console.log('LOGIN SUCCESS!');
        setHideSection(true);
        setLoginRedirect(true);
        countdown();
      } else {
        console.log('LOGIN FAIL!');
        setHideSection(false);
      }
    } catch (error) {
      console.error('Error LOGIN DATA fetching data:', error);
      return false;
    }
  };

  let timeLeft = 5;

  function updateTimer() {
    document.getElementById('timer').innerText = timeLeft;
  }

  const countdown = () => {
    updateTimer();
    timeLeft--;
    if (timeLeft < 0) {
      document.getElementById('timer').innerText = 'Go Shop!';
      router.push('/');
      location.replace('/');
    } else {
      setTimeout(countdown, 1000);
    }
  };

  return (
    <>
      <div className='bgContainer '>
        <div className={`loginContainer ${loginRedirect ? 'hidden' : 'block'}`}>
          <div className='logo'>
            <img
              src='/logo.png'
              alt='logo'
              className='logoImg'
              width='80'
              height='80'
            />
          </div>
          <div className={`loginErrors ${hideSection ? 'hidden' : 'block'} `}>
            <div className='errorMessage'>
              <div className=''>
                <p className='errorTitle'>Error</p>
                <p>Incorrect credentials</p>
              </div>
            </div>
          </div>
          <div className={`proTip ${hideSection ? 'hidden' : 'block'}`}>
            <p className='proTipTitle'>Pro-tip</p>
            <p className='proTipMessage'>
              Use the following credentials to login:
            </p>
            <p className='proTipMessage'>email: john@mail.com</p>
            <p className='proTipMessage'>password:changeme</p>
            <div className='proTipLink' onClick={updateInputs}>
              Let me do it for you.
            </div>
          </div>
          <div className='loginInputs'>
            <div className='inputRow'>
              <div className={`inputIcon ${errorInput ? 'errorIcon' : ''}`}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  className='w-5 h-5'
                >
                  <path
                    fill-rule='evenodd'
                    d='M5.404 14.596A6.5 6.5 0 1116.5 10a1.25 1.25 0 01-2.5 0 4 4 0 10-.571 2.06A2.75 2.75 0 0018 10a8 8 0 10-2.343 5.657.75.75 0 00-1.06-1.06 6.5 6.5 0 01-9.193 0zM10 7.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z'
                    clip-rule='evenodd'
                  />
                </svg>
              </div>

              <input
                className={` ${errorInput ? 'errorBorder' : 'inputField'}`}
                placeholder='email'
                type='email'
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
              />
            </div>
            <div className='inputRow'>
              <div className={`${errorInput ? 'errorIcon' : 'inputIcon'}`}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  className='w-5 h-5'
                >
                  <path
                    fill-rule='evenodd'
                    d='M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z'
                    clip-rule='evenodd'
                  />
                </svg>
              </div>
              <input
                className={`${errorInput ? 'errorBorder' : 'inputField'}`}
                placeholder='password'
                type='password'
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
              />
            </div>
            <div className='rememberRow'>
              <div className='rememberCheckbox'>
                <input type='checkbox' className='chkbx' />
                <label className='Remember'>Remember Me</label>
              </div>
              <a href='' className='smallLink'>
                Forget Password
              </a>
            </div>
            <div className='formButton'>
              <button className='loginButton' onClick={loginForm}>
                Login
              </button>
            </div>
          </div>
        </div>
        <div className={`loginRedirect ${loginRedirect ? 'block' : 'hidden'}`}>
          <div className='logo'>
            <img
              src='/logo.png'
              alt='logo'
              className='logoImg'
              width='80'
              height='80'
            />
            <h2 className='loginRedirectTitle'>Login Success</h2>
            <div className='loginRedirectMessage'>
              <p>You will be redirected to the home page in:</p>
              <div id='timer'>5</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
