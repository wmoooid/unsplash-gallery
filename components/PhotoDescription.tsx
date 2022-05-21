import React from 'react';
import { selectGallery } from '@/src/redux/reducers/gallery/selectors';
import { GalleryAction } from '@/types/actions';
import { useSelector, useDispatch } from 'react-redux';
import { card_width, card_height, card_mb, card_center, card_gap } from '@/src/constants';

export const PhotoDescription: React.FC = () => {
  const gallery: GalleryAction['payload'] = useSelector(selectGallery);

  return (
    <div className='photo-description-box'>
      <div className='photo-description-info'>
        <p className='photo-description-author'>{gallery.prevImg?.user?.name}</p>
        <h1 className='photo-description-heading'>{gallery.prevImg?.description}</h1>
        {gallery.prevImg?.user?.location ? (
          <div className='photo-description-location'>
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M12 13.4299C13.7231 13.4299 15.12 12.0331 15.12 10.3099C15.12 8.58681 13.7231 7.18994 12 7.18994C10.2769 7.18994 8.88 8.58681 8.88 10.3099C8.88 12.0331 10.2769 13.4299 12 13.4299Z'
                stroke='#fff'
                strokeWidth='2'
              />
              <path
                d='M3.62001 8.49C5.59001 -0.169998 18.42 -0.159997 20.38 8.5C21.53 13.58 18.37 17.88 15.6 20.54C13.59 22.48 10.41 22.48 8.39001 20.54C5.63001 17.88 2.47001 13.57 3.62001 8.49Z'
                stroke='#fff'
                strokeWidth='2'
              />
            </svg>
            <small className='photo-description-location-text'>{gallery.prevImg?.user?.location}</small>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PhotoDescription;
