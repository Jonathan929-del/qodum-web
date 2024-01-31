'use client';
// Imports
import {useEffect, useState} from 'react';
import {fetchAdmissions} from '@/lib/actions/admission/masterSettings/admission.actions';
import FormCom from '@/components/modules/admission/masterSettings/admissionSetting/FormCom';
import ViewCom from '@/components/modules/admission/masterSettings/admissionSetting/ViewCom';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Admissions
    const [admissions, setAdmissions] = useState([{}]);


    // Update admission
    const [updateAdmission, setUpdateAdmission] = useState({
        id:'',
        isDeleteClicked:false,
        school:'',
        class_name:'',
        board:'',
        setting_type:'',
        should_be:'Automatic',
        rec_no:'',
        prefix:'',
        start_from:'',
        lead_zero:'',
        suffix:''
    });

    
    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const res = await fetchAdmissions();
            setAdmissions(res);
        };
        fetcher();
    }, [isViewOpened, updateAdmission]);


    return (
        <div className='h-screen flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    <ViewCom
                        admissions={admissions}
                        setUpdateAdmission={setUpdateAdmission}
                        setIsViewOpened={setIsViewOpened}
                    />
                ) : (
                    <FormCom
                        admissions={admissions}
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        updateAdmission={updateAdmission}
                        setUpdateAdmission={setUpdateAdmission}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;