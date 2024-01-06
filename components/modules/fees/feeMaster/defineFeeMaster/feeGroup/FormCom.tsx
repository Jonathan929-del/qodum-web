'use client';
// Imports
import * as z from 'zod';
import Buttons from './Buttons';
import {deepEqual} from '@/lib/utils';
import {useForm} from 'react-hook-form';
import {Input} from '@/components/ui/input';
import {Switch} from '@/components/ui/switch';
import {Label} from '@/components/ui/label';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {GroupValidation} from '@/lib/validations/fees/feeMaster/feeMaster/group.validation';
import {createGroup, deleteGroup, modifyGroup} from '@/lib/actions/fees/feeMaster/feeMaster/group.actions';





// Main function
const FormCom = ({ setIsViewOpened, groups, updateGroup, setUpdateGroup }: any) => {


    // Toast
    const { toast } = useToast();


    // Comparison object
    const comparisonObject = {
        name: updateGroup.name,
        is_special: updateGroup.is_special,
    };


    // Form
    const form: any = useForm({
        resolver: zodResolver(GroupValidation),
        defaultValues: {
            name: updateGroup.id === '' ? '' : updateGroup.name,
            is_special: updateGroup.id === '' ? '' : updateGroup.is_special,
        }
    });


    // Submit handler
    const onSubmit = async (values: z.infer<typeof GroupValidation>) => {
        // Create head
        if (updateGroup.id === '') {
            if (groups.map((group: any) => group.name).includes(values.name)) {
                toast({ title: 'Group name already exists', variant: 'error' });
                return;
            };
            await createGroup({
                name: values.name,
                is_special: values.is_special
            });
            toast({ title: 'Added Successfully!' });
        }

        // Modify group
        else if (!deepEqual(comparisonObject, values)) {
            if (comparisonObject.name !== values.name && groups.map((group: any) => group.name).includes(values.name)) {
                toast({ title: 'Group name already exists', variant: 'error' });
                return;
            };
            await modifyGroup({
                id: updateGroup.id,
                name: values.name,
                is_special: values.is_special
            });
            toast({ title: 'Updated Successfully!' });
        }
        // Delete group
        else if (updateGroup.isDeleteClicked) {
            await deleteGroup({ id: updateGroup.id });
            toast({ title: 'Deleted Successfully!' });
        };


        // Reseting update entity
        setUpdateGroup({
            id: '',
            name: '',
            is_special: false
        });
        // Reseting form
        form.reset({
            name: '',
            is_special: false
        });
    };


    return (
        <div className='w-[90%] max-w-[500px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define Fee Group</h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='relative w-full flex flex-col pt-4 items-center px-2 sm:px-4'
                >



                    {/* Group Name */}
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem className='w-full h-10 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Group Name</FormLabel>
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

                


                    {/* Is Special */}
                    <FormField
                        control={form.control}
                        name='is_special'
                        render={({ field }) => (
                            <FormItem className='w-full flex-1 h-10 pt-4 flex flex-row items-start justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                <>
                                    <FormControl>
                                        <div className='flex-1 flex items-center justify-start space-x-2'>
                                            <Label
                                                htmlFor='is_default'
                                                className='text-xs text-[#726E71] text-end pr-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sm:basis-[30%]'
                                            >
                                                Is Special
                                            </Label>
                                            <Switch
                                                id='is_special'
                                                {...field}
                                                value={field.value}
                                                onCheckedChange={field.onChange}
                                                checked={field.value}
                                                // disabled={updateGroup.id === '' ? false : updateGroup.is_special}
                                            />
                                        </div>
                                    </FormControl>
                                </>
                            </FormItem>
                        )}
                    />



                    {/* Buttons */}
                    <Buttons setIsViewOpened={setIsViewOpened} groups={groups} updateGroup={updateGroup} setUpdateGroup={setUpdateGroup} onSubmit={onSubmit} form={form} />


                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;