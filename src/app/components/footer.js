import Image from 'next/image';

export default function Footer() {
  return (
    <footer className='footerContainer w-full p-4 text-center text-white text-3xl flex gap-10 justify-between'>
      <div className='column p-4'>
        <Image src='/logo.png' alt='Logo' width={150} height={150} />
        <p className='text-sm tracking-widest text-left mt-4 uppercase text-gray-400 font-semibold'>
          Old Crow Fakes
        </p>
        <div className='socialIcons'>
          <div className='icon'>x</div>
          <div className='icon'>f</div>
          <div className='icon'>l</div>
          <div className='icon'>i</div>
        </div>
      </div>
      <div className='column p-4'>
        <p className='footerTitle '>Quick Links</p>
        <p className='footerLink '>Dummy Link</p>
        <p className='footerLink'>Dummy Link</p>
        <p className='footerLink'>Dummy Link</p>
        <p className='footerLink'>Dummy Link</p>
      </div>
      <div className='column p-4'>
        <p className='footerTitle '>important links</p>
        <p className='footerLink '>Dummy Link</p>
        <p className='footerLink'>Dummy Link</p>
        <p className='footerLink'>Dummy Link</p>
        <p className='footerLink'>Dummy Link</p>
      </div>
      <div className='column p-4'>
        <p className='footerTitle '>Get in touch</p>
        <p className='text-gray-400 font-normal text-lg text-left'>
          Some important in formation about getting touch with the owners of
          this fake one line business
        </p>
      </div>
    </footer>
  );
}
