// Imports
import * as z from 'zod';





// Group Validation
export const GroupValidation = z.object({
    group_name:z.string().nonempty({message:'*Group name is required'}),
    affiliated_heads:z.array(z.object({
        type_name:z.string(),
        head_name:z.string(),
        schedule_type:z.string(),
        installment:z.string(),
        account:z.string(),
        post_account:z.string()
    }))
});