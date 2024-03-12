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
        paymode_details:any;
        fee_type:String;
        advance_dues_number:String;


        class_name:String;
        board:String;
        adm_no:String;
        father_name:String;
        school_name:String;
        school_address:String;
        website:String;
        school_no:String;
        affiliation_no:String;
        logo:String;
    
        // Amounts
        actual_amount:Number;
        concession_amount:Number;
        paid_amount:Number;

        paid_heads:any;
        concession_reason:String;
};
// Create payment
export const createPayment = async ({student, receipt_no, installments, received_date, remarks, paymode, paymode_details, fee_type, advance_dues_number, class_name, board, adm_no, father_name, school_name, school_address, website, school_no, affiliation_no, logo, actual_amount, concession_amount, paid_amount, paid_heads, concession_reason}:CreateAdmittedStudentProps) => {
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
            fee_type,
            advance_dues_number,

            class_name,
            board,
            adm_no,
            father_name,
            school_name,
            school_address,
            website,
            school_no,
            affiliation_no,
            logo,

            // Amounts
            actual_amount,
            concession_amount,
            paid_amount,
            
            concession_reason
        });
        payment.save().then(async() => {
            await Payment.findOneAndUpdate({receipt_no}, {installments, paid_heads}, {new:true});
        });


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
        console.log(`Error fetching payments: ${err.message}`);
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





// Fetch payment by receipt no
export const fetchPaymentByReceiptNo = async ({receipt_no}:{receipt_no:String}) => {
    try {

        // Database connection
        connectToDb('accounts');

    
        // Payments
        const payment = await Payment.findOne({receipt_no});


        // Return
        return payment;


    } catch (err:any) {
        console.log(`Error fetching payment: ${err.message}`);
    };
};