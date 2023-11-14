'use client';
import GetCategories from '../api/getCategories/route';
import { useState, useEffect } from 'react';
export default function ProductCategories(catName) {
  const [loading, setLoading] = useState(false);
  const [categoriesData, setCategoriesData] = useState();

  const [selectedCategory, setSelectedCategory] = useState();

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
    if (!loading && categoriesData == undefined) {
      fetchData();
    }
  });

  if (categoriesData != undefined) {
    return (
      <>
        <div className='blockTitle'>categories</div>
        {categoriesData.map((category) => (
          <div className='flex gap-2 mb-2 content-center hover:text-indigo-300 '>
            <input
              type='checkbox'
              className='cursor-pointer'
              checked={
                selectedCategory != undefined &&
                selectedCategory == category.name
                  ? true
                  : false
              }
            />
            <label className='cursor-pointer'>{category.name}</label>
          </div>
        ))}
      </>
    );
  }
}
