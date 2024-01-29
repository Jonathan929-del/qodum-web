'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import Admission from '@/lib/models/admission/masterSettings/admissionSetting/Admission.model';





// Create admission props
interface CreateAdmissionProps{
    school:String;
    class_name:String;
    board:String;
    setting_type:String;
    should_be:String;
    rec_no:Number;
    prefix:String;
    start_from:Number;
    lead_zero:String;
    suffix:String;
};
// Create admission
export const createAdmission = async ({school, class_name, board, setting_type, should_be, rec_no, prefix, start_from, lead_zero, suffix}:CreateAdmissionProps) => {
    try {

    
        // Database connection
        connectToDb('accounts');


        // Creating new admission
        const newAdmission = await Admission.create({school, class_name, board, setting_type, should_be, rec_no, prefix, start_from, lead_zero, suffix});


        // Return
        return newAdmission;


    } catch (err:any) {
        console.log(`Error creating admission: ${err.message}`);
    };
};





// Fetch admissions
export const fetchAdmissions = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching
        const admissions = await Admission.find();
        return admissions;

    } catch (err:any) {
        throw new Error(`Error fetching admissions: ${err}`);
    };
};





// Modify admission props
interface ModifyAdmissionProps{
    id:String;
    school:String;
    class_name:String;
    board:String;
    setting_type:String;
    should_be:String;
    rec_no:Number;
    prefix:String;
    start_from:Number;
    lead_zero:String;
    suffix:String;
}
// Modify admission
export const modifyAdmission = async ({id, school, class_name, board, setting_type, should_be, rec_no, prefix, start_from, lead_zero, suffix}:ModifyAdmissionProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Update admission
        const updatedAdmission = await Admission.findByIdAndUpdate(id, {school, class_name, board, setting_type, should_be, rec_no, prefix, start_from, lead_zero, suffix}, {new:true});
        return updatedAdmission;



    } catch (err) {
        throw new Error(`Error updating admission: ${err}`);
    };
};





// Delete admission
export const deleteAdmission = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting admission
        await Admission.findByIdAndDelete(id);
        return 'Admission Deleted';

    } catch (err) {
        throw new Error(`Error deleting admission: ${err}`);      
    };
};