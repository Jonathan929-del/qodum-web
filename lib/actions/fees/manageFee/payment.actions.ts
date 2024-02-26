'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import Payment from '@/lib/models/fees/manageFee/Payment.model';





// Create payment props
interface CreateAdmittedStudentProps{
        // Others
        receipt_no:String;
        installment:String;
        received_date:Date;
        remarks:String;
        paymode:String;
        paymode_details:any,
    
        // Amounts
        actual_amount:Number;
        concession_amount:Number;
        paid_amount:Number;
};
// Create payment
export const createPayment = async ({receipt_no, installment, received_date, remarks, paymode, paymode_details, actual_amount, concession_amount, paid_amount}:CreateAdmittedStudentProps) => {
    try {

        // Database connection
        connectToDb('accounts');

    
        // Payment
        const payment = await Payment.create({
            // Others
            receipt_no,
            installment,
            received_date,
            remarks,
            paymode,
            paymode_details,

            // Amounts
            actual_amount,
            concession_amount,
            paid_amount
        });
        payment.save();


        // Return
        return payment;


    } catch (err:any) {
        console.log(`Error creating payment: ${err.message}`);
    };
};





// Fetch payments
export const fetchPayments = async () => {
    try {

        // Database connection
        connectToDb('accounts');

    
        // Payments
        const payments = await Payment.find();


        // Return
        return payments;


    } catch (err:any) {
        console.log(`Error fetching payment: ${err.message}`);
    };
};