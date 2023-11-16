'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import GetProduct from '../../api/getProduct/route'

export default function ProductDetail() {
  const [productData, setProductData] = useState();
  const [loading, setLoading] = useState(false);

  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  var paramID = urlParams.toString();
  var parts = paramID.split('=');
  const productID = parts[1];

  const product = {
    id: 43,
    title: 'Handcrafted Granite Chips',
    price: 434,
    description:
      'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
    images: [
      'https://i.imgur.com/Au8J9sX.jpeg',
      'https://i.imgur.com/gdr8BW2.jpeg',
      'https://i.imgur.com/KDCZxnJ.jpeg',
    ],
    creationAt: '2023-11-12T18:47:00.000Z',
    updatedAt: '2023-11-12T18:47:00.000Z',
    category: {
      id: 4,
      name: 'Shoes',
      image: 'https://i.imgur.com/qNOjJje.jpeg',
      creationAt: '2023-11-12T18:47:00.000Z',
      updatedAt: '2023-11-12T18:47:00.000Z',
    },
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
              <input className='input' defaultValue='1' />
              <button className='buttonCart'> Add to cart</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
