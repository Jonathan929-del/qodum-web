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

    if(openedPages.length === 0){
      setCurrentPage('');
      setOpenedPagesComponents([{name:'Dashboard', component:(
        <div className='h-full overflow-y-scroll custom-sidebar-scrollbar'>
          <Dashboard />
        </div>
      )}]);
    };
    if(openedPages.includes('Define School Board')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Define School Board', component:<DefineSchoolBoard />}]);
    };
    if(openedPages.includes('School Global Details')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'School Global Details', component:<SchoolGlobalDetails />}]);
    };
    if(openedPages.includes('Define Academic Year')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Define Academic Year', component:<DefineAcademicYear />}]);
    };
    if(openedPages.includes('Define Financial Year')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Define Financial Year', component:<DefineFinancialYear />}]);
    };
    if(openedPages.includes('Define Wing')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Define Wing', component:<DefineWing />}]);
    };
    if(openedPages.includes('Define Class')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Define Class', component:<DefineClass />}]);
    };
    if(openedPages.includes('Define Section')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Define Section', component:<DefineSection />}]);
    };
    if(openedPages.includes('Relate Class Section')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Relate Class Section', component:<RelateClassSection />}]);
    };
    if(openedPages.includes('Change Academic')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Change Academic', component:<ChangeAcademic />}]);
    };
    if(openedPages.includes('Fee Entry Setting')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Fee Entry Setting', component:<FeeEntrySetting />}]);
    };
    if(openedPages.includes('Fee Entry Setting Others')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Fee Entry Setting Others', component:<FeeEntrySettingOthers />}]);
    };
    if(openedPages.includes('Set Due Limit')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Set Due Limit', component:<SetDueLimit />}]);
    };
    if(openedPages.includes('Fee Opening Balance Setting')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Fee Opening Balance Setting', component:<FeeOpeningBalanceSetting />}]);
    };
    if(openedPages.includes('Bus ID Setting')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Bus ID Setting', component:<BusIDSetting />}]);
    };
    if(openedPages.includes('Report Layout Setting')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Report Layout Setting', component:<ReportLayoutSetting />}]);
    };
    if(openedPages.includes('Session Transfer')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Session Transfer', component:<SessionTransfer />}]);
    };
    if(openedPages.includes('Define Fee Installment')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Define Fee Installment', component:<DefineFeeInstallment />}]);
    };
    if(openedPages.includes('Define Fee Head')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Define Fee Head', component:<DefineFeeHead />}]);
    };
    if(openedPages.includes('Define Fee Type')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Define Fee Type', component:<DefineFeeType />}]);
    };
    if(openedPages.includes('Define Fee Group')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Define Fee Group', component:<DefineFeeGroup />}]);
    };
    if(openedPages.includes('Assign Fee Group to Fee Head')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Assign Fee Group to Fee Head', component:<AssignFeeGroupToFeeHead />}]);
    };
    if(openedPages.includes('Assign Amount Group')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Assign Amount Group', component:<AssignAmountGroup />}]);
    };
    if(openedPages.includes('Assign Multiple Group to Student')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Assign Multiple Group to Student', component:<AssignMultipleGroupToStudent />}]);
    };
    if(openedPages.includes('Define Concession')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Define Concession', component:<DefineConcession />}]);
    };
    if(openedPages.includes('Define Concession Type')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Define Concession Type', component:<DefineConcessionType />}]);
    };
    if(openedPages.includes('Assign Concession')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Assign Concession', component:<AssignConcession />}]);
    };
    if(openedPages.includes('Set Student Status')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Set Student Status', component:<SetStudentStatus />}]);
    };
    if(openedPages.includes('Late Fee Setting')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Late Fee Setting', component:<LateFeeSetting />}]);
    };
    if(openedPages.includes('Late Fee Setting Head Wise')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Late Fee Setting Head Wise', component:<LateFeeSettingHeadWise />}]);
    };
    if(openedPages.includes('Fee Entry')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Fee Entry', component:<FeeEntry />}]);
    };
    if(openedPages.includes('Print Fee Receipt & Certificate')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Print Fee Receipt & Certificate', component:<PrintFeeReceiptAndCertificate />}]);
    };
    if(openedPages.includes('Modify Fees Receipt')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Modify Fees Receipt', component:<ModifyFeesReceipt />}]);
    };
    if(openedPages.includes('Cancel Fees Receipt')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Cancel Fees Receipt', component:<CancelFeesReceipt />}]);
    };
    if(openedPages.includes('Delete Fees Receipt')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Delete Fees Receipt', component:<DeleteFeesReceipt />}]);
    };
    if(openedPages.includes('Travel Agency Master')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Travel Agency Master', component:<TravelAgencyMaster />}]);
    };
    if(openedPages.includes('Define Vehicle Type')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Define Vehicle Type', component:<DefineVehicleType />}]);
    };
    if(openedPages.includes('Define Vehicle Details')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Define Vehicle Details', component:<DefineVehicleDetails />}]);
    };
    if(openedPages.includes('Define Vehicle Route')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Define Vehicle Route', component:<DefineVehicleRoute />}]);
    };
    if(openedPages.includes('Define Vehicle Route Relation')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Define Vehicle Route Relation', component:<DefineVehicleRouteRelation />}]);
    };
    if(openedPages.includes('Define Transport Fare And Group')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Define Transport Fare And Group', component:<DefineTransportFareAndGroup />}]);
    };
    if(openedPages.includes('Define Transport Medium')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Define Transport Medium', component:<DefineTransportMedium />}]);
    };
    if(openedPages.includes('Define Route Stop')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Define Route Stop', component:<DefineRouteStop />}]);
    };
    if(openedPages.includes('Assign Transport to Students')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Assign Transport to Students', component:<AssignTransportToStudents />}]);
    };
    if(openedPages.includes('Daily Fee Collection')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Daily Fee Collection', component:<DailyFeeCollection />}]);
    };
    if(openedPages.includes('Receipt Wise Fee Type Collection')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Receipt Wise Fee Type Collection', component:<ReceiptWiseFeeTypeCollection />}]);
    };
    if(openedPages.includes('Class Wise Studnet Strength')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Class Wise Studnet Strength', component:<ClassWiseStudentStrength />}]);
    };
    if(openedPages.includes('Account Manager Session Transfer')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Account Manager Session Transfer', component:<AccountSessionTransfer />}]);
    };
    if(openedPages.includes('Fee Manager Session Transfer')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Fee Manager Session Transfer', component:<FeeSessionTransfer />}]);
    };
    if(openedPages.includes('Payroll Manager Session Transfer')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Payroll Manager Session Transfer', component:<PayrollSessionTransfer />}]);
    };
    if(openedPages.includes('Admission Manager Session Transfer')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Admission Manager Session Transfer', component:<AdmissionSessionTransfer />}]);
    };

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