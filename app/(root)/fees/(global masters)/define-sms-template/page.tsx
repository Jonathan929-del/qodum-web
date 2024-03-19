'use client';
// Imports
import {useEffect, useState} from 'react';
import {fetchSmsTemplates} from '@/lib/actions/fees/globalMasters/smsTemplate.actions';
import FormCom from '@/components/modules/fees/globalMasters/defineSmsTemplate/FormCom';
import ViewCom from '@/components/modules/fees/globalMasters/defineSmsTemplate/ViewCom';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Transport mediums
    const [smsTemplates, setSmsTemplates] = useState([{}]);


    // Update sms template
    const [updateSmsTemplate, setUpdateSmsTemplate] = useState({
        id:'',
        isDeleteClicked:false,
        sms_type:'',
        sms_template:'',
        is_enable:false
    });


    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const res = await fetchSmsTemplates();
            setSmsTemplates(res);
        };
        fetcher();
    }, [isViewOpened, updateSmsTemplate]);


    return (
        <div className='h-screen flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    <ViewCom
                        setIsViewOpened={setIsViewOpened}
                        smsTemplates={smsTemplates}
                        setUpdateSmsTemplate={setUpdateSmsTemplate}
                    />
                ) : (
                    <FormCom
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        smsTemplates={smsTemplates}
                        updateSmsTemplate={updateSmsTemplate}
                        setUpdateSmsTemplate={setUpdateSmsTemplate}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;