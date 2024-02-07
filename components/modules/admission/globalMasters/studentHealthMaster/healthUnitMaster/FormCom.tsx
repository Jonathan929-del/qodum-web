'use client';
// Imports
import * as z from 'zod';
import Buttons from './Buttons';
import {deepEqual} from '@/lib/utils';
import {useForm} from 'react-hook-form';
import {ChevronDown} from 'lucide-react';
import {Input} from '@/components/ui/input';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {HealthUnitValidation} from '@/lib/validations/admission/globalMasters/studentHealthMaster/healthUnit.validation';
import {createHealthUnit, deleteHealthUnit, modifyHealthUnit} from '@/lib/actions/admission/globalMasters/studentHealthMaster/healthUnit.actions';





// Main function
const FormCom = ({setIsViewOpened, healthUnits, updateHealthUnit, setUpdateHealthUnit}:any) => {


    // Toast
    const {toast} = useToast();


    // Comparison object
    const comparisonObject = {
        unit_name: updateHealthUnit.unit_name,
        unit_type: updateHealthUnit.unit_type,
    };


    // Form
    const form:any = useForm({
        resolver:zodResolver(HealthUnitValidation),
        defaultValues:{
            unit_name:updateHealthUnit.id === '' ? '' : updateHealthUnit.unit_name,
            unit_type:updateHealthUnit.id === '' ? '' : updateHealthUnit.unit_type,
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof HealthUnitValidation>) => {
        // Create remark
        if(updateHealthUnit.id === ''){
            if(healthUnits.map((hUnit:any) => hUnit.unit_name).includes(values.unit_name)){
                toast({title:'Health unit name already exists', variant:'error'});
                return;
            };
            await createHealthUnit({
                unit_name:values.unit_name,
                unit_type:values.unit_type
            });
            toast({title:'Added Successfully!'});
        }
        // Modify remark
        else if(!deepEqual(comparisonObject, values)){
            if(comparisonObject.unit_name !== values.unit_name && healthUnits.map((hUnit:any) => hUnit.unit_name).includes(values.unit_name)){
                toast({title:'Health Unit name is already exists', variant:'error'});
                return;
            };
            await modifyHealthUnit({
                id:updateHealthUnit.id,
                unit_name:values.unit_name,
                unit_type:values.unit_type,
            });
            toast({title:'Updated Successfully!'});
        }
        // Delete Health Unit 
        else if(updateHealthUnit.isDeleteClicked){
            await deleteHealthUnit({id:updateHealthUnit.id});
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdateHealthUnit({
            id:'',
            isDeleteClicked:false,
            unit_name:'',
            unit_type:''
        });
        // Reseting form
        form.reset({
            unit_name:'',
            unit_type:''
        });
    };


    return (
        <div className='w-[90%] max-w-[500px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define Health Unit Master</h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='relative w-full flex flex-col pt-4 items-center px-2 sm:px-4'
                >




                    {/* Health Unit Name */}
                    <FormField
                        control={form.control}
                        name='unit_name'
                        render={({ field }) => (
                            <FormItem className='w-full flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Unit Name</FormLabel>
                                <div className='w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className='flex h-8 flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                        />
                                    </FormControl>
                                    <div className='mt-[-10px] text-xs'>
                                        <FormMessage />
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Unit */}
                    <FormField
                        control={form.control}
                        name='unit_type'
                        render={({ field }) => (
                            <FormItem className='relative w-full flex flex-col items-start justify-center h-8 mt-6 sm:flex-row sm:items-center sm:mt-2'>
                                <FormLabel className='basis-auto mb-[-4px] pr-2 text-end text-xs text-[#726E71] sm:basis-[30%] sm:mb-0'>Unit Type</FormLabel>
                                <div className='w-full h-full flex flex-col items-start sm:basis-[70%]'>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className='w-full h-8 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                <SelectValue placeholder='Select' />
                                                <ChevronDown className='h-4 w-4 opacity-50' />
                                            </SelectTrigger>
                                            <SelectContent>

                                                <SelectItem value='numeric'>Numeric</SelectItem>
                                                <SelectItem value='non_numeric'>Non Numeric</SelectItem>
                                                
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </div>
                                <FormMessage className='absolute text-xs w-[200px] z-10 left-0 sm:left-[30%] top-[100%]' />
                            </FormItem>
                        )}
                    />


                    {/* Buttons */}
                    <Buttons setIsViewOpened={setIsViewOpened} healthUnits={healthUnits} updateHealthUnit={updateHealthUnit} setUpdateHealthUnit={setUpdateHealthUnit} onSubmit={onSubmit} form={form}/>

                    
                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;