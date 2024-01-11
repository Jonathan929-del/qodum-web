// Import
import mongoose from 'mongoose';





// Category Schema
const CategorySchema = new mongoose.Schema(
    {
        category_name:{type:String, required:true, unique:true},
        is_default:{type:Boolean}
    },
    {
        timestamps:true
    }
);





// Export
const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
export default Category;