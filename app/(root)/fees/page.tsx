'use client';
// Imports
import BarCom from '@/components/dashboards/shared/BarCom';
import LineCom from '@/components/dashboards/shared/LineCom';
import FeesCardsOne from '@/components/dashboards/feesDashboard/FeesCardsOne';
import PaymodeSummaryCard from '@/components/dashboards/feesDashboard/PaymodeSummaryCard';
import RecentTransactionsCard from '@/components/dashboards/feesDashboard/RecentTransactionsCard';
import {collectionSummaryBarData, estimatedCollectionBarData, transactionHistoryLineData, feeDefaultersBarData} from '@/constants/charts/feesChars';






// Main function
const page = () => {
    return (
        <section className='flex flex-col w-full px-4 py-2 gap-4'>


            {/* Cards Group One */}
            <FeesCardsOne />


            {/* Paymode Summary */}
            <PaymodeSummaryCard />


            {/* Transactions History */}
            <div className='w-full xl:px-20 xl:py-10'>
                <LineCom lineData={transactionHistoryLineData}/>
            </div>


            {/* Estimated collection and recent transactions */}
            <div className='flex flex-col gap-4 lg:flex-row'>
                <div className='w-full xl:w-2/3'>
                    <BarCom barData={estimatedCollectionBarData}/>
                </div>
                <div className='w-full xl:w-1/3'>
                    <RecentTransactionsCard />
                </div>
            </div>


            {/* Collection Summary Bar */}
            <BarCom barData={collectionSummaryBarData}/>


            {/* Fee Defaulters Bar */}
            <BarCom barData={feeDefaultersBarData}/>


        </section>
    );
};





// Export
export default page;