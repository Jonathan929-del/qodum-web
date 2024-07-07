'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import Admission from '@/lib/models/admission/masterSettings/admissionSetting/Admission.model';
import AcademicYear from '@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model';





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


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});
        if(!activeSession) return 0;


        // Checking if the prefix already exists
        if(prefix !== ''){
            const existingAdmission = await Admission.findOne({prefix});
            if(existingAdmission){
                throw new Error('Prefix already exists');
            };
        }


        // Creating new admission
        const newAdmission = await Admission.create({session:activeSession.year_name, school, class_name, board, setting_type, should_be, rec_no, prefix, start_from, lead_zero, suffix});


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


        if(prefix !== ''){
            // Checking if the prefix already exists
            const admissions = await Admission.find();
            const existingAdmission = await Admission.findById(id);
            if(existingAdmission.prefix !== prefix && admissions.map(a => a.prefix).includes(prefix)){throw new Error('Prefix already exists')};
        }


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





// Get class numbers
export const fetchClassNumbers = async ({class_name}:{class_name:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching admission
        const numbers = await Admission.find({class_name});
        return numbers;

    } catch (err) {
        throw new Error(`Error fetching admission: ${err}`);      
    };
};