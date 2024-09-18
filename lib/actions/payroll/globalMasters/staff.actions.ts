'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import Staff from '@/lib/models/payroll/globalMasters/Staff.model';
import AcademicYear from '@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model';





// Create staff props
interface CreateStaffProps{
    // Staff registration
    staff_registration:{
        pref_no:Number
        first_name_title:String;
        first_name:String;
        middle_name:String;
        last_name:String;
        gender:String;
        email:String;
        alternate_email:String;
        phone:Number;
        mobile:Number;
        alternate_mobile:Number;
        emergency_mobile:Number;
        wing:String;
        is_active:Boolean;
        profile_picture:String;
        maritial_status:String;
        qualification:String;
        date_of_birth:Date;
        date_of_anniversary:Date;
        date_of_joining:Date;
        date_of_retire:Date;
        date_of_retire_is_extend:Boolean;
        address:String;
        current_address:String;
        father_or_spouse_name:String;
        father_or_spouse_mobile:Number;
        father_or_spouse_relation:String;
        blood_group:String;
        staff_type:String;
        designation:String;
        department:String;
        religion:String;
        aadhar_card_no:Number;
    },

    //Staff salary details
    staff_salary_details:{
        emp_no:String;
        pan_no:String;
        bank_name:String;
        bank_account_no:String;
        is_generate_salary:Boolean;
        is_salary_to_bank:Boolean;
        machine_no:Number;
        pf_no:String;
        esi_no:String;
        uan_no:String;
        emp_acc_no:String;
        status:String;
        salary_group:String;
        basic_salary_part:{
            basic:{
                value:Number;
                applied_on:Date;
            };
            grade_pay:{
                value:Number;
                applied_on:Date;
            };
        },
        confirmation_date:Date;
        permanent_date:Date;
        leaving_date:Date;
        joining_date_epf:Date;
        joining_date_eps:Date;
        leaving_date_epf:Date;
        leaving_date_eps:Date;
        probation_date:Date;
        increment_date:Date;
        reason_of_leaving:String;
        short_name:String;
    },

    // Staff salary head
    staff_salary_heads:any;

    // Staff educational details
    staff_educational_details:any;

    // Staff document details
    staff_document_details:any;
};
// Create staff
export const createStaff = async ({staff_registration, staff_salary_details, staff_salary_heads, staff_educational_details, staff_document_details}:CreateStaffProps) => {
    try {
    
        // Database connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});
        if(!activeSession) return 0;


        // Checking if the staff already exists
        const existingStaff = await Staff.findOne({'staff_registration.pref_no':staff_registration.pref_no, session:activeSession?.year_name});
        if(existingStaff){
            throw new Error('Staff already exists');
        };


        // Creating new staff
        const newStaff = await Staff.create({session:activeSession?.year_name, staff_registration, staff_salary_details});
        newStaff.save().then(async () => {
            await Staff.findOneAndUpdate({'staff_registration.pref_no':staff_registration.pref_no}, {staff_salary_heads, staff_educational_details, staff_document_details});
        });


        // Return
        return 'Created';

    } catch (err:any) {
        console.log(`Error creating staff: ${err.message}`);
    };
};





// Fetch staff
export const fetchStaff = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // Fetching
        const staff = await Staff.find({session:activeSession?.year_name});


        // Return
        return staff;

    } catch (err:any) {
        throw new Error(`Error fetching staff staff: ${err}`);
    };
};





// Modify staff props
interface ModifyStaffProps{
    id:String;
    // Staff registration
    staff_registration:{
        pref_no:Number
        first_name_title:String;
        first_name:String;
        middle_name:String;
        last_name:String;
        gender:String;
        email:String;
        alternate_email:String;
        phone:Number;
        mobile:Number;
        alternate_mobile:Number;
        emergency_mobile:Number;
        wing:String;
        is_active:Boolean;
        profile_picture:String;
        maritial_status:String;
        qualification:String;
        date_of_birth:Date;
        date_of_anniversary:Date;
        date_of_joining:Date;
        date_of_retire:Date;
        date_of_retire_is_extend:Boolean;
        address:String;
        current_address:String;
        father_or_spouse_name:String;
        father_or_spouse_mobile:Number;
        father_or_spouse_relation:String;
        blood_group:String;
        staff_type:String;
        designation:String;
        department:String;
        religion:String;
        aadhar_card_no:Number;
    },

    //Staff salary details
    staff_salary_details:{
        emp_no:String;
        pan_no:String;
        bank_name:String;
        bank_account_no:String;
        is_generate_salary:Boolean;
        is_salary_to_bank:Boolean;
        machine_no:Number;
        pf_no:String;
        esi_no:String;
        uan_no:String;
        emp_acc_no:String;
        status:String;
        salary_group:String;
        basic_salary_part:{
            basic:{
                value:Number;
                applied_on:Date;
            };
            grade_pay:{
                value:Number;
                applied_on:Date;
            };
        },
        confirmation_date:Date;
        permanent_date:Date;
        leaving_date:Date;
        joining_date_epf:Date;
        joining_date_eps:Date;
        leaving_date_epf:Date;
        leaving_date_eps:Date;
        probation_date:Date;
        increment_date:Date;
        reason_of_leaving:String;
        short_name:String;
    },

    // Staff salary head
    staff_salary_heads:any;

    // Staff educational details
    staff_educational_details:any;

    // Staff document details
    staff_document_details:any;
}
// Modify staff
export const modifyStaff = async ({id, staff_registration, staff_salary_details, staff_salary_heads, staff_educational_details, staff_document_details}:ModifyStaffProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});


        // Checking if the staff already exists
        const staff = await Staff.find({session:activeSession?.year_name});
        const existingStaff = await Staff.findById(id);
        if(existingStaff.staff_registration.pref_no !== staff_registration.pref_no && staff.map(s => s.staff_registration.pref_no).includes(staff_registration.pref_no)){throw new Error('Staff pref no. already exists')};

        
        // Update staff
        await Staff.findByIdAndUpdate(id, {staff_registration, staff_salary_details, staff_salary_heads, staff_educational_details, staff_document_details}, {new:true});


        // Return
        return 'Updated';

    } catch (err) {
        throw new Error(`Error updating staff: ${err}`);
    };
};





// Delete staff
export const deleteStaff = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting staff
        await Staff.findByIdAndDelete(id);


        // Return
        return 'Staff deleted';

    } catch (err) {
        throw new Error(`Error deleting staff: ${err}`);      
    };
};