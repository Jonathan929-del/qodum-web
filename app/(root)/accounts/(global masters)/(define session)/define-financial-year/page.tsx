'use client';
// Imports
import {useEffect, useState} from 'react';
import FormCom from '@/components/modules/accounts/globalMasters/defineSession/defineFinancialYear/FormCom';
import ViewCom from '@/components/modules/accounts/globalMasters/defineSession/defineFinancialYear/ViewCom';
import {fetchFinancialYears} from '@/lib/actions/accounts/globalMasters/defineSession/defineFinancialYear.actions';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Financial Years
    const [financialYears, setFinancialYears] = useState([{}]);


    // Update financial year
    const [updateFinancialYear, setUpdateFinancialYear] = useState({
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
        const financialYearsFetcher = async () => {
            const res:any = await fetchFinancialYears();
            setFinancialYears(res);
        };
        financialYearsFetcher();
    }, [isViewOpened, updateFinancialYear]);


    return (
        <div className='h-screen flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    <ViewCom
                        financialYears={financialYears}
                        setIsViewOpened={setIsViewOpened}
                        setUpdateFinancialYear={setUpdateFinancialYear}
                    />
                ) : (
                    <FormCom
                        financialYears={financialYears}
                        setIsViewOpened={setIsViewOpened}
                        updateFinancialYear={updateFinancialYear}
                        setUpdateFinancialYear={setUpdateFinancialYear}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;