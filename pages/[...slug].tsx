import React from 'react';
import Background from '@/components/Background';
import GalleryList from '@/components/GalleryList';
import PhotoDescription from '@/components/PhotoDescription';
import Head from 'next/head';
import Header from '@/components/Header';

const Home: React.FC = () => {
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
    </>
  );
};

export default Home;
