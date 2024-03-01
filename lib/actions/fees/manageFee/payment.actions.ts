'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import Payment from '@/lib/models/fees/manageFee/Payment.model';





// Create payment props
interface CreateAdmittedStudentProps{
        // Others
        student:String;
        receipt_no:String;
        installments:any;
        received_date:Date;
        remarks:String;
        paymode:String;
        paymode_details:any,
    
        // Amounts
        actual_amount:Number;
        concession_amount:Number;
        paid_amount:Number;

        paid_heads:any;
        concession_reason:String;
};
// Create payment
export const createPayment = async ({student, receipt_no, installments, received_date, remarks, paymode, paymode_details, actual_amount, concession_amount, paid_amount, paid_heads, concession_reason}:CreateAdmittedStudentProps) => {
    try {

        // Database connection
        connectToDb('accounts');

    
        // Payment
        const payment = await Payment.create({
            // Others
            student,
            receipt_no,
            received_date,
            remarks,
            paymode,
            paymode_details,

            // Amounts
            actual_amount,
            concession_amount,
            paid_amount,
            
            concession_reason
        });
        payment.save().then(async() => {
            await Payment.findOneAndUpdate({receipt_no}, {installments, paid_heads});
        });


        // Return
        return payment;


    } catch (err:any) {
        console.log(`Error creating payment: ${err.message}`);
    };
};





// Fetch student payments
export const fetchStudentPayments = async ({student}:{student:String}) => {
    try {

        // Database connection
        connectToDb('accounts');

    
        // Payments
        const payments = await Payment.find({student});


        // Return
        return payments;


    } catch (err:any) {
        console.log(`Error fetching payments: ${err.message}`);
    };
};