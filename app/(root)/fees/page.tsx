'use client';
// Imports
import moment from 'moment';
import {useContext, useEffect, useState} from 'react';
import {GlobalStateContext} from '@/context/GlobalStateContext';

import Dashboard from '@/pagesComps/fees/page';
// @ts-ignore
import DefineSchoolBoard from '@/pagesComps/fees/(global masters)/(define-school)/define-school-board/page';
import SchoolGlobalDetails from '@/pagesComps/fees/(global masters)/(define-school)/school-global-details/page';
import DefineAcademicYear from '@/components/modules/shared/AcademicYear/index';
import DefineFinancialYear from '@/components/modules/shared/FinancialYear/index';
import DefineWing from '@/pagesComps/fees/(global masters)/(define-class-details)/define-wing/page';
import DefineClass from '@/pagesComps/fees/(global masters)/(define-class-details)/define-class/page';
import DefineSection from '@/pagesComps/fees/(global masters)/(define-class-details)/define-section/page';
import RelateClassSection from '@/pagesComps/fees/(global masters)/(define-class-details)/relate-class-section/page';
import ChangeAcademic from '@/pagesComps/fees/(master settings)/change-academic/page';
import FeeEntrySetting from '@/pagesComps/fees/(master settings)/fee-entry-setting/page';
import FeeEntrySettingOthers from '@/pagesComps/fees/(master settings)/fee-entry-setting-others/page';
import SetDueLimit from '@/pagesComps/fees/(master settings)/set-due-limit/page';
import FeeOpeningBalanceSetting from '@/pagesComps/fees/(master settings)/fee-opening-balance-setting/page';
import BusIDSetting from '@/pagesComps/fees/(master settings)/bus-id-setting/page';
import ReportLayoutSetting from '@/pagesComps/fees/(master settings)/report-layout-setting/page';
import SessionTransfer from '@/pagesComps/fees/(master settings)/session-transfer/page';
import DefineFeeInstallment from '@/pagesComps/fees/(fee master)/(define fee master)/define-fee-installment/page';
import DefineFeeHead from '@/pagesComps/fees/(fee master)/(define fee master)/define-fee-head/page';
import DefineFeeType from '@/pagesComps/fees/(fee master)/(define fee master)/define-fee-type/page';
import DefineFeeGroup from '@/pagesComps/fees/(fee master)/(define fee master)/define-fee-group/page';
import AssignFeeGroupToFeeHead from '@/pagesComps/fees/(fee master)/assign-fee-group-to-fee-head/page';
import AssignAmountGroup from '@/pagesComps/fees/(fee master)/assign-amount-group/page';
import AssignMultipleGroupToStudent from '@/pagesComps/fees/(fee master)/assign-multiple-group-to-student/page';
import DefineConcession from '@/pagesComps/fees/(fee master)/(define and assign concession)/define-concession/page';
import DefineConcessionType from '@/pagesComps/fees/(fee master)/(define and assign concession)/define-concession-type/page';
import AssignConcession from '@/pagesComps/fees/(fee master)/(define and assign concession)/assign-concession/page';
import SetStudentStatus from '@/pagesComps/fees/(fee master)/set-student-status/page';
import LateFeeSetting from '@/pagesComps/fees/(fee master)/(lateFeeSettings)/late-fee-setting/page';
import LateFeeSettingHeadWise from '@/pagesComps/fees/(fee master)/(lateFeeSettings)/late-fee-setting-head-wise/page';
import FeeEntry from '@/pagesComps/fees/(manage fee)/fee-entry/page';
import PrintFeeReceiptAndCertificate from '@/pagesComps/fees/(manage fee)/print-fee-receipt-&-certificate/page';
import ModifyFeesReceipt from '@/pagesComps/fees/(manage fee)/modify-fees-receipt/page';
import CancelFeesReceipt from '@/pagesComps/fees/(manage fee)/cancel-fees-receipt/page';
import DeleteFeesReceipt from '@/pagesComps/fees/(manage fee)/delete-fees-receipt/page';
import TravelAgencyMaster from '@/pagesComps/fees/(transport)/travel-agency-master/page';
import DefineVehicleType from '@/pagesComps/fees/(transport)/define-vehicle-type/page';
import DefineVehicleDetails from '@/pagesComps/fees/(transport)/define-vehicle-details/page';
import DefineVehicleRoute from '@/pagesComps/fees/(transport)/define-vehicle-route/page';
import DefineVehicleRouteRelation from '@/pagesComps/fees/(transport)/define-vehicle-route-relation/page';
import DefineTransportFareAndGroup from '@/pagesComps/fees/(transport)/define-transport-fare-and-group/page';
import DefineTransportMedium from '@/pagesComps/fees/(transport)/define-transport-medium/page';
import DefineRouteStop from '@/pagesComps/fees/(transport)/define-route-stop/page';
import AssignTransportToStudents from '@/pagesComps/fees/(transport)/assign-transport-to-students/page';
import DailyFeeCollection from '@/pagesComps/fees/(transaction report)/(collection reports)/daily-fee-collection/page';
import ReceiptWiseFeeTypeCollection from '@/pagesComps/fees/(transaction report)/(collection reports)/receipt-wise-fee-type-collection/page';
import ClassWiseStudentStrength from '@/pagesComps/fees/(reports)/(student-strength)/class-wise-student-strength/page';
import AccountSessionTransfer from '@/pagesComps/fees/(master settings)/session-transfer/account/page';
import FeeSessionTransfer from '@/pagesComps/fees/(master settings)/session-transfer/fee/page';
import PayrollSessionTransfer from '@/pagesComps/fees/(master settings)/session-transfer/payroll/page';
import AdmissionSessionTransfer from '@/pagesComps/fees/(master settings)/session-transfer/admission/page';
import FeeDefaulterList from '@/pagesComps/fees/(transaction report)/(defaulter reports)/fee-defaulter-list/page';
import StudentDetails from '@/pagesComps/fees/(reports)/student-details/page';
// import { setMomentDefaultYear } from '@/lib/utils';
// import { fetchActiveAcademicYear } from '@/lib/actions/accounts/globalMasters/defineSession/defineAcademicYear.actions';





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
      setCurrentPage('');
      openedPagesArray.push({name:'Dashboard', component:(
        <div className='h-full overflow-y-scroll custom-sidebar-scrollbar'>
          <Dashboard />
        </div>
      )})
    };
    if(openedPages.includes('Define School Board')){
      openedPagesArray.push({name:'Define School Board', component:<DefineSchoolBoard />});
    };
    if(openedPages.includes('School Global Details')){
      openedPagesArray.push({name:'School Global Details', component:<SchoolGlobalDetails />});
    };
    if(openedPages.includes('Define Academic Year')){
      openedPagesArray.push({name:'Define Academic Year', component:<DefineAcademicYear />});
    };
    if(openedPages.includes('Define Financial Year')){
      openedPagesArray.push({name:'Define Financial Year', component:<DefineFinancialYear />});
    };
    if(openedPages.includes('Define Wing')){
      openedPagesArray.push({name:'Define Wing', component:<DefineWing />});
    };
    if(openedPages.includes('Define Class')){
      openedPagesArray.push({name:'Define Class', component:<DefineClass />});
    };
    if(openedPages.includes('Define Section')){
      openedPagesArray.push({name:'Define Section', component:<DefineSection />});
    };
    if(openedPages.includes('Relate Class Section')){
      openedPagesArray.push({name:'Relate Class Section', component:<RelateClassSection />});
    };
    if(openedPages.includes('Change Academic')){
      openedPagesArray.push({name:'Change Academic', component:<ChangeAcademic />});
    };
    if(openedPages.includes('Fee Entry Setting')){
      openedPagesArray.push({name:'Fee Entry Setting', component:<FeeEntrySetting />});
    };
    if(openedPages.includes('Fee Entry Setting Others')){
      openedPagesArray.push({name:'Fee Entry Setting Others', component:<FeeEntrySettingOthers />});
    };
    if(openedPages.includes('Set Due Limit')){
      openedPagesArray.push({name:'Set Due Limit', component:<SetDueLimit />});
    };
    if(openedPages.includes('Fee Opening Balance Setting')){
      openedPagesArray.push({name:'Fee Opening Balance Setting', component:<FeeOpeningBalanceSetting />});
    };
    if(openedPages.includes('Bus ID Setting')){
      openedPagesArray.push({name:'Bus ID Setting', component:<BusIDSetting />});
    };
    if(openedPages.includes('Report Layout Setting')){
      openedPagesArray.push({name:'Report Layout Setting', component:<ReportLayoutSetting />});
    };
    if(openedPages.includes('Session Transfer')){
      openedPagesArray.push({name:'Session Transfer', component:<SessionTransfer />});
    };
    if(openedPages.includes('Define Fee Installment')){
      openedPagesArray.push({name:'Define Fee Installment', component:<DefineFeeInstallment />});
    };
    if(openedPages.includes('Define Fee Head')){
      openedPagesArray.push({name:'Define Fee Head', component:<DefineFeeHead />});
    };
    if(openedPages.includes('Define Fee Type')){
      openedPagesArray.push({name:'Define Fee Type', component:<DefineFeeType />});
    };
    if(openedPages.includes('Define Fee Group')){
      openedPagesArray.push({name:'Define Fee Group', component:<DefineFeeGroup />});
    };
    if(openedPages.includes('Assign Fee Group to Fee Head')){
      openedPagesArray.push({name:'Assign Fee Group to Fee Head', component:<AssignFeeGroupToFeeHead />});
    };
    if(openedPages.includes('Assign Amount Group')){
      openedPagesArray.push({name:'Assign Amount Group', component:<AssignAmountGroup />});
    };
    if(openedPages.includes('Assign Multiple Group to Student')){
      openedPagesArray.push({name:'Assign Multiple Group to Student', component:<AssignMultipleGroupToStudent />});
    };
    if(openedPages.includes('Define Concession')){
      openedPagesArray.push({name:'Define Concession', component:<DefineConcession />});
    };
    if(openedPages.includes('Define Concession Type')){
      openedPagesArray.push({name:'Define Concession Type', component:<DefineConcessionType />});
    };
    if(openedPages.includes('Assign Concession')){
      openedPagesArray.push({name:'Assign Concession', component:<AssignConcession />});
    };
    if(openedPages.includes('Set Student Status')){
      openedPagesArray.push({name:'Set Student Status', component:<SetStudentStatus />});
    };
    if(openedPages.includes('Late Fee Setting')){
      openedPagesArray.push({name:'Late Fee Setting', component:<LateFeeSetting />});
    };
    if(openedPages.includes('Late Fee Setting Head Wise')){
      openedPagesArray.push({name:'Late Fee Setting Head Wise', component:<LateFeeSettingHeadWise />});
    };
    if(openedPages.includes('Fee Entry')){
      openedPagesArray.push({name:'Fee Entry', component:<FeeEntry />});
    };
    if(openedPages.includes('Print Fee Receipt & Certificate')){
      openedPagesArray.push({name:'Print Fee Receipt & Certificate', component:<PrintFeeReceiptAndCertificate />});
    };
    if(openedPages.includes('Modify Fees Receipt')){
      openedPagesArray.push({name:'Modify Fees Receipt', component:<ModifyFeesReceipt />});
    };
    if(openedPages.includes('Cancel Fees Receipt')){
      openedPagesArray.push({name:'Cancel Fees Receipt', component:<CancelFeesReceipt />});
    };
    if(openedPages.includes('Delete Fees Receipt')){
      openedPagesArray.push({name:'Delete Fees Receipt', component:<DeleteFeesReceipt />});
    };
    if(openedPages.includes('Travel Agency Master')){
      openedPagesArray.push({name:'Travel Agency Master', component:<TravelAgencyMaster />});
    };
    if(openedPages.includes('Define Vehicle Type')){
      openedPagesArray.push({name:'Define Vehicle Type', component:<DefineVehicleType />});
    };
    if(openedPages.includes('Define Vehicle Details')){
      openedPagesArray.push({name:'Define Vehicle Details', component:<DefineVehicleDetails />});
    };
    if(openedPages.includes('Define Vehicle Route')){
      openedPagesArray.push({name:'Define Vehicle Route', component:<DefineVehicleRoute />});
    };
    if(openedPages.includes('Define Vehicle Route Relation')){
      openedPagesArray.push({name:'Define Vehicle Route Relation', component:<DefineVehicleRouteRelation />});
    };
    if(openedPages.includes('Define Transport Fare And Group')){
      openedPagesArray.push({name:'Define Transport Fare And Group', component:<DefineTransportFareAndGroup />});
    };
    if(openedPages.includes('Define Transport Medium')){
      openedPagesArray.push({name:'Define Transport Medium', component:<DefineTransportMedium />});
    };
    if(openedPages.includes('Define Route Stop')){
      openedPagesArray.push({name:'Define Route Stop', component:<DefineRouteStop />});
    };
    if(openedPages.includes('Assign Transport to Students')){
      openedPagesArray.push({name:'Assign Transport to Students', component:<AssignTransportToStudents />});
    };
    if(openedPages.includes('Daily Fee Collection')){
      openedPagesArray.push({name:'Daily Fee Collection', component:<DailyFeeCollection />});
    };
    if(openedPages.includes('Receipt Wise Fee Type Collection')){
      openedPagesArray.push({name:'Receipt Wise Fee Type Collection', component:<ReceiptWiseFeeTypeCollection />});
    };
    if(openedPages.includes('Class Wise Student Strength')){
      openedPagesArray.push({name:'Class Wise Student Strength', component:<ClassWiseStudentStrength />});
    };
    if(openedPages.includes('Fee Defaulter List')){
      openedPagesArray.push({name:'Fee Defaulter List', component:<FeeDefaulterList />});
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
    if(openedPages.includes('Student Details')){
      openedPagesArray.push({name:'Student Details', component:<StudentDetails />});
    };

    setOpenedPagesComponents(openedPagesArray);


    // // Setting active year in moment
    // const fetcher = async () => {
    //   const activeYearRes = await fetchActiveAcademicYear();
    //   setMomentDefaultYear(activeYearRes.year_name.split('-')[0]);
    // };
    // fetcher();

  }, [openedPages]);

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