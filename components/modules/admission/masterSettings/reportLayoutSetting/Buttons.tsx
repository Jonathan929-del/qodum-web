'use client';
// Imports
import {Button} from '@/components/ui/button';
import {AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger} from '@/components/ui/alert-dialog';





// Main Function
const Buttons = ({setIsViewOpened, layouts, updateLayout, setUpdateLayout, onSubmit, form}:any) => {


    // Cancel click
    const cancelClick = () => {
        // Reseting update entity
        setUpdateLayout({
            id:'',
            isDeleteClicked:false,
            // Copy report setting
            copy_report_setting:{
                copy_from:'',
                report_name:'',
                report_title:''
            },
            
            // Report setting
            report_setting:{
                report_name:'',
                report_title:''
            },

            // Header and footer setting
            header_and_footer_setting:{
                is_header_enable:false,
                is_header_line_enable:false,
                is_footer_enable:false,
                is_footer_line_enable:false,
                is_logo_enable:false,
                is_row_no:false,
                is_group:false,
                is_sum:false
            },

            // Font size setting
            font_size_setting:{
                font_size:0,
                is_total:'No'
            },

            // Page prientation and layout setting
            page_orientation_and_layout_setting:{
                page_orientation:'',
                page_layout:''
            },

            // Height and width setting
            height_and_width_setting:{
                page_width:0,
                page_height:0,
                footer_height:0,
                header_height:0,
                header_line_width:0,
                logo_height:0,
                column_width:0,
                footer_line_height:0,
                table_column_height:0
            },

            // Margin setting
            margin_setting:{
                page_margin_right:0,
                page_margin_left:0,
                page_margin_bottom:0,
                page_margin_top:0,
                logo_margin_left:0,
                logo_margin_top:0,
                table_margin_left:0,
                table_margin_top:0,
                footer_line_margin_top:0,
                header_line_margin_top:0
            }
        });
        // Reseting form
        form.reset({
            // Copy report setting
            copy_report_setting:{
                copy_from:'',
                report_name:'',
                report_title:''
            },
            
            // Report setting
            report_setting:{
                report_name:'',
                report_title:''
            },

            // Header and footer setting
            header_and_footer_setting:{
                is_header_enable:false,
                is_header_line_enable:false,
                is_footer_enable:false,
                is_footer_line_enable:false,
                is_logo_enable:false,
                is_row_no:false,
                is_group:false,
                is_sum:false
            },

            // Font size setting
            font_size_setting:{
                font_size:0,
                is_total:'No'
            },

            // Page prientation and layout setting
            page_orientation_and_layout_setting:{
                page_orientation:'',
                page_layout:''
            },

            // Height and width setting
            height_and_width_setting:{
                page_width:0,
                page_height:0,
                footer_height:0,
                header_height:0,
                header_line_width:0,
                logo_height:0,
                column_width:0,
                footer_line_height:0,
                table_column_height:0
            },

            // Margin setting
            margin_setting:{
                page_margin_right:0,
                page_margin_left:0,
                page_margin_bottom:0,
                page_margin_top:0,
                logo_margin_left:0,
                logo_margin_top:0,
                table_margin_left:0,
                table_margin_top:0,
                footer_line_margin_top:0,
                header_line_margin_top:0
            }
        });
    };


    // Handle submit
    const handleSubmit = () => form.handleSubmit(onSubmit)();


    return (
        <div className='flex flex-row items-center justify-center pb-4 mt-10 gap-2 ml-0'>
            {
                updateLayout.id === '' ? (
                    <Button
                        type='submit'
                        className='px-[8px] h-8 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white
                                hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color sm:text-[16px] sm:px-4'
                    >
                        Save
                    </Button>
                ) : (
                    <>


                        {/* Modify button */}
                        <AlertDialog>
                            <AlertDialogTrigger
                                className='px-[8px] h-8 text-xs text-white bg-gradient-to-r from-[#790AE0] to-[#8f3cdd] rounded-full transition border-[1px] border-white
                                hover:border-[#790AE0] hover:from-[#8f3cdd40] hover:to-[#8f3cdd40] hover:text-[#790AE0] sm:text-[16px] sm:px-4'
                            >
                                Modify
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure you want  to modify this record?</AlertDialogTitle>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>No</AlertDialogCancel>
                                    <AlertDialogAction>
                                        <Button
                                            className='border-[0.5px] border-black'
                                            onClick={handleSubmit}
                                        >
                                            Yes
                                        </Button>
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>


                        {/* Delete button */}
                        <AlertDialog>
                            <AlertDialogTrigger
                                className='px-[8px] h-8 text-xs text-white bg-gradient-to-r from-[#ba2b2b] to-[#b95e5e] rounded-full transition border-[1px] border-white
                                hover:border-[#ba2b2b] hover:from-[#ba2b2b42] hover:to-[#ba2b2b42] hover:text-[#ba2b2b] sm:text-[16px] sm:px-4'
                                onClick={() => setUpdateLayout({...updateLayout, isDeleteClicked:true})}
                            >
                                Delete
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure you want  to delete this record?</AlertDialogTitle>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel
                                        onClick={() => setUpdateLayout({...updateLayout, isDeleteClicked:false})}
                                    >
                                        No
                                    </AlertDialogCancel>
                                    <Button
                                        className='border-[0.5px] border-black'
                                        onClick={handleSubmit}
                                    >
                                        Yes
                                    </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </>
                )
            }


            {/* View button */}
            <span
                onClick={() => setIsViewOpened(true)}
                className='flex items-center px-[8px] h-8 text-xs text-white bg-gradient-to-r from-[#51B272] to-[#94E7B1] rounded-full transition border-[1px] border-white cursor-pointer
                         hover:border-[#51B272] hover:from-[#5cbb7d21] hover:to-[#5cbb7d21] hover:text-[#51B272] sm:text-[16px] sm:px-4'
            >
                View
            </span>


            {/* Cancel button */}
            <span
                className='flex items-center px-[8px] h-8 text-xs text-black bg-gradient-to-r from-[#C7C8CA] to-[#EAEDF0] rounded-full transition border-[1px] border-white cursor-pointer
                        hover:border-[#a3a3a3] hover:from-[#c8c9cb26] hover:to-[#c8c9cb26] hover:text-hash-color sm:text-[16px] sm:px-4'
                onClick={cancelClick}
            >
                Cancel
            </span>


        </div>
    );
};





// Export
export default Buttons;