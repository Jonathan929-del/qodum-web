// Imports
import axios from 'axios';
import {useEffect, useState} from 'react';
import {Input} from '@/components/ui/input';
import {FormControl, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import LoadingIcon from '@/components/utils/LoadingIcon';





// Main function
const UPIDetails = ({upiDetails, setUpiDetails, selectedStudent, totalPaidAmount}:any) => {

    // Payment url
    const [paymentUrl, setPaymentUrl] = useState<any>('');


    // Is phone error
    const [isPhoneError, setIsPhoneError] = useState(false);
    console.log(selectedStudent);


    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            if(selectedStudent.name !== ''){

                if(Math.abs(selectedStudent.phone).toString().length !== 10){
                    setIsPhoneError(true);
                    return;
                };
                const params = {
                    merchant_txn:Math.floor(Math.random() * 1000000000),
                    amount:totalPaidAmount,
                    name:selectedStudent.name,
                    phone:selectedStudent.phone,
                    email:selectedStudent.email
                };
                const paymentUrlRes = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/payments/payment/easy-pay`, params);
                setPaymentUrl(paymentUrlRes.data);
            }
        };
        fetcher();
    }, []);
    return (
        <div className='flex items-center justify-center'>
            {/* Reference No. */}
            {/* <FormItem className='w-full'>
                <div className='relative flex flex-col'>
                    <FormLabel className='w-full text-start text-[11px] text-[#726E71]'>Reference No.</FormLabel>
                    <FormControl>
                        <Input
                            value={upiDetails.neft_name}
                            onChange={(e:any) => setUpiDetails({...upiDetails, reference_no:e.target.value})}
                            className='h-7 flex flex-row items-center text-[11px] pl-2 bg-[#fff] border-[0.5px] border-[#E4E4E4]'
                        />
                    </FormControl>
                    <FormMessage className='absolute w-[120%] top-[100%] left-0 text-[11px]'/>
                </div>
            </FormItem> */}
            {selectedStudent.name !== '' ?
                isPhoneError ? (
                    <p className='text-[11px] text-red-500'>Student phone number is not valid</p>
                ) : paymentUrl === '' ? (
                <LoadingIcon />
            ) : (
                <p>{paymentUrl}</p>
            ) : (
                <p className='text-[11px] text-red-500'>Please select a student</p>
            )}
        </div>
    );
};





// Export
export default UPIDetails;