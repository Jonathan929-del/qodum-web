'use client';
// Imports
import ViewCom from './ViewCom';
import FormCom from './FormCom';
import {useEffect, useState} from 'react';
import {fetchAcademicYears} from '@/lib/actions/accounts/globalMasters/defineSession/defineAcademicYear.actions';





// Main function
const page = () => {

    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Academic Years
    const [academicYears, setAcademicYears] = useState([{}]);


    // Update academic year
    const [updateAcademicYear, setUpdateAcademicYear] = useState({
        year_name:'',
        start_date:{
            day:'',
            month:'',
            year:''
        },
        end_date:{
            day:'',
            month:'',
            year:''
        },
        is_active:false,
        id:'',
        isDeleteClicked:false,
    });

    
    // Use effect
    useEffect(() => {
        const academicYearsFetcher = async () => {
            const res:any = await fetchAcademicYears();
            setAcademicYears(res);
        };
        academicYearsFetcher();
    }, [isViewOpened, updateAcademicYear]);


    return (
        <div className='h-screen flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    <ViewCom
                        academicYears={academicYears}
                        setIsViewOpened={setIsViewOpened}
                        setUpdateAcademicYear={setUpdateAcademicYear}
                    />
                ) : (
                    <FormCom
                        academicYears={academicYears}
                        setIsViewOpened={setIsViewOpened}
                        updateAcademicYear={updateAcademicYear}
                        setUpdateAcademicYear={setUpdateAcademicYear}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;