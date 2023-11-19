'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import GetProduct from '../../api/getProduct/route';
import { useRouter } from 'next/navigation';

export default function ProductDetail() {
  const [productData, setProductData] = useState();
  const [loading, setLoading] = useState(false);
  const [prodQty, setProdQty] = useState(1);
  const [hidePopup, setHidePopup] = useState(true);
  const router = useRouter();

  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  var paramID = urlParams.toString();
  var parts = paramID.split('=');
  const productID = parts[1];

  const cartItemsArray = JSON.parse(localStorage.getItem('localCart')) || [];

  const addToCart = (item, qty) => {
    // localStorage.removeItem('localCart');
    let cartItems = cartItemsArray;

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
    setHidePopup(false);

    console.log('Cart Items: ', cartItems);
  };

  const closePopup = () => {
    setHidePopup(true);
  };

  const goTo = () => {
    setHidePopup(false);
    router.push('/pages/cart');
    location.replace('/pages/cart');
  };

  const fetchData = async () => {
    try {
      const productRes = await GetProduct(productID);
      if (productRes) {
        setProductData(productRes);
        setLoading(true);
      }
    } catch (error) {
      console.error('Error PRODUCT DATA fetching data:', error);
      return false;
    }
  };

  useEffect(() => {
    if (!loading && productData == undefined) {
      fetchData();
    }
  });

  if (productData != undefined) {
    return (
      <div className='pageContainer'>
        <div className='productContainer'>
          <div>
            <img
              src={productData.images[0]}
              alt={productData.title}
              width={500}
              height={500}
              className='productImage'
              onError={(e) => {
                e.target.src = '/default.jpg';
              }}
            />
          </div>
          <div className='productInfo'>
            <div className='categoryName'>{productData.category.name}</div>
            <div className='productName'>{productData.title}</div>
            <div className='productPrice'>$ {productData.price}</div>
            <div className='productDescription'>{productData.description}</div>
            <div className='cartButtonSection'>
              <input
                className='input'
                defaultValue='1'
                onChange={(e) => {
                  setProdQty(parseInt(e.target.value));
                }}
                value={prodQty}
              />
              <button
                className='buttonCart'
                onClick={() => {
                  addToCart(productData, prodQty);
                }}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
        <div className={`popupBG ${hidePopup ? 'hidden' : ''}`}>
          <div className='cartPopup'>
            <div className='cartPopupMessage'>Item added to cart</div>
            <div className='buttonFooter'>
              <button
                className='buttonContinue'
                onClick={() => {
                  closePopup();
                }}
              >
                Continue
              </button>
              <button
                className='buttonCheckOut'
                onClick={() => {
                  goTo();
                }}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
