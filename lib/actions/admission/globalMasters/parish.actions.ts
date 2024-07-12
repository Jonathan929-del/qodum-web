'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import Parish from '@/lib/models/admission/globalMasters/Parish.model';
import AcademicYear from '@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model';





// Create parish props
interface CreateParishProps{
    parish:String;
    religion:string[];
};
// Create parish
export const createParish = async ({parish, religion}:CreateParishProps) => {
    try {

    
        // Database connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});
        if(!activeSession) return 0;


        // Checking if the parish already exists
        const existinParish = await Parish.findOne({parish, religion});
        if(existinParish){
            throw new Error('Parish already exists');
        };


        // Creating new parish
        const newParish = await Parish.create({session:activeSession.year_name, parish});
        newParish.save().then(async () => {
            await Parish.findOneAndUpdate({parish}, {religion});
        });


        // Return
        return 'Created';
        
    } catch (err:any) {
        console.log(`Error creating parish: ${err.message}`);
    };
};





// Fetch parishes
export const fetchParishes = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching
        const parishes = await Parish.find();
        return parishes;

    } catch (err:any) {
        throw new Error(`Error fetching parishes: ${err}`);
    };
};




// Modify parish props
interface ModifyParishProps{
    id:String;
    parish:String;
    religion:string[];
}
// Modify stationry details
export const modifyParish = async ({id, parish, religion}:ModifyParishProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Checking if the parish already exists
        const parishes = await Parish.find();
        const existingParish = await Parish.findById(id);
        if(existingParish.parish !== parish && parishes.map(p => p.parish).includes(parish)){throw new Error('Parish already exists')};


        // Updating parish
        const updatedParish = await Parish.findByIdAndUpdate(id, {parish, religion}, {new:true});


        // Return
        return 'Updated';

    } catch (err) {
        throw new Error(`Error updating parish: ${err}`);
    };
};




// Delete parish
export const deleteParish = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting parish
        await Parish.findByIdAndDelete(id);
        return 'Parish deleted';

    } catch (err) {
        throw new Error(`Error deleting parish: ${err}`);      
    };
};