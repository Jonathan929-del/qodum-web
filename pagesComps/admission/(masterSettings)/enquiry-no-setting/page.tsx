'use client';
// Imports
import {useEffect, useState} from 'react';
import FormCom from '@/components/modules/admission/masterSettings/enquiryNoSetting/FormCom';
import ViewCom from '@/components/modules/admission/masterSettings/enquiryNoSetting/ViewCom';
import {fetchEnquiryNoSettings, isEnquiryNumberEditable} from '@/lib/actions/admission/masterSettings/enquiryNoSetting.actions';





// Main function
const index = () => {

    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Enquiry no settings
    const [enquiryNoSettings, setEnquiryNoSettings] = useState([{}]);


    // Is enquiry number editable
    const [isEnquiryNoEditable, setIsEnquiryNoEditable] = useState(true);


    // Update enquiry no setting
    const [updateEnquiryNoSetting, setUpdateEnquiryNoSetting] = useState({
        id:'',
        isDeleteClicked:false,
        session:'',
        enquiry_no_setting_should_be:'Automatic',
        prefix:'',
        start_from:'',
        lead_zero:0,
        suffix:''
    });

    
    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const res = await fetchEnquiryNoSettings();
            const isEnquiryEditableRes = await isEnquiryNumberEditable();
            setEnquiryNoSettings(res);
            setIsEnquiryNoEditable(isEnquiryEditableRes === 1);
        };
        fetcher();
    }, [isViewOpened, updateEnquiryNoSetting]);

    return (
        <div className='h-full flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    <ViewCom
                        setIsViewOpened={setIsViewOpened}
                        enquiryNoSettings={enquiryNoSettings}
                        setUpdateEnquiryNoSetting={setUpdateEnquiryNoSetting}
                    />
                ) : (
                    <FormCom
                        isEnquiryNoEditable={isEnquiryNoEditable}
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        enquiryNoSettings={enquiryNoSettings}
                        updateEnquiryNoSetting={updateEnquiryNoSetting}
                        setUpdateEnquiryNoSetting={setUpdateEnquiryNoSetting}
                    />
                )
            }
        </div>
    );
};





// Export
export default index;