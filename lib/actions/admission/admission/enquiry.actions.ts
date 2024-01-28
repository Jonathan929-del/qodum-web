'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import Enquiry from '@/lib/models/admission/admission/Enquiry.model';
import Student from '@/lib/models/admission/admission/Student.model';





// Create enquiry props
interface CreateEnquiryProps{
    enquiry_no:String;
    enquiry_date:Date,
    visitor_name:String;
    visitor_address:String;
    mobile_no:Number;
    purpose_is_admission:Boolean;
    student_name:String;
    class_name:String;
    reason_to_visit:String;
    contact_person:String;
    reference_details:String;
};
// Create enquiry
export const createEnquiry = async ({
    enquiry_no,
    enquiry_date,
    visitor_name,
    visitor_address,
    mobile_no,
    purpose_is_admission,
    student_name,
    class_name,
    reason_to_visit,
    contact_person,
    reference_details
}:CreateEnquiryProps) => {
    try {

    
        // Database connection
        connectToDb('accounts');


        // Creating new enquiiry
        const newEnquiry = await Enquiry.create({
            enquiry_no,
            enquiry_date,
            visitor_name,
            visitor_address,
            mobile_no,
            purpose_is_admission,
            student_name,
            class_name,
            reason_to_visit,
            contact_person,
            reference_details
        });
        newEnquiry.save();


        // Creating student
        if(purpose_is_admission){
            const newStudent = await Student.create({
                student:{
                    enquiry_no,
                    h_no_and_streets:visitor_address,
                    contact_person_mobile:mobile_no,
                    name:student_name,
                    class:class_name,
                    contact_person_name:contact_person
                },
                parents:{},
                others:{},
                guardian_details:{}
            });
            newStudent.save();
        };


        // Return
        return newEnquiry;


    } catch (err:any) {
        console.log(`Error creating enquiry: ${err.message}`);
    };
};





// Fetch enquiries
export const fetchEnquiries = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching
        const enquiries = await Enquiry.find();
        return enquiries;

    } catch (err:any) {
        throw new Error(`Error fetching enquiries: ${err}`);
    };
};





// Modify enquiry props
interface ModifyEnquiryProps{
    id:String;
    enquiry_no:String;
    enquiry_date:Date;
    visitor_name:String;
    visitor_address:String;
    mobile_no:Number;
    purpose_is_admission:Boolean;
    student_name:String;
    class_name:String;
    reason_to_visit:String;
    contact_person:String;
    reference_details:String;
};
// Modify enquiry
export const modifyEnquiry = async ({
    id,
    enquiry_no,
    enquiry_date,
    visitor_name,
    visitor_address,
    mobile_no,
    purpose_is_admission,
    student_name,
    class_name,
    reason_to_visit,
    contact_person,
    reference_details
}:ModifyEnquiryProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Update propspectus
        const updatedEnquiry = await Enquiry.findByIdAndUpdate(id, {
            enquiry_no,
            enquiry_date,
            visitor_name,
            visitor_address,
            mobile_no,
            purpose_is_admission,
            student_name,
            class_name,
            reason_to_visit,
            contact_person,
            reference_details
        }, {new:true});


        // Creating student
        if(purpose_is_admission){
            const newStudent = await Student.create({
                student:{
                    enquiry_no,
                    h_no_and_streets:visitor_address,
                    contact_person_mobile:mobile_no,
                    name:student_name,
                    class:class_name,
                    contact_person_name:contact_person
                },
                parents:{},
                others:{},
                guardian_details:{}
            });
            newStudent.save();
        };


        // Return
        return updatedEnquiry;


    } catch (err) {
        throw new Error(`Error updating enquiry: ${err}`);
    };
};





// Delete enquiry
export const deleteEnquiry = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting enquiry
        await Enquiry.findByIdAndDelete(id);
        return 'Enquiry Deleted';

    } catch (err) {
        throw new Error(`Error deleting enquiry: ${err}`);
    };
};