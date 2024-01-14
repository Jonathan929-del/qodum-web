'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import Head from '@/lib/models/fees/feeMaster/defineFeeMaster/FeeHead.model';





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


        // Checking if the head name already exists
        const existingHead = await Head.findOne({name});
        if(existingHead){
            throw new Error('Head name already exists');
        };


        // Creating new head
        const newHead = await Head.create({
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
        return newHead;

        
    } catch (err:any) {
        console.log(`Error Creating Head: ${err.message}`);
    }
};





// Fetch Heads
export const fetchHeads = async (pageNumber = 1, pageSize=20) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching Heads
        const heads = await Head.find();
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
        return updatedHead;

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