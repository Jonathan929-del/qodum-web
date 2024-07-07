// Import
import mongoose from 'mongoose';





// Party Ledger Schema
const PartyLedgerSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        account_name:{type:String, required:true},
        group:{type:String, required:true},
        account_type:{type:String, required:true},
        account_address:{type:String},
        account_city:{type:String},
        pin_code:{type:Number},
        email:{type:String},
        mobile:{type:Number},
        pan:{type:Number},
        tin:{type:Number},
        opening_balance:{type:Number},
        opening_balance_type:{type:String},
        assign_date:{type:Date},
    },
    {
        timestamps:true
    }
);





// Export
const PartyLedger = mongoose.models.PartyLedger || mongoose.model('PartyLedger', PartyLedgerSchema);
export default PartyLedger;