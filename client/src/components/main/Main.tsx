import {Search, SlidersHorizontal} from 'lucide-react';
import {Carousel} from 'react-responsive-carousel';
// import slide from '../../assets/shooe.png';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import './main.scss';

const Main = () => {
  return (
    <div className='main'>
      <section className='main__search flex gap-2 justify-center items-center'>
        <div className='main__search--input flex gap-1.5 p-3.5'>
          <Search size={28} />
          <input
            className='main__search--input_text italic w-62 text-xl outline-none'
            placeholder='Поиск'
          ></input>
        </div>
        <button className='main__search--filter p-3.5'>
          <SlidersHorizontal size={28} />
        </button>
      </section>

      <section className='main__sections'>
        <div className='flex justify-center items-center m-auto bg-white mt-3 main__carousel'>
          <Carousel
            infiniteLoop={true}
            autoPlay={true}
            interval={5000}
            showThumbs={false}
          >
            <div className=''>
              <SlidersHorizontal />
            </div>
            <div className=''>
              <SlidersHorizontal />
            </div>
          </Carousel>
        </div>
      </section>
    </div>
  );
};

export default Main;
