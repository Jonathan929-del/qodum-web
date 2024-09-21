'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import User from '@/lib/models/users/manageUsers/User.model';
import AcademicYear from '@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model';





// Create user props
interface CreateUserProps{
    name:String;
    user_name:String;
    password:String;
    is_reset_password:Boolean;
    designation:String;
    email:String;
    employee:String;
    mobile:Number;
    profile_picture:String;
    schools:any;
    is_active:Boolean;
    enable_otp:Boolean;
};
// Create user
export const createUser = async ({name, user_name, password, is_reset_password, designation, email, employee, mobile, profile_picture, schools, is_active, enable_otp}:CreateUserProps) => {
    try {
    
        // Database connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});
        if(!activeSession) return 0;


        // Checking if the user already exists
        const existingUser = await User.findOne({user_name, session:activeSession?.year_name});
        if(existingUser){
            throw new Error('User already exists');
        };


        // Creating new user
        const newUser = await User.create({session:activeSession?.year_name, name, user_name, password, is_reset_password, designation, email, employee, mobile, profile_picture, schools, is_active, enable_otp});
        newUser.save();


        // Return
        return 'Created';

    } catch (err:any) {
        console.log(`Error creating user: ${err.message}`);
    };
};





// Fetch users
export const fetchUsers = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // Fetching
        const users = await User.find({session:activeSession?.year_name});


        // Return
        return users;

    } catch (err:any) {
        throw new Error(`Error fetching users: ${err}`);
    };
};





// Modify user props
interface ModifyUserProps{
    id:String;
    name:String;
    user_name:String;
    password:String;
    is_reset_password:Boolean;
    designation:String;
    email:String;
    employee:String;
    mobile:Number;
    profile_picture:String;
    schools:any;
    is_active:Boolean;
    enable_otp:Boolean;
}
// Modify user
export const modifyUser = async ({id, name, user_name, password, is_reset_password, designation, email, employee, mobile, profile_picture, schools, is_active, enable_otp}:ModifyUserProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});


        // Checking if the user already exists
        const user = await User.find({session:activeSession?.year_name});
        const existingUser = await User.findById(id);
        if(existingUser.user_name !== user_name && user.map(s => s.user_name).includes(user_name)){throw new Error('User already exists')};

        
        // Update user
        await User.findByIdAndUpdate(id, {name, user_name, password, is_reset_password, designation, email, employee, mobile, profile_picture, schools, is_active, enable_otp}, {new:true});


        // Return
        return 'Updated';

    } catch (err) {
        throw new Error(`Error updating user: ${err}`);
    };
};





// Delete user
export const deleteUser = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting user
        await User.findByIdAndDelete(id);


        // Return
        return 'User deleted';

    } catch (err) {
        throw new Error(`Error deleting user: ${err}`);      
    };
};