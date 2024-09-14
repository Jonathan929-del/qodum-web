'use client';
// Imports
import {useEffect, useState} from 'react';
import FormCom from '@/components/modules/payroll/globalMasters/defineDepartment/FormCom';
import ViewCom from '@/components/modules/payroll/globalMasters/defineDepartment/ViewCom';
import {fetchDepartments} from '@/lib/actions/payroll/globalMasters/department.actions';





// Main function
const page = () => {

    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Departments
    const [departments, setDepartments] = useState([{}]);


    // Update department
    const [updateDepartment, setUpdateDepartment] = useState({
        id:'',
        isDeleteClicked:false,
        department:''
    });

    
    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const res = await fetchDepartments();
            setDepartments(res);
        };
        fetcher();
    }, [isViewOpened, updateDepartment]);

    return (
        <div className='h-full flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    <ViewCom
                        departments={departments}
                        setIsViewOpened={setIsViewOpened}
                        setUpdateDepartment={setUpdateDepartment}
                    />
                ) : (
                    <FormCom
                        departments={departments}
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        updateDepartment={updateDepartment}
                        setUpdateDepartment={setUpdateDepartment}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;