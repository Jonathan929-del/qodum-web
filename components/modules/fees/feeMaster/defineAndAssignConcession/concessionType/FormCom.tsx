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
import {ConcessionTypeValidation} from '@/lib/validations/fees/feeMaster/defineAndAssignConcession/concessionType.validation';
import {createConcessionType, deleteConcessionType, modifyConcessionType} from '@/lib/actions/fees/feeMaster/defineAndAssignConcession/concessionType.actions';





// Main function
const FormCom = ({setIsViewOpened, concessionsTypes, updateConcessionType, setUpdateConcessionType}: any) => {


    // Toast
    const {toast} = useToast();


    // Comparison object
    const comparisonObject = {
        type:updateConcessionType.type
    };


    // Form
    const form = useForm({
        resolver: zodResolver(ConcessionTypeValidation),
        defaultValues: {
            type:updateConcessionType.id === '' ? '' : updateConcessionType.type
        }
    });


    // Submit handler
    const onSubmit = async (values: z.infer<typeof ConcessionTypeValidation>) => {
        // Create concession type
        if (updateConcessionType.id === '') {
            if (concessionsTypes?.map((concessionType:any) => concessionType.type).includes(values.type)) {
                toast({title:'Concession type already exists', variant: 'error'});
                return;
            };
            await createConcessionType({
                type:values.type,
            });
            toast({title:'Added Successfully!'});
        }
        // Modify concession type
        else if (!deepEqual(comparisonObject, values)) {
            console.log('excuting');
            if (comparisonObject.type !== values.type && concessionsTypes?.map((concessionType: any) => concessionType.type).includes(values.type)) {
                toast({title:'Concession type already exists', variant: 'error'});
                return;
            };
            await modifyConcessionType({
                id:updateConcessionType.id,
                type:values.type
            });
            toast({title:'Updated Successfully!'});
        }
        // Delete concession type
        else if (updateConcessionType.isDeleteClicked) {
            await deleteConcessionType({id:updateConcessionType.id});
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdateConcessionType({
            id:'',
            isDeleteClicked:false,
            type:'',
        });
        // Reseting form
        form.reset({
            type:'',
        });
    };


    return (
        <div className='w-[90%] max-w-[500px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define Concession Type</h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='relative w-full flex flex-col pt-4 items-center px-2 sm:px-4'
                >


                    {/* Concession Type */}
                    <FormField
                        control={form.control}
                        name='type'
                        render={({ field }) => (
                            <FormItem className='w-full h-10 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Concession Type</FormLabel>
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
                    <Buttons setIsViewOpened={setIsViewOpened} concessionsTypes={concessionsTypes} updateConcessionType={updateConcessionType} setUpdateConcessionType={setUpdateConcessionType} onSubmit={onSubmit} form={form} />


                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;