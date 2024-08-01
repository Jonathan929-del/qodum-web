'use client';
// Imports
import * as z from 'zod';
import Buttons from './Buttons';
import HeadsList from './HeadsList';
import {deepEqual} from '@/lib/utils';
import {useForm} from 'react-hook-form';
import {Input} from '@/components/ui/input';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {FeeTypeValidation} from '@/lib/validations/fees/feeMaster/feeMaster/type.validation';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {createType, deleteType, modifyType} from '@/lib/actions/fees/feeMaster/feeMaster/type.actions';





// Main function
const FormCom = ({ setIsViewOpened, heads, updateType, types, setUpdateType }: any) => {


    // Toast
    const { toast } = useToast();


    // Comparison object
    const comparisonObject = {
        name: updateType.name,
        preference_no: updateType.preference_no,
        heads: updateType.heads
    };


    // Form
    const form = useForm({
        resolver: zodResolver(FeeTypeValidation),
        defaultValues: {
            name: updateType.id === '' ? '' : updateType.name,
            preference_no: updateType.id === '' ? '' : updateType.preference_no,
            heads: updateType.id === '' ? '' : updateType.heads,
        }
    });


    // Submit handler
    const onSubmit = async (values: z.infer<typeof FeeTypeValidation>) => {

        // Create type
        if (updateType.id === '') {
            if (types.map((type: any) => type.name).includes(values.name)) {
                toast({ title: 'Type name already exists', variant: 'error' });
                return;
            };
            const res = await createType({
                name: values.name,
                preference_no: values.preference_no,
                heads: values.heads
            });
            if(res === 0){
                toast({title:'Please create a session first', variant:'alert'});
                return;
            };
            toast({ title: 'Added Successfully!' });
        }

        // Modify type
        else if (!deepEqual(comparisonObject, values)) {
            if (comparisonObject.name !== values.name && types.map((type: any) => type.name).includes(values.name)) {
                toast({ title: 'Type name already exists', variant: 'error' });
                return;
            };
            await modifyType({
                id: updateType.id,
                name: values.name,
                preference_no: values.preference_no,
                heads: values.heads
            });
            toast({ title: 'Updated Successfully!' });
        }
        // Delete type
        else if (updateType.isDeleteClicked) {
            await deleteType({ id: updateType.id });
            toast({ title: 'Deleted Successfully!' });
        };


        // Reseting update entity
        setUpdateType({
            id: '',
            name: '',
            preference_no: 0,
            heads: []

        });
        // Reseting form
        form.reset({
            name: '',
            preference_no: 0,
            heads: []
        });
    };


    return (
        <div className='w-[90%] max-w-[900px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='relative w-full flex flex-col pt-4 items-center px-2 sm:px-4'
                >

                    <div className="flex flex-col w-full gap-10 mt-4 mb-4 sm:gap-2 sm:mt-0">

                        {/* Type name */}
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem className='w-full h-8 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center'>
                                    <FormLabel className='basis-auto pr-2 text-center text-xs text-[#726E71] sm:basis-[35%]'>Fee Type Name</FormLabel>
                                    <div className='w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className='flex flex-row h-8 items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                            />
                                        </FormControl>
                                        <FormMessage className='mt-[-20px] text-xs'/>
                                    </div>
                                </FormItem>
                            )}
                        />

                        {/*  Fee Type Preference No. */}
                        <FormField
                            control={form.control}
                            name='preference_no'
                            render={({ field }) => (
                                <FormItem className='w-full h-8 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center'>
                                    <FormLabel className='basis-auto pr-2 text-center text-xs text-[#726E71] sm:basis-[35%] '>Fee Type Preference No.</FormLabel>
                                    <div className='w-full flex flex-col justify-end items-start gap-4 sm:basis-[65%]'>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className='flex h-8 flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                            />
                                        </FormControl>
                                        <FormMessage className='mt-[-20px] text-xs'/>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>


                    <HeadsList heads={heads} updateType={updateType} form={form} />




                    {/* Buttons */}
                    <Buttons setIsViewOpened={setIsViewOpened} types={types} updateType={updateType} setUpdateType={setUpdateType} onSubmit={onSubmit} form={form} />


                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;