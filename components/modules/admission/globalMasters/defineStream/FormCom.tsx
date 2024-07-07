'use client';
// Imports
import * as z from 'zod';
import Buttons from './Buttons';
import {deepEqual} from '@/lib/utils';
import {useForm} from 'react-hook-form';
import {Input} from '@/components/ui/input';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import { RemarkValidation } from '@/lib/validations/admission/globalMasters/remark.validation';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {createRemark, deleteRemark, modifyRemark} from '@/lib/actions/admission/globalMasters/remark.actions';
import { StreamValidation } from '@/lib/validations/admission/globalMasters/stream.validation';
import { createStream, deleteStream, modifyStream } from '@/lib/actions/admission/globalMasters/stream.actions';





// Main function
const FormCom = ({setIsViewOpened, streams, updateStream, setUpdateStream}:any) => {


    // Toast
    const {toast} = useToast();


    // Comparison object
    const comparisonObject = {
        stream_name:updateStream.stream_name
    };


    // Form
    const form:any = useForm({
        resolver:zodResolver(StreamValidation),
        defaultValues:{
            stream_name:updateStream.id === '' ? '' : updateStream.stream_name
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof StreamValidation>) => {
        // Create stream
        if(updateStream.id === ''){
            if(streams.map((s:any) => s.stream_name).includes(values.stream_name)){
                toast({title:'Stream name already exists', variant:'error'});
                return;
            };
            const res = await createStream({
                stream_name:values.stream_name
            });
            if(res === 0){
                toast({title:'Please create a session first', variant:'alert'});
                return;
            };
            toast({title:'Added Successfully!'});
        }
        // Modify stream
        else if(!deepEqual(comparisonObject, values)){
            if(comparisonObject.stream_name !== values.stream_name && streams.map((s:any) => s.stream_name).includes(values.stream_name)){
                toast({title:'Stream name is already exists', variant:'error'});
                return;
            };
            await modifyStream({
                id:updateStream.id,
                stream_name:values.stream_name
            });
            toast({title:'Updated Successfully!'});
        }
        // Delete stream
        else if(updateStream.isDeleteClicked){
            await deleteStream({id:updateStream.id});
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdateStream({
            id:'',
            isDeleteClicked:false,
            stream_name:''
        });
        // Reseting form
        form.reset({
            stream_name:''
        });
    };


    return (
        <div className='w-[90%] max-w-[500px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define Stream</h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='relative w-full flex flex-col pt-4 items-center px-2 sm:px-4'
                >



                    {/* Stream Name */}
                    <FormField
                        control={form.control}
                        name='stream_name'
                        render={({field}) => (
                            <FormItem className='w-full h-10 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Stream Name</FormLabel>
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
                    <Buttons setIsViewOpened={setIsViewOpened} streams={streams} updateStream={updateStream} setUpdateStream={setUpdateStream} onSubmit={onSubmit} form={form}/>

                    
                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;