// Imports
import {useState} from 'react';
import {useToast} from '@/components/ui/use-toast';
import ShowInstallment from '../Others/ShowInstallment';
import moment from 'moment';





// Main function
const EntryMode = ({form, selectedStudent, totalNumberGenerator, installments, setSelectedInstallments, payments, showButtonClick, allPayments, setReceiptPaymentData, setIsReceiptOpened}:any) => {


    // Toast
    const {toast} = useToast();


    // Is show installment
    const [isShowInstallment, setIsShowInstallment] = useState(false);


    return (
        <div className='flex flex-col gap-2 p-2 lg:flex-row lg:justify-between bg-[#F7F7F7] rounded-[4px] border-[0.5px] border-[#ccc]'>
            {/* Today's Collection */}
            <div className='h-full flex flex-row items-center gap-2 text-sm text-hash-color font-semibold'>
                Today's Collection : {`₹${totalNumberGenerator(allPayments?.filter((p:any) => moment(p.received_date).format('D-MMM-yy') === moment(new Date()).format('D-MMM-yy')).map((p:any) => Number(p.paid_amount)))} (${allPayments?.filter((p:any) => moment(p.received_date).format('D-MMM-yy') === moment(new Date()).format('D-MMM-yy')).length})`}
            </div>
            {/* Buttons */}
            <div className='flex flex-row gap-2'>
                {/* Show Button */}
                <span
                    className='flex items-center justify-center px-3 h-6 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white cursor-pointer
                            hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                    onClick={() => selectedStudent.name === '' ? toast({title:'Please select a student', variant:'alert'}) : showButtonClick()}
                >
                    Show
                </span>
                {/* Show Installment Button */}
                <span
                    onClick={() => selectedStudent.name === '' ? toast({title:'Please select a student', variant:'alert'}) : setIsShowInstallment(true)}
                    className='flex items-center justify-center px-3 h-6 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white cursor-pointer
                            hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                >
                    Show Installment
                </span>
            </div>
            {isShowInstallment && <ShowInstallment setIsShowInstallment={setIsShowInstallment} selectedStudent={selectedStudent} totalNumberGenerator={totalNumberGenerator} installments={installments} setSelectedInstallments={setSelectedInstallments} payments={payments} setIsReceiptOpened={setIsReceiptOpened} setReceiptPaymentData={setReceiptPaymentData}/>}
        </div>
    );
};





// Export
export default EntryMode;