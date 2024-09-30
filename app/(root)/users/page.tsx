'use client';
// Imports
import moment from 'moment';
// import {setMomentDefaultYear} from '@/lib/utils';
import {useContext, useEffect, useState} from 'react';
import {GlobalStateContext} from '@/context/GlobalStateContext';
// import {fetchActiveAcademicYear} from '@/lib/actions/accounts/globalMasters/defineSession/defineAcademicYear.actions';

import Dashboard from '@/pagesComps/users/page';
// @ts-ignore
import DefineAcademicYear from '@/components/modules/shared/AcademicYear/index';
import DefineFinancialYear from '@/components/modules/shared/FinancialYear/index';
import ChangeAcademic from '@/components/modules/shared/ChangeAcademic/index';
import CreateUser from '@/pagesComps/users/manageUsers/create-user/page';
import UserPermission from '@/pagesComps/users/manageUsers/user-permission/page';





// Main function
const Home = () => {

  // Setting moment local to english
  moment.locale('en-gb');


  // Current page
  const {currentPage, setCurrentPage, openedPages} = useContext(GlobalStateContext);
  
  
  // Opened pages components
  const [openedPagesComponents, setOpenedPagesComponents] = useState([]);


  // Use effect
  useEffect(() => {

    let openedPagesArray = [];

    if(openedPages.length === 0){
      openedPagesArray.push({name:'Dashboard', component:(
        <div className='h-full overflow-y-scroll custom-sidebar-scrollbar'>
          <Dashboard />
        </div>
      )});
      setCurrentPage('');
    };
    if(openedPages.includes('Define Academic Year')){
      openedPagesArray.push({name:'Define Academic Year', component:<DefineAcademicYear />});
    };
    if(openedPages.includes('Define Financial Year')){
      openedPagesArray.push({name:'Define Financial Year', component:<DefineFinancialYear />});
    };
    if(openedPages.includes('Change Academic')){
      openedPagesArray.push({name:'Change Academic', component:<ChangeAcademic />});
    };
    if(openedPages.includes('Create User')){
      openedPagesArray.push({name:'Create User', component:<CreateUser />});
    };
    if(openedPages.includes('User Permission')){
      openedPagesArray.push({name:'User Permission', component:<UserPermission />});
    };


    // Setting active year in moment
    // const fetcher = async () => {
    //   const activeYearRes = await fetchActiveAcademicYear();
    //   setMomentDefaultYear(activeYearRes.year_name.split('-')[0]);
    // };
    // fetcher();


    setOpenedPagesComponents(openedPagesArray);

  }, [openedPages]);

  return(
    <div className='relative h-full w-full overflow-hidden'>
      {openedPagesComponents?.map((component:any) => (
        <div className={`absolute w-full h-full ${component.name === currentPage ? 'z-10' : 'z-0'}`}>
          {component.component}
        </div>
      ))}
    </div>
  );
};





// Export
export default Home;