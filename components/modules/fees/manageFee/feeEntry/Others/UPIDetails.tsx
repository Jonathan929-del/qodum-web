// Imports
import axios from 'axios';
import QRCodeLib from 'qrcode';
import Image from 'next/image';
import {useEffect, useState} from 'react';
import {Input} from '@/components/ui/input';
import LoadingIcon from '@/components/utils/LoadingIcon';
import {FormControl, FormItem, FormLabel, FormMessage} from '@/components/ui/form';





// Main function
const UPIDetails = ({upiDetails, setUpiDetails, selectedStudent, totalPaidAmount, setIsQrCodeGenerated, form, selectedInstallments}:any) => {

    // Payment url
    const [isLoading, setIsLoading] = useState(false);


    // Error
    const [error, setError] = useState('');


    // QR image
    const [qrImage, setQRImage] = useState('');
    console.log(qrImage);


    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            if(selectedStudent.name !== ''){

                // Setting is loading to true
                setIsLoading(true);


                // Check if student has pending payment links
                if(localStorage.getItem('payments') && JSON.parse(localStorage.getItem('payments')).map((p:any) => p.adm_no).includes(selectedStudent.admission_no)){
                    // const qrDataURL = await QRCodeLib.toDataURL(JSON.parse(localStorage.getItem('payments')).find((p:any) => p.adm_no === selectedStudent.admission_no).payment_link, {width:150});
                    setQRImage(JSON.parse(localStorage.getItem('payments')).find((p:any) => p.adm_no === selectedStudent.admission_no).payment_url);
                    setIsLoading(false);
                    return;
                };


                // Payment link
                const unique_request_number = Math.floor(Math.random() * 1000000000);
                const params = {
                    unique_request_number:JSON.stringify(unique_request_number),
                    amount:totalPaidAmount,
                    customer_name:selectedStudent.name,
                    customer_phone:JSON.stringify(selectedStudent.phone)
                };
                console.log(process.env.NEXT_PUBLIC_API_URL);
                const paymentUrlRes = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/payments/payment/insta-collect`, params);
                console.log(paymentUrlRes.data);


                // Setting QR code and validations
                if(!paymentUrlRes.data.success){
                    setError(paymentUrlRes?.data?.message);
                }else{
                    // const qrDataURL = await QRCodeLib.toDataURL(paymentUrlRes.data, {width:150});
                    setQRImage(paymentUrlRes.data.payment_url);
                    let advanceDuesNumber;
                    if(form.getValues().dues > 0){
                        advanceDuesNumber = - form.getValues().dues;
                    }else if (form.getValues().advance_amt > 0){
                        advanceDuesNumber = form.getValues().advance_amt;
                    };
                    const existingPayments = localStorage.getItem('payments')
                        ? JSON.parse(localStorage.getItem('payments'))
                        : [];
                    existingPayments.push({
                        txnId:paymentUrlRes.data.order_id,
                        amount:totalPaidAmount,
                        student_name:selectedStudent.name,
                        payment_url:paymentUrlRes.data.payment_url,
                        adm_no:selectedStudent.admission_no,
                        advance_dues_number:advanceDuesNumber,
                        installments:selectedInstallments,
                        received_date:form.getValues().received_date,
                        remarks:form.getValues().remarks,
                        fee_type:form.getValues().fee_type,
                        bank_name:form.getValues().bank_name
                    });
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
                isLoading ? (
                <LoadingIcon />
            ) : error ? (
                <p className='text-[11px] text-red-500'>{error}</p>
            ) : (
                <img alt='QR Code' src={qrImage} className='w-[100px] h-[100px]'/>
            ) : (
                <p className='text-[11px] text-red-500'>Please select a student</p>
            )}
        </div>
    );
};





// Export
export default UPIDetails;