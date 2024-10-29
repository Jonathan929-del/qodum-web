'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import Admission from '@/lib/models/admission/masterSettings/admissionSetting/Admission.model';
import AcademicYear from '@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model';
import AdmissionGuideline from '@/lib/models/admission/masterSettings/AdmissionGuideline.model';





// Create guideline props
interface CreateGuidelinesProps{
    guidelines:String;
};
// Create guidelines
export const createGuidelines = async ({guidelines}:CreateGuidelinesProps) => {
    try {

        // Database connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});
        if(!activeSession) return 0;


        // Checked for previous guidelines
        const previousGuidelinesLength = await AdmissionGuideline.countDocuments({session:activeSession?.year_name});
        if(previousGuidelinesLength > 0){
            return {
                status:'failure',
                message:'Previous guidlinelines exist'
            };
        };


        // Creating new guidelines
        await AdmissionGuideline.create({session:activeSession?.year_name, guidelines});


        // Return
        return 'Created';

    } catch (err:any) {
        console.log(`Error creating guidline: ${err.message}`);
    };
};





// modify guideline props
interface ModifyGuidelinesProps{
    guidelines:String;
};
// Modify guidelines
export const modifyGuidelines = async ({guidelines}:ModifyGuidelinesProps) => {
    try {

        // Database connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});
        if(!activeSession) return 0;


        // Checked guideline existence
        const guideline = await AdmissionGuideline.findOne({session:activeSession?.year_name});
        if(!guideline){
            return {
                status:'failure',
                message:'No record found'
            };
        };


        // Updating guidelines
        await AdmissionGuideline.findOneAndUpdate({session:activeSession?.year_name}, {guidelines});


        // Return
        return 'Modified';

    } catch (err:any) {
        console.log(`Error creating guidline: ${err.message}`);
    };
};





// Fetch guideline
export const fetchGuidline = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // Fetching
        const guideline = await AdmissionGuideline.findOne({session:activeSession?.year_name});


        // Checked guideline existence
        if(!guideline){
            return {
                status:'failure',
                message:'No record found'
            };
        };


        // Return
        return JSON.parse(JSON.stringify(guideline));

    } catch (err:any) {
        throw new Error(`Error fetching guideline: ${err}`);
    };
};