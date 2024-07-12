'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import Head from '@/lib/models/fees/feeMaster/defineFeeMaster/FeeHead.model';
import FeeType from '@/lib/models/fees/feeMaster/defineFeeMaster/FeeType.model';
import AcademicYear from '@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model';





// Create type props
interface CreateTypeProps{
    name:String;
    preference_no:Number;
    heads:string[];
};
// Create Type
export const createType = async ({name, preference_no, heads}:CreateTypeProps) => {
    try {

    
        // Database connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});
        if(!activeSession) return 0;


        // Checking if the type name already exists
        const existingType = await FeeType.findOne({name});
        if(existingType){
            throw new Error('Fee type already exists');
        };


        // Checking if the preference no. already exists
        const types = await FeeType.find();
        if(types.map((type:any) => type.preference_no).includes(preference_no)){
            throw new Error('Preference number already exists');
        };


        // Creating new type
        const newType = await FeeType.create({
            session:activeSession.year_name,
            name,
            preference_no
        });
        newType.save().then(async () => {
            await FeeType.findOneAndUpdate({name}, {heads});
        });


        // Updating head
        await Head.updateMany({'name':heads}, {affiliated_fee_type:name});


        // Return
        return 'Created';

    } catch (err:any) {
        console.log(`Error Creating Tpe: ${err.message}`);
    }
};





// Fetch typess
export const fetchTypes = async (pageNumber = 1, pageSize=20) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching types
        const types = await FeeType.find();
        return types;

    } catch (err:any) {
        throw new Error(`Error fetching types: ${err}`);
    }
};





// Modify type props
interface ModifyTypeProps{
    id:String;
    name:String;
    preference_no:Number;
    heads:string[];
}
// Modify type with id
export const modifyType = async ({id, name, preference_no, heads}:ModifyTypeProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Checking if the year name already exists
        const types = await FeeType.find();
        const existingType = await FeeType.findById(id);
        if(existingType.name !== name && types.map(i => i.name).includes(name)){throw new Error('Fee type name already exists')};
        // Checking if the preference number already exists
        if(existingType.preference_no !== preference_no && types.map(i => i.preference_no).includes(preference_no)){throw new Error('Preference number already exists')};


        // Freeing disselected heads from fee type
        const difference = existingType.heads.filter((x:any) => !heads.includes(x));
        await Head.updateMany({'name':difference}, {affiliated_fee_type:''});


        // Update type
        const updatedType = await FeeType.findByIdAndUpdate(
            id,
            {
                name,
                preference_no,
                heads
            },
            {new:true}
        );


        // Updating head
        await Head.updateMany({'name':heads}, {affiliated_fee_type:name});


        // Return 
        return 'Updated';

    } catch (err) {
        throw new Error(`Error updating type: ${err}`);
    }
};





// Delete type
export const deleteType = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting type
        await FeeType.findByIdAndDelete(id);
        return 'Fee type deleted';

    } catch (err) {
        throw new Error(`Error deleting fee type: ${err}`);
    }
};





// Fetching free heads
export const fetchFreeHeads = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching
        const heads = await Head.find();
        const freeHeads = heads.filter((head:any) => head.affiliated_fee_type === '' || !head.affiliated_fee_type);


        // Return
        return freeHeads;
        
    } catch (err) {
        throw new Error(`Error fetching fee heads: ${err}`);
    }
};