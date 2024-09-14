'use client';
// Imports
import * as z from 'zod';
import Buttons from './Buttons';
import {deepEqual} from '@/lib/utils';
import {useForm} from 'react-hook-form';
import {Input} from '@/components/ui/input';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {DepartmentValidation} from '@/lib/validations/payroll/globalMasters/department.validation';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {createDepartment, deleteDepartment, modifyDepartment} from '@/lib/actions/payroll/globalMasters/department.actions';





// Main function
const FormCom = ({setIsViewOpened, departments, updateDepartment, setUpdateDepartment}:any) => {

    // Toast
    const {toast} = useToast();


    // Comparison object
    const comparisonObject = {
        department:updateDepartment.department
    };


    // Form
    const form = useForm({
        resolver:zodResolver(DepartmentValidation),
        defaultValues:{
            department:updateDepartment.id === '' ? '' : updateDepartment.department
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof DepartmentValidation>) => {
        // Create department
        if(updateDepartment.id === ''){
            if(departments.map((r:any) => r.department).includes(values.department)){
                toast({title:'Department already exists', variant:'error'});
                return;
            };
            const res = await createDepartment({
                department:values.department
            });
            if(res === 0){
                toast({title:'Please create a session first', variant:'alert'});
                return;
            };
            toast({title:'Added Successfully!'});
        }
        // Modify department
        else if(!deepEqual(comparisonObject, values)){
            if(comparisonObject.department !== values.department && departments.map((r:any) => r.department).includes(values.department)){
                toast({title:'Department already exists', variant:'error'});
                return;
            };
            await modifyDepartment({
                id:updateDepartment.id,
                department:values.department
            });
            toast({title:'Updated Successfully!'});
        }
        // Delete department
        else if(updateDepartment.isDeleteClicked){
            await deleteDepartment({id:updateDepartment.id});
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdateDepartment({
            id:'',
            isDeleteClicked:false,
            department:''
        });
        // Reseting form
        form.reset({
            department:''
        });
    };

    return (
        <div className='w-[90%] max-w-[500px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define Department</h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='relative w-full flex flex-col pt-4 items-center px-2 sm:px-4'
                >

                    {/* Name */}
                    <FormField
                        control={form.control}
                        name='department'
                        render={({field}) => (
                            <FormItem className='w-full h-10 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Department</FormLabel>
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


                    {/* Buttons */}
                    <Buttons setIsViewOpened={setIsViewOpened} departments={departments} updateDepartment={updateDepartment} setUpdateDepartment={setUpdateDepartment} onSubmit={onSubmit} form={form}/>

                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;