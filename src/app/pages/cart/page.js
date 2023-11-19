'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Cart() {
  const [cartArray, setCartArray] = useState(
    JSON.parse(localStorage.getItem('localCart')) || []
  );
  const [subTotal, setSubtotal] = useState(0);
  const [vat, setVat] = useState(0);
  const [total, setTotal] = useState(0);
  const [vatPercentage, setVatPercentage] = useState(0.05);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [hidePopup, setHidePopup] = useState(true);
  const router = useRouter();

  const deleteItem = (id) => {
    const newCart = cartArray.filter((item) => item.id !== id);
    localStorage.setItem('localCart', JSON.stringify(newCart));
    console.log('New Cart: ', newCart);
    router.refresh();
  };

  const goTo = () => {
    router.push('/pages/products');
    location.replace('/pages/products');
  };

  const finishProcess = () => {
    localStorage.removeItem('localCart');
    router.push('/');
    location.replace('/');
  };

  const closePopup = () => {
    setHidePopup(true);
  };

  const updateCart = (updateQty, updateId) => {
    if (updateQty !== 0) {
      const updatedCart = cartArray.map((product) => {
        if (product.id === updateId) {
          // If the product matches the updateId, update the qty
          return {
            ...product,
            qty: parseInt(updateQty),
          };
        }
        // If the product doesn't match the updateId, return it unchanged
        return product;
      });

      // Update the cartArray with the modified cart
      setCartArray(updatedCart);

      // Update the local storage with the modified cart
      localStorage.setItem('localCart', JSON.stringify(updatedCart));

      router.refresh();
    }
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
    let allPrice = vat + sTP;
    setTotal(parseFloat(allPrice.toFixed(2)));
  };

  const disableCheckOut = () => {
    setIsButtonDisabled(true);
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
                    src={cartItem.images[0]}
                    alt={cartItem.title}
                    className='cartProductImg'
                    width={128}
                    height={128}
                    onError={(e) => {
                      e.target.src = '/default.jpg';
                    }}
                  />
                </div>
                <div className='cartProductInfo'>
                  <a
                    href={`/pages/productDetail?id=${cartItem.id}`}
                    className=''
                  >
                    <div className='cartProductName hover:text-orange-600'>
                      {cartItem.title}
                    </div>
                  </a>
                  <div className='cartProductCat'>{cartItem.category.name}</div>
                </div>
                <input
                  className='cartProductQTY'
                  defaultValue={cartItem.qty}
                  onChange={(e) => updateCart(e.target.value, cartItem.id)}
                />

                <button
                  className='cartProductDel'
                  onClick={() => {
                    deleteItem(cartItem.id);
                  }}
                >
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
            <div className={`cartButtons `}>
              <button
                className={`cartCheckOut ${
                  isButtonDisabled ? 'disableButton' : ''
                }`}
                id='cartCheckOutButton'
                onClick={() => setHidePopup()}
                disabled={isButtonDisabled}
              >
                checkout
              </button>
              <button
                className='cartContinue'
                onClick={() => {
                  goTo();
                }}
              >
                continue shopping
              </button>
            </div>
          </div>
          <div className={`popupBG ${hidePopup ? 'hidden' : ''}`}>
            <div className='cartPopup'>
              <div className='cartPopupMessage'>
                User will continue to confirmation page and the make payment
              </div>
              <div className='buttonFooter'>
                <button
                  className='buttonContinue'
                  onClick={() => {
                    closePopup();
                  }}
                >
                  Close
                </button>
                <button
                  className='buttonCheckOut'
                  onClick={() => {
                    finishProcess();
                  }}
                >
                  Finish Process
                </button>
              </div>
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
          <div className='cartProductsContainer text-3xl text-center m-20'>
            <img
              src='/emptyCart.png'
              alt='Empty Cart'
              className='mx-auto my-auto'
              onError={(e) => {
                e.target.src = '/emptyCart.png';
              }}
            />
            Your cart is empty.
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
            <button className='cartCheckOut disableButton'>checkout</button>
            <button className='cartContinue disableButton'>
              continue shopping
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
