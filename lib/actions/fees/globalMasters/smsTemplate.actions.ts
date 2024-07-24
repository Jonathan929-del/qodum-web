'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import SmsTemplate from '@/lib/models/fees/globalMasters/SmsTemplate.model';
import AcademicYear from '@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model';





// Create sms template props
interface CreateSmsTemplateProps{
    sms_type:String;
    sms_template:String;
    is_enable:Boolean;
};
// Create sms template
export const createSmsTemplate = async ({sms_type, sms_template, is_enable}:CreateSmsTemplateProps) => {
    try {

    
        // Database connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});
        if(!activeSession) return 0;


        // Creating new sms template
        const newSmsTemplate = await SmsTemplate.create({session:activeSession?.year_name, sms_type, sms_template, is_enable});
        newSmsTemplate.save();


        // Return
        return 'Created';

    } catch (err:any) {
        console.log(`Error creating sms template: ${err.message}`);
    }
};





// Fetch sms templates
export const fetchSmsTemplates = async () => {
    try {

        // Db connection
        connectToDb('accounts');

    
        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // Fetching sms templates
        const smsTemplates = await SmsTemplate.find({session:activeSession?.year_name});
        return smsTemplates;

    } catch (err:any) {
        throw new Error(`Error fetching sms templates: ${err}`);
    }
};





// Modify sms template props
interface ModifySmsTemplateProps{
    id:String;
    sms_type:String;
    sms_template:String;
    is_enable:Boolean;
}
// Modify sms template
export const modifySmsTemplate = async ({id, sms_type, sms_template, is_enable}:ModifySmsTemplateProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Update sms template
        await SmsTemplate.findByIdAndUpdate(id, {sms_type, sms_template, is_enable}, {new:true});


        // Return 
        return 'Updated';

    } catch (err) {
        throw new Error(`Error updating sms template: ${err}`);
    }
};





// Delete sms template
export const deleteSmsTemplate = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting sms template
        await SmsTemplate.findByIdAndDelete(id);
        return 'Sms template deleted';

    } catch (err) {
        throw new Error(`Error deleting sms template: ${err}`);      
    }
};