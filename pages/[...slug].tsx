import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  card_hold,
  card_move,
  transition_time,
  card_width,
  card_height,
  card_mb,
  card_center,
  card_gap,
} from '../src/constants';
import { selectGallery } from '../src/redux/reducers/gallery/selectors';
import { GalleryAction } from '../src/redux/sagas/gallery';

let shouldWait = false;

const Home: React.FC = () => {
  const gallery: GalleryAction['payload'] = useSelector(selectGallery);
  const dispatch = useDispatch();
  const { data } = gallery;

  const [backgroundList, setBackgroundList] = React.useState<any[]>([]);
  const [nextCardStyle, setNextCardStyle] = React.useState<any>(card_hold);
  const [prevCardStyle, setPrevCardStyle] = React.useState('background-image');

  React.useEffect(() => {
    setTimeout(() => {
      setBackgroundList([data[0], data[1]]);
    }, transition_time);
  }, [data]);

  const shiftGallery = () => {
    dispatch({
      type: 'SHIFT_GALLERY',
    });
  };

  const handleClick = () => {
    if (shouldWait) return;
    shouldWait = true;
    setNextCardStyle(card_move);
    setPrevCardStyle('background-image dark');
    shiftGallery();
    setTimeout(() => {
      setNextCardStyle(card_hold);
      setPrevCardStyle('background-image');
      shouldWait = false;
    }, transition_time);
  };

  return (
    <main>
      <section className='container'>
        <div className='background'>
          <div style={{ backgroundImage: `url(${backgroundList[0]?.urls.regular})` }} className={prevCardStyle} />
          <div style={{ backgroundImage: `url(${backgroundList[0]?.urls.full})` }} className={prevCardStyle} />
          <div
            style={{ backgroundImage: `url(${backgroundList[1]?.urls.regular})`, ...nextCardStyle }}
            className='background-image'
          />
        </div>
        <ul className='card-list'>
          {data.slice(1).map((el, i) => (
            <li
              key={el.id}
              style={{
                width: card_width,
                height: card_height,
                bottom: card_mb,
                left: card_center,
                transform: `translateX(${(card_gap + card_width) * i}px)`,
              }}
              className='card-item'
              onClick={handleClick}>
              <div style={{ backgroundImage: `url(${el?.urls.regular})` }} className='card-image' />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Home;
