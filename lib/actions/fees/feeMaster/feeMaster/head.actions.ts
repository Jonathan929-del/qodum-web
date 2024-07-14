'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import Head from '@/lib/models/fees/feeMaster/defineFeeMaster/FeeHead.model';
import AdmittedStudent from '@/lib/models/admission/admission/AdmittedStudent.model';
import AcademicYear from '@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model';





// Is session transfered
export const isHeadsSesssionTransfered = async () => {
    try {

        // Database connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // Records
        const records = await Head.find({session:activeSession.year_name});


        // Return
        return records.length > 0 ? 0 : 1;
        
    }catch(err){
        throw new Error('Error');
    };
};





// Group session transfer
export const headsSesssionTransfer = async ({next_session}:any) => {
    try {

        // Database connection
        connectToDb('accounts');


        // Records
        await Head.updateMany({session:next_session});


        // Return
        return 'Transfered';
        
    }catch(err){
        throw new Error('Error');
    };
};





// Create Head Props
interface CreateHeadProps{
    name:String;
    print_name:String;
    pay_schedule:String;
    priority_no:Number;
    type:String;
    show_in_certificate:Boolean;
    fee_refundable:Boolean;
};
// Create Head Year
export const createHead = async ({name, print_name, pay_schedule, priority_no, type, show_in_certificate, fee_refundable}:CreateHeadProps) => {
    try {

    
        // Database connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});
        if(!activeSession) return 0;


        // Checking if the head name already exists
        const existingHead = await Head.findOne({name});
        if(existingHead){
            throw new Error('Head name already exists');
        };


        // Creating new head
        const newHead = await Head.create({
            session:activeSession.year_name,
            name,
            print_name,
            pay_schedule,
            priority_no,
            type,
            show_in_certificate,
            fee_refundable,
            affiliated_fee_type:''
        });
        newHead.save();


        // Return
        return 'Created';
        
    } catch (err:any) {
        console.log(`Error Creating Head: ${err.message}`);
    }
};





// Fetch Heads
export const fetchHeads = async (pageNumber = 1, pageSize=20) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // Fetching Heads
        const heads = await Head.find({session:activeSession.year_name});
        return heads;

    } catch (err:any) {
        throw new Error(`Error fetching heads: ${err}`);
    }
};





// Modify Head Props
interface ModifyHeadProps{
    id:String;
    name:String;
    print_name:String;
    pay_schedule:String;
    priority_no:Number;
    type:String;
    show_in_certificate:Boolean;
    fee_refundable:Boolean;
}
// Modify head with id
export const modifyHead = async ({id, name, print_name, pay_schedule, priority_no, type, show_in_certificate, fee_refundable}:ModifyHeadProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Checking if the head name already exists
        const heads = await Head.find();
        const existingHead = await Head.findById(id);
        if(existingHead.name !== name && heads.map(i => i.name).includes(name)){throw new Error('Head name already exists')};


        // Update head
        const updatedHead = await Head.findByIdAndUpdate(
            id,
            {
                name,
                print_name,
                pay_schedule,
                priority_no,
                type,
                show_in_certificate,
                fee_refundable
            },
            {new:true}
        );


        // Return 
        return 'Updated';

    } catch (err) {
        throw new Error(`Error updating heads: ${err}`);
    }
};





// Delete head
export const deleteHead = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting head
        await Head.findByIdAndDelete(id);
        return 'Head Deleted';

    } catch (err) {
        throw new Error(`Error deleting head: ${err}`);      
    }
};





// Fetching heads affiliated with types
export const fetchAffiliatedHeads = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching
        const heads = await Head.find();
        const filteredHeads = heads.filter((head:any) => {
            return head.affiliated_fee_type !== '';
        });


        // Return
        return filteredHeads;

    } catch (err) {
        throw new Error(`Error deleting head: ${err}`);
    }
};





// Is group related to student
export const isGroupRelatedToStudent = async ({group_name}) => {
    try {
        
        // Db connection
        connectToDb('accounts');


        // Group name reg ex
        // @ts-ignore
        const groupNameRegex = new RegExp(group_name, 'i');

    
        // Checking
        const students = await AdmittedStudent.find({'affiliated_heads.group_name':{$regex:groupNameRegex}});
        if(students.length > 1){
            const lastRecAmounts = students.map((s:any) => s?.affiliated_heads?.heads.map((h:any) => h?.amounts?.map((a:any) => a?.last_rec_amount).flat()).flat()).flat().filter((i:any) => i !== undefined);
            return lastRecAmounts.length > 0;
        };
        return false;

    } catch (err) {
        throw new Error(`Error checking group relation: ${err}`);
    }
};