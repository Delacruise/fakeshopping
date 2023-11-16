export default function PageFiller3() {
  return (
    <>
      <div className='pageFiller3Container containerSpacing'>
        <div className='pageFiller3Title'>Latest News</div>
        <div className='pageFiller3SubTitle'>
          Sed laoreet sem quis nisl aliquam, sed facilisis diam lobortis.
          Aliquam ac convallis diam
        </div>
        <div className='shortLine'></div>
        <div className='testimonialSection flex '>
          <div className='testimonialBlock testimonialBlockOrange testimonialBlockDriftDown'>
            <p className='testimonialBlockTitle text-white'>Mo</p>
            Aliquam ac convallis diam. Interdum et malesuada fames ac ante ipsum
            primis in faucibus. Donec ullamcorper leo sit amet feugiat viverra.
            In felis neque, gravida nec erat imperdiet, imperdiet finibus risus.
            <div>
              <img
                src='person3.jpg'
                alt=''
                width={80}
                className='testimonialImg'
                onError={(e) => {
                  e.target.src = '/default.jpg';
                }}
              />
            </div>
          </div>
        </div>
        <div className='testimonialSection flex '>
          <div className='testimonialBlock testimonialBlockWhite'>
            <p className='testimonialBlockTitle'>Juan</p>
            Aliquam ac convallis diam. Interdum et malesuada fames ac ante ipsum
            primis in faucibus. Donec ullamcorper leo sit amet feugiat viverra.
            In felis neque, gravida nec erat imperdiet, imperdiet finibus risus.
            <img
              src='person2.jpg'
              alt=''
              width={80}
              className='testimonialImg'
              onError={(e) => {
                e.target.src = '/default.jpg';
              }}
            />
          </div>
          <div className='testimonialBlock testimonialBlockWhite'>
            <p className='testimonialBlockTitle'>Penelope</p>
            Aliquam ac convallis diam. Interdum et malesuada fames ac ante ipsum
            primis in faucibus. Donec ullamcorper leo sit amet feugiat viverra.
            In felis neque, gravida nec erat imperdiet, imperdiet finibus risus.
            <div>
              <img
                src='person1.jpg'
                alt=''
                width={80}
                className='testimonialImg'
                onError={(e) => {
                  e.target.src = '/default.jpg';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
