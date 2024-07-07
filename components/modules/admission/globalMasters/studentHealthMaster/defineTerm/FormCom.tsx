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
import {TermValidation} from '@/lib/validations/admission/globalMasters/studentHealthMaster/term.validation';
import {createTerm, deleteTerm, modifyTerm} from '@/lib/actions/admission/globalMasters/studentHealthMaster/term.actions';





// Main function
const FormCom = ({setIsViewOpened, terms, updateTerm, setUpdateTerm}:any) => {


    // Toast
    const {toast} = useToast();


    // Comparison object
    const comparisonObject = {
        term_name:updateTerm.term_name
    };


    // Form
    const form = useForm({
        resolver: zodResolver(TermValidation),
        defaultValues: {
            term_name:updateTerm.id === '' ? '' : updateTerm.term_name
        }
    });


    // Submit handler
    const onSubmit = async (values: z.infer<typeof TermValidation>) => {
        // Create term
        if (updateTerm.id === '') {
            if (terms.map((t: any) => t.term_name).includes(values.term_name)) {
                toast({title:'Term already exists', variant:'error'});
                return;
            };
            const res = await createTerm({
                term_name:values.term_name
            });
            if(res === 0){
                toast({title:'Please create a session first', variant:'alert'});
                return;
            };
            toast({ title: 'Added Successfully!' });
        }
        // Modify term
        else if (!deepEqual(comparisonObject, values)) {
            if (comparisonObject.term_name !== values.term_name && terms.map((t: any) => t.term_name).includes(values.term_name)) {
                toast({ title: 'Term name already exists', variant: 'error' });
                return;
            };
            await modifyTerm({
                id: updateTerm.id,
                term_name:values.term_name
            });
            toast({title:'Updated Successfully!'});
        }
        // Delete term
        else if (updateTerm.isDeleteClicked) {
            await deleteTerm({ id: updateTerm.id });
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdateTerm({
            id: '',
            isDeleteClicked: false,
            term_name:''
        });
        // Reseting form
        form.reset({
            term_name:''
        });
    };


    return (
        <div className='w-[90%] max-w-[500px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define Term</h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='relative w-full flex flex-col pt-4 items-center px-2 gap-2 sm:px-4'
                >


                    {/* Term Name */}
                    <FormField
                        control={form.control}
                        name='term_name'
                        render={({ field }) => (
                            <FormItem className='w-full h-10 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Term Name</FormLabel>
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
                    <Buttons setIsViewOpened={setIsViewOpened} terms={terms} updateTerm={updateTerm} setUpdateTerm={setUpdateTerm} onSubmit={onSubmit} form={form} />


                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;