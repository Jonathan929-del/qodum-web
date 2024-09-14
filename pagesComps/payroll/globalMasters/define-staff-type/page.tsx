'use client';
// Imports
import {useEffect, useState} from 'react';
import {fetchStaffTypes} from '@/lib/actions/payroll/globalMasters/staffType.actions';
import FormCom from '@/components/modules/payroll/globalMasters/defineStaffType/FormCom';
import ViewCom from '@/components/modules/payroll/globalMasters/defineStaffType/ViewCom';





// Main function
const page = () => {

    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Staff types
    const [staffTypes, setStaffTypes] = useState([{}]);


    // Update staff type
    const [updateStaffType, setUpdateStaffType] = useState({
        id:'',
        isDeleteClicked:false,
        staff_type:'',
        is_hourly_paid:false,
        show_on_ecare:false
    });

    
    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const res = await fetchStaffTypes();
            setStaffTypes(res);
        };
        fetcher();
    }, [isViewOpened, updateStaffType]);

    return (
        <div className='h-full flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    <ViewCom
                        staffTypes={staffTypes}
                        setIsViewOpened={setIsViewOpened}
                        setUpdateStaffType={setUpdateStaffType}
                    />
                ) : (
                    <FormCom
                        staffTypes={staffTypes}
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        updateStaffType={updateStaffType}
                        setUpdateStaffType={setUpdateStaffType}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;