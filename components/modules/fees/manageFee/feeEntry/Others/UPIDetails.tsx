// Imports
import axios from 'axios';
import QRCodeLib from 'qrcode';
import Image from 'next/image';
import {useEffect, useState} from 'react';
import {Input} from '@/components/ui/input';
import {useToast} from '@/components/ui/use-toast';
import LoadingIcon from '@/components/utils/LoadingIcon';
import {FormControl, FormItem, FormLabel, FormMessage} from '@/components/ui/form';





// Main function
const UPIDetails = ({upiDetails, setUpiDetails, selectedStudent, totalPaidAmount, setIsQrCodeGenerated, form, selectedInstallments}:any) => {

    // Toast
    const {toast} = useToast();


    // Payment url
    const [isLoading, setIsLoading] = useState(false);


    // Error
    const [error, setError] = useState('');


    // QR image
    const [qrImage, setQRImage] = useState('');


    // Current order id
    const [currentOrder, setCurrentOrder] = useState<any>(localStorage.getItem('payments') && JSON.parse(localStorage.getItem('payments')).length > 0 ? JSON.parse(localStorage.getItem('payments')).find((p:any) => p.adm_no === selectedStudent.admission_no) : {});


    // Cancel payment handler
    const cancelPaymentHandler = () => {
        // Pending pending payments
        const pendingPayments = localStorage.getItem('payments') ? JSON.parse(localStorage.getItem('payments')) : [];

        // Removing payment from the list
        const newPendingPayments = pendingPayments.filter((pp:any) => pp.txnId !== currentOrder.txnId);
        localStorage.setItem('payments', JSON.stringify(newPendingPayments));

        // Reseting variables
        setQRImage('');
        setCurrentOrder({});
        setIsQrCodeGenerated(false);

        // Toast
        toast({title:'Payment canceled successfully!'});
    };


    // Create payment
    const createPayment = async () => {
        if(selectedStudent.name !== ''){

            // Setting is loading to true
            setIsLoading(true);


            // Check if student has pending payment links
            if(localStorage.getItem('payments') && JSON.parse(localStorage.getItem('payments')).map((p:any) => p.adm_no).includes(selectedStudent.admission_no)){
                setQRImage(JSON.parse(localStorage.getItem('payments')).find((p:any) => p.adm_no === selectedStudent.admission_no).payment_url);
                setCurrentOrder(JSON.parse(localStorage.getItem('payments')).find((p:any) => p.adm_no === selectedStudent.admission_no));
                setIsLoading(false);
                return;
            };


            // Payment link
            const unique_request_number = Math.floor(Math.random() * 1000000000);
            const params = {
                unique_request_number:JSON.stringify(unique_request_number),
                amount:Number(totalPaidAmount),
                customer_name:selectedStudent.name,
                customer_phone:JSON.stringify(selectedStudent.phone)
            };
            const paymentUrlRes = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/payments/payment/insta-collect`, params);


            // Setting QR code and validations
            if(!paymentUrlRes.data.success){
                setError(paymentUrlRes?.data?.message);
            }else{
                setQRImage(paymentUrlRes.data.payment_url);
                let advanceDuesNumber;
                if(form.getValues().dues > 0){
                    advanceDuesNumber = - form.getValues().dues;
                }else if (form.getValues().advance_amt > 0){
                    advanceDuesNumber = form.getValues().advance_amt;
                };
                setCurrentOrder({
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


            // Toast
            toast({title:'Payment created!'});

        }
    };


    // Update payment
    const updatePayment = async () => {
        // Pending pending payments
        const pendingPayments = localStorage.getItem('payments') ? JSON.parse(localStorage.getItem('payments')) : [];

        // Removing payment from the list
        const newPendingPayments = pendingPayments.filter((pp:any) => pp.txnId !== currentOrder.txnId);
        localStorage.setItem('payments', JSON.stringify(newPendingPayments));

        // Reseting variables
        setQRImage('');
        setCurrentOrder({});

        // Creating new payment
        createPayment();
    };


    // Is payment applicable for update
    const isPaymentApplicableForUpdate = () => {
        return currentOrder.amount !== totalPaidAmount
            || JSON.stringify(currentOrder.installments) !== JSON.stringify(selectedInstallments)
            || currentOrder.remarks !== form.getValues().remarks
            || currentOrder.fee_type !== form.getValues().fee_type
            || currentOrder.bank_name !== form.getValues().bank_name
    };


    // Use effect
    useEffect(() => {
        // const fetcher = async () => {
        //     createPayment();
        // };
        // fetcher();
        setCurrentOrder(localStorage.getItem('payments') && JSON.parse(localStorage.getItem('payments')).length > 0 ? JSON.parse(localStorage.getItem('payments')).find((p:any) => p.adm_no === selectedStudent.admission_no) : {});
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
            ) : qrImage ? (
                <div className='flex flex-col'>
                    <img alt='QR Code' src={qrImage} className='w-[100px] h-[100px]'/>
                    <span
                        className='flex items-center justify-center px-1 h-6 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white cursor-pointer
                                hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                        onClick={() => isPaymentApplicableForUpdate() ? updatePayment() : toast({title:'No values changed to update', variant:'alert'})}
                    >
                        Update
                    </span>
                    <span
                        className='flex items-center justify-center px-1 h-6 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white cursor-pointer
                                hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                        onClick={() => cancelPaymentHandler()}
                    >
                        Cancel
                    </span>
                </div>
            ) : (
                <span
                className='flex items-center justify-center px-1 h-6 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white cursor-pointer
                            hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                    onClick={createPayment}
                >
                    Create QR Code
                </span>
            ) : (
                <p className='text-[11px] text-red-500'>Please select a student</p>
            )}
        </div>
    );
};





// Export
export default UPIDetails;