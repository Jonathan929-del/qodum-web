// Imports
import * as z from 'zod';





// Layout validation
export const LayoutValidation = z.object({
    // Copy report setting
    copy_report_setting:z.object({
        copy_from:z.string(),
        report_name:z.string(),
        report_title:z.string()
    }),

    // Report setting
    report_setting:z.object({
        report_name:z.string().nonempty({message:'*Please enter report name'}),
        report_title:z.string().nonempty({message:'*Please enter report title'})
    }),

    // Header and footer setting
    header_and_footer_setting:z.object({
        is_header_enable:z.boolean(),
        is_header_line_enable:z.boolean(),
        is_footer_enable:z.boolean(),
        is_footer_line_enable:z.boolean(),
        is_logo_enable:z.boolean(),
        is_row_no:z.boolean(),
        is_group:z.boolean(),
        is_sum:z.boolean()
    }),

    // Font size setting
    font_size_setting:z.object({
        font_size:z.number({invalid_type_error:'*Please enter font size'}).or(z.string().nonempty({message:'*Please enter font size'})).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
        is_total:z.string()
    }),

    // Page prientation and layout setting
    page_orientation_and_layout_setting:z.object({
        page_orientation:z.string(),
        page_layout:z.string()
    }),

    // Height and width setting
    height_and_width_setting:z.object({
        page_width:z.number({invalid_type_error:'*Please enter page width'}).or(z.string().nonempty({message:'*Please enter page width'})).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
        page_height:z.number({invalid_type_error:'*Please enter page height'}).or(z.string().nonempty({message:'*Please enter page height'})).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
        footer_height:z.number({invalid_type_error:'*Please enter footer height'}).or(z.string().nonempty({message:'*Please enter footer height'})).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
        header_height:z.number({invalid_type_error:'*Please enter header height'}).or(z.string().nonempty({message:'*Please enter header height'})).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
        header_line_width:z.number({invalid_type_error:'*Please enter header line width'}).or(z.string().nonempty({message:'*Please enter header line width'})).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
        logo_height:z.number({invalid_type_error:'*Please enter logo height'}).or(z.string().nonempty({message:'*Please enter logo height'})).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
        column_width:z.number({invalid_type_error:'*Please enter column width'}).or(z.string().nonempty({message:'*Please enter column width'})).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
        footer_line_height:z.number({invalid_type_error:'*Please enter footer line height'}).or(z.string().nonempty({message:'*Please enter footer line height'})).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
        table_column_height:z.number({invalid_type_error:'*Please enter table column height'}).or(z.string().nonempty({message:'*Please enter table column height'})).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'}))
    }),

    // Margin setting
    margin_setting:z.object({
        page_margin_right:z.number({invalid_type_error:'*Please enter page margin right'}).or(z.string().nonempty({message:'*Please enter page margin right'})).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
        page_margin_left:z.number({invalid_type_error:'*Please enter page margin left'}).or(z.string().nonempty({message:'*Please enter page margin left'})).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
        page_margin_bottom:z.number({invalid_type_error:'*Please enter page margin bottom'}).or(z.string().nonempty({message:'*Please enter page margin bottom'})).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
        page_margin_top:z.number({invalid_type_error:'*Please enter page margin top'}).or(z.string().nonempty({message:'*Please enter page margin top'})).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
        logo_margin_left:z.number({invalid_type_error:'*Please enter logo margin left'}).or(z.string().nonempty({message:'*Please enter logo margin left'})).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
        logo_margin_top:z.number({invalid_type_error:'*Please enter logo margin top'}).or(z.string().nonempty({message:'*Please enter logo margin top'})).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
        table_margin_left:z.number({invalid_type_error:'*Please enter table margin left'}).or(z.string().nonempty({message:'*Please enter table margin left'})).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
        table_margin_top:z.number({invalid_type_error:'*Please enter table margin top'}).or(z.string().nonempty({message:'*Please enter table margin top'})).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
        footer_line_margin_top:z.number({invalid_type_error:'*Please enter footer line margin top'}).or(z.string().nonempty({message:'*Please enter footer line margin top'})).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
        header_line_margin_top:z.number({invalid_type_error:'*Please enter header line margin top'}).or(z.string().nonempty({message:'*Please enter header line margin top'})).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'}))
    })
});