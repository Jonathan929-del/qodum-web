// Import
import mongoose from 'mongoose';





// Admission State Schema
const AdmissionStateSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        logo:{type:String},
        is_staff_admission_opened:{type:Boolean},
        admission_accounts_last_updated_at:{type:Date, default:new Date()},
        post_accounts_last_updated_at:{type:Date, default:new Date()},
        classes_last_updated_at:{type:Date, default:new Date()},
        boards_last_updated_at:{type:Date, default:new Date()},
        streams_last_updated_at:{type:Date, default:new Date()},
        subjects_last_updated_at:{type:Date, default:new Date()},
        optional_subjects_last_updated_at:{type:Date, default:new Date()},
        religions_last_updated_at:{type:Date, default:new Date()},
        blood_groups_last_updated_at:{type:Date, default:new Date()},
        casts_last_updated_at:{type:Date, default:new Date()},
        categories_last_updated_at:{type:Date, default:new Date()},
        transport_mediums_last_updated_at:{type:Date, default:new Date()},
        nationalities_last_updated_at:{type:Date, default:new Date()},
        professions_last_updated_at:{type:Date, default:new Date()},
        designations_last_updated_at:{type:Date, default:new Date()},
        staff_types_last_updated_at:{type:Date, default:new Date()},
        sections_last_updated_at:{type:Date, default:new Date()},
        perishes_last_updated_at:{type:Date, default:new Date()},
        cadet_types_last_updated_at:{type:Date, default:new Date()},
        clubs_last_updated_at:{type:Date, default:new Date()},
        houses_last_updated_at:{type:Date, default:new Date()}
    },
    {
        timestamps:true
    }
);





// Export
const AdmissionState = mongoose.models.AdmissionState || mongoose.model('AdmissionState', AdmissionStateSchema);
export default AdmissionState;