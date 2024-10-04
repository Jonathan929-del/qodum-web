'use client';
// Imports
import ViewCom from './ViewCom';
import FormCom from './FormCom';
import {AuthContext} from '@/context/AuthContext';
import {useContext, useEffect, useState} from 'react';
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
            const res = await fetchAcademicYears();
            setAcademicYears(res);
        };
        academicYearsFetcher();
    }, [isViewOpened, updateAcademicYear]);

    return (
        <div className='relative h-full flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>

            <div className={`absolute flex items-start justify-center w-full h-full bg-[#fff] ${isViewOpened ? 'z-10' : 'z-0'}`}>
                <ViewCom
                    academicYears={academicYears}
                    setIsViewOpened={setIsViewOpened}
                    setUpdateAcademicYear={setUpdateAcademicYear}
                />
            </div>
            <div className={`absolute flex items-start justify-center w-full h-full bg-[#fff] ${isViewOpened ? 'z-0' : 'z-10'}`}>
                <FormCom
                    academicYears={academicYears}
                    setIsViewOpened={setIsViewOpened}
                    updateAcademicYear={updateAcademicYear}
                    setUpdateAcademicYear={setUpdateAcademicYear}
                />
            </div>
        </div>
    );
};





// Export
export default page;