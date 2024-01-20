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
        enquiry_date:{
            year:'',
            month:'',
            day:''
        },
        visitor_name:'',
        visitor_address:'',
        mobile_no:'',
        purpose:'',
        contact_person:'',
        reference_details:''
    });

    
    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const res = await fetchEnquiries();
            setEnquiries(res);
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
                    />
                )
            }
        </div>
    );
};





// Export
export default page;