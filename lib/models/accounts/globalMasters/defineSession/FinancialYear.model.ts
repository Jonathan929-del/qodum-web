// Import
import mongoose from 'mongoose';





// Narration Master Schema
const FinancialYearSchema = new mongoose.Schema(
        {
            year_name:{type:String, required:true},
            start_date:{
                day:{type:String, required:true},
                month:{type:String, required:true},
                year:{type:String, required:true},
            },
            end_date:{
                day:{type:String, required:true},
                month:{type:String, required:true},
                year:{type:String, required:true},
            },
            is_active:{type:Boolean, required:true}
        },
        {
            timestamps:true
        }
    );





// Export
const FinancialYear = mongoose.models.FinancialYear || mongoose.model('FinancialYear', FinancialYearSchema);
export default FinancialYear;