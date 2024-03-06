'use client';
// Imports
import {useEffect, useState} from 'react';
import FormCom from '@/components/modules/admission/admission/enquiry/FormCom';
import ViewCom from '@/components/modules/admission/admission/enquiry/ViewCom';
import {fetchEnquiries} from '@/lib/actions/admission/admission/enquiry.actions';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Enquiries
    const [enquiries, setEnquiries] = useState([{}]);


    // Update enquiry
    const [updateEnquiry, setUpdateEnquiry] = useState({
        id:'',
        isDeleteClicked:false,
        enquiry_no:'',
        enquiry_date:new Date(),
        visitor_name:'',
        visitor_address:'',
        mobile_no:'',
        purpose_is_admission:false,
        student_name:'',
        class_name:'',
        reason_to_visit:'',
        contact_person:'',
        reference_details:''
    });


    // Enquiry no
    const [enquiryNo, setEnquiryNo] = useState<any>();

    
    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const res = await fetchEnquiries();
            setEnquiries(res);
            // @ts-ignore
            const number = `${localStorage.getItem('prefix')}${localStorage.getItem('lead_zero').substring(0, localStorage.getItem('lead_zero').length - 1)}${res.length + 1}${localStorage.getItem('suffix')}`;
            if(updateEnquiry.id !== ''){
                setEnquiryNo(updateEnquiry.enquiry_no);
            }else{
                setEnquiryNo(localStorage.getItem('setting_type') === 'Automatic' ? number : updateEnquiry.id === '' ? '' : updateEnquiry.enquiry_no);
            };
        };
        fetcher();
    }, [isViewOpened, updateEnquiry]);


    return (
        <div className='h-screen flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    <ViewCom
                        setIsViewOpened={setIsViewOpened}
                        enquiries={enquiries}
                        setUpdateEnquiry={setUpdateEnquiry}
                    />
                ) : (
                    <FormCom
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        enquiries={enquiries}
                        updateEnquiry={updateEnquiry}
                        setUpdateEnquiry={setUpdateEnquiry}
                        enquiryNo={enquiryNo}
                        setEnquiryNo={setEnquiryNo}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;