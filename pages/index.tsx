import type { NextPage } from 'next';
import React from 'react';

const card_mb = 125;
const card_gap = 30;
const card_width = 285;
const card_height = 435;
const card_center = `calc(50vw - ${card_width / 2}px)`;

const Home: NextPage = () => {
  const [list, setList] = React.useState([
    { src: 'image-0.jpg' },
    { src: 'image-1.jpg' },
    { src: 'image-2.jpg' },
    { src: 'image-3.jpg' },
    { src: 'image-4.jpg' },
  ]);

  const handleClick = () => {
    const newList = [...list];
    newList.shift();
    setList(newList);
  };

  return (
    <main>
      <section className='container'>
        <ul className='card-list'>
          {list.map((el, i) => (
            <li
              key={el.src}
              style={{
                width: card_width,
                height: card_height,
                bottom: card_mb,
                left: card_center,
                transform: `translateX(${(card_gap + card_width) * i}px)`,
              }}
              className='card-item'
              onClick={handleClick}>
              <img className='card-image' src={el.src} alt='' />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Home;
