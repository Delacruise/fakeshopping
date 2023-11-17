'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Filter from '../../components/filter';
import SearchBar from '../../components/searchbar';
import Categories from '../../components/productCategories';


export default function Products() {
  const [productsData, setProductsData] = useState();
  const [productsCount, setProductsCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const localProdData = JSON.parse(localStorage.getItem('localProdData'));

  const urlParams = window.location.search;
  const urlSearchParams = new URLSearchParams(urlParams);
  const categoryName = urlSearchParams.get('category');
  const priceLow = urlSearchParams.get('priceFrom');
  const priceHigh = urlSearchParams.get('priceTo');
  const SQ = urlSearchParams.get('searchQ');

  const fetchData = async () => {
    if (localProdData) {
      setLoading(true);
      let filteredProds = localProdData;
      if (categoryName && categoryName !== 'All') {
        filteredProds = filteredProds.filter(
          (product) => product.category.name === categoryName
        );
      }

      if (priceLow !== null && priceHigh !== null) {
        const low = parseFloat(priceLow);
        const high = parseFloat(priceHigh);

        if (!isNaN(low) && !isNaN(high)) {
          filteredProds = filteredProds.filter(
            (product) => product.price >= low && product.price <= high
          );
        }
      }

      if (SQ) {
        const searchQuery = SQ.toLowerCase();
        filteredProds = filteredProds.filter(
          (product) =>
            product.category.name.toLowerCase().includes(searchQuery) ||
            product.title.toLowerCase().includes(searchQuery)
        );
      }
      
      setProductsData(filteredProds);
      setProductsCount(filteredProds.length);
    }
  };

  const imgError = (imgserc) => {
    console.log('The image could not be loaded.', imgserc);
    return '/logo.png';
  }

  useEffect(() => {
    if (!loading && productsData == undefined) {
      fetchData();
    }
  });

  if (productsData != undefined) {
    return (
      <div className='pageContainer flex gap-4 pt-8 pb-8 '>
        <div className='leftCol h-full'>
          <div className='containerBlocks '>
            <Filter products={productsData} />
          </div>
          <div className='containerBlocks '>
            <Categories category={categoryName} />
          </div>
        </div>
        <div className='rightCol h-full'>
          <div className='containerBlocks '>
            <SearchBar />
          </div>
          <div className='containerBlocks'>
            <div className='blockTitle'>Results</div>
            {productsCount == 0 ? (
              <div className='no__Results resultsBanner'>
                No products available
              </div>
            ) : (
              <div className='results__Found'>
                <div className='resultsBanner '>
                  {productsCount} products matched
                </div>
                <div className='productsGrid'>
                  {productsData.map((product) => (
                    <a
                      href={`/pages/productDetail?id=${product.id}`}
                      key={product.id}
                    >
                      <div className='cardSlider '>
                        <div className='overflow-hidden'>
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            width={256}
                            height={256}
                            className='cardImage'
                            onError={(e) => {
                              e.target.src = '/default.jpg';
                            }}
                          />
                        </div>
                        <div className='cardTitle'>
                          <div className='w-full text-sm'>
                            {product.category.name}
                          </div>
                          <div className='w-full text-lg truncate'>
                            {product.title}
                          </div>
                          <div className='w-full text-lg text-red-800'>
                            $ {product.price}
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
