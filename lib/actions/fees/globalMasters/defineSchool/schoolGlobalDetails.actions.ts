'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import AcademicYear from '@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model';
import GlobalSchoolDetails from '@/lib/models/fees/globalMasters/defineSchool/SchoolGlobalDetails.model';





// Create global school details Props
interface CreateGlobalSchoolDetailsProps{
    logo:String;
    school_main:Boolean,
    school_subheads:Boolean,
    school_name:String,
    school_address:String,
    school_address_2:String,
    school_short_name:String,
    contact_no:String,
    mobile:String,
    email:String,
    support_email_id:String,
    website:String,
    prefix:String,
    iso_details:String,
    school_no:String,
    affiliation_to:String,
    affiliation_no:String,
    udise_code:String,
    pen:String,
    associates:String,
    renew_up_to:String,
    school_status:String,
    working_days:String,
    recess:String,
    total_period:String,
    academic_year:String,
    financial_year:String
};
// Create global school details
export const createGlobalSchoolDetails = async ({
    logo,
    school_main,
    school_subheads,
    school_name,
    school_address,
    school_address_2,
    school_short_name,
    contact_no,
    mobile,
    email,
    support_email_id,
    website,
    prefix,
    iso_details,
    school_no,
    affiliation_to,
    affiliation_no,
    udise_code,
    pen,
    associates,
    renew_up_to,
    school_status,
    working_days,
    recess,
    total_period,
    academic_year,
    financial_year
    }:CreateGlobalSchoolDetailsProps) => {
    try {

    
        // Database connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});
        if(!activeSession) return 0;


        // Creating new global school details
        const newGlobalSchoolDetails = await GlobalSchoolDetails.create({
            session:activeSession.year_name,
            logo,
            school_main,
            school_subheads,
            school_name,
            school_address,
            school_address_2,
            school_short_name,
            contact_no,
            mobile,
            email,
            support_email_id,
            website,
            prefix,
            iso_details,
            school_no,
            affiliation_to,
            affiliation_no,
            udise_code,
            pen,
            associates,
            renew_up_to,
            school_status,
            working_days,
            recess,
            total_period,
            academic_year,
            financial_year
        });
        newGlobalSchoolDetails.save();
        return newGlobalSchoolDetails;

        
    } catch (err:any) {
        console.log(`Error creating global school details: ${err.message}`);
    };
};





// Fetch global school details
export const fetchGlobalSchoolDetails = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching
        const globalSchoolDetails = await GlobalSchoolDetails.find();
        return globalSchoolDetails;

    } catch (err:any) {
        throw new Error(`Error fetching global school details: ${err}`);
    };
};




// Modify global school details Props
interface ModifyGlobalSchoolDetailsProps{
    id:String;
    logo:String;
    school_main:Boolean,
    school_subheads:Boolean,
    school_name:String,
    school_address:String,
    school_address_2:String,
    school_short_name:String,
    contact_no:String,
    mobile:String,
    email:String,
    support_email_id:String,
    website:String,
    prefix:String,
    iso_details:String,
    school_no:String,
    affiliation_to:String,
    affiliation_no:String,
    udise_code:String,
    pen:String,
    associates:String,
    renew_up_to:String,
    school_status:String,
    working_days:String,
    recess:String,
    total_period:String,
    academic_year:String,
    financial_year:String
}
// Modify global school details
export const modifyGlobalSchoolDetails = async ({
    id,
    logo,
    school_main,
    school_subheads,
    school_name,
    school_address,
    school_address_2,
    school_short_name,
    contact_no,
    mobile,
    email,
    support_email_id,
    website,
    prefix,
    iso_details,
    school_no,
    affiliation_to,
    affiliation_no,
    udise_code,
    pen,
    associates,
    renew_up_to,
    school_status,
    working_days,
    recess,
    total_period,
    academic_year,
    financial_year
}:ModifyGlobalSchoolDetailsProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Update global school details
        const updatedGlobalSchoolDetails = await GlobalSchoolDetails.findByIdAndUpdate(
            id,
            {
                logo,
                school_main,
                school_subheads,
                school_name,
                school_address,
                school_address_2,
                school_short_name,
                contact_no,
                mobile,
                email,
                support_email_id,
                website,
                prefix,
                iso_details,
                school_no,
                affiliation_to,
                affiliation_no,
                udise_code,
                pen,
                associates,
                renew_up_to,
                school_status,
                working_days,
                recess,
                total_period,
                academic_year,
                financial_year
            },
            {new:true}
        );
        return updatedGlobalSchoolDetails;

    } catch (err) {
        throw new Error(`Error updating global school details: ${err}`);
    };
};




// Delete global school details
export const deleteGlobalSchoolDetails = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting global school details
        await GlobalSchoolDetails.findByIdAndDelete(id);
        return 'Global school details Deleted';

    } catch (err) {
        throw new Error(`Error deleting global school details: ${err}`);      
    };
};