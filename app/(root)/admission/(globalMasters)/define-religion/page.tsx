'use client';
// Imports
import {useEffect, useState} from 'react';
import {fetchHealthMasters} from '@/lib/actions/admission/globalMasters/studentHealthMaster/healthMaster.actions';
import FormCom from '@/components/modules/admission/globalMasters/studentHealthMaster/healthMaster/FormCom';
import ViewCom from '@/components/modules/admission/globalMasters/studentHealthMaster/healthMaster/ViewCom';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Health Masters
    const [healthMasters, setHealthMasters] = useState([{}]);


    // Update Health Master
    const [updateHealthMaster, setUpdateHealthMaster] = useState({
        id:'',
        isDeleteClicked:false,
        health_parameter:'',
        unit:'',
    });

    
    // Use effect
    useEffect(() => {
        const healthMastersFetcher = async () => {

            const res = await fetchHealthMasters();
            setHealthMasters(res);
        };
        healthMastersFetcher();
    }, [isViewOpened, updateHealthMaster]);


    return (
        <div className='h-screen flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    <ViewCom
                        healthMasters={healthMasters}
                        setIsViewOpened={setIsViewOpened}
                        setUpdateHealthMaster={setUpdateHealthMaster}
                    />
                ) : (
                    <FormCom
                        healthMasters={healthMasters}
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        updateHealthMaster={updateHealthMaster}
                        setUpdateHealthMaster={setUpdateHealthMaster}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;