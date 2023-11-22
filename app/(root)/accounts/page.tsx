// Imports
import LineCom from '@/components/utils/accountsDashboard/LineCom';
import AccountCards from '@/components/utils/accountsDashboard/AccountCards';
import TodayVouchers from '@/components/utils/accountsDashboard/TodayVouchers';






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

        </section>
    );
};





// Export
export default page;