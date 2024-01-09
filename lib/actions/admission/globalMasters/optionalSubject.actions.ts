'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import OptionalSubject from '@/lib/models/admission/globalMasters/OptionalSubject.model';





// Create optional subject props
interface CreateOptionalSubjectProps{
    object_name:String;
};
// Create optional subject
export const createSubject = async ({object_name}:CreateOptionalSubjectProps) => {
    try {

    
        // Database connection
        connectToDb('accounts');


        // Checking if the optional subject already exists
        const existinOptionalSubject = await OptionalSubject.findOne({object_name});
        if(existinOptionalSubject){
            throw new Error('Subject already exists');
        };


        // Creating new optional subject
        const newOptionalSubject = await OptionalSubject.create({object_name});
        newOptionalSubject.save();


        // Return
        return newOptionalSubject;

        
    } catch (err:any) {
        console.log(`Error creating optional subject: ${err.message}`);
    };
};





// Fetch subjects
export const fetchOptionalSubjects = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching
        const subjects = await OptionalSubject.find();
        return subjects;

    } catch (err:any) {
        throw new Error(`Error fetching subjects: ${err}`);
    };
};




// Modify subject props
interface ModifySubjectProps{
    id:String;
    subject_name:String;
}
// Modify subject
export const modifySubject = async ({id, subject_name}:ModifySubjectProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Checking if the subject already exists
        const subjects = await OptionalSubject.find();
        const existingSubject = await OptionalSubject.findById(id);
        if(existingSubject.subject_name !== subject_name && subjects.map(s => s.subject_name).includes(subject_name)){throw new Error('Optional subject already exists')};


        // Updating subject
        const updatedSubject = await OptionalSubject.findByIdAndUpdate(id, {subject_name}, {new:true});


        // Return
        return updatedSubject;

    } catch (err) {
        throw new Error(`Error updating optional subject: ${err}`);
    };
};




// Delete subject
export const deleteSubject = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting subject
        await OptionalSubject.findByIdAndDelete(id);
        return 'Optional subject deleted';

    } catch (err) {
        throw new Error(`Error deleting optional subject: ${err}`);      
    };
};