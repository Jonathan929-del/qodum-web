'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import LateFeeHeadWise from '@/lib/models/fees/feeMaster/lateFeeSettings/LateFeeHeadWise.model';
import AcademicYear from '@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model';





// Create late fee head wise props
interface CreateLateFeeHeadWiseProps{
    fee_group:String;
    fee_type:String;
    installment:String;
    head:String;
    due_date:Date;
    late_fee_type:String;
    amount:Number;
};
// Create late fee head wise
export const createLateFeeHeadWise = async ({fee_group, fee_type, installment, head, due_date, late_fee_type, amount}:CreateLateFeeHeadWiseProps) => {
    try {

    
        // Database connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});
        if(!activeSession) return 0;


        // Creating new late fee
        const newLateFeeHeadWise = await LateFeeHeadWise.create({session:activeSession.year_name, fee_group, fee_type, installment, head, due_date, late_fee_type, amount});
        newLateFeeHeadWise.save();


        // Return
        return newLateFeeHeadWise;


    } catch (err:any) {
        console.log(`Error Creating late fee head wise: ${err.message}`);
    }
};





// Fetch late fees head wise
export const fetchLateFeesHeadWise = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching late fees
        const lateFeesHeadWise = await LateFeeHeadWise.find();
        return lateFeesHeadWise;

    } catch (err:any) {
        throw new Error(`Error fetching late fees head wise: ${err}`);
    }
};





// Modify late fee head wise props
interface ModifyLateFeeHeadWiseProps{
    id:String;
    fee_group:String;
    fee_type:String;
    installment:String;
    head:String;
    due_date:Date;
    late_fee_type:String;
    amount:Number;
}
// Modify late fee head wise with id
export const modifyLateFeeHeadWise = async ({id, fee_group, fee_type, installment, head, due_date, late_fee_type, amount}:ModifyLateFeeHeadWiseProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Updating late fee head wise
        const updatedLateFeeHeadWise = await LateFeeHeadWise.findByIdAndUpdate(id, {fee_group, fee_type, installment, head, due_date, late_fee_type, amount});


        // Return 
        return updatedLateFeeHeadWise;

    } catch (err) {
        throw new Error(`Error updating late fee head wise: ${err}`);
    }
};





// Delete late fee head wise
export const deleteLateFeeHeadWise = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting late fee head wise
        await LateFeeHeadWise.findByIdAndDelete(id);
        return 'Late fee head wise deleted';

    } catch (err) {
        throw new Error(`Error deleting late fee head wise: ${err}`);
    }
};