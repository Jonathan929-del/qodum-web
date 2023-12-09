'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import NarrationMaster from '@/lib/models/accounts/NarrationMaster.model';
import mongoose from 'mongoose';





// Create Narration Master Props
interface CreateNarrationMasterProps{
    voucher_type:String,
    narration:String
};
// Create Narration Master
export const createNarrationMaster = async ({voucher_type, narration}:CreateNarrationMasterProps) => {
    try {

    
        // Database connection
        connectToDb('accounts');


        // Creating new narration master
        const newNarrationMaster = await NarrationMaster.create({
            voucher_type,
            narration
        });
        newNarrationMaster.save();
        return newNarrationMaster;

        
    } catch (err:any) {
        console.log(`Error Creating Narration Master: ${err.message}`);
    }
};





// Fetch Narration Masters
export const fetchNarrationMasters = async (pageNumber = 1, pageSize=20) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching
        const narrations = await NarrationMaster.find();
        return {narrations};


        // // Skip amount
        // const skipAmount = (pageNumber - 1) * pageSize;
        
        // // Threads fetching
        // const threadsQuery = Thread
        //     .find({parentId:{$in:[null, undefined]}})
        //     .sort({createdAt:'desc'})
        //     .skip(skipAmount)
        //     .limit(pageSize)
        //     .populate({
        //         path:'author',
        //         model:User
        //     })
        //     .populate({
        //         path:'community',
        //         model:Community,
        //     })
        //     .populate({
        //         path:'children',
        //         populate:{
        //             path:'author',
        //             model:User,
        //             select:'_id name parentId image'
        //         }
        //     });
        // const totalThreadsCount = await Thread.countDocuments({parentId:{$in:[null, undefined]}});
        // const threads = await threadsQuery.exec();
        // const isNext = totalThreadsCount > skipAmount + threads.length;

        
    } catch (err:any) {
        throw new Error(`Error fetching narration masters: ${err}`);
    }
};




// Modify Narration Master Props
interface ModifyNarrationMasterProps{
    id:String;
    narration:String;
    voucher_type:String;
}
// Modify Narration Master
export const modifyNarrationMaster = async ({id, narration, voucher_type}:ModifyNarrationMasterProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Update Narration
        const updatedNarration = await NarrationMaster.findByIdAndUpdate(id, {narration, voucher_type}, {new:true});
        return updatedNarration;


    } catch (err) {
        throw new Error(`Error updating narration master: ${err}`);
    }
};




// Delete Narration Master
export const deleteNarrationMaster = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting Narration
        await NarrationMaster.findByIdAndDelete(id);
        console.log(id);
        return 'Narration Master Deleted';

    } catch (err) {
        throw new Error(`Error deleting narration master: ${err}`);      
    }
};