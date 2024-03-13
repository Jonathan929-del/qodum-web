'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import LateFee from '@/lib/models/fees/feeMaster/lateFeeSettings/LateFee.model';





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


        // Creating new late fee
        const newLateFee = await LateFee.create({fee_group, fee_type, installment, due_date, late_fee_type, amount});
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