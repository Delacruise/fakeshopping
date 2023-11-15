'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function CategorySlider() {
  const [loading, setLoading] = useState(false);
  const localCatData = JSON.parse(localStorage.getItem('localCatData'));

  useEffect(() => {

  });

  if (localCatData != undefined) {
    return (
      <>
        <div className='sliderRow'>
          {localCatData.map((category) => (
            <a href={`/pages/products?category=${category.name}`}>
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
