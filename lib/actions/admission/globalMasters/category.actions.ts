'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import Category from '@/lib/models/admission/globalMasters/Category.model';





// Create category Props
interface CreateCategoryProps{
    category_name:String;
    is_default:Boolean;
};
// Create category
export const createCategory = async ({category_name, is_default}:CreateCategoryProps) => {
    try {

    
        // Database connection
        connectToDb('accounts');


        // Checking if the category name already exists
        const existingCategory = await Category.findOne({category_name, is_default});
        if(existingCategory){
            throw new Error('Category name already exists');
        };


        // Creating new category
        const newCategory = await Category.create({category_name, is_default});


        // Checking if the is default is true and setting all the other records to false if so
        if(is_default === true){
            newCategory.save();
            await Category.updateMany({'_id': {$ne:newCategory._id}}, {is_default:false});
        }else{
            newCategory.save();
        };


        // Return
        return newCategory;


    } catch (err:any) {
        console.log(`Error creating category: ${err.message}`);
    };
};





// Fetch categories
export const fetchCategories = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching
        const categories = await Category.find();
        return categories;

    } catch (err:any) {
        throw new Error(`Error fetching categories: ${err}`);
    };
};





// Modify category props
interface ModifyCategoryProps{
    id:String;
    category_name:String;
    is_default:Boolean;
}
// Modify category
export const modifyCategory = async ({id, category_name, is_default}:ModifyCategoryProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Checking if the category name already exists
        const categories = await Category.find();
        const existingCategory = await Category.findById(id);
        if(existingCategory.category_name !== category_name && categories.map(category => category.category_name).includes(category_name)){throw new Error('Category already exists')};


        if(is_default === true){
            // Update category
            const updatedCategory = await Category.findByIdAndUpdate(id, {category_name, is_default}, {new:true}).then(async () => {
                try {
                    await Category.updateMany({'_id': {$ne:id}}, {is_default:false});
                } catch (err:any) {
                    console.log(`Error updating other categories: ${err.message}`);
                }
            });;
            return updatedCategory;
        }else{
            // Update category with setting other categories is default to false
            const updatedCategory = await Category.findByIdAndUpdate(id, {category_name, is_default}, {new:true});
            return updatedCategory;
        };


    } catch (err) {
        throw new Error(`Error updating category: ${err}`);
    };
};





// Delete category
export const deleteCategory = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting category
        await Category.findByIdAndDelete(id);
        return 'Category Deleted';

    } catch (err) {
        throw new Error(`Error deleting category: ${err}`);      
    };
};