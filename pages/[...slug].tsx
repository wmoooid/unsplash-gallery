import React from 'react';
import Background from '@/components/Background';
import GalleryList from '@/components/GalleryList';

const Home: React.FC = () => {
  return (
    <main>
      <section className='container'>
        <Background />
        <GalleryList />
      </section>
    </main>
  );
};

export default Home;
