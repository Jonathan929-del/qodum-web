'use client';
// Imports
import * as z from 'zod';
import Buttons from './Buttons';
import {deepEqual} from '@/lib/utils';
import {useForm} from 'react-hook-form';
import {Input} from '@/components/ui/input';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {SectionValidation} from '@/lib/validations/fees/globalMasters/defineClassDetails/section.validation';
import {createSection, deleteSection, modifySection} from '@/lib/actions/fees/globalMasters/defineClassDetails/section.actions';





// Main function
const FormCom = ({setIsViewOpened, sections, updateSection, setUpdateSection}:any) => {


    // Toast
    const {toast} = useToast();


    // Comparison object
    const comparisonObject = {
        section_name:updateSection.section_name,
        order_no:updateSection.order_no
    };


    // Form
    const form:any = useForm({
        resolver:zodResolver(SectionValidation),
        defaultValues:{
            section_name:updateSection.id === '' ? '' : updateSection.section_name,
            order_no:updateSection.id === '' ? '' : updateSection.order_no
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof SectionValidation>) => {
        // Create section
        if(updateSection.id === ''){
            if(sections.map((section:any) => section.section_name).includes(values.section_name)){
                toast({title:'Section name already exists', variant:'error'});
                return;
            };
            await createSection({
                section_name:values.section_name,
                order_no:values.order_no
            });
            setIsViewOpened(true);
            toast({title:'Added Successfully!'});
        }
        // Modify section
        else if(!deepEqual(comparisonObject, values)){
            if(comparisonObject.section_name !== values.section_name && sections.map((section:any) => section.section_name).includes(values.section_name)){
                toast({title:'Section name is already exists', variant:'error'});
                return;
            };
            await modifySection({
                id:updateSection.id,
                section_name:values.section_name,
                order_no:values.order_no
            });
            setIsViewOpened(true);
            toast({title:'Updated Successfully!'});
        }
        // Delete section
        else if(updateSection.isDeleteClicked){
            await deleteSection({id:updateSection.id});
            setIsViewOpened(true);
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdateSection({
            id:'',
            isDeleteClicked:false,
            section_name:'',
            order_no:''
        });
        // Reseting form
        form.reset({
            section_name:'',
            order_no:''
        });
    };


    return (
        <div className='w-[90%] max-w-[500px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define Section</h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='relative w-full flex flex-col gap-8 pt-4 items-center px-2 sm:px-4 sm:gap-4'
                >



                    {/* Section Name */}
                    <FormField
                        control={form.control}
                        name='section_name'
                        render={({field}) => (
                            <FormItem className='w-full'>
                                <div className='w-full h-8 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                    <FormLabel className='basis-auto pr-2  text-xs text-[#726E71] sm:basis-[30%]'>Section Name</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className='h-full flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                            />
                                        </FormControl>
                                        <FormMessage className='mt-[-20px] text-xs'/>
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />

                    {/* Order No. */}
                    <FormField
                        control={form.control}
                        name='order_no'
                        render={({field}) => (
                            <FormItem className='w-full'>
                                <div className='w-full h-8 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                    <FormLabel className='basis-auto pr-2  text-xs text-[#726E71] sm:basis-[30%]'>Order No.</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className='h-full flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                            />
                                        </FormControl>
                                        <FormMessage className='mt-[-20px] text-xs'/>
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Buttons */}
                    <Buttons setIsViewOpened={setIsViewOpened} sections={sections} updateSection={updateSection} setUpdateSection={setUpdateSection} onSubmit={onSubmit} form={form}/>

                    
                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;