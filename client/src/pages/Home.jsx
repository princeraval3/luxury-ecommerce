import React from 'react';
import Hero from '../components/home/Hero';
import ExploreWorld from '../components/home/ExploreWorld';
import TodaysDeals from '../components/home/TodaysDeals';
import BestSellers from '../components/home/BestSellers';
import BrandQuote from '../components/home/BrandQuote';
import NewArrivals from '../components/home/NewArrivals';
import BrowseByStyle from '../components/home/BrowseByStyle';
import Testimonials from '../components/home/Testimonials';

const Home = () => {
  return (
    <main className="bg-white min-h-screen">
      <Hero />
      <ExploreWorld />
      <TodaysDeals />
      <BestSellers />
      <NewArrivals/>
      <BrowseByStyle/>
      <Testimonials/>
      <BrandQuote />
    </main>
  );
};

export default Home;