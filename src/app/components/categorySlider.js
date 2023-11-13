'use client';
import Image from 'next/image';
import GetCategories from '../api/getCategories/route';
import { useState, useEffect } from 'react';

export default function CategorySlider() {
  const cat = {
    id: 1,
    name: 'change',
    image: 'https://i.imgur.com/QkIa5tT.jpeg',
    creationAt: '2023-11-12T18:47:00.000Z',
    updatedAt: '2023-11-13T05:02:25.000Z',
  };

  const [loading, setLoading] = useState(false);
  const [categoriesDate, setCategoriesDate] = useState();

  const fetchData = async () => {
    try {
      const categoriesRes = await GetCategories();
      if (categoriesRes) {
        setCategoriesDate(categoriesRes);
        setLoading(true);
      }
    } catch (error) {
      console.error('Error CATEGORIES DATA fetching data:', error);
      return false;
    }
  };

  useEffect(() => {
    if (!loading && categoriesDate == undefined) {
      fetchData();
    }
  });

  if (categoriesDate != undefined) {
    return (
      <>
        <h1 className='sliderTitle '>Categories</h1>
        <div className='sliderRow'>
          {categoriesDate.map((category) => (
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
