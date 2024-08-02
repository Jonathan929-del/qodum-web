'use client';
// Imports
import {useEffect, useState} from 'react';
import {fetchAdmissions} from '@/lib/actions/admission/masterSettings/admission.actions';
import FormCom from '@/components/modules/admission/masterSettings/admissionSetting/FormCom';
import ViewCom from '@/components/modules/admission/masterSettings/admissionSetting/ViewCom';
import FormComTwo from '@/components/modules/admission/masterSettings/admissionSetting/FormComTwo';





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
        <div className='flex flex-col items-center justify-start pt-10 bg-white'>
            {
                isViewOpened ? (
                    <ViewCom
                        admissions={admissions}
                        setUpdateAdmission={setUpdateAdmission}
                        setIsViewOpened={setIsViewOpened}
                    />
                ) : (
                    <div className='w-[90%] h-[90%] max-w-[1000px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%] mb-[100px] overflow-hidden'>
                        <FormComTwo/>
                        <FormCom
                            admissions={admissions}
                            isViewOpened={isViewOpened}
                            setIsViewOpened={setIsViewOpened}
                            updateAdmission={updateAdmission}
                            setUpdateAdmission={setUpdateAdmission}
                        />
                    </div>
                )
            }
        </div>
    );
};





// Export
export default page;