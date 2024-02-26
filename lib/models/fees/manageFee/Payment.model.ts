// Import
import mongoose from 'mongoose';





// Payment Schema
const PaymentSchema = new mongoose.Schema(
    {
        // Others
        receipt_no:{type:String},
        installment:{type:String},
        received_date:{type:Date},
        remarks:{type:String},
        paymode:{type:String},
        paymode_details:{type:Object},


        // Amounts
        actual_amount:{type:Number},
        concession_amount:{tyoe:Number},
        paid_amount:{type:Number}
    },
    {
        timestamps:true
    }
);





// Export
const Payment = mongoose.models.Payment || mongoose.model('Payment', PaymentSchema);
export default Payment;