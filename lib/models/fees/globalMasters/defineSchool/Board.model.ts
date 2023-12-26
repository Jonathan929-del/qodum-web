// Import
import mongoose from 'mongoose';





// Board Schema
const BoardSchema = new mongoose.Schema(
    {
        board:{type:String, required:true, unique:true},
        is_default:{type:Boolean}
    },
    {
        timestamps:true
    }
);





// Export
const Board = mongoose.models.Board || mongoose.model('Board', BoardSchema);
export default Board;