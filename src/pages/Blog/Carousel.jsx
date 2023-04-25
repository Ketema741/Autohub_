
import Carousel from '../../components/Carousel';

import card1 from '../../data/bg1.jpg';
import card2 from '../../data/bg2.jpg';
import card3 from '../../data/bg3.jpg';
import card4 from '../../data/bg4.jpg';

const imagesItems = [
  <image className="h-full w-full" src={card1} alt="teste" />,
  <image className="h-full w-full" src={card2} alt="teste" />,
  <image className="h-full w-full" src={card3} alt="teste" />,
  <image className="h-full w-full" src={card4} alt="teste" />,
  <image className="h-full w-full" src={card1} alt="teste" />,
];

const BlogCarousel = () => {
  return (
    <div className="overflow-hidden bg-bg text-gray-300">
      <main className="flex flex-col w-full spac-y-4 items-center justify-center px-20 text-center">
      <div className='text-2xl text-bold text-black p-5'> Related Contents </div>
        <Carousel items={imagesItems} />
      </main>
    </div>
  );
};

export default BlogCarousel;
