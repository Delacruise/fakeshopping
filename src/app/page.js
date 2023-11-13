import CategorySlider from "./components/categorySlider";

export default function Home() {
  return (
    <main className='min-h-screen'>
      <div className='heroBanner w-full h-96 bg-red-900 p-4 text-center text-white text-3xl mb-4'>
        Hero Banner
      </div>
      <div className='pageFiller w-full h-96 bg-red-900 p-4 text-center text-white text-3xl mb-4'>
        Page Filler
      </div>
      <div className='productCategory w-full p-4 mb-4'>
        <CategorySlider />
      </div>
      <div className='featuredProducts w-full h-96 bg-red-900 p-4 text-center text-white text-3xl mb-4'>
        Featured Categories
      </div>
      <div className='pageFiller w-full h-96 bg-red-900 p-4 text-center text-white text-3xl mb-4'>
        Page Filler
      </div>
      <div className='pageFiller w-full h-96 bg-red-900 p-4 text-center text-white text-3xl mb-4'>
        Page Filler
      </div>
    </main>
  );
}
