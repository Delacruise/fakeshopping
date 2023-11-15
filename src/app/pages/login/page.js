import React from 'react'

export default function Login() {
  return (
    <div className='bgContainer '>
      <div className='loginContainer'>
        <div className='logo'>
          <img src='/logo.png' className='logoImg' width='80' height='80' />
        </div>
        <div className='loginInputs'>
          <div className='inputRow'>
            <div className='inputIcon'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                class='w-5 h-5'
              >
                <path
                  fill-rule='evenodd'
                  d='M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z'
                  clip-rule='evenodd'
                />
              </svg>
            </div>
            <input className='inputField' placeholder='email' />
          </div>
          <div className='inputRow'>
            <div className='inputIcon'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                class='w-5 h-5'
              >
                <path
                  fill-rule='evenodd'
                  d='M5.404 14.596A6.5 6.5 0 1116.5 10a1.25 1.25 0 01-2.5 0 4 4 0 10-.571 2.06A2.75 2.75 0 0018 10a8 8 0 10-2.343 5.657.75.75 0 00-1.06-1.06 6.5 6.5 0 01-9.193 0zM10 7.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z'
                  clip-rule='evenodd'
                />
              </svg>
            </div>
            <input className='inputField' placeholder='password' />
          </div>
          <div className='rememberRow'>
            <div className='rememberCheckbox'>
              <input type='checkbox' className='chkbx' />
              <lable className='Remember' >Remember Me</lable>
            </div>
            <a href='' className='smallLink'>
              Forget Password{' '}
            </a>
          </div>
          <div className='formButton'>
            <button className='loginButton'>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}
