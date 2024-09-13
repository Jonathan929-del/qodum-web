'use client';
// Imports
import {useEffect, useState} from 'react';
import BarCom from '@/components/dashboards/shared/BarCom';
import DoughnutCom from '@/components/dashboards/shared/DoughnutCom';
import AdmissionCards from '@/components/dashboards/admissionDashboard/AdmissionCards';
import {fetchStudentsOnlineAndOfflineRegistrations} from '@/lib/actions/admission/admission/student.actions';
import {newStudentsAndGendersCounts, studentsAndGendersCounts} from '@/lib/actions/admission/admission/admittedStudent.actions';
import {studentStrengthBarData, studentComparisionBarData, newAdmissionDoughnutData, standardStatisticsDoughnutData, transferDoughnutData, categoryDoughnutData, religionDoughnutData} from '@/constants/charts/admissionCharts';
import LoadingIcon from '@/components/utils/LoadingIcon';






// Main function
const page = () => {

    // Is loading
    const [isLoading, setIsLoading] = useState(false);


    // Students count
    const [studentsCount, setStudentsCount] = useState<any>({
        all_students_count:0,
        boys_count:0,
        girls_count:0
    });


    // New students count
    const [newStudentsCount, setNewStudentsCount] = useState<any>({
        all_students_count:0,
        boys_count:0,
        girls_count:0,
        previous_boys_count:0,
        previous_girls_count:0
    });


    // Students online and offline count
    const [studentsOnlineAndOfflineCount, setStudentsOnlineAndOfflineCount] = useState<any>({
        all_students_count:0,
        online_count:0,
        offline_count:0
    });


    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            setIsLoading(true);
            const studentsCountRes = await studentsAndGendersCounts();
            const newStudentsCountRes = await newStudentsAndGendersCounts();
            const studentsOnlineAndOfflineCountRes = await fetchStudentsOnlineAndOfflineRegistrations();
            setStudentsCount(studentsCountRes);
            setNewStudentsCount(newStudentsCountRes);
            setStudentsOnlineAndOfflineCount(studentsOnlineAndOfflineCountRes);
            setIsLoading(false);
        };
        fetcher();
    }, []);

    return (
        <section className='flex flex-col w-full px-4 gap-4'>

            {isLoading ? (
                <div className='w-full flex justify-center'>
                    <LoadingIcon />
                </div>
            ) : (
                <>
                    {/* Cards */}
                    <AdmissionCards
                        studentsCount={studentsCount}
                        newStudentsCount={newStudentsCount}
                        studentsOnlineAndOfflineCount={studentsOnlineAndOfflineCount}
                    />


                    {/* Student Strength Bar Data */}
                    <div className='flex flex-col gap-4 lg:flex-row'>
                        <BarCom barData={studentStrengthBarData}/>
                    </div>


                    {/* Student Comparision Bar Data */}
                    <div className='flex flex-col gap-4 xl:flex-row'>
                        <div className='w-full xl:w-3/5'>
                            <BarCom barData={studentComparisionBarData}/>
                        </div>
                        <div className='w-full xl:w-2/5'>
                            <DoughnutCom data={newAdmissionDoughnutData} text='40'/>
                        </div>
                    </div>


                    {/* Doughnuts Group 1 */}
                    <div className='flex flex-col gap-4 sm:flex-row'>
                        <DoughnutCom data={standardStatisticsDoughnutData} text='296'/>
                        <DoughnutCom data={religionDoughnutData} text='3850'/>
                    </div>


                    {/* Doughnuts Group 2 */}
                    <div className='flex flex-col gap-4 sm:flex-row'>
                        <DoughnutCom data={transferDoughnutData} text='910'/>
                        <DoughnutCom data={categoryDoughnutData} text='3850'/>
                    </div>
                </>
            )}

        </section>
    );
};





// Export
export default page;