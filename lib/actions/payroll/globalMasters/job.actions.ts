'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import Job from '@/lib/models/payroll/globalMasters/Job.model';
import AcademicYear from '@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model';





// Create job props
interface CreateJobProps{
    post:String;
    salary:String;
    experience:String;
    description:String;
    key_skill:String;
    last_date_of_submission:Date;
};
// Create job
export const createJob = async ({post, salary, experience, description, key_skill, last_date_of_submission}:CreateJobProps) => {
    try {
    
        // Database connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});
        if(!activeSession) return 0;


        // Creating new job
        const newJob = await Job.create({session:activeSession?.year_name, post, salary, experience, description, key_skill, last_date_of_submission, applications:[]});
        newJob.save();


        // Return
        return 'Created';

    } catch (err:any) {
        console.log(`Error creating job: ${err.message}`);
    };
};





// Fetch jobs
export const fetchJobs = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // Fetching
        const jobs = await Job.find({session:activeSession?.year_name}, {post:1, salary:1, experience:1, description:1, key_skill:1, last_date_of_submission:1});


        // Return
        return jobs;

    } catch (err:any) {
        throw new Error(`Error fetching jobs: ${err}`);
    };
};





// Modify job props
interface ModifyJobProps{
    id:String;
    post:String;
    salary:String;
    experience:String;
    description:String;
    key_skill:String;
    last_date_of_submission:Date;
}
// Modify job
export const modifyJob = async ({id, post, salary, experience, description, key_skill, last_date_of_submission}:ModifyJobProps) => {
    try {

        // Db connection
        connectToDb('accounts');

        
        // Update job
        await Job.findByIdAndUpdate(id, {post, salary, experience, description, key_skill, last_date_of_submission}, {new:true});


        // Return
        return 'Updated';

    } catch (err) {
        throw new Error(`Error updating job: ${err}`);
    };
};





// Delete job
export const deleteJob = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting job
        await Job.findByIdAndDelete(id);


        // Return
        return 'Job Deleted';

    } catch (err) {
        throw new Error(`Error deleting job: ${err}`);      
    };
};





// Fetch jobs details
export const fetchJobsDetails = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // Fetching
        const jobs = await Job.find({session:activeSession?.year_name});


        // Return
        return jobs;

    } catch (err:any) {
        throw new Error(`Error fetching jobs: ${err}`);
    };
};