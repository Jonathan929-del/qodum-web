'use client';
// Imports
import {Suspense} from 'react';
import RootPage from '@/components/Layout/RootPage';
import LoadingIcon from '@/components/utils/LoadingIcon';





// Main function
const Home = () => {
  return (
    <Suspense fallback={<LoadingIcon />}>
      <RootPage />
    </Suspense>
  );
};





// Export
export default Home;