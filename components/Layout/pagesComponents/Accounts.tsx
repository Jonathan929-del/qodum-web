'use client';
// Imports
import moment from 'moment';
import {redirect, useSearchParams} from 'next/navigation';
import {AuthContext} from '@/context/AuthContext';
import {useContext, useEffect, useState} from 'react';
import {GlobalStateContext} from '@/context/GlobalStateContext';

import Dashboard from '@/pagesComps/admission/page';
// @ts-ignore
// import {setMomentDefaultYear} from '@/lib/utils';
import DefineAcademicYear from '@/components/modules/shared/AcademicYear/index';
import DefineFinancialYear from '@/components/modules/shared/FinancialYear/index';
import ChangeAcademic from '@/pagesComps/accounts/(masterSettings)/change-academic/page';
import DefineAccountGroup from '@/pagesComps/accounts/(accounts)/define-account-group/page';
import DefineBankLedger from '@/pagesComps/accounts/(accounts)/define-bank-ledger/page';
import DefinePartyLedger from '@/pagesComps/accounts/(accounts)/define-party-ledger/page';
import DefineGeneralLedger from '@/pagesComps/accounts/(accounts)/define-general-ledger/page';
import SessionTransfer from '@/pagesComps/fees/(master settings)/session-transfer/page';
import AccountSessionTransfer from '@/pagesComps/fees/(master settings)/session-transfer/account/page';
import FeeSessionTransfer from '@/pagesComps/fees/(master settings)/session-transfer/fee/page';
import DefineNarrationMaster from '@/pagesComps/accounts/(global masters)/define-narration-master/page';
import PayrollSessionTransfer from '@/pagesComps/fees/(master settings)/session-transfer/payroll/page';
import AdmissionSessionTransfer from '@/pagesComps/fees/(master settings)/session-transfer/admission/page';
// import {fetchActiveAcademicYear} from '@/lib/actions/accounts/globalMasters/defineSession/defineAcademicYear.actions';






// Main function
const Home = () => {

  // Login user check
  const {user} = useContext(AuthContext);


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
    if(openedPages.includes('Define Narration Master')){
      openedPagesArray.push({name:'Define Narration Master', component:<DefineNarrationMaster />});
    };
    if(openedPages.includes('Change Academic')){
      openedPagesArray.push({name:'Change Academic', component:<ChangeAcademic />});
    };
    if(openedPages.includes('Define Account Group')){
      openedPagesArray.push({name:'Define Account Group', component:<DefineAccountGroup />});
    };
    if(openedPages.includes('Define Bank Ledger')){
      openedPagesArray.push({name:'Define Bank Ledger', component:<DefineBankLedger />});
    };
    if(openedPages.includes('Define Party Ledger')){
      openedPagesArray.push({name:'Define Party Ledger', component:<DefinePartyLedger />});
    };
    if(openedPages.includes('Define General Ledger')){
      openedPagesArray.push({name:'Define General Ledger', component:<DefineGeneralLedger />});
    };
    if(openedPages.includes('Session Transfer')){
      openedPagesArray.push({name:'Session Transfer', component:<SessionTransfer />});
    };
    if(openedPages.includes('Account Manager Session Transfer')){
      openedPagesArray.push({name:'Account Manager Session Transfer', component:<AccountSessionTransfer />});
    };
    if(openedPages.includes('Fee Manager Session Transfer')){
      openedPagesArray.push({name:'Fee Manager Session Transfer', component:<FeeSessionTransfer />});
    };
    if(openedPages.includes('Payroll Manager Session Transfer')){
      openedPagesArray.push({name:'Payroll Manager Session Transfer', component:<PayrollSessionTransfer />});
    };
    if(openedPages.includes('Admission Manager Session Transfer')){
      openedPagesArray.push({name:'Admission Manager Session Transfer', component:<AdmissionSessionTransfer />});
    };

    // Setting active year in moment
    // const fetcher = async () => {
    //   const activeYearRes = await fetchActiveAcademicYear();
    //   setMomentDefaultYear(activeYearRes.year_name.split('-')[0]);
    // };
    // fetcher();

    setOpenedPagesComponents(openedPagesArray)

  }, [openedPages]);
  useEffect(() => {
    const searchParams = useSearchParams();
    const page = searchParams.get('page');
    if(page){
      setOpenedPages([...openedPages, page]);
      setCurrentPage(page);
    };
  }, []);

  return(
    <div className='relative h-full w-full'>
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