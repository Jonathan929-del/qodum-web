// Imports
import axios from 'axios';
import QRCodeLib from 'qrcode';
import Image from 'next/image';
import {useEffect, useState} from 'react';
import {Input} from '@/components/ui/input';
import LoadingIcon from '@/components/utils/LoadingIcon';
import {FormControl, FormItem, FormLabel, FormMessage} from '@/components/ui/form';





// Main function
const UPIDetails = ({upiDetails, setUpiDetails, selectedStudent, totalPaidAmount, setIsQrCodeGenerated}:any) => {

    // Payment url
    const [isLoading, setIsLoading] = useState(false);


    // Error
    const [error, setError] = useState('');


    // Is phone error
    const [isPhoneError, setIsPhoneError] = useState(false);


    // QR image
    const [qrImage, setQRImage] = useState('');


    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            if(selectedStudent.name !== ''){

                // Setting is loading to true
                setIsLoading(true);


                // Check if student has pending payment links
                if(localStorage.getItem('payments') && JSON.parse(localStorage.getItem('payments')).map((p:any) => p.adm_no).includes(selectedStudent.admission_no)){
                    const qrDataURL = await QRCodeLib.toDataURL(JSON.parse(localStorage.getItem('payments')).find((p:any) => p.adm_no === selectedStudent.admission_no).payment_link, {width:150});
                    setQRImage(qrDataURL);
                    setIsLoading(false);
                    return;
                };


                // Payment link
                if(Math.abs(selectedStudent.phone).toString().length !== 10){
                    setIsPhoneError(true);
                    return;
                };
                const txnId = Math.floor(Math.random() * 1000000000);
                const params = {
                    merchant_txn:txnId,
                    amount:totalPaidAmount,
                    name:selectedStudent.name,
                    phone:JSON.stringify(selectedStudent.phone),
                    email:selectedStudent.email
                };
                const paymentUrlRes = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/payments/payment/easy-pay`, params);


                // Setting QR code and validations
                if(paymentUrlRes.data.status === 'error'){
                    setError(paymentUrlRes?.data?.message);
                }else{
                    const qrDataURL = await QRCodeLib.toDataURL(paymentUrlRes.data, {width:150});
                    setQRImage(qrDataURL);
                    const existingPayments = localStorage.getItem('payments')
                        ? JSON.parse(localStorage.getItem('payments'))
                        : [];
                    existingPayments.push({txnId, amount:totalPaidAmount, student_name:selectedStudent.name, payment_link:paymentUrlRes.data, adm_no:selectedStudent.admission_no});
                    localStorage.setItem('payments', JSON.stringify(existingPayments));
                    setIsQrCodeGenerated(true);
                };


                // Setting is loading to false
                setIsLoading(false);

            }
        };
        fetcher();
    }, [totalPaidAmount]);

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
            ) : isLoading ? (
                <LoadingIcon />
            ) : error ? (
                <p className='text-[11px] text-red-500'>{error}</p>
            ) : (
                <Image alt='QR Code' src={qrImage} width={100} height={100}/>
            ) : (
                <p className='text-[11px] text-red-500'>Please select a student</p>
            )}
        </div>
    );
};





// Export
export default UPIDetails;