'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import FeeEntrySetting from '@/lib/models/fees/masterSettings/FeeEntrySetting';
import AcademicYear from '@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model';





// Create fee entry setting props
interface CreateFeeEntrySettingProps{
    prefix:any;
    lead_zero:any;
    receipt_no_start:any;
    suffix:any;
    generate_type:any;
};
// Create fee entry setting
export const createFeeEntrySetting = async ({prefix, lead_zero, receipt_no_start, suffix, generate_type}:CreateFeeEntrySettingProps) => {
    try {

        // Database connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});
        if(!activeSession) return 0;

    
        // Fee entry setting
        const feeEntrySetting = await FeeEntrySetting.create({session:activeSession.year_name, prefix, lead_zero, receipt_no_start, suffix, generate_type});
        feeEntrySetting.save();


        // Return
        return feeEntrySetting;

    } catch (err:any) {
        console.log(`Error creating fee entry setting: ${err.message}`);
    };
};





// Fetch fee entry settings
export const fetchFeeEntrySettings = async () => {
    try {

        // Database connection
        connectToDb('accounts');

    
        // Fee entry settings
        const feeEntrSettings = await FeeEntrySetting.find();


        // Return
        return feeEntrSettings;


    } catch (err:any) {
        console.log(`Error fetching fee entry settings: ${err.message}`);
    };
};





// Modify fee entry setting props
interface ModifyFeeEntrySettingProps{
    id:String;
    prefix:any;
    lead_zero:any;
    receipt_no_start:any;
    suffix:any;
    generate_type:any;
}
// Modify fee entry setting
export const modifyFeeEntrySetting = async ({id, prefix, lead_zero, receipt_no_start, suffix, generate_type}:ModifyFeeEntrySettingProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Update fee entry setting
        const updateFeeEntrySetting = await FeeEntrySetting.findByIdAndUpdate(id, {prefix, lead_zero, receipt_no_start, suffix, generate_type}, {new:true});


        // Return 
        return updateFeeEntrySetting;

    } catch (err) {
        throw new Error(`Error updating fee entry setting: ${err}`);
    }
};





// Delete fee entry setting
export const deleteFeeEntrySetting = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting fee entry setting
        await FeeEntrySetting.findByIdAndDelete(id);
        return 'Fee entry setting deleted';

    } catch (err) {
        throw new Error(`Error deleting fee entry setting: ${err}`);      
    }
};