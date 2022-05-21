import React from 'react';
import { selectGallery } from '@/src/redux/reducers/gallery/selectors';
import { GalleryAction } from '@/types/actions';
import { useSelector, useDispatch } from 'react-redux';
import { card_width, card_height, card_mb, card_center, card_gap } from '@/src/constants';

export const GalleryList: React.FC = () => {
  const gallery: GalleryAction['payload'] = useSelector(selectGallery);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch({
      type: 'SHIFT_GALLERY',
    });
  };

  return (
    <ul className='card-list'>
      {gallery.data.slice(1).map((el, i) => (
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
  );
};

export default GalleryList;
