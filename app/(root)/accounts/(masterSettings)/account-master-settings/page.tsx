'use client';
// Imports
import {useEffect, useState} from 'react';
import FormCom from '@/components/modules/accounts/masterSettings/changeAcademic/FormCom';
import {fetchAcademicYearsNames, fetchFinancialYearsNames, fetchSchoolsNames} from '@/lib/actions/accounts/masterSettings/changeAcademic.actions';





// Main function
const page = () => {


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
        <div className='h-screen flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
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
export default page;