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
import {WingValidation} from '@/lib/validations/fees/globalMasters/defineClassDetails/wing.validation';
import {createWing, modifyWing, deleteWing} from '@/lib/actions/fees/globalMasters/defineClassDetails/wing.actions';





// Main function
const FormCom = ({setIsViewOpened, wings, updateWing, setUpdateWing}:any) => {


    // Toast
    const {toast} = useToast();


    // Comparison object
    const comparisonObject = {
        wing:updateWing.wing
    };


    // Form
    const form:any = useForm({
        resolver:zodResolver(WingValidation),
        defaultValues:{
            wing:updateWing.id === '' ? '' : updateWing.wing,
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof WingValidation>) => {
        // Create wing
        if(updateWing.id === ''){
            if(wings.map((wing:any) => wing.wing).includes(values.wing)){
                toast({title:'Wing name already exists', variant:'error'});
                return;
            };
            const res = await createWing({
                wing:values.wing
            });
            if(res === 0){
                toast({title:'Please create a session first', variant:'alert'});
                return;
            };
            toast({title:'Added Successfully!'});
        }
        // Modify wing
        else if(!deepEqual(comparisonObject, values)){
            if(comparisonObject.wing !== values.wing && wings.map((wing:any) => wing.wing).includes(values.wing)){
                toast({title:'Wing name is already exists', variant:'error'});
                return;
            };
            await modifyWing({
                id:updateWing.id,
                wing:values.wing,
            });
            toast({title:'Updated Successfully!'});
        }
        // Delete wing
        else if(updateWing.isDeleteClicked){
            await deleteWing({id:updateWing.id});
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdateWing({
            id:'',
            isDeleteClicked:false,
            wing:''
        });
        // Reseting form
        form.reset({
            wing:''
        });
    };


    return (
        <div className='w-[90%] max-w-[500px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define wing</h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='relative w-full flex flex-col pt-4 items-center px-2 sm:px-4'
                >



                    {/* Wing Name */}
                    <FormField
                        control={form.control}
                        name='wing'
                        render={({field}) => (
                            <FormItem className='w-full h-10 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Wing Name</FormLabel>
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
                    <Buttons setIsViewOpened={setIsViewOpened} wings={wings} updateWing={updateWing} setUpdateWing={setUpdateWing} onSubmit={onSubmit} form={form}/>

                    
                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;