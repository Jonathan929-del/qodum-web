'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import EnquiryNoSetting from '@/lib/models/admission/masterSettings/EnquiryNoSetting.model';
import AcademicYear from '@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model';
import Enquiry from '@/lib/models/admission/admission/Enquiry.model';





// Create enquiry no setting props
interface CreateEnquiryNoProps{
    session:String;
    enquiry_no_setting_should_be:String;
    prefix:String;
    start_from:Number;
    lead_zero:Number;
    suffix:String;
};
// Create enquiry no setting
export const createEnquiryNoSetting = async ({session, enquiry_no_setting_should_be, prefix, start_from, lead_zero, suffix}:CreateEnquiryNoProps) => {
    try {

    
        // Database connection
        connectToDb('accounts');


        // Creating new enquiry no setting
        const newEnquiryNoSetting = await EnquiryNoSetting.create({session, enquiry_no_setting_should_be, prefix, start_from, lead_zero, suffix});
        newEnquiryNoSetting.save();


        // Return
        return 'Created';

    } catch (err:any) {
        console.log(`Error creating enquiry no. setting: ${err.message}`);
    };
};





// Fetch enquiry no settings
export const fetchEnquiryNoSettings = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching
        const enquiryNoSettings = await EnquiryNoSetting.find();


        // Return
        return enquiryNoSettings;

    } catch (err:any) {
        throw new Error(`Error fetching enquiry no settings: ${err}`);
    };
};





// Modify enquiry no props
interface ModifyEnquiryNoProps{
    id:String;
    session:String;
    enquiry_no_setting_should_be:String;
    prefix:String;
    start_from:Number;
    lead_zero:Number;
    suffix:String;
}
// Modify enquiry no setting
export const modifyEnquiryNoSetting = async ({id, session, enquiry_no_setting_should_be, prefix, start_from, lead_zero, suffix}:ModifyEnquiryNoProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Update enquiry no settings
        await EnquiryNoSetting.findByIdAndUpdate(id, {session, enquiry_no_setting_should_be, prefix, start_from, lead_zero, suffix}, {new:true});


        // Return
        return 'Updated';

    } catch (err) {
        throw new Error(`Error updating enquiry no setting: ${err}`);
    };
};





// Delete enquiry no setting
export const deleteEnquiryNoSetting = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting enquiry no setting
        await EnquiryNoSetting.findByIdAndDelete(id);


        // Return
        return 'Enquiry no setting deleted';

    } catch (err) {
        throw new Error(`Error deleting enquiry no setting: ${err}`);      
    };
};





// Is enquiry no editable
export const isEnquiryNumberEditable = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching enquiries count
        const enquiriesCount = await Enquiry.countDocuments();


        return enquiriesCount > 0 ? 0 : 1;
        
    }catch(err){
        console.log(err);  
    };
};