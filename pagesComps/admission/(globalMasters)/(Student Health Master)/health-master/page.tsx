'use client';
// Imports
import {useEffect, useState} from 'react';
import FormCom from '@/components/modules/admission/globalMasters/studentHealthMaster/healthMaster/FormCom';
import ViewCom from '@/components/modules/admission/globalMasters/studentHealthMaster/healthMaster/ViewCom';
import {fetchHealthUnits} from '@/lib/actions/admission/globalMasters/studentHealthMaster/healthUnit.actions';
import {fetchHealthMasters} from '@/lib/actions/admission/globalMasters/studentHealthMaster/healthMaster.actions';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Health Masters
    const [healthMasters, setHealthMasters] = useState([{}]);


    // Health units
    const [healthUnits, setHealthUnits] = useState(['']);


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

            const healthMasterRes = await fetchHealthMasters();
            const healthUnitsRes = await fetchHealthUnits();
            setHealthMasters(healthMasterRes);
            setHealthUnits(healthUnitsRes.map(u => u.unit_name));
        };
        healthMastersFetcher();
    }, [isViewOpened, updateHealthMaster]);


    return (
        <div className='h-full flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    <ViewCom
                        healthMasters={healthMasters}
                        setIsViewOpened={setIsViewOpened}
                        setUpdateHealthMaster={setUpdateHealthMaster}
                    />
                ) : (
                    <FormCom
                        healthUnits={healthUnits}
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