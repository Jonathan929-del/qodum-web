'use client';
// Imports
import BarCom from '@/components/dashboards/shared/BarCom';
import DoughnutCom from '@/components/dashboards/shared/DoughnutCom';
import LineCom from '@/components/dashboards/shared/LineCom';
import AccountCards from '@/components/dashboards/accountsDashboard/AccountCards';
import TodayVouchers from '@/components/dashboards/accountsDashboard/TodayVouchers';
import {incomeAndExpenditureLineData, fundFlowBarData, categoryDoughnutData, entryTypeDoughnutData} from '@/constants/charts/accountsCharts';






// Main function
const page = () => {
    return (
        <section className='flex flex-col w-full gap-4'>


            {/* Cards */}
            <AccountCards />


            {/* Income and Expenditure */}
            <div className='flex flex-col justify-between mx-4 gap-4 lg:flex-row'>
                <div className='lg:w-[calc(100%-400px)]'>
                    <LineCom lineData={incomeAndExpenditureLineData}/>
                </div>
                <TodayVouchers />
            </div>


            {/* Fund Flow Bar */}
            <div className='flex-1 flex flex-col justify-between mx-4 gap-4'>
                <BarCom barData={fundFlowBarData}/>
            </div>


            {/* Doughnuts */}
            <div className='flex-1 flex flex-col mx-4 gap-4 lg:flex-row'>
                <DoughnutCom data={categoryDoughnutData} text='81.60 CR'/>
                <DoughnutCom data={entryTypeDoughnutData} text='81.60 CR'/>
            </div>


        </section>
    );
};





// Export
export default page;