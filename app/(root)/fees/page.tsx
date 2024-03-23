'use client';
// Imports
import {useEffect, useState} from 'react';
import LoadingIcon from '@/components/utils/LoadingIcon';
import BarCom from '@/components/dashboards/shared/BarCom';
import {feeDefaultersBarData} from '@/constants/charts/feesChars';
import {fetchPayments} from '@/lib/actions/fees/manageFee/payment.actions';
import FeesCardsOne from '@/components/dashboards/feesDashboard/FeesCardsOne';
import CollectionSummary from '@/components/dashboards/feesDashboard/CollectionSummary';
import PaymodeSummaryCard from '@/components/dashboards/feesDashboard/PaymodeSummaryCard';
import EstimatedCollection from '@/components/dashboards/feesDashboard/EstimatedCollection';
import {fetchAdmittedStudents} from '@/lib/actions/admission/admission/admittedStudent.actions';
import RecentTransactionsCard from '@/components/dashboards/feesDashboard/RecentTransactionsCard';
import {fetchAcademicYears} from '@/lib/actions/accounts/globalMasters/defineSession/defineAcademicYear.actions';
import TransactionHistoryOfLast30Days from '@/components/dashboards/feesDashboard/TransactionHistoryOfLast30Days';
import { fetchClasses } from '@/lib/actions/fees/globalMasters/defineClassDetails/class.actions';






// Main function
const page = () => {


    // Is loading
    const [isLoading, setIsLoading] = useState(true);


    // Students
    const [students, setStudents] = useState<any>([]);
    const [boys, setBoys] = useState<any>();
    const [girls, setGirls] = useState<any>();


    // Academic years
    const [academicYear, setAcademicYear] = useState('');


    // Payments
    const [payments, setPayments] = useState<any>([]);


    // Classes
    const [classes, setClasses] = useState<any>([]);


    // Total number generator
    const totalNumberGenerator = (array:any) => {
        let sum = 0;
        for (let i = 0; i < array?.length; i++ ) {sum += array[i];};
        return sum;
    };


    // Use effect
    useEffect(() => {
        const fetcher = async () => {

            // Fetching
            const studentsRes = await fetchAdmittedStudents();
            const academicYearsRes = await fetchAcademicYears();
            const paymentsRes = await fetchPayments();
            const classesRes = await fetchClasses();

            // Setting
            setStudents(studentsRes);
            setBoys(studentsRes.filter((s:any) => s.student.gender === 'Male').length);
            setGirls(studentsRes.filter((s:any) => s.student.gender === 'Female').length);
            setAcademicYear(academicYearsRes[0]?.year_name);
            setPayments(paymentsRes);
            setClasses(classesRes);


            // Loading done
            setIsLoading(false);
        };
        fetcher();
    }, []);


    return (
        <section className='flex flex-col w-full px-4 py-2 gap-4'>
            {isLoading ? (
                <div className='w-full h-full flex items-center justify-center'>
                    <LoadingIcon />
                </div>
            ) : (
                <>                
                    {/* Cards Group One */}
                    <FeesCardsOne
                        students={students}
                        boys={boys}
                        girls={girls}
                        academicYear={academicYear}
                        totalNumberGenerator={totalNumberGenerator}
                    />
        
        
                    {/* Paymode Summary */}
                    <PaymodeSummaryCard
                        totalNumberGenerator={totalNumberGenerator}
                        payments={payments}
                    />
        
        
                    {/* Transactions History */}
                    <div>
                        <TransactionHistoryOfLast30Days
                            paymentsRes={payments}
                            totalNumberGenerator={totalNumberGenerator}
                        />
                    </div>
        
        
                    {/* Estimated collection and recent transactions */}
                    <div className='flex flex-col gap-4 lg:flex-row'>
                        <div className='w-full xl:w-2/3'>
                            <EstimatedCollection
                                students={students}
                                totalNumberGenerator={totalNumberGenerator}
                            />
                        </div>
                        <div className='w-full xl:w-1/3'>
                            <RecentTransactionsCard
                                payments={payments}
                                students={students}
                            />
                        </div>
                    </div>
        
        
                    {/* Collection Summary Bar */}
                    <CollectionSummary
                        payments={payments}
                        classes={classes}
                        totalNumberGenerator={totalNumberGenerator}
                    />
        
        
                    {/* Fee Defaulters Bar */}
                    <BarCom barData={feeDefaultersBarData}/>
                </>
            )}
        </section>
    );
};





// Export
export default page;