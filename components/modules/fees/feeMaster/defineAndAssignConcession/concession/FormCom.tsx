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
import {ConcessionValidation} from '@/lib/validations/fees/feeMaster/defineAndAssignConcession/concession.validation';
import {createConcession, deleteConcession, modifyConcession} from '@/lib/actions/fees/feeMaster/defineAndAssignConcession/concession.actions';





// Main function
const FormCom = ({setIsViewOpened, concessions, updateConcession, setUpdateConcession}: any) => {


    // Toast
    const {toast} = useToast();


    // Comparison object
    const comparisonObject = {
        name:updateConcession.name
    };


    // Form
    const form = useForm({
        resolver: zodResolver(ConcessionValidation),
        defaultValues: {
            name: updateConcession.id === '' ? '' : updateConcession.name

        }
    });


    // Submit handler
    const onSubmit = async (values: z.infer<typeof ConcessionValidation>) => {
        // Create concession
        if (updateConcession.id === '') {
            if (concessions?.map((concession:any) => concession.name).includes(values.name)) {
                toast({title:'Concession name already exists', variant: 'error'});
                return;
            };
            await createConcession({
                name:values.name,
            });
            toast({title:'Added Successfully!'});
        }
        // Modify concession
        else if (!deepEqual(comparisonObject, values)) {
            if (comparisonObject.name !== values.name && concessions?.map((concession: any) => concession.name).includes(values.name)) {
                toast({title:'Concession name already exists', variant: 'error'});
                return;
            };
            await modifyConcession({
                id:updateConcession.id,
                name:values.name
            });
            toast({title:'Updated Successfully!'});
        }
        // Delete concession
        else if (updateConcession.isDeleteClicked) {
            await deleteConcession({id:updateConcession.id});
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdateConcession({
            id: '',
            name: '',
            isDeleteClicked:false
        });
        // Reseting form
        form.reset({
            name:'',
        });
    };


    return (
        <div className='w-[90%] max-w-[500px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define Concession</h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='relative w-full flex flex-col pt-4 items-center px-2 sm:px-4'
                >


                    {/* Concession Name */}
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem className='w-full h-10 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Concession Name</FormLabel>
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
                    <Buttons setIsViewOpened={setIsViewOpened} concessions={concessions} updateConcession={updateConcession} setUpdateConcession={setUpdateConcession} onSubmit={onSubmit} form={form} />


                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;