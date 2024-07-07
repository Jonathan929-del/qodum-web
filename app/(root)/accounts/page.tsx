'use client';
// Imports
import {useContext, useEffect, useState} from 'react';
import {GlobalStateContext} from '@/context/GlobalStateContext';

import Dashboard from '@/pages/admission/page';
// @ts-ignore
import DefineAcademicYear from '@/components/modules/shared/AcademicYear/index';
import DefineFinancialYear from '@/components/modules/shared/FinancialYear/index';
import DefineNarrationMaster from '@/pages/accounts/(global masters)/define-narration-master/page';
import ChangeAcademic from '@/pages/accounts/(masterSettings)/change-academic/page';
import DefineAccountGroup from '@/pages/accounts/(accounts)/define-account-group/page';
import DefineBankLedger from '@/pages/accounts/(accounts)/define-bank-ledger/page';
import DefinePartyLedger from '@/pages/accounts/(accounts)/define-party-ledger/page';
import DefineGeneralLedger from '@/pages/accounts/(accounts)/define-general-ledger/page';






// Main function
const Home = () => {

  // Current page
  const {currentPage, setCurrentPage, openedPages} = useContext(GlobalStateContext);
  
  
  // Opened pages components
  const [openedPagesComponents, setOpenedPagesComponents] = useState([]);


  // Use effect
  useEffect(() => {

    if(openedPages.length === 0){
      setCurrentPage('');
      setOpenedPagesComponents([{name:'Dashboard', component:<Dashboard />}]);
    };
    if(openedPages.includes('Define Academic Year')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Define Academic Year', component:<DefineAcademicYear />}]);
    };
    if(openedPages.includes('Define Financial Year')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Define Financial Year', component:<DefineFinancialYear />}]);
    };
    if(openedPages.includes('Define Narration Master')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Define Narration Master', component:<DefineNarrationMaster />}]);
    };
    if(openedPages.includes('Change Academic')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Change Academic', component:<ChangeAcademic />}]);
    };
    if(openedPages.includes('Define Account Group')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Define Account Group', component:<DefineAccountGroup />}]);
    };
    if(openedPages.includes('Define Bank Ledger')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Define Bank Ledger', component:<DefineBankLedger />}]);
    };
    if(openedPages.includes('Define Party Ledger')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Define Party Ledger', component:<DefinePartyLedger />}]);
    };
    if(openedPages.includes('Define General Ledger')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Define General Ledger', component:<DefineGeneralLedger />}]);
    };

  }, [openedPages]);

  return(
    <div className='relative h-full w-full'>
      {openedPagesComponents?.map((component:any) => (
        <div className={`absolute w-full ${component.name === currentPage ? 'z-10' : 'z-0'}`}>
          {component.component}
        </div>
      ))}
    </div>
  );
};





// Export
export default Home;