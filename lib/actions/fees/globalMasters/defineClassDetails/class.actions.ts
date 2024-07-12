'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import Group from '@/lib/models/fees/feeMaster/defineFeeMaster/FeeGroup.model';
import Class from '@/lib/models/fees/globalMasters/defineClassDetails/Class.model';
import AcademicYear from '@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model';





// Create Class Props
interface CreateClassProps{
    class_name:String;
    wing_name:String;
    school:String;
    order:Number;
};
// Create Class
export const createClass = async ({class_name, wing_name, school, order}:CreateClassProps) => {
    try {
    
        // Database connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});
        if(!activeSession) return 0;


        // Checking if the class already exists
        const existinClass = await Class.findOne({class_name});
        if(existinClass){
            throw new Error('Class name already exists');
        };


        // Creating new class
        const newClass = await Class.create({session:activeSession.year_name, class_name, wing_name, school, order});
        newClass.save();


        // Return
        return 'Created';
        
    } catch (err:any) {
        console.log(`Error creating class: ${err.message}`);
    };
};





// Fetch classes
export const fetchClasses = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching
        const classes = await Class.find();
        return classes;

    } catch (err:any) {
        throw new Error(`Error fetching classes: ${err}`);
    };
};





// Modify Class Props
interface ModifyClassProps{
    id:String;
    class_name:String;
    wing_name:String;
    school:String;
    order:Number;
};
// Modify Class
export const modifyClass = async ({id, class_name, wing_name, school, order}:ModifyClassProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Checking if the class already exists
        const classes = await Class.find();
        const existingClass = await Class.findById(id);
        if(existingClass.class_name !== class_name && classes.map(item => item.class_name).includes(class_name)){throw new Error('Class name already exists')};


        // Updating class
        const updatedClass = await Class.findByIdAndUpdate(id, {class_name, wing_name, school, order, affiliated_heads:{group_name:'', heads:[]}}, {new:true});


        // Return
        return 'Updated';

    } catch (err) {
        throw new Error(`Error updating class: ${err}`);
    };
};





// Modify Class Sections Props
interface ModifyClassSectionsProps{
    class_name:String;
    sections:string[];
};
// Modify Class Sections
export const modifyClassSections = async ({class_name, sections}:ModifyClassSectionsProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Updating class
        const updatedClass = await Class.findOneAndUpdate({class_name}, {sections}, {new:true});


        // Return
        return updatedClass;

    } catch (err) {
        throw new Error(`Error updating class sections: ${err}`);
    };
};





// Fetch class by class name
export const fetchClass = async ({class_name}:{class_name:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching class
        const c = await Class.findOne({class_name});
        const classRes = {
            ...c._doc,
            _id:c._doc._id.toString()
        };


        // Return
        return classRes;

    } catch (err) {
        throw new Error(`Error updating class sections: ${err}`);
    }
};





// Delete class
export const deleteClass = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting board
        await Class.findByIdAndDelete(id);
        return 'Class Deleted';

    } catch (err) {
        throw new Error(`Error deleting class: ${err}`);      
    };
};





// Modify class heads props
interface ModifyClassHeadsProps{
    group_name:String;
    installment:String;
    classes:any;
};
// Modify Class heads
export const modifyClassHeads = async ({group_name, installment, classes}:ModifyClassHeadsProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        if(installment === 'All installments'){
            // Fetching
            const group = await Group.findOne({name:group_name});
            const selectedHeads = group.affiliated_heads.filter((head:any) => head.fee_type === 'regular');
            classes.map(async (c:any) => {
                try {
                    await Class.updateMany({class_name:c}, {affiliated_heads:{group_name, heads:selectedHeads}});
                } catch (err:any) {
                    console.log(err);
                }
            });
        }else{
            const group = await Group.findOne({name:group_name});
            const selectedHeads = group.affiliated_heads.filter((head:any) => head.installment === installment && head.fee_type === 'regular' || head.installment === 'All installments' && head.fee_type === 'regular');
            classes.map(async (c:any) => {
                try {
                    await Class.updateMany({class_name:c}, {affiliated_heads:{group_name, heads:selectedHeads}});
                } catch (err:any) {
                    console.log(err);
                }
            });
        };


    } catch (err) {
        throw new Error(`Error updating class heads: ${err}`);
    };
};