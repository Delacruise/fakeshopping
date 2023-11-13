'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import GetProducts from '../../api/getProducts/route';
import Filter from '../../components/filter';
import SearchBar from '../../components/SearchBar';
import Categories from '../../components/productCategories';

export default function Products() {
  const [productsData, setProductsData] = useState();
  const [productsCount, setProductsCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const productsRes = await GetProducts();
      if (productsRes) {
        setProductsData(productsRes);
        setProductsCount(productsRes.length);
        setLoading(true);
      }
    } catch (error) {
      console.error('Error PRODUCTS DATA fetching data:', error);
      return false;
    }
  };

  useEffect(() => {
    if (!loading && productsData == undefined) {
      fetchData();
    }
  });

  if (productsData != undefined) {
    return (
      <div className='pageContainer flex gap-4'>
        <div className='leftCol '>
          <div className='containerBlocks'>
            <Filter />
          </div>
          <div className='containerBlocks'>
            <Categories />
          </div>
        </div>
        <div className='rightCol'>
          <div className='containerBlocks'>
            <SearchBar />
          </div>
          <div className='containerBlocks'>
            <div className='blockTitle'>Results</div>
            {productsCount == 0 ? (
              <div className='no__Results'>No products available</div>
            ) : (
              <div className='results__Found'>
                {productsCount} products matched
                <div className='productsGrid'>
                  {productsData.map((product) => (
                    <div className='cardSlider '>
                      <div className='overflow-hidden'>
                        <Image
                          src={product.images[0]}
                          alt={product.title}
                          width={256}
                          height={256}
                          className='cardImage'
                        />
                      </div>
                      <div className='cardTitle'>
                        <div className='w-full text-sm'>
                          {product.category.name}
                        </div>
                        <div className='w-full text-lg truncate'>{product.title}</div>
                        <div className='w-full text-lg text-red-800'>$ {product.price}</div>
                      </div>
                    </div>
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
