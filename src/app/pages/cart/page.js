'use client';
import { useState, useEffect } from 'react';

export default function Cart() {
  const cartArray = JSON.parse(localStorage.getItem('localCart')) || [];
  const [subTotal, setSubtotal] = useState(0);
  const [vat, setVat] = useState(0);
  const [total, setTotal] = useState(0);
  const [vatPercentage, setVatPercentage] = useState(0.05);

  const addToCart = (item, qty) => {
    // localStorage.removeItem('localCart');
    let cartItems = cartArray;

    // Check if the item already exists in the cart
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItemIndex !== -1) {
      // Item already exists, update the quantity
      cartItems[existingItemIndex].qty += qty;
    } else {
      // Item doesn't exist, add it to the cart
      cartItems.push({ ...item, qty });
    }

    // Update the local storage with the modified cartItems
    localStorage.setItem('localCart', JSON.stringify(cartItems));

    console.log('Cart Items: ', cartItems);
  };

  const calcVat = (stp) => {
    let vat = stp * vatPercentage;
    setVat(parseFloat(vat).toFixed(2));
    calcTotal(vat, stp);
  };

  const calcSubTotal = () => {
    let totalPrice = 0;

    // Check if cartItems is not empty
    if (cartArray && cartArray.length > 0) {
      cartArray.forEach((cartItem) => {
        const { qty, price } = cartItem;
        const itemTotalPrice = qty * price;
        totalPrice += itemTotalPrice;
      });
    }

    setSubtotal(totalPrice);
    calcVat(parseFloat(totalPrice.toFixed(2)));
  };

  const calcTotal = (vat, sTP) => {
    debugger;
    let allPrice = vat + sTP;
    setTotal(parseFloat(allPrice.toFixed(2)));
  };

  useEffect(() => {
    if (cartArray !== undefined) {
      calcSubTotal();
    }
  });

  if (cartArray.length > 0) {
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
            {cartArray.map((cartItem) => (
              <div className='cartProductRow'>
                <div>
                  <img
                    src={cartItem.qty}
                    alt={cartItem.title}
                    className='cartProductImg'
                    onError={(e) => {
                      e.target.src = '/default.jpg';
                    }}
                  />
                </div>
                <div className='cartProductInfo'>
                  <div className='cartProductName'>{cartItem.title}</div>
                  <div className='cartProductCat'>{cartItem.category.name}</div>
                </div>
                <input
                  className='cartProductQTY'
                  placeholder='1'
                  value={cartItem.qty}
                />

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
                <div className='cartProductPrice'>${cartItem.price}</div>
              </div>
            ))}
          </div>
          <div className='cartTotalContainer'>
            <div className='cartTotalMessage'>5% is included on all totals</div>
            <div className='cartTotalVat'>
              <div className='title'>VAT</div>
              <div className='value'>${vat}</div>
            </div>
            <div className='cartTotalSubTotal'>
              <div className='title'>SubTotal</div>
              <div className='value'>${subTotal}</div>
            </div>
            <div className='cartTotalTotal'>
              <div className='title'>Total</div>
              <div className='value'>${total}</div>
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
  } else {
    return (
      <>
        <div className='cartContainer'>
          <div className='cartTile'>Shopping Cart</div>
          <div className='cartProductsContainer'>Your cart is empty.</div>
          <div className='cartTotalContainer'>
            <div className='cartTotalMessage'>5% is included on all totals</div>
            <div className='cartTotalVat'>
              <div className='title'>VAT</div>
              <div className='value'>${vat}</div>
            </div>
            <div className='cartTotalSubTotal'>
              <div className='title'>SubTotal</div>
              <div className='value'>${subTotal}</div>
            </div>
            <div className='cartTotalTotal'>
              <div className='title'>Total</div>
              <div className='value'>${total}</div>
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
          {cartArray.map((cartItem) => (
            <div className='cartProductRow'>
              <div>
                <img
                  src={cartItem.qty}
                  alt={cartItem.title}
                  className='cartProductImg'
                  onError={(e) => {
                    e.target.src = '/default.jpg';
                  }}
                />
              </div>
              <div className='cartProductInfo'>
                <div className='cartProductName'>{cartItem.title}</div>
                <div className='cartProductCat'>{cartItem.category.name}</div>
              </div>
              <input
                className='cartProductQTY'
                placeholder='1'
                value={cartItem.qty}
              />

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
              <div className='cartProductPrice'>${cartItem.price}</div>
            </div>
          ))}
        </div>
        <div className='cartTotalContainer'>
          <div className='cartTotalMessage'>5% is included on all totals</div>
          <div className='cartTotalVat'>
            <div className='title'>VAT</div>
            <div className='value'>${vat}</div>
          </div>
          <div className='cartTotalSubTotal'>
            <div className='title'>SubTotal</div>
            <div className='value'>${subTotal}</div>
          </div>
          <div className='cartTotalTotal'>
            <div className='title'>Total</div>
            <div className='value'>${total}</div>
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
