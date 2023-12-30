// Imports
import * as z from 'zod';





// Fee Entry Setting Validation
export const FeeEntrySettingValidation = z.object({
    single_prefix:z.string(),
    single_lead_zero:z.string(),
    single_receipt_no:z.string(),
    single_suffix:z.string(),
    school_prefix:z.string(),
    school_lead_zero:z.string(),
    school_receipt_no:z.string(),
    school_suffix:z.string(),
    fee_school_prefix:z.string(),
    fee_transport_prefix:z.string(),
    fee_tution_prefix:z.string(),
    fee_school_lead_zero:z.string(),
    fee_transport_lead_zero:z.string(),
    fee_tution_lead_zero:z.string(),
    fee_school_receipt_no:z.string(),
    fee_transport_receipt_no:z.string(),
    fee_tution_receipt_no:z.string(),
    fee_school_suffix:z.string(),
    fee_transport_suffix:z.string(),
    fee_tution_suffix:z.string()
});