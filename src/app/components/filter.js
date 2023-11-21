'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function  Filter(data) {
  const [loading, setLoading] = useState(false);
  const [productsData, setProductsData] = useState();
  const [fromPrice, setFromPrice] = useState('');
  const [toPrice, setToPrice] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const router = useRouter();

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

  const updateFilter = () => {
    const queryParams = {};
    if (fromPrice == '') {
      queryParams.from = minPrice;
    } else {
      queryParams.from = fromPrice;
    }

    if (toPrice == '') {
      queryParams.to = maxPrice;
    } else {
      queryParams.to = toPrice;
    }

    const updateUrlParams = (params) => {
      let currentUrl = window.location.href;
      const urlObj = new URL(currentUrl);
      const urlSearchParams = urlObj.searchParams;

      for (const [key, value] of Object.entries(params)) {
        if (urlSearchParams.has(key)) {
          urlSearchParams.set(key, value);
        } else {
          urlSearchParams.append(key, value);
        }
      }

      return urlObj.toString();
    };

    const newURL = updateUrlParams({
      priceFrom: queryParams.from,
      priceTo: queryParams.to,
    });

    router.push(newURL);
    location.replace(newURL);
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
          <div className='filter'>
            <span className='pr-1'>$</span>
            <input
              id='from'
              className='priceFilterInput'
              defaultValue={minPrice}
              value={fromPrice}
              onChange={(e) => setFromPrice(e.target.value)}
              placeholder={minPrice}
            />
            <span className='pl-2 pr-1'>$</span>
            <input
              id='to'
              className='priceFilterInput'
              defaultValue={maxPrice}
              value={toPrice}
              onChange={(e) => setToPrice(e.target.value)}
              placeholder={maxPrice}
            />
          </div>
          <button className='filterButton' onClick={updateFilter}>
            Filter
          </button>
        </div>
      </>
    );
  }
}
