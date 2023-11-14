'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
export default function SearchBar() {
  const [searchQ, setSearchQ] = useState();
  const router = useRouter();

  const updateUrlParams = (params) => {
    let currentUrl = window.location.href;
    const urlObj = new URL(currentUrl);
    const urlSearchParams = urlObj.searchParams;

    for (const [key, value] of Object.entries(params)) {
      if (urlSearchParams.has(key)) {
        urlSearchParams.set(key, value);
      } else {
        urlSearchParams.append(key, value);
      }
    }

    return urlObj.toString();
  };

  const searchStuff = () => {
    if (searchQ !== '' && searchQ !== undefined) {
      let newUrl = updateUrlParams({ searchQ: searchQ });
      router.push(newUrl);
      location.replace(newUrl);
    }
  };

  return (
    <>
      <div className='searchBar'>
        <input
          className='searchInput'
          placeholder='search'
          value={searchQ}
          onChange={(e) => setSearchQ(e.target.value)}
        />
        <button className='searchButton' onClick={searchStuff}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='w-6 h-6'
          >
            <path
              fill-rule='evenodd'
              d='M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z'
              clip-rule='evenodd'
            />
          </svg>
        </button>
      </div>
    </>
  );
}
