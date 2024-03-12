// Imports
import PaymentsList from './PaymentsList';
import Search from './Search';
import {useState} from 'react';





// Main function
const index = ({sections, classes, payments, totalNumberGenerator, setReceiptPaymentData, setIsReceiptOpened}:any) => {


    // Total paid amount
    const [totalPaidAmount, setTotalPaidAmount] = useState<any>();
    

    return (
        <div className='w-[70%] min-w-[400px] flex flex-col justify-between px-2'>


            {/* Search */}
            <Search
                classes={classes}
                sections={sections}
            />


            {/* Payments List */}
            <PaymentsList
                payments={payments}
                totalNumberGenerator={totalNumberGenerator}
                setReceiptPaymentData={setReceiptPaymentData}
                setIsReceiptOpened={setIsReceiptOpened}
            />


        </div>
    );
};





// Export
export default index;