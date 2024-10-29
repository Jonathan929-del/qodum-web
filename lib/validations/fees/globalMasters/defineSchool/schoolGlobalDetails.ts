// Imports
import * as z from 'zod';





// Narration Master Validation
export const SchoolGlobalValidation = z.object({
    school_main:z.boolean(),
    school_subheads:z.boolean(),
    // logo:z.string(),
    school_name:z.string().nonempty({message:'School name required'}),
    school_address:z.string().nonempty({message:'School address required'}),
    school_address_2:z.string(),
    school_short_name:z.string(),
    contact_no:z.string(),
    mobile:z.string(),
    email:z.string(),
    support_email_id:z.string(),
    website:z.string(),
    prefix:z.string().nonempty({message:'Prefix required'}),
    iso_details:z.string(),
    school_no:z.string(),
    affiliation_to:z.string(),
    affiliation_no:z.string(),
    udise_code:z.string(),
    pen:z.string(),
    associates:z.string(),
    renew_up_to:z.string(),
    school_status:z.string(),
    working_days:z.string(),
    recess:z.string(),
    total_period:z.string(),
    academic_year:z.string(),
    financial_year:z.string(),
    facebook_link:z.string(),
    linkedin_link:z.string(),
    twitter_link:z.string(),
    instagram_link:z.string()
});