'use client';
// Imports
import {redirect} from 'next/navigation';
import {useContext, useEffect} from 'react';
import Modules from '@/components/utils/Modules';
import {AuthContext} from '@/context/AuthContext';
import {updateUserPermissions} from '@/lib/actions/users/manageUsers/user.actions';





// Main function
const RootPage = () => {

  // Login user check
  const {user, login, logout} = useContext(AuthContext);


  // Use effects
  useEffect(() => {
    if(!user) redirect('/sign-in');
  }, [user]);
  useEffect(() => {
    const asyncFunc = async () => {
        localStorage.removeItem('payments');
        const loginUserRes = await updateUserPermissions({user_name:user.user_name});
        if(loginUserRes.success){
            login(loginUserRes.user);
        }else{
            logout();
        };
    };
    asyncFunc();
  }, []);

  return (
    <>
      <Modules />
    </>
  );
};





// Export
export default RootPage;