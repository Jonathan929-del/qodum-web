'use client';
// Imports
import * as z from 'zod';
import Buttons from './Buttons';
import {deepEqual} from '@/lib/utils';
import {useForm} from 'react-hook-form';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Switch} from '@/components/ui/switch';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {CategoryValidation} from '@/lib/validations/admission/globalMasters/category.validation';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {createCategory, deleteCategory, modifyCategory} from '@/lib/actions/admission/globalMasters/category.actions';





// Main function
const FormCom = ({setIsViewOpened, categories, updateCategory, setUpdateCategory}:any) => {


    // Toast
    const {toast} = useToast();


    // Comparison object
    const comparisonObject = {
        category_name:updateCategory.category_name,
        is_default:updateCategory.is_default
    };


    // Form
    const form = useForm({
        resolver:zodResolver(CategoryValidation),
        defaultValues:{
            category_name:updateCategory.id === '' ? '' : updateCategory.category_name,
            is_default:updateCategory.id === '' ? false : updateCategory.is_default
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof CategoryValidation>) => {
        // Create category
        if(updateCategory.id === ''){
            if(categories.map((cat:any) => cat.category_name).includes(values.category_name)){
                toast({title:'Category name already exists', variant:'error'});
                return;
            };
            const res = await createCategory({
                category_name:values.category_name,
                is_default:values.is_default
            });
            if(res === 0){
                toast({title:'Please create a session first', variant:'alert'});
                return;
            };
            toast({title:'Added Successfully!'});
        }
        // Modify Category
        else if(!deepEqual(comparisonObject, values)){
            if(comparisonObject.category_name !== values.category_name && categories.map((cat:any) => cat.category_name).includes(values.category_name)){
                toast({title:'Category name already exists', variant:'error'});
                return;
            };
            await modifyCategory({
                id:updateCategory.id,
                category_name:values.category_name,
                is_default:values.is_default
            });
            toast({title:'Updated Successfully!'});
        }
        // Delete remark
        else if(updateCategory.isDeleteClicked){
            await deleteCategory({id:updateCategory.id});
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdateCategory({
            id:'',
            isDeleteClicked:false,
            category_name:'',
            is_default:false
        });
        // Reseting form
        form.reset({
            category_name:'',
            is_default:false
        });
    };


    return (
        <div className='w-[90%] max-w-[500px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define Category </h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='relative w-full flex flex-col pt-4 items-center px-2 sm:px-4'
                >


                    {/* Category Name */}
                    <FormField
                        control={form.control}
                        name='category_name'
                        render={({field}) => (
                            <FormItem className='w-full h-10 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Category Name</FormLabel>
                                <div className='w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className='flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                        />
                                    </FormControl>
                                    <div className='mt-[-10px] text-xs'>
                                        <FormMessage />
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Is Default */}
                    <FormField
                        control={form.control}
                        name='is_default'
                        render={({ field }) => (
                            <FormItem className='w-full flex-1 h-10 pt-4 flex flex-row items-start justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                <>
                                    <FormControl>
                                        <div className='flex-1 flex items-center justify-start space-x-2'>
                                            <Label
                                                htmlFor='is_default'
                                                className='text-xs text-[#726E71] text-end pr-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sm:basis-[30%]'
                                            >
                                                Is Default
                                            </Label>
                                            <Switch
                                                id='is_default'
                                                {...field}
                                                value={field.value}
                                                onCheckedChange={field.onChange}
                                                checked={field.value}
                                            />
                                        </div>
                                    </FormControl>
                                </>
                            </FormItem>
                        )}
                    />


                    {/* Buttons */}
                    <Buttons setIsViewOpened={setIsViewOpened} categories={categories} updateCategory={updateCategory} setUpdateCategory={setUpdateCategory} onSubmit={onSubmit} form={form}/>

                    
                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;