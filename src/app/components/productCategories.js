'use client';
import GetCategories from '../api/getCategories/route';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProductCategories(catName) {
  const [loading, setLoading] = useState(false);
  const [categoriesData, setCategoriesData] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const router = useRouter();

  const fetchData = async () => {
    if (catName) {
      setSelectedCategory(catName.category);
    }

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
    if (!loading && categoriesData === undefined) {
      fetchData();
    }
  });

  const handleCheckboxChange = (categoryName) => {
    setSelectedCategory(categoryName);
    router.push('/pages/products?category=' + categoryName);
    location.replace(`/pages/products?category=${categoryName}`);
  };

  if (categoriesData !== undefined) {
    return (
      <>
        <div className='blockTitle'>categories</div>
        <div className='categoryItem'>
          <input
            type='checkbox'
            className='checkbox-round'
            checked={selectedCategory === 'All'}
            onChange={() => handleCheckboxChange('All')}
          />
          <label className='cursor-pointer'>All</label>
        </div>
        {categoriesData.map((category) => (
          <div key={category.id} className='categoryItem '>
            <input
              type='checkbox'
              className='checkbox-round '
              checked={selectedCategory === category.name}
              onChange={() => handleCheckboxChange(category.name)}
            />
            <label className='cursor-pointer'>{category.name}</label>
          </div>
        ))}
      </>
    );
  }
}
