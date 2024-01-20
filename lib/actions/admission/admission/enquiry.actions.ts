'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import Enquiry from '@/lib/models/admission/admission/Enquiry.model';





// Create enquiry props
interface CreateEnquiryProps{
    enquiry_no:String;
    enquiry_date:{
        year:String;
        month:String;
        day:String;
    },
    visitor_name:String;
    visitor_address:String;
    mobile_no:Number;
    purpose:String;
    contact_person:String;
    reference_details:String;
};
// Create enquiry
export const createEnquiry = async ({
    enquiry_no,
    enquiry_date:{
        year,
        month,
        day,
    },
    visitor_name,
    visitor_address,
    mobile_no,
    purpose,
    contact_person,
    reference_details
}:CreateEnquiryProps) => {
    try {

    
        // Database connection
        connectToDb('accounts');


        // Creating new enquiiry
        const newEnquiry = await Enquiry.create({
            enquiry_no,
            enquiry_date:{
                year,
                month,
                day,
            },
            visitor_name,
            visitor_address,
            mobile_no,
            purpose,
            contact_person,
            reference_details
        });
        newEnquiry.save();


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
    enquiry_date:{
        year:String;
        month:String;
        day:String;
    },
    visitor_name:String;
    visitor_address:String;
    mobile_no:Number;
    purpose:String;
    contact_person:String;
    reference_details:String;
}
// Modify enquiry
export const modifyEnquiry = async ({
    id,
    enquiry_no,
    enquiry_date:{
        year,
        month,
        day,
    },
    visitor_name,
    visitor_address,
    mobile_no,
    purpose,
    contact_person,
    reference_details
}:ModifyEnquiryProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Update propspectus
        const updatedEnquiry = await Enquiry.findByIdAndUpdate(id, {
            enquiry_no,
            enquiry_date:{
                year,
                month,
                day,
            },
            visitor_name,
            visitor_address,
            mobile_no,
            purpose,
            contact_person,
            reference_details
        }, {new:true});
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