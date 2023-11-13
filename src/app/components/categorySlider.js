import Image from 'next/image';

export default function CategorySlider() {
  const cat = {
    id: 1,
    name: 'change',
    image: 'https://i.imgur.com/QkIa5tT.jpeg',
    creationAt: '2023-11-12T18:47:00.000Z',
    updatedAt: '2023-11-13T05:02:25.000Z',
  };

  return (
    <>
      <h1 className='sliderTitle '>
        Categories
      </h1>
      <div className='sliderRow'></div>
      <div className='cardSlider'>
        <Image
          src={cat.image}
          alt=''
          height={256}
          width={256}
          className='cardImage '
        />
        <div className='cardTitle '>
          {cat.name}
        </div>
      </div>
    </>
  );
}
