'use client';
import CategorySlider from './components/categorySlider';
import GetProducts from '../app/api/getProducts/route';
import GetCategories from '../app/api/getCategories/route';
import PageFiller from '../app/components/pageFiller';
import PageFiller2 from '../app/components/pageFiller2';
import PageFiller3 from '../app/components/pageFiller3';
import { useState, useEffect } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [categoriesData, setCategoriesData] = useState();
  const [productsData, setProductsData] = useState();

  const fetchData = async () => {
    try {
      const productsRes = await GetProducts();
      if (productsRes) {
        setLoading(true);
        setProductsData(productsRes);
        localStorage.setItem('localProdData', JSON.stringify(productsRes));
      }
    } catch (error) {
      console.error('Error PRODUCTS DATA fetching data:', error);
      return false;
    }

    try {
      const categoriesRes = await GetCategories();
      if (categoriesRes) {
        setCategoriesData(categoriesRes);
        localStorage.setItem('localCatData', JSON.stringify(categoriesRes));
      }
    } catch (error) {
      console.error('Error CATEGORIES DATA fetching data:', error);
      return false;
    }
  };

  useEffect(() => {
    if (!loading && productsData == undefined && categoriesData == undefined) {
      fetchData();
    }
  });
  if (loading && productsData !== undefined && categoriesData !== undefined) {
    return (
      <main className='min-h-screen pt-8 pb-8'>
        <div className='heroBanner w-full flex justify-center  text-center text-white text-3xl '>
          <img
            src='banner.jpg'
            alt='hero banner'
            className='rounded-3xl'
            onError={(e) => {
              e.target.src = '/default.jpg';
            }}
          />
        </div>
        <PageFiller />
        <CategorySlider data={categoriesData} />
        <PageFiller2 />
        <div className='banner2  containerSpacing'>
          <img
            src='banner2.jpg'
            height={440}
            alt='hero banner'
            onError={(e) => {
              e.target.src = '/default.jpg';
            }}
          />
        </div>
        <PageFiller3 />
      </main>
    );
  } else {
    return <main className='min-h-screen'>Busy loading ...</main>;
  }
}
