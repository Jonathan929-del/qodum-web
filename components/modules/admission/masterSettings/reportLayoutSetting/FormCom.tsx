'use client';
// Imports
import * as z from 'zod';
import Buttons from './Buttons';
import {deepEqual} from '@/lib/utils';
import {useForm} from 'react-hook-form';
import {Form} from '@/components/ui/form';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import ReportSetting from './sections/ReportSetting';
import MarginSetting from './sections/MarginSetting';
import FontSizeSetting from './sections/FontSizeSetting';
import CopyReportSetting from './sections/CopyReportSetting';
import HeightAndWidthSetting from './sections/HeightAndWidthSetting';
import HeaderAndFooterSetting from './sections/HeaderAndFooterSetting';
import PageOrientationAndLayoutSetting from './sections/PageOrientationAndLayoutSetting';
import {LayoutValidation} from '@/lib/validations/admission/masterSettings/layout.validation';
import {createLayout, deleteLayout, modifyLayout} from '@/lib/actions/admission/masterSettings/layout.actions';





// Main function
const FormCom = ({setIsViewOpened, layouts, updateLayout, setUpdateLayout, setIsLoading}:any) => {


    // Toast
    const {toast} = useToast();


    // Comparison object
    const comparisonObject = {
        // Report setting
        report_setting:{
            report_name:updateLayout.report_setting.report_name,
            report_title:updateLayout.report_setting.report_title
        },

        // Header and footer setting
        header_and_footer_setting:{
            is_header_enable:updateLayout.header_and_footer_setting.is_header_enable,
            is_header_line_enable:updateLayout.header_and_footer_setting.is_header_line_enable,
            is_footer_enable:updateLayout.header_and_footer_setting.is_footer_enable,
            is_footer_line_enable:updateLayout.header_and_footer_setting.is_footer_line_enable,
            is_logo_enable:updateLayout.header_and_footer_setting.is_logo_enable,
            is_row_no:updateLayout.header_and_footer_setting.is_row_no,
            is_group:updateLayout.header_and_footer_setting.is_group,
            is_sum:updateLayout.header_and_footer_setting.is_sum
        },

        // Font size setting
        font_size_setting:{
            font_size:updateLayout.font_size_setting.font_size,
            is_total:updateLayout.font_size_setting.is_total
        },

        // Page prientation and layout setting
        page_orientation_and_layout_setting:{
            page_orientation:updateLayout.page_orientation_and_layout_setting.page_orientation,
            page_layout:updateLayout.page_orientation_and_layout_setting.page_layout
        },

        // Height and width setting
        height_and_width_setting:{
            page_width:updateLayout.height_and_width_setting.page_width,
            page_height:updateLayout.height_and_width_setting.page_height,
            footer_height:updateLayout.height_and_width_setting.footer_height,
            header_height:updateLayout.height_and_width_setting.header_height,
            header_line_width:updateLayout.height_and_width_setting.header_line_width,
            logo_height:updateLayout.height_and_width_setting.logo_height,
            column_width:updateLayout.height_and_width_setting.column_width,
            footer_line_height:updateLayout.height_and_width_setting.footer_line_height,
            table_column_height:updateLayout.height_and_width_setting.table_column_height
        },

        // Margin setting
        margin_setting:{
            page_margin_right:updateLayout.margin_setting.page_margin_right,
            page_margin_left:updateLayout.margin_setting.page_margin_left,
            page_margin_bottom:updateLayout.margin_setting.page_margin_bottom,
            page_margin_top:updateLayout.margin_setting.page_margin_top,
            logo_margin_left:updateLayout.margin_setting.logo_margin_left,
            logo_margin_top:updateLayout.margin_setting.logo_margin_top,
            table_margin_left:updateLayout.margin_setting.table_margin_left,
            table_margin_top:updateLayout.margin_setting.table_margin_top,
            footer_line_margin_top:updateLayout.margin_setting.footer_line_margin_top,
            header_line_margin_top:updateLayout.margin_setting.header_line_margin_top
        }
    };


    // Form
    const form = useForm({
        resolver:zodResolver(LayoutValidation),
        defaultValues:{
            // Copy report setting
            copy_report_setting:{
                copy_from:'',
                report_name:'',
                report_title:''
            },

            // Report setting
            report_setting:{
                report_name:updateLayout.id === '' ? '' : updateLayout.report_setting.report_name,
                report_title:updateLayout.id === '' ? '' : updateLayout.report_setting.report_title
            },

            // Header and footer setting
            header_and_footer_setting:{
                is_header_enable:updateLayout.id === '' ? false : updateLayout.header_and_footer_setting.is_header_enable,
                is_header_line_enable:updateLayout.id === '' ? false: updateLayout.header_and_footer_setting.is_header_line_enable,
                is_footer_enable:updateLayout.id === '' ? false: updateLayout.header_and_footer_setting.is_footer_enable,
                is_footer_line_enable:updateLayout.id === '' ? false : updateLayout.header_and_footer_setting.is_footer_line_enable,
                is_logo_enable:updateLayout.id === '' ? false : updateLayout.header_and_footer_setting.is_logo_enable,
                is_row_no:updateLayout.id === '' ? false : updateLayout.header_and_footer_setting.is_row_no,
                is_group:updateLayout.id === '' ? false : updateLayout.header_and_footer_setting.is_group,
                is_sum:updateLayout.id === '' ? false : updateLayout.header_and_footer_setting.is_sum
            },

            // Font size setting
            font_size_setting:{
                font_size:updateLayout.id === '' ? 0 : updateLayout.font_size_setting.font_size,
                is_total:updateLayout.id === '' ? 'No' : updateLayout.font_size_setting.is_total
            },

            // Page prientation and layout setting
            page_orientation_and_layout_setting:{
                page_orientation:updateLayout.id === '' ? '' : updateLayout.page_orientation_and_layout_setting.page_orientation,
                page_layout:updateLayout.id === '' ? '' : updateLayout.page_orientation_and_layout_setting.page_layout
            },

            // Height and width setting
            height_and_width_setting:{
                page_width:updateLayout.id === '' ? 0 : updateLayout.height_and_width_setting.page_width,
                page_height:updateLayout.id === '' ? 0 : updateLayout.height_and_width_setting.page_height,
                footer_height:updateLayout.id === '' ? 0 : updateLayout.height_and_width_setting.footer_height,
                header_height:updateLayout.id === '' ? 0 : updateLayout.height_and_width_setting.header_height,
                header_line_width:updateLayout.id === '' ? 0 : updateLayout.height_and_width_setting.header_line_width,
                logo_height:updateLayout.id === '' ? 0 : updateLayout.height_and_width_setting.logo_height,
                column_width:updateLayout.id === '' ? 0 : updateLayout.height_and_width_setting.column_width,
                footer_line_height:updateLayout.id === '' ? 0 : updateLayout.height_and_width_setting.footer_line_height,
                table_column_height:updateLayout.id === '' ? 0 : updateLayout.height_and_width_setting.table_column_height
            },

            // Margin setting
            margin_setting:{
                page_margin_right:updateLayout.id === '' ? 0 : updateLayout.margin_setting.page_margin_right,
                page_margin_left:updateLayout.id === '' ? 0 : updateLayout.margin_setting.page_margin_left,
                page_margin_bottom:updateLayout.id === '' ? 0 : updateLayout.margin_setting.page_margin_bottom,
                page_margin_top:updateLayout.id === '' ? 0 : updateLayout.margin_setting.page_margin_top,
                logo_margin_left:updateLayout.id === '' ? 0 : updateLayout.margin_setting.logo_margin_left,
                logo_margin_top:updateLayout.id === '' ? 0 : updateLayout.margin_setting.logo_margin_top,
                table_margin_left:updateLayout.id === '' ? 0 : updateLayout.margin_setting.table_margin_left,
                table_margin_top:updateLayout.id === '' ? 0 : updateLayout.margin_setting.table_margin_top,
                footer_line_margin_top:updateLayout.id === '' ? 0 : updateLayout.margin_setting.footer_line_margin_top,
                header_line_margin_top:updateLayout.id === '' ? 0 : updateLayout.margin_setting.header_line_margin_top
            }
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof LayoutValidation>) => {
        setIsLoading(true);

        // Create layout
        if(updateLayout.id === ''){
            if(layouts.map((l:any) => l.report_setting.report_name).includes(values.report_setting.report_name)){
                toast({title:'Report name already exists', variant:'error'});
                setIsLoading(false);
                return;
            };
            const res = await createLayout({
                // Report setting
                report_setting:{
                    report_name:values.report_setting.report_name,
                    report_title:values.report_setting.report_title
                },

                // Header and footer setting
                header_and_footer_setting:{
                    is_header_enable:values.header_and_footer_setting.is_header_enable,
                    is_header_line_enable:values.header_and_footer_setting.is_header_line_enable,
                    is_footer_enable:values.header_and_footer_setting.is_footer_enable,
                    is_footer_line_enable:values.header_and_footer_setting.is_footer_line_enable,
                    is_logo_enable:values.header_and_footer_setting.is_logo_enable,
                    is_row_no:values.header_and_footer_setting.is_row_no,
                    is_group:values.header_and_footer_setting.is_group,
                    is_sum:values.header_and_footer_setting.is_sum
                },

                // Font size setting
                font_size_setting:{
                    font_size:values.font_size_setting.font_size,
                    is_total:values.font_size_setting.is_total
                },

                // Page prientation and layout setting
                page_orientation_and_layout_setting:{
                    page_orientation:values.page_orientation_and_layout_setting.page_orientation,
                    page_layout:values.page_orientation_and_layout_setting.page_layout
                },

                // Height and width setting
                height_and_width_setting:{
                    page_width:values.height_and_width_setting.page_width,
                    page_height:values.height_and_width_setting.page_height,
                    footer_height:values.height_and_width_setting.footer_height,
                    header_height:values.height_and_width_setting.header_height,
                    header_line_width:values.height_and_width_setting.header_line_width,
                    logo_height:values.height_and_width_setting.logo_height,
                    column_width:values.height_and_width_setting.column_width,
                    footer_line_height:values.height_and_width_setting.footer_line_height,
                    table_column_height:values.height_and_width_setting.table_column_height
                },

                // Margin setting
                margin_setting:{
                    page_margin_right:values.margin_setting.page_margin_right,
                    page_margin_left:values.margin_setting.page_margin_left,
                    page_margin_bottom:values.margin_setting.page_margin_bottom,
                    page_margin_top:values.margin_setting.page_margin_top,
                    logo_margin_left:values.margin_setting.logo_margin_left,
                    logo_margin_top:values.margin_setting.logo_margin_top,
                    table_margin_left:values.margin_setting.table_margin_left,
                    table_margin_top:values.margin_setting.table_margin_top,
                    footer_line_margin_top:values.margin_setting.footer_line_margin_top,
                    header_line_margin_top:values.margin_setting.header_line_margin_top
                }
            });
            if(res === 0){
                toast({title:'Please create a session first', variant:'alert'});
                return;
            };
            toast({title:'Added Successfully!'});
        }
        // Modify layout
        else if(!deepEqual({copy_report_setting:values.copy_report_setting, ...comparisonObject}, values)){
            if(comparisonObject.report_setting.report_name !== values.report_setting.report_name && layouts.map((l:any) => l.report_setting.report_name).includes(values.report_setting.report_name)){
                toast({title:'Report name already exists', variant:'error'});
                setIsLoading(false);
                return;
            };
            await modifyLayout({
                id:updateLayout.id,
                // Report setting
                report_setting:{
                    report_name:values.report_setting.report_name,
                    report_title:values.report_setting.report_title
                },

                // Header and footer setting
                header_and_footer_setting:{
                    is_header_enable:values.header_and_footer_setting.is_header_enable,
                    is_header_line_enable:values.header_and_footer_setting.is_header_line_enable,
                    is_footer_enable:values.header_and_footer_setting.is_footer_enable,
                    is_footer_line_enable:values.header_and_footer_setting.is_footer_line_enable,
                    is_logo_enable:values.header_and_footer_setting.is_logo_enable,
                    is_row_no:values.header_and_footer_setting.is_row_no,
                    is_group:values.header_and_footer_setting.is_group,
                    is_sum:values.header_and_footer_setting.is_sum
                },

                // Font size setting
                font_size_setting:{
                    font_size:values.font_size_setting.font_size,
                    is_total:values.font_size_setting.is_total
                },

                // Page prientation and layout setting
                page_orientation_and_layout_setting:{
                    page_orientation:values.page_orientation_and_layout_setting.page_orientation,
                    page_layout:values.page_orientation_and_layout_setting.page_layout
                },

                // Height and width setting
                height_and_width_setting:{
                    page_width:values.height_and_width_setting.page_width,
                    page_height:values.height_and_width_setting.page_height,
                    footer_height:values.height_and_width_setting.footer_height,
                    header_height:values.height_and_width_setting.header_height,
                    header_line_width:values.height_and_width_setting.header_line_width,
                    logo_height:values.height_and_width_setting.logo_height,
                    column_width:values.height_and_width_setting.column_width,
                    footer_line_height:values.height_and_width_setting.footer_line_height,
                    table_column_height:values.height_and_width_setting.table_column_height
                },

                // Margin setting
                margin_setting:{
                    page_margin_right:values.margin_setting.page_margin_right,
                    page_margin_left:values.margin_setting.page_margin_left,
                    page_margin_bottom:values.margin_setting.page_margin_bottom,
                    page_margin_top:values.margin_setting.page_margin_top,
                    logo_margin_left:values.margin_setting.logo_margin_left,
                    logo_margin_top:values.margin_setting.logo_margin_top,
                    table_margin_left:values.margin_setting.table_margin_left,
                    table_margin_top:values.margin_setting.table_margin_top,
                    footer_line_margin_top:values.margin_setting.footer_line_margin_top,
                    header_line_margin_top:values.margin_setting.header_line_margin_top
                }
            });
            toast({title:'Updated Successfully!'});
        }
        // Delete layout
        else if(updateLayout.isDeleteClicked){
            await deleteLayout({id:updateLayout.id});
            toast({title:'Deleted Successfully!'});
        };


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

        setIsLoading(false);
    };


    return (
        <div className='w-[90%] max-h-[90%] max-w-[1500px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] overflow-y-scroll custom-sidebar-scrollbar'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Dynamic Report Settings</h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='relative w-full flex flex-col pt-4 gap-2 items-center px-2'
                >


                    {/* Copy Report Setting */}
                    <CopyReportSetting
                        form={form}
                        layouts={layouts}
                    />


                    <div className='w-full flex flex-col justify-between items-center gap-6 sm:flex-row'>
                        <div className='h-full flex-1 flex flex-col gap-4'>
                            <ReportSetting form={form}/>
                            <HeaderAndFooterSetting form={form}/>
                            <FontSizeSetting form={form}/>
                            <PageOrientationAndLayoutSetting form={form}/>
                        </div>
                        <div className='h-full flex-1 flex flex-col gap-4'>
                            <HeightAndWidthSetting form={form}/>
                            <MarginSetting form={form}/>
                        </div>
                    </div>


                    {/* Buttons */}
                    <Buttons setIsViewOpened={setIsViewOpened} layouts={layouts} updateLayout={updateLayout} setUpdateLayout={setUpdateLayout} onSubmit={onSubmit} form={form}/>                    
                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;