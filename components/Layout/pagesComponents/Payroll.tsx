'use client';
// Imports
import moment from 'moment';
import {redirect, useSearchParams} from 'next/navigation';
import {AuthContext} from '@/context/AuthContext';
import {useContext, useEffect, useState} from 'react';
import {GlobalStateContext} from '@/context/GlobalStateContext';

// @ts-ignore
import Dashboard from '@/pagesComps/payroll/page';
import DefineStaff from '@/pagesComps/payroll/globalMasters/define-staff/page';
import DefineAcademicYear from '@/components/modules/shared/AcademicYear/index';
import DefineFinancialYear from '@/components/modules/shared/FinancialYear/index';
import DefineStaffType from '@/pagesComps/payroll/globalMasters/define-staff-type/page';
import DefineProfession from '@/pagesComps/payroll/globalMasters/define-profession/page';
import DefineDepartment from '@/pagesComps/payroll/globalMasters/define-department/page';
import DefineDesignation from '@/pagesComps/payroll/globalMasters/define-designation/page';
import CandidateApplication from '@/pagesComps/payroll/globalMasters/staff-application/page';
import DefineDocumentType from '@/pagesComps/payroll/globalMasters/define-document-type/page';
import ShortlistedCandidate from '@/pagesComps/payroll/globalMasters/shortlisted-candidate/page';
import CurrentJobOpening from '@/pagesComps/payroll/globalMasters/current-job-opening/page';
import AdmissionSettings from '@/pagesComps/payroll/masterSettings/admission-setting/page';
import { updateUserPermissions } from '@/lib/actions/users/manageUsers/user.actions';





// Main function
const Home = () => {

  // Login user check
  const {user, login, logout} = useContext(AuthContext);


  // Params page
  const searchParams = useSearchParams();
  const page = searchParams.get('page');


  // Setting moment local to english
  moment.locale('en-gb');


  // Current page
  const {currentPage, setCurrentPage, openedPages, setOpenedPages} = useContext(GlobalStateContext);
  
  
  // Opened pages components
  const [openedPagesComponents, setOpenedPagesComponents] = useState([]);


  // Use effect
  useEffect(() => {

    if(!user) redirect('/sign-in');

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
    if(openedPages.includes('Shortlisted Candidate')){
      openedPagesArray.push({name:'Shortlisted Candidate', component:<ShortlistedCandidate />});
    };
    if(openedPages.includes('Candidate Registration')){
      openedPagesArray.push({name:'Candidate Registration', component:<CandidateApplication />});
    };
    if(openedPages.includes('Define Document Type')){
      openedPagesArray.push({name:'Define Document Type', component:<DefineDocumentType />});
    };
    if(openedPages.includes('Current Job Opening')){
      openedPagesArray.push({name:'Current Job Opening', component:<CurrentJobOpening />});
    };
    if(openedPages.includes('Admission Settings')){
      openedPagesArray.push({name:'Admission Settings', component:<AdmissionSettings />});
    };


    // // Setting active year in moment
    // const fetcher = async () => {
    //   const activeYearRes = await fetchActiveAcademicYear();
    //   setMomentDefaultYear(activeYearRes.year_name.split('-')[0]);
    // };
    // fetcher();



    // Checking user permissions
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


    setOpenedPagesComponents(openedPagesArray);

  }, [openedPages]);
  useEffect(() => {
    if(page){
      setOpenedPages([...openedPages, page]);
      setCurrentPage(page);
    };
  }, []);

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