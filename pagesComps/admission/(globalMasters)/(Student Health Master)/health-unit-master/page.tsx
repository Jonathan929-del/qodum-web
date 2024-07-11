'use client';
// Imports
import {useEffect, useState} from 'react';
import {fetchHealthUnits} from '@/lib/actions/admission/globalMasters/studentHealthMaster/healthUnit.actions';
import FormCom from '@/components/modules/admission/globalMasters/studentHealthMaster/healthUnitMaster/FormCom';
import ViewCom from '@/components/modules/admission/globalMasters/studentHealthMaster/healthUnitMaster/ViewCom';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Health Units 
    const [healthUnits, setHealthUnits] = useState([{}]);


    // Update Helth Unit
    const [updateHealthUnit, setUpdateHealthUnit] = useState({
        id:'',
        isDeleteClicked:false,
        unit_name:'',
        unit_type:''
    });

    
    // Use effect
    useEffect(() => {
        const healthUnitsFetcher = async () => {
            const res = await fetchHealthUnits();
            setHealthUnits(res);
        };
        healthUnitsFetcher();
    }, [isViewOpened, updateHealthUnit]);


    return (
        <div className='h-full flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    <ViewCom
                        healthUnits={healthUnits}
                        setIsViewOpened={setIsViewOpened}
                        setUpdateHealthUnit={setUpdateHealthUnit}
                    />
                ) : (
                    <FormCom
                        healthUnits={healthUnits}
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        updateHealthUnit={updateHealthUnit}
                        setUpdateHealthUnit={setUpdateHealthUnit}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;