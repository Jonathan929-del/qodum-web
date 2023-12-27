'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import Section from '@/lib/models/fees/globalMasters/defineClassDetails/Section.model';





// Create Section Props
interface CreateSectionProps{
    section_name:String;
    order_no:Number;
};
// Create Section
export const createSection = async ({section_name, order_no}:CreateSectionProps) => {
    try {

    
        // Database connection
        connectToDb('accounts');


        // Checking if the section already exists
        const existinSection = await Section.findOne({section_name});
        if(existinSection){
            throw new Error('Section name already exists');
        };


        // Creating new section
        const newSection = await Section.create({section_name, order_no});
        newSection.save();


        // Return
        return newSection;

        
    } catch (err:any) {
        console.log(`Error creating section: ${err.message}`);
    };
};





// Fetch sections
export const fetchSections = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching
        const sections = await Section.find();
        return sections;

    } catch (err:any) {
        throw new Error(`Error fetching sections: ${err}`);
    };
};





// Modify Section Props
interface ModifySectionProps{
    id:String;
    section_name:String;
    order_no:Number;
};
// Modify Section
export const modifySection = async ({id, section_name, order_no}:ModifySectionProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Checking if the section already exists
        const sections = await Section.find();
        const existingSection = await Section.findById(id);
        if(existingSection.section_name !== section_name && sections.map(section => section.section_name).includes(section_name)){throw new Error('Section name already exists')};


        // Updating section
        const updatedSection = await Section.findByIdAndUpdate(id, {section_name, order_no}, {new:true});


        // Return
        return updatedSection;

    } catch (err) {
        throw new Error(`Error updating section: ${err}`);
    };
};





// Delete section
export const deleteSection = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting section
        await Section.findByIdAndDelete(id);
        return 'Section Deleted';

    } catch (err) {
        throw new Error(`Error deleting section: ${err}`);      
    };
};