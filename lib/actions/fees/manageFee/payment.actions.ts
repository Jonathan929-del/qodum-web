'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import Payment from '@/lib/models/fees/manageFee/Payment.model';
import AcademicYear from '@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model';





// Create payment props
interface CreateAdmittedStudentProps{
        // Others
        student:String;
        receipt_no:String;
        ref_no:String;
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
        wing_name:String;
        entry_mode:String;
        is_new:Boolean;
        is_active:Boolean;
        student_status:String;
        bank_name:String;
        fee_group:String;
    

        // Amounts
        actual_amount:Number;
        concession_amount:Number;
        paid_amount:Number;
        paid_heads:any;
        concession_reason:String;
};
// Create payment
export const createPayment = async ({student, receipt_no, ref_no, installments, received_date, remarks, paymode, paymode_details, fee_type, advance_dues_number, class_name, board, adm_no, father_name, school_name, school_address, website, school_no, affiliation_no, logo, wing_name, entry_mode, is_new, is_active, student_status, bank_name, fee_group, actual_amount, concession_amount, paid_amount, paid_heads, concession_reason}:CreateAdmittedStudentProps) => {
    try {

        // Database connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});
        if(!activeSession) return 0;

    
        // Payment
        const payment = await Payment.create({
            // Others
            student,
            receipt_no,
            ref_no,
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
            wing_name,
            entry_mode,
            is_new,
            is_active,
            student_status,
            bank_name,
            fee_group,
            session:activeSession.year_name,
            is_canceled:false,

            // Amounts
            actual_amount,
            concession_amount,
            paid_amount,
            
            concession_reason
        });
        payment.save().then(async() => {
            await Payment.findOneAndUpdate({receipt_no, session:activeSession.year_name}, {installments, paid_heads}, {new:true});
        });
        const paymentRes = {
            ...payment._doc,
            _id:payment._doc._id.toString()
        };


        // Return
        return paymentRes;

    } catch (err:any) {
        console.log(`Error creating payment: ${err.message}`);
    };
};





// Fetch payments
export const fetchPayments = async () => {
    try {

        // Database connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});

    
        // Payments
        const payments = await Payment.find({session:activeSession.year_name});


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


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});

    
        // Payments
        const payments = await Payment.find({student, session:activeSession.year_name});


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


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});

    
        // Payments
        const payment = await Payment.findOne({receipt_no, session:activeSession.year_name});


        // Return
        return payment;


    } catch (err:any) {
        console.log(`Error fetching payment: ${err.message}`);
    };
};





// delete payment by receipt no
export const deletePaymentByReceiptNo = async ({receipt_no}:{receipt_no:String}) => {
    try {

        // Database connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});

    
        // Payments
        const payment = await Payment.findOneAndDelete({receipt_no, session:activeSession.year_name});


        // Return
        return payment;


    } catch (err:any) {
        console.log(`Error deleting payment: ${err.message}`);
    };
};





// Daily fee collection filter props
interface DailyFeeCollectionProps{
    school:String;
    wing:String;
    classes:any;
    board:String;
    entry_modes:any;
    fee_types:any;
    pay_modes:any;
    heads:any;
    date_from:Date;
    date_to:Date;
    from:Number;
    to:Number;
    user:String;
};
// Daily fee collection filter
export const dailyFeeCollectionFilter = async ({school, wing, classes, board, entry_modes, fee_types, pay_modes, heads, date_from, date_to, from, to, user}:DailyFeeCollectionProps) => {
    try {

        // Database connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});


        // Fetching and filtering payments
        const payments = await Payment.find({session:activeSession.year_name});
        const filteredPayments = payments
            // Schools filter
            .filter((p:any) => school === 'All Schools' ? p : p.school_name === school)
            // Wings filter
            .filter((p:any) => wing === 'All Wings' ? p : p.wing_name === wing)
            // Classes filter
            .filter((p:any) => classes.map((i:any) => i.class_name).includes(p.class_name))
            // Board filter
            .filter((p:any) => board === 'All Boards' ? p : p.board === board)
            // Entry modes filter
            .filter((p:any) => entry_modes.includes(p.entry_mode))
            // Fee types filter
            .filter((p:any) => fee_types.map((i:any) => i.name).includes(p.fee_type) || p.fee_type === 'All fee types')
            // Pay modes filter
            .filter((p:any) => pay_modes.includes(p.paymode))
            // Heads filter
            .filter((p:any) => p.paid_heads.filter((ph:any) => heads.map((h:any) => h.name).includes(ph.head_name)).length > 0)
            // Dates filter
            .filter((p:any) => p.received_date >= date_from && p.received_date <= date_to)
            // Receipt no filter
            .filter((p:any) => {
                console.log('EXCUTING');
                const pattern = /\d+/;
                const matches = p.receipt_no.match(pattern);
                if(matches){
                    return parseInt(matches[0], 10) >= Number(from) && parseInt(matches[0], 10) <= Number(to);
                }else{
                    return false;
                }
            })
            // User filter
            .filter((p:any) => p)


        // Return
        return filteredPayments;


    } catch (err:any) {
        console.log(`Error fetching payments: ${err.message}`);
    };
};





