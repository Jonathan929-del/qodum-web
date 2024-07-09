'use client';
// Imports
import {useContext, useEffect, useState} from 'react';
// import {GlobalStateContext} from '@/context/GlobalStateContext';

import Dashboard from '@/pages/admission/page';
// @ts-ignore
import DefineAcademicYear from '@/components/modules/shared/AcademicYear/index';
import DefineFinancialYear from '@/components/modules/shared/FinancialYear/index';
import DefineTCCaste from '@/pages/admission/(globalMasters)/(define tc details)/define-tc-caste/page';
import DefineTermMaster from '@/pages/admission/(globalMasters)/(define tc details)/term-master/page';
import HealthUnitMaster from '@/pages/admission/(globalMasters)/(Student Health Master)/health-unit-master/page';
import HealthMaster from '@/pages/admission/(globalMasters)/(Student Health Master)/health-master/page';
import DefineTerm from '@/pages/admission/(globalMasters)/(Student Health Master)/define-term/page';
import StudnetHealthEntry from '@/pages/admission/(globalMasters)/(Student Health Master)/student-health-entry/page';
import DefineBloodGroup from '@/pages/admission/(globalMasters)/define-blood-group/page';
import DefineRemark from '@/pages/admission/(globalMasters)/define-remark/page';
import DefineCategory from '@/pages/admission/(globalMasters)/define-category/page';
import DefineReligion from '@/pages/admission/(globalMasters)/define-religion/page';
import DefineCaste from '@/pages/admission/(globalMasters)/define-caste/page';
import PossibleSiblings from '@/pages/admission/(globalMasters)/possible-siblings/page';
import StationaryDetails from '@/pages/admission/(globalMasters)/stationary-details/page';
import DefineParish from '@/pages/admission/(globalMasters)/define-parish/page';
import DefineHouse from '@/pages/admission/(globalMasters)/define-house/page';
import DefineStream from '@/pages/admission/(globalMasters)/define-stream/page';
import DefineSubject from '@/pages/admission/(globalMasters)/define-subject/page';
import DefineOptionalSubject from '@/pages/admission/(globalMasters)/define-optional-subject/page';
import DefineDocumentType from '@/pages/admission/(globalMasters)/define-document-type/page';
import ImportStudent from '@/pages/admission/(globalMasters)/import-student/page';
import ChangeAcademic from '@/pages/admission/(masterSettings)/change-academic/page';
import EnquiryNoSetting from '@/pages/admission/(masterSettings)/enquiry-no-setting/page';
import AdmissionSetting from '@/pages/admission/(masterSettings)/admission-setting/page';
import StudentClassPromotion from '@/pages/admission/(masterSettings)/student-class-promotion/page';
import UpdateStudentDetails from '@/pages/admission/(masterSettings)/update-student-details/page';
import ReportLayoutSetting from '@/pages/admission/(masterSettings)/report-layout-setting/page';
import SessionTransfer from '@/pages/fees/(master settings)/session-transfer/page';
import Enquiry from '@/pages/admission/(admission)/enquiry/page';
import AdmissionFormRegistration from '@/pages/admission/(admission)/admission-form-registration/page';
import DefineMeritCriteria from '@/pages/admission/(admission)/(entrance test)/define-merit-criteria/page';
import SlotCreation from '@/pages/admission/(admission)/(entrance test)/slot-creation/page';
import ManualListGeneration from '@/pages/admission/(admission)/(entrance test)/manual-list-generation/page';
import Admission from '@/pages/admission/(admission)/admission/page';
import CreateIDCard from '@/pages/admission/(admission)/create-id-card/page';
import SendSMS from '@/pages/admission/(admission)/send-sms/page';





// Main function
const Home = () => {

  // Current page
  // const {currentPage, setCurrentPage, openedPages} = useContext(GlobalStateContext);
  const [currentPage, setCurrentPage] = useState('');
  const openedPages = [];
  
  
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