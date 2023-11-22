// Imports
import BarCom from '@/components/utils/accountsDashboard/BarCom';
import LineCom from '@/components/utils/accountsDashboard/LineCom';
import AccountCards from '@/components/utils/accountsDashboard/AccountCards';
import TodayVouchers from '@/components/utils/accountsDashboard/TodayVouchers';
import CategoryDoughnut from '@/components/utils/accountsDashboard/CategoryDoughnut';
import EntryTypeDoughnut from '@/components/utils/accountsDashboard/EntryTypeDoughnut';






// Main function
const page = () => {
    return (
        <section className='flex flex-col w-full gap-4'>


            {/* Cards */}
            <AccountCards />


            {/* Income and Expenditure */}
            <div className='flex-1 flex flex-col justify-between mx-4 gap-4 lg:flex-row'>
                {/*Chart*/}
                <LineCom />
                <TodayVouchers />
            </div>


            {/* Bar */}
            <div className='flex-1 flex flex-col justify-between mx-4 gap-4'>
                <BarCom />
            </div>


            {/* Doughnuts */}
            <div className='flex-1 flex flex-col mx-4 gap-4 lg:flex-row'>
                <CategoryDoughnut />
                <EntryTypeDoughnut />
            </div>


        </section>
    );
};





// Export
export default page;