// Daily fee collection filter props
interface ReceiptWiseFeeTypeCollectionProps{
    school:String;
    wing:String;
    classes:any;
    board:String;
    fee_type:String;
    installment:String;
    pay_modes:any;
    date_from:Date;
    date_to:Date;
    user:String;
    banks:any;
    new_student:String;
    student_status:String;
    is_active:String;
};
// Daily fee collection filter
export const receiptWiseFeeTypeCollectionFilter = async ({school, wing, classes, board, fee_type, installment, pay_modes, date_from, date_to, user, banks, new_student, student_status, is_active}:ReceiptWiseFeeTypeCollectionProps) => {
    try {

        // Database connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});


        // Fetching and filtering payments
        const payments = await Payment.find({session:activeSession.year_name});
        const filteredPayments = payments
            // Schools filter
            .filter((p:any) => school === 'All Schools' ? p : p.school_name === school)
            // Wings filter
            .filter((p:any) => wing === 'All Wings' ? p : p.wing_name === wing)
            // Classes filter
            .filter((p:any) => classes.map((i:any) => i.class_name).includes(p.class_name))
            // Board filter
            .filter((p:any) => board === 'All Boards' ? p : p.board === board)
            // Fee types filter
            .filter((p:any) => p.fee_type === 'All fee types' ? p : p.fee_type === fee_type)
            // Installments filter
            .filter((p:any) => installment === 'All installments' ? p : p.installments.filter((i:any) => installment === i).length > 0)
            // // Pay modes filter
            .filter((p:any) => pay_modes.includes(p.paymode))
            // // Dates filter
            .filter((p:any) => p.received_date >= date_from && p.received_date <= date_to)
            // // User filter
            .filter((p:any) => p)
            // // Bank filter
            .filter((p:any) => banks.map((i:any) => i.account_name).includes(p.bank_name))
            // New student filter
            .filter((p:any) => {
                const is_new = new_student === 'New';
                return new_student === 'All' ? p : p.is_new === is_new;
            })
            // Status filter
            .filter((p:any) => student_status === 'All' ? p : p.student_status === student_status)
            // Active filter
            .filter((p:any) => {
                const is_student_active = is_active === 'Active';
                return is_active === 'All' ? p : p.is_active === is_student_active;
            })


        // Return
        return filteredPayments;


    } catch (err:any) {
        console.log(`Error fetching payments: ${err.message}`);
    };
};







// Cancel payment
export const cancelPayment = async ({receipt_no}:{receipt_no:String}) => {
    try {

        // Database connection
        connectToDb('accounts');

    
        // Payments
        const payment = await Payment.findOneAndUpdate({receipt_no}, {is_canceled:true});


        // Return
        return payment;


    } catch (err:any) {
        console.log(`Error canceling payment: ${err.message}`);
    };
};






// Fetch student canceled payments
export const fetchStudentCanceledPayments = async ({student}:{student:String}) => {
    try {

        // Database connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});

    
        // Payments
        const payments = await Payment.find({student, is_canceled:false, session:activeSession.year_name});


        // Return
        return payments;


    } catch (err:any) {
        console.log(`Error fetching payments: ${err.message}`);
    };
};






// Modify payment paid heads
export const modifyPaymentPaidHeads = async ({receipt_no, actual_amount, paid_amount, paid_heads}:{receipt_no:String, paid_amount:Number, actual_amount:Number, paid_heads:any}) => {
    try {

        // Database connection
        connectToDb('accounts');

    
        // Payments
        const payments = await Payment.findOneAndUpdate({receipt_no}, {paid_heads, actual_amount, paid_amount});


        // Return
        return payments;

    } catch (err:any) {
        console.log(`Error updating payment: ${err.message}`);
    };
};