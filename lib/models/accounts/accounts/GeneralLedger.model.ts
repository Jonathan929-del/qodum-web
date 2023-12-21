// Import
import mongoose from 'mongoose';





// General Ledger Schema
const GeneralLedgerSchema = new mongoose.Schema(
    {
        account_name:{type:String, required:true},
        group:{type:String, required:true},
        account_type:{type:String, required:true},
        opening_balance:{type:Number},
        opening_balance_type:{type:String},
        assign_date:{type:String},
        isCashBook:{type:Boolean},
        isFixedAsset:{type:Boolean},
        depreciation:{type:Number},
    },
    {
        timestamps:true
    }
);





// Export
const GeneralLedger = mongoose.models.GeneralLedger || mongoose.model('GeneralLedger', GeneralLedgerSchema);
export default GeneralLedger;