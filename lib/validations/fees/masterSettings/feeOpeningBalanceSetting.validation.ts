// Imports
import * as z from 'zod';





// Fee opening balance setting validation
export const FeeOpeningBalanceSettingValidation = z.object({
    auto_adjust_amount:z.boolean(),
    auto_adjust_opening_balance:z.boolean(),
    fee_type:z.string()
});