import type { NextPage } from 'next';
import React from 'react';

const transition_time = 300;
const card_mb = 125;
const card_gap = 30;
const card_width = 285;
const card_height = 435;
const card_center = `calc(50vw - ${card_width / 2}px)`;
const card_hold = {
  width: card_width,
  height: card_height,
  bottom: card_mb,
  left: card_center,
  borderRadius: '20px',
  visivility: 'hidden',
};
const card_move = {
  width: '100%',
  height: '100%',
  bottom: 0,
  left: 0,
  visivility: 'visible',
  borderRadius: '0px',
  transition: `all ${transition_time}ms ease-in-out`,
};

const Home: NextPage = () => {
  const [list, setList] = React.useState([
    { src: 'image-0.jpg' },
    { src: 'image-1.jpg' },
    { src: 'image-2.jpg' },
    { src: 'image-3.jpg' },
    { src: 'image-4.jpg' },
  ]);
  const [backgroundList, setBackgroundList] = React.useState([list[0], list[1]]);
  const [nextCardStyle, setNextCardStyle] = React.useState<any>(card_hold);

  const handleClick = () => {
    setNextCardStyle(card_move);
    const newList = [...list];
    newList.shift();
    setList(newList);
    setTimeout(() => {
      setBackgroundList([newList[0], newList[1]]);
      setNextCardStyle(card_hold);
    }, transition_time);
  };

  return (
    <main>
      <section className='container'>
        <div className='background'>
          <img
            style={{
              width: '100%',
              height: '100%',
            }}
            src={backgroundList[0].src}
            alt=''
            className='background-image'
          />
          <img style={nextCardStyle} src={backgroundList[1].src} alt='' className='background-image' />
        </div>
        <ul className='card-list'>
          {list.slice(1).map((el, i) => (
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
