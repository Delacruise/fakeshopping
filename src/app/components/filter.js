'use client';
import GetProducts from '../api/getProducts/route';
import { useState, useEffect } from 'react';

export default function Filter(data) {
  const [loading, setLoading] = useState(false);
  const [productsData, setProductsData] = useState();
  const [productsCount, setProductsCount] = useState();
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  function range() {
    return {
      minprice: 1000,
      maxprice: 7000,
      min: 100,
      max: 10000,
      minthumb: 0,
      maxthumb: 0,

      mintrigger() {
        this.minprice = Math.min(this.minprice, this.maxprice - 500);
        this.minthumb =
          ((this.minprice - this.min) / (this.max - this.min)) * 100;
      },

      maxtrigger() {
        this.maxprice = Math.max(this.maxprice, this.minprice + 500);
        this.maxthumb =
          100 - ((this.maxprice - this.min) / (this.max - this.min)) * 100;
      },
    };
  }

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
        <div className='blockTitle'>Price Filter</div>
        <div className='priceFilter'>
          <div className='filterHeader'>
            <div>The lowest priced item ${minPrice}</div>
            <div>The highest priced item ${maxPrice}</div>
          </div>
          <div className='filter'>
            <span className='pr-1'>$</span>
            <input className='priceFilterInput' placeholder='From' />
            <span className='pl-2 pr-1'>$</span>
            <input className='priceFilterInput' placeholder='To' />
          </div>
        </div>
      </>
    );
  }
}
