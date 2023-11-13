'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';


export default function ProductDetail() {
    const [productsData, setProductsData] = useState();
    const [productsCount, setProductsCount] = useState(0);
    const [loading, setLoading] = useState(false);


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
        //fetchData();
      }
    });

    if (productsData == undefined) {
      return (
        <div className='pageContainer'>
          <div className='productContainer'>
            <div>
              <Image
                src={product.images[0]}
                alt={product.title}
                width={500}
                height={500}
                className='productImage'
              />
            </div>
            <div className='productInfo'>
              <div className='categoryName'>{product.category.name}</div>
              <div className='productName'>{product.title}</div>
              <div className='productPrice'>$ {product.price}</div>
              <div className='productDescription'>{product.description}</div>
              <div className='cartButtonSection'>
                <input className='input' defaultValue='1' />
                <button className='buttonCart' > Add to cart</button>
              </div>
            </div>
          </div>
        </div>
      );
    }

}
