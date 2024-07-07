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
import {TransportMediumValidation} from '@/lib/validations/fees/transport/transportlMedium.validation';
import {createTransportMedium, deleteTransportMedium, modifyTransportMedium} from '@/lib/actions/fees/transport/transportMedium.actions';





// Main function
const FormCom = ({setIsViewOpened, transportMediums, updateTransportMedium, setUpdateTransportMedium}:any) => {


    // Toast
    const {toast} = useToast();


    // Comparison object
    const comparisonObject = {
        transport_medium:updateTransportMedium.transport_medium
    };
    
    
    // Form
    const form = useForm({
        resolver:zodResolver(TransportMediumValidation),
        defaultValues:{
            transport_medium:updateTransportMedium.id === '' ? '' : updateTransportMedium.transport_medium
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof TransportMediumValidation>) => {
        // Create transport Medium
        if(updateTransportMedium.id === ''){
            if(transportMediums.map((transportMedium:any) => transportMedium.transport_medium).includes(values.transport_medium)){
                toast({title:'Transport medium already exists', variant:'error'});
                return;
            };
            const res = await createTransportMedium({
                transport_medium:values.transport_medium
            });
            if(res === 0){
                toast({title:'Please create a session first', variant:'alert'});
                return;
            };
            toast({title:'Added Successfully!'});
        }
        // Modify transport Medium
        else if(!deepEqual(comparisonObject, values)){
            if(comparisonObject.transport_medium !== values.transport_medium && transportMediums.map((transportMedium:any) => transportMedium.transport_medium).includes(values.transport_medium)) {
                toast({title:'Transport medium already exists', variant:'error'});
                return;
            };
            await modifyTransportMedium({
                id:updateTransportMedium.id,
                transport_medium:values.transport_medium
            });
            toast({title:'Updated Successfully!'});
        }
        // Delete transport Medium
        else if(updateTransportMedium.isDeleteClicked){
            await deleteTransportMedium({id:updateTransportMedium.id});
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdateTransportMedium({
            id:'',
            isDeleteClicked:false,
            transport_medium:''
        });
        // Reseting form
        form.reset({
            transport_medium:''
        });
    };


    return (
        <div className='w-[90%] max-w-[500px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define Transport Medium</h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='w-full flex flex-col items-center gap-8 px-2 sm:px-4 sm:gap-3'
                >


                    {/* Transport Medium */}
                    <FormField
                        control={form.control}
                        name='transport_medium'
                        render={({field}) => (
                            <FormItem className='w-full h-8 mt-6 flex flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2'>
                                <FormLabel className='basis-auto text-center text-xs text-[#726E71] sm:basis-[30%]'>Transport Medium</FormLabel>
                                <div className='w-full h-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none'
                                        />
                                    </FormControl>
                                    <FormMessage className='text-xs mt-[-20px]'/>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Buttons */}
                    <div className='sm:px-10'>
                        <Buttons setIsViewOpened={setIsViewOpened} transportMediums={transportMediums} updateTransportMedium={updateTransportMedium} setUpdateTransportMedium={setUpdateTransportMedium} onSubmit={onSubmit} form={form}/>
                    </div>
                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;