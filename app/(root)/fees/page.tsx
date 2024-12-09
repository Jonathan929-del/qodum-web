'use client';
// Imports
import {Suspense} from 'react';
import Fees from '@/components/Layout/pagesComponents/Fees';





// Main function
const Home = () => {
  return(
    <Suspense fallback={<div>Loading...</div>}>
      <Fees />
    </Suspense>
  );
};





// Export
export default Home;