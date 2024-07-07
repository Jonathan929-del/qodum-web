'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import Head from '@/lib/models/fees/feeMaster/defineFeeMaster/FeeHead.model';
import LateFee from '@/lib/models/fees/feeMaster/lateFeeSettings/LateFee.model';
import AdmittedStudent from '@/lib/models/admission/admission/AdmittedStudent.model';
import Installment from '@/lib/models/fees/feeMaster/defineFeeMaster/FeeInstallment.model';
import AcademicYear from '@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model';





// Create late fee props
interface CreateLateFeeProps{
    fee_group:String;
    fee_type:String;
    installment:String;
    due_date:Date;
    late_fee_type:String;
    amount:Number;
};
// Create late fee
export const createLateFee = async ({fee_group, fee_type, installment, due_date, late_fee_type, amount}:CreateLateFeeProps) => {
    try {

    
        // Database connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});
        if(!activeSession) return 0;


        // Late fee
        const installments = await Installment.find();
        const lateFee = await Head.findOne({type:'fine'});
        const lateFeeHead = {
            type_name:lateFee.affiliated_fee_type || '',
            head_name:lateFee.name || '',
            schedule_type:lateFee.pay_schedule || '',
            installment:'All installments',
            account:'---',
            post_account:'---',
            fee_type:lateFee.type || '',
            due_date,
            amounts:installments.map((i:any) => {
                            return {
                                name:i.name,
                                value:amount
                            }
                        })
        };


        // Updating group and students
        // @ts-ignore
        const groupNameRegex = new RegExp(fee_group, 'i');
        await AdmittedStudent.updateMany(
            {'affiliated_heads.group_name':{$regex:groupNameRegex}},
            {$push:{'affiliated_heads.heads':lateFeeHead}}
        );


        // Creating new late fee
        const newLateFee = await LateFee.create({session:activeSession.year_name, fee_group, fee_type, installment, due_date, late_fee_type, amount});
        newLateFee.save();


        // Return
        return newLateFee;


    } catch (err:any) {
        console.log(`Error Creating late fee: ${err.message}`);
    }
};





// Fetch late fees
export const fetchLateFees = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching late fees
        const lateFees = await LateFee.find();
        return lateFees;

    } catch (err:any) {
        throw new Error(`Error fetching late fees: ${err}`);
    }
};





// Modify late fee props
interface ModifyLateFeeProps{
    id:String;
    fee_group:String;
    fee_type:String;
    installment:String;
    due_date:Date;
    late_fee_type:String;
    amount:Number;
}
// Modify late fee with id
export const modifyLateFee = async ({id, fee_group, fee_type, installment, due_date, late_fee_type, amount}:ModifyLateFeeProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Updating late fee
        const updatedLateFee = await LateFee.findByIdAndUpdate(id, {fee_group, fee_type, installment, due_date, late_fee_type, amount});


        // Return 
        return updatedLateFee;

    } catch (err) {
        throw new Error(`Error updating late fee: ${err}`);
    }
};





// Delete late fee
export const deleteLateFee = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting late fee
        await LateFee.findByIdAndDelete(id);
        return 'Late fee deleted';

    } catch (err) {
        throw new Error(`Error deleting late fee: ${err}`);
    }
};