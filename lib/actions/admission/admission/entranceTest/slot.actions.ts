'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import Slot from '@/lib/models/admission/admission/entranceTest/Slot.model';
import AcademicYear from '@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model';





// Create slot props
interface CreateSlotProps{
    session:String;
    class_name:String;
    slot_name:String;
    slot_date:Date;
    start_time:String;
    end_time:String;
    applicant:Number;
    alloted:Number;
    students:any;
};
// Create slot
export const createSlot = async ({session, class_name, slot_name, slot_date, start_time, end_time, applicant, alloted, students}:CreateSlotProps) => {
    try {

    
        // Database connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});
        if(!activeSession) return 0;


        // Creating new slot
        const newSlot = await Slot.create({session, class_name, slot_name, slot_date, start_time, end_time, applicant, alloted});
        newSlot.save().then(async () => {
            await Slot.findByIdAndUpdate(newSlot._id, {students});
        });


        // Return
        return 'Created';

    } catch (err:any) {
        console.log(`Error creating slot: ${err.message}`);
    };
};





// Fetch slots
export const fetchSlots = async ({session, class_name}:{session:String; class_name:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching
        const slots = await Slot.find({session, class_name});
        return slots;

    } catch (err:any) {
        throw new Error(`Error fetching slots: ${err}`);
    };
};





// Modify slot props
interface ModifySlotProps{
    id:String;
    slot_date:Date;
    start_time:String;
    end_time:String;
    applicant:Number;
    alloted:Number;
};
// Modify slot
export const modifySlot = async ({id, slot_date, start_time, end_time, applicant, alloted}:ModifySlotProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Update slot
        const updateSlot = await Slot.findByIdAndUpdate(id, {slot_date, start_time, end_time, applicant, alloted}, {new:true});


        // Return
        return 'Updated';

    } catch (err) {
        throw new Error(`Error updating slot: ${err}`);
    };
};





// Delete slot
export const deleteSlot = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting slot
        await Slot.findByIdAndDelete(id);
        return 'Slot Deleted';

    } catch (err) {
        throw new Error(`Error deleting slot: ${err}`);
    };
};