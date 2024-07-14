'use client';
// Imports
import moment from 'moment';
import {useContext, useEffect, useState} from 'react';
import {GlobalStateContext} from '@/context/GlobalStateContext';

import Dashboard from '@/pagesComps/admission/page';
// @ts-ignore
import DefineAcademicYear from '@/components/modules/shared/AcademicYear/index';
import DefineFinancialYear from '@/components/modules/shared/FinancialYear/index';
import DefineTCCaste from '@/pagesComps/admission/(globalMasters)/(define tc details)/define-tc-caste/page';
import DefineTermMaster from '@/pagesComps/admission/(globalMasters)/(define tc details)/term-master/page';
import HealthUnitMaster from '@/pagesComps/admission/(globalMasters)/(Student Health Master)/health-unit-master/page';
import HealthMaster from '@/pagesComps/admission/(globalMasters)/(Student Health Master)/health-master/page';
import DefineTerm from '@/pagesComps/admission/(globalMasters)/(Student Health Master)/define-term/page';
import StudnetHealthEntry from '@/pagesComps/admission/(globalMasters)/(Student Health Master)/student-health-entry/page';
import DefineBloodGroup from '@/pagesComps/admission/(globalMasters)/define-blood-group/page';
import DefineRemark from '@/pagesComps/admission/(globalMasters)/define-remark/page';
import DefineCategory from '@/pagesComps/admission/(globalMasters)/define-category/page';
import DefineReligion from '@/pagesComps/admission/(globalMasters)/define-religion/page';
import DefineCaste from '@/pagesComps/admission/(globalMasters)/define-caste/page';
import PossibleSiblings from '@/pagesComps/admission/(globalMasters)/possible-siblings/page';
import StationaryDetails from '@/pagesComps/admission/(globalMasters)/stationary-details/page';
import DefineParish from '@/pagesComps/admission/(globalMasters)/define-parish/page';
import DefineHouse from '@/pagesComps/admission/(globalMasters)/define-house/page';
import DefineStream from '@/pagesComps/admission/(globalMasters)/define-stream/page';
import DefineSubject from '@/pagesComps/admission/(globalMasters)/define-subject/page';
import DefineOptionalSubject from '@/pagesComps/admission/(globalMasters)/define-optional-subject/page';
import DefineDocumentType from '@/pagesComps/admission/(globalMasters)/define-document-type/page';
import ImportStudent from '@/pagesComps/admission/(globalMasters)/import-student/page';
import ChangeAcademic from '@/pagesComps/admission/(masterSettings)/change-academic/page';
import EnquiryNoSetting from '@/pagesComps/admission/(masterSettings)/enquiry-no-setting/page';
import AdmissionSetting from '@/pagesComps/admission/(masterSettings)/admission-setting/page';
import StudentClassPromotion from '@/pagesComps/admission/(masterSettings)/student-class-promotion/page';
import UpdateStudentDetails from '@/pagesComps/admission/(masterSettings)/update-student-details/page';
import ReportLayoutSetting from '@/pagesComps/admission/(masterSettings)/report-layout-setting/page';
import SessionTransfer from '@/pagesComps/fees/(master settings)/session-transfer/page';
import Enquiry from '@/pagesComps/admission/(admission)/enquiry/page';
import AdmissionFormRegistration from '@/pagesComps/admission/(admission)/admission-form-registration/page';
import DefineMeritCriteria from '@/pagesComps/admission/(admission)/(entrance test)/define-merit-criteria/page';
import SlotCreation from '@/pagesComps/admission/(admission)/(entrance test)/slot-creation/page';
import ManualListGeneration from '@/pagesComps/admission/(admission)/(entrance test)/manual-list-generation/page';
import Admission from '@/pagesComps/admission/(admission)/admission/page';
import CreateIDCard from '@/pagesComps/admission/(admission)/create-id-card/page';
import SendSMS from '@/pagesComps/admission/(admission)/send-sms/page';
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
    if(openedPages.includes('Define Academic Year')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Define Academic Year', component:<DefineAcademicYear />}]);
    };
    if(openedPages.includes('Define Financial Year')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Define Financial Year', component:<DefineFinancialYear />}]);
    };
    if(openedPages.includes('Define TC Caste')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Define Financial Year', component:<DefineTCCaste />}]);
    };
    if(openedPages.includes('Define Term Master')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Define Term Master', component:<DefineTermMaster />}]);
    };
    if(openedPages.includes('Health Unit Master')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Health Unit Master', component:<HealthUnitMaster />}]);
    };
    if(openedPages.includes('Health Master')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Health Master', component:<HealthMaster />}]);
    };
    if(openedPages.includes('Define Term')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Define Term', component:<DefineTerm />}]);
    };
    if(openedPages.includes('Student Health Entry')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Student Health Entry', component:<StudnetHealthEntry />}]);
    };
    if(openedPages.includes('Define Blood Group')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Define Blood Group', component:<DefineBloodGroup />}]);
    };
    if(openedPages.includes('Define Blood Group')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Define Blood Group', component:<DefineBloodGroup />}]);
    };
    if(openedPages.includes('Define Remark')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Define Remark', component:<DefineRemark />}]);
    };
    if(openedPages.includes('Define Category')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Define Category', component:<DefineCategory />}]);
    };
    if(openedPages.includes('Define Religion')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Define Religion', component:<DefineReligion />}]);
    };
    if(openedPages.includes('Define Caste')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Define Caste', component:<DefineCaste />}]);
    };
    if(openedPages.includes('Possible Siblings')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Possible Siblings', component:<PossibleSiblings />}]);
    };
    if(openedPages.includes('Stationary Details')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Stationary Details', component:<StationaryDetails />}]);
    };
    if(openedPages.includes('Define Parish')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Define Parish', component:<DefineParish />}]);
    };
    if(openedPages.includes('Define House')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Define House', component:<DefineHouse />}]);
    };
    if(openedPages.includes('Define Stream')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Define Stream', component:<DefineStream />}]);
    };
    if(openedPages.includes('Define Subject')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Define Subject', component:<DefineSubject />}]);
    };
    if(openedPages.includes('Define Optional Subject')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Define Optional Subject', component:<DefineOptionalSubject />}]);
    };
    if(openedPages.includes('Define Document Type')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Define Document Type', component:<DefineDocumentType />}]);
    };
    if(openedPages.includes('Import Student')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Import Student', component:<ImportStudent />}]);
    };
    if(openedPages.includes('Change Academic')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Change Academic', component:<ChangeAcademic />}]);
    };
    if(openedPages.includes('Enquiry No Setting')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Enquiry No Setting', component:<EnquiryNoSetting />}]);
    };
    if(openedPages.includes('Admission Setting')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Admission Setting', component:<AdmissionSetting />}]);
    };
    if(openedPages.includes('Student Class Promotion')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Student Class Promotion', component:<StudentClassPromotion />}]);
    };
    if(openedPages.includes('Update Student Details')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Update Student Details', component:<UpdateStudentDetails />}]);
    };
    if(openedPages.includes('Report Layout Setting')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Report Layout Setting', component:<ReportLayoutSetting />}]);
    };
    if(openedPages.includes('Session Transfer')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Session Transfer', component:<SessionTransfer />}]);
    };
    if(openedPages.includes('Enquiry')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Enquiry', component:<Enquiry />}]);
    };
    if(openedPages.includes('Admission Form Registration')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Admission Form Registration', component:<AdmissionFormRegistration />}]);
    };
    if(openedPages.includes('Define Merit Criteria')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Define Merit Criteria', component:<DefineMeritCriteria />}]);
    };
    if(openedPages.includes('Slot Creation')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Slot Creation', component:<SlotCreation />}]);
    };
    if(openedPages.includes('Manual List Generation')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Manual List Generation', component:<ManualListGeneration />}]);
    };
    if(openedPages.includes('Admission')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Admission', component:<Admission />}]);
    };
    if(openedPages.includes('Create ID Card')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Create ID Card', component:<CreateIDCard />}]);
    };
    if(openedPages.includes('Send SMS')){
      setOpenedPagesComponents([...openedPagesComponents, {name:'Send SMS', component:<SendSMS />}]);
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