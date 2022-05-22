import React from 'react';
import Background from '@/components/Background';
import GalleryList from '@/components/GalleryList';
import PhotoDescription from '@/components/PhotoDescription';
import Head from 'next/head';
import Header from '@/components/Header';
import { GalleryAction } from '@/types/actions';
import { selectGallery } from '@/src/redux/reducers/gallery/selectors';
import { useSelector } from 'react-redux';

const Home: React.FC = () => {
  const gallery: GalleryAction['payload'] = useSelector(selectGallery);
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <>
      <Head>
        <link
          href='https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Raleway:wght@600&display=swap'
          rel='stylesheet'
        />
      </Head>
      <Header />
      <main>
        <section className='container'>
          <Background />
          <PhotoDescription />
          <GalleryList />
        </section>
      </main>
      <div className={gallery.loadingStyle} />
    </>
  );
};

export default Home;
