'use client';
// Imports
import moment from 'moment';
import {redirect, useSearchParams} from 'next/navigation';
import {AuthContext} from '@/context/AuthContext';
import {useContext, useEffect, useState} from 'react';
import {GlobalStateContext} from '@/context/GlobalStateContext';

// @ts-ignore
import SendSMS from '@/pagesComps/admission/(admission)/send-sms/page';
import Notice from '@/pagesComps/admission/(admission)/send-sms/notice/index';
import ClassNotice from '@/pagesComps/admission/(admission)/send-sms/classNotice';





// Main function
const Home = () => {

  // Login user check
  const {user} = useContext(AuthContext);


  // Opened page
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
          Qodum Care Dashboard
        </div>
      )});
      setCurrentPage('');
    };
    if(openedPages.includes('App Control')){
      openedPagesArray.push({name:'App Control', component:<SendSMS />});
    };
    if(openedPages.includes('Notice')){
      openedPagesArray.push({name:'Notice', component:<Notice />});
    };
    if(openedPages.includes('Class Notice')){
      openedPagesArray.push({name:'Class Notice', component:<ClassNotice />});
    };

    setOpenedPagesComponents(openedPagesArray);

  }, [openedPages]);
  useEffect(() => {
    if(page){
      setOpenedPages([...openedPages, page]);
      setCurrentPage(page);
    };
  }, [page]);

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