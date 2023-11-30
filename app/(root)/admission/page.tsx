'use client';
// Imports
import BarCom from '@/components/dashboards/shared/BarCom';
import DoughnutCom from '@/components/dashboards/shared/DoughnutCom';
import AdmissionCards from '@/components/dashboards/admissionDashboard/AdmissionCards';
import {studentStrengthBarData, studentComparisionBarData, newAdmissionDoughnutData, standardStatisticsDoughnutData, transferDoughnutData, categoryDoughnutData, religionDoughnutData} from '@/constants/charts/admissionCharts';






// Main function
const page = () => {
    return (
        <section className='flex flex-col w-full px-4 gap-4'>


            {/* Cards */}
            <AdmissionCards />


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


        </section>
    );
};





// Export
export default page;