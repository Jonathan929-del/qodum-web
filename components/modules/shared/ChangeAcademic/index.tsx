'use client';
// Imports
import FormCom from './FormCom';
import {useEffect, useState} from 'react';
import {fetchAcademicYearsNames, fetchFinancialYearsNames, fetchSchoolsNames} from '@/lib/actions/accounts/masterSettings/changeAcademic.actions';





// Main function
const index = () => {


    // Selects data
    const [academicYears, setAcademicYears] = useState(['']);
    const [financialYears, setFinancialYears] = useState(['']);
    const [schoolsNames, setSchoolsNames] = useState(['']);
    const [activeAcademicYear, setActiveAcademicYear] = useState('');
    const [activeFinancialYear, setActiveFinancialYear] = useState('');


    // Use effect
    useEffect(() => {
        const dataFetcher = async () => {
            const financialYearsRes = await fetchFinancialYearsNames();
            const academicYearsRes = await fetchAcademicYearsNames();
            const schoolsNames = await fetchSchoolsNames();
            setFinancialYears(financialYearsRes.yearsNames);
            setAcademicYears(academicYearsRes.yearsNames);
            setSchoolsNames(schoolsNames);
            setActiveAcademicYear(academicYearsRes.activeAcademicYear);
            setActiveFinancialYear(financialYearsRes.activeFinancialYear);
        };
        dataFetcher();
    }, []);


    return (
        <div className='h-full flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            <FormCom
                academicYears={academicYears}
                financialYears={financialYears}
                activeAcademicYear={activeAcademicYear}
                activeFinancialYear={activeFinancialYear}
                schoolsNames={schoolsNames}
            />
        </div>
    );
};





// Export
export default index;