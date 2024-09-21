'use client';
// Imports
import moment from 'moment';
import {setMomentDefaultYear} from '@/lib/utils';
import {useContext, useEffect, useState} from 'react';
import {GlobalStateContext} from '@/context/GlobalStateContext';
import {fetchActiveAcademicYear} from '@/lib/actions/accounts/globalMasters/defineSession/defineAcademicYear.actions';

import Dashboard from '@/pagesComps/payroll/page';
// @ts-ignore
import DefineAcademicYear from '@/components/modules/shared/AcademicYear/index';
import DefineFinancialYear from '@/components/modules/shared/FinancialYear/index';
import DefineProfession from '@/pagesComps/payroll/globalMasters/define-profession/page';
import DefineDepartment from '@/pagesComps/payroll/globalMasters/define-department/page';
import DefineDesignation from '@/pagesComps/payroll/globalMasters/define-designation/page';
import DefineStaffType from '@/pagesComps/payroll/globalMasters/define-staff-type/page';
import DefineStaff from '@/pagesComps/payroll/globalMasters/define-staff/page';
import DefineDocumentType from '@/pagesComps/payroll/globalMasters/define-document-type/page';





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
    if(openedPages.includes('Define Profession')){
      openedPagesArray.push({name:'Define Profession', component:<DefineProfession />});
    };
    if(openedPages.includes('Define Department')){
      openedPagesArray.push({name:'Define Department', component:<DefineDepartment />});
    };
    if(openedPages.includes('Define Designation')){
      openedPagesArray.push({name:'Define Designation', component:<DefineDesignation />});
    };
    if(openedPages.includes('Define Staff Type')){
      openedPagesArray.push({name:'Define Staff Type', component:<DefineStaffType />});
    };
    if(openedPages.includes('Employee Registration')){
      openedPagesArray.push({name:'Employee Registration', component:<DefineStaff />});
    };
    if(openedPages.includes('Define Document Type')){
      openedPagesArray.push({name:'Define Document Type', component:<DefineDocumentType />});
    };


    // Setting active year in moment
    const fetcher = async () => {
      const activeYearRes = await fetchActiveAcademicYear();
      setMomentDefaultYear(activeYearRes.year_name.split('-')[0]);
    };
    fetcher();


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