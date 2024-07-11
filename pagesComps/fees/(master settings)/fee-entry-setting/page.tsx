'use client';
// Imports
import {useEffect, useState} from 'react';
import FormCom from '@/components/modules/fees/masterSettings/feeEntrySetting/FormCom';
import ViewCom from '@/components/modules/fees/masterSettings/feeEntrySetting/ViewCom';
import {fetchFeeEntrySettings} from '@/lib/actions/fees/masterSettings/feeEntrySetting.actions';





// Main function
const page = () => {

    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Fee entry settings
    const [feeEntrySettings, setFeeEntrySettings] = useState([{}]);


    // Update fee entry setting
    const [updateFeeEntrySetting, setUpdateFeeEntrySetting] = useState({
        id:'',
        isDeleteClicked:false,
        prefix:'',
        lead_zero:'',
        receipt_no_start:'',
        suffix:'',
        generate_type:'generate-single-receipt'
    });


    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const feeEntrySettingsRes = await fetchFeeEntrySettings();
            setFeeEntrySettings(feeEntrySettingsRes);
        };
        fetcher();
    }, [isViewOpened, updateFeeEntrySetting]);

    return (
        <div className='h-screen flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    <ViewCom
                        feeEntrySettings={feeEntrySettings}
                        setIsViewOpened={setIsViewOpened}
                        setUpdateFeeEntrySetting={setUpdateFeeEntrySetting}
                    />
                    ) : (
                    <FormCom
                        feeEntrySettings={feeEntrySettings}
                        setIsViewOpened={setIsViewOpened}
                        updateFeeEntrySetting={updateFeeEntrySetting}
                        setUpdateFeeEntrySetting={setUpdateFeeEntrySetting}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;