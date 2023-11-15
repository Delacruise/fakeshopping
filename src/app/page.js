'use client';
import CategorySlider from './components/categorySlider';
import GetProducts from '../app/api/getProducts/route';
import GetCategories from '../app/api/getCategories/route';
import PageFiller from '../app/components/pageFiller';
import PageFiller2 from '../app/components/pageFiller2';
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
      <main className='min-h-screen'>
        <div className='heroBanner w-full flex justify-center  text-center text-white text-3xl '>
          <img src='banner.jpg' alt='hero banner' className='rounded-3xl' />
        </div>
        <PageFiller />
        <div className='productCategory w-full p-4 mb-4'>
          <CategorySlider data={categoriesData} />
        </div>
        {/* TODO: show random featured product categories */}
        {/* <div className='featuredProducts w-full h-96 bg-red-900 p-4 text-center text-white text-3xl mb-4'>
        Featured Categories
      </div> */}
        <PageFiller2 />
        <div className='pageFiller w-full h-96 bg-red-900 p-4 text-center text-white text-3xl mb-4'>
          Page Filler
        </div>
      </main>
    );
  } else {
    return <main className='min-h-screen'>Busy loading ...</main>;
  }
}
