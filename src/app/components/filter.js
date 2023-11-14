'use client';
import GetProducts from '../api/getProducts/route';
import { useState, useEffect } from 'react';

export default function Filter(data) {
  const [loading, setLoading] = useState(false);
  const [productsData, setProductsData] = useState();
  const [productsCount, setProductsCount] = useState();
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  function getMinMaxPrice(products) {
    if (products.length === 0) {
      return { minPrice: 0, maxPrice: 0 };
    }

    let minPrice = products[0].price;
    let maxPrice = products[0].price;

    for (let i = 1; i < products.length; i++) {
      const currentPrice = products[i].price;
      if (currentPrice < minPrice) {
        minPrice = currentPrice;
      }
      if (currentPrice > maxPrice) {
        maxPrice = currentPrice;
      }
    }

    setMinPrice(minPrice);
    setMaxPrice(maxPrice);
  }

  const fetchData = async () => {
    getMinMaxPrice(data.products);
    setProductsData(data.products);
    setLoading(true);
  };

  useEffect(() => {
    if (!loading && productsData == undefined) {
      fetchData();
    }
  });

  if (productsData != undefined) {
    return (
      <>
        <div className='blockTitle'>Filter</div>
        <div className='priceFilter'>
          <div className='min'>
            <div>$</div> <div>{minPrice}</div>
          </div>
          <div className='slider'>
            <div className='line'></div>
          </div>
          <div className='max'>
            <div>$</div> <div>{maxPrice}</div>
          </div>
        </div>
      </>
    );
  }
}
