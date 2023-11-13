'use client';
import Image from 'next/image';
import GetCategories from '../api/getCategories/route';
import { useState, useEffect } from 'react';

export default function CategorySlider() {

  const [loading, setLoading] = useState(false);
  const [categoriesData, setCategoriesData] = useState();

  const fetchData = async () => {
    try {
      const categoriesRes = await GetCategories();
      if (categoriesRes) {
        setCategoriesData(categoriesRes);
        setLoading(true);
      }
    } catch (error) {
      console.error('Error CATEGORIES DATA fetching data:', error);
      return false;
    }
  };

  useEffect(() => {
    if (!loading && categoriesData == undefined) {
      fetchData();
    }
  });

  if (categoriesData != undefined) {
    return (
      <>
        <h1 className='sliderTitle '>Categories</h1>
        <div className='sliderRow'>
          {categoriesData.map((category) => (
            <a href='/pages/products'>
              <div className='cardSlider'>
                <Image
                  src={category.image}
                  alt=''
                  height={256}
                  width={256}
                  className='cardImage '
                />
                <div className='cardTitle '>{category.name}</div>
              </div>
            </a>
          ))}
        </div>
      </>
    );
  }
}
