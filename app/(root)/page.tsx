'use client';
// Imports
import {useContext, useEffect} from 'react';
import {redirect} from 'next/navigation';
import Modules from '@/components/utils/Modules';
import {AuthContext} from '@/context/AuthContext';





// Main function
const Home = () => {

  // Login user check
  const {user} = useContext(AuthContext);


  // Use effect
  useEffect(() => {
    if(!user) redirect('/sign-in');
  }, [user]);

  return (
    <>
      <Modules />
    </>
  );
};





// Export
export default Home;