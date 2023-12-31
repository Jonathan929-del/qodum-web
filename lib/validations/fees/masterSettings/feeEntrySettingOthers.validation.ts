// Imports
import * as z from 'zod';





// Fee Entry Setting Validation Others
export const FeeEntrySettingOthersValidation = z.object({

    // Page 1
    concession:z.string(),
    fee_entry_mode_used:z.string(),
    fee_pay_mode_used:z.string(),
    cheque_bounce_fine:z.string(),
    waive_off:z.boolean(),
    waive_off_option:z.boolean(),
    waive_off_with_reason:z.boolean(),
    waive_off_with_cheque_bounce:z.boolean(),
    late_fine:z.boolean(),
    installment_type:z.string(),
    manual_cheque_bounce:z.boolean(),
    calculate_late_fine:z.boolean(),
    run_time_concession:z.boolean(),
    ask_reason:z.boolean(),

    // Page 2
    advance_amount_adjustment:z.boolean(),
    advance_receipt_acceptance:z.boolean(),
    discount:z.boolean(),
    reuse_fee_receipt_no:z.boolean(),
    print_fee_receipt_after_save:z.boolean(),
    modify_cheque_details:z.boolean(),
    sms_after_fee_entry:z.boolean(),
    payment_from_mid_year:z.boolean(),
    reference_no:z.boolean(),
    micr_no:z.boolean(),
    mandate_micr_no:z.boolean(),
    tc_no_book_no_wise:z.boolean(),
    allow_deposit_bank:z.boolean(),
    date_of_amount_credit_in_bank:z.boolean(),
    mandate_date_of_amount_credit_in_bank:z.boolean(),

    // Page 3
    back_date_receipt_entry:z.boolean(),
    back_date_receipt_entry_type:z.string(),
    allow_no_of_back_date:z.string(),
    future_date_receipt_entry:z.boolean(),
    future_date_receipt_entry_type:z.string(),
    enable_vat:z.boolean(),
    default_selection_of_deposit_bank:z.boolean(),
    enable_evening_transport:z.boolean(),
    disable_caceled_receipt_in_report:z.boolean(),
    transport_modification_after_receiving_fee:z.boolean(),
    enable_to_take_fee_for_all_sibling:z.boolean(),
    enable_auto_checked_to_add_sibling:z.boolean(),
    allow_the_user_to_check_installment_in_sequence:z.boolean(),
    enable_sponsor:z.boolean(),
    enable_inactive_student_show:z.boolean()

});