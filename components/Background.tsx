import React from 'react';
import { useSelector } from 'react-redux';
import { GalleryAction } from '@/types/actions';
import { selectGallery } from '@/src/redux/reducers/gallery/selectors';

export const Background: React.FC = () => {
  const gallery: GalleryAction['payload'] = useSelector(selectGallery);

  return (
    <div className='background'>
      <div style={{ backgroundImage: `url(${gallery.prevImg?.urls?.regular})` }} className={gallery.prevImgStyle} />
      {/* <div style={{ backgroundImage: `url(${gallery.prevImg?.urls?.full})` }} className={gallery.prevImgStyle} /> */}
      <div
        style={{ backgroundImage: `url(${gallery.nextImg?.urls?.regular})`, ...gallery.nextImgStyle }}
        className='background-image'
      />
    </div>
  );
};

export default Background;
