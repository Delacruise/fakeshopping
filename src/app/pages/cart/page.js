'use client'
import { useState, useEffect } from 'react';

export default function Cart() {
  return (
    <>
      <div className='cartContainer'>
        <div className='cartTile'>Shopping Cart</div>
        <div className='cartHeaders'>
          <div className='cartHeader spacer'></div>
          <div className='cartHeader w-full'>Description</div>
          <div className='cartHeader w-20 p-4 text-center mr-10'>QTY</div>
          <div className='cartHeader w-20 p-4 pl-0  text-center'>Remove</div>
          <div className='cartHeader w-64 text-right p-4 pr-6'>Price</div>
        </div>
        <div className='cartProductsContainer'>
          <div className='cartProductRow'>
            <div className='cartProductImg'></div>
            <div className='cartProductInfo'>
              <div className='cartProductName'>Product Name</div>
              <div className='cartProductCat'>Product Category</div>
            </div>
            <input className='cartProductQTY' placeholder='1' value='' />

            <button className='cartProductDel'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                class='w-6 h-6'
              >
                <path
                  fill-rule='evenodd'
                  d='M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z'
                  clip-rule='evenodd'
                />
              </svg>
            </button>
            <div className='cartProductPrice'>$ 12.00</div>
          </div>
        </div>
        <div className='cartTotalContainer'>
          <div className='cartTotalMessage'>5% is included on all totals</div>
          <div className='cartTotalVat'>
            <div className='title'>VAT</div>
            <div className='value'>$12</div>
          </div>
          <div className='cartTotalSubTotal'>
            <div className='title'>SubTotal</div>
            <div className='value'>$12</div>
          </div>
          <div className='cartTotalTotal'>
            <div className='title'>Total</div>
            <div className='value'>$12</div>
          </div>
        </div>
        <div className='cartFooter'>
          <div className='cartNotes'></div>
          <div className='cartButtons'>
            <button className='cartCheckOut'>checkout</button>
            <button className='cartUpdateQty'>update quantity</button>
            <button className='cartContinue'>continue shopping</button>
          </div>
        </div>
      </div>
    </>
  );
}
