// Imports
import * as z from 'zod';





// Affiliated head
const head = z.object({
    type_name:z.string(),
    head_name:z.string(),
    schedule_type:z.string(),
    installment:z.string(),
    account:z.string(),
    post_account:z.string(),
    fee_type:z.string()
});





// Assign fee group to fee head validation
export const AssignFeeGroupToFeeHeadValidation = z.object({
    group_name:z.string().nonempty({message:'*Group name is required'}),
    affiliated_heads:z.array(head)
});