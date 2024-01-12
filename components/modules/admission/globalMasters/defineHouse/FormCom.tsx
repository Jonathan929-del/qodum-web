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
import {createHouse, deleteHouse, modifyHouse} from '@/lib/actions/admission/globalMasters/house.actions';
import {HouseValidation} from '@/lib/validations/admission/globalMasters/house.validation';





// Main function
const FormCom = ({setIsViewOpened, houses, updateHouse, setUpdateHouse}:any) => {


    // Toast
    const {toast} = useToast();


    // Comparison object
    const comparisonObject = {
        house_name: updateHouse.house_name
    };


    // Form
    const form:any = useForm({
        resolver:zodResolver(HouseValidation),
        defaultValues:{
            house_name: updateHouse.id === '' ? '' : updateHouse.house_name,
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof HouseValidation>) => {
        // Create house
        if(updateHouse.id === ''){
            if(houses.map((house:any) => house.house_name).includes(values.house_name)){
                toast({title:'House name already exists', variant:'error'});
                return;
            };
            await createHouse({
                house_name: values.house_name
            });
            toast({title:'Added Successfully!'});
        }
        // Modify House
        else if(!deepEqual(comparisonObject, values)){
            if(comparisonObject.house_name !== values.house_name && houses.map((house:any) => house.house_name).includes(values.house_name)){
                toast({title:'House name is already exists', variant:'error'});
                return;
            };
            await modifyHouse({
                id:updateHouse.id,
                house_name:values.house_name
            });
            toast({title:'Updated Successfully!'});
        }
        // Delete house
        else if(updateHouse.isDeleteClicked){
            await deleteHouse({id:updateHouse.id});
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdateHouse({
            id:'',
            isDeleteClicked:false,
            house_name:''
        });
        // Reseting form
        form.reset({
            house_name:''
        });
    };


    return (
        <div className='w-[90%] max-w-[500px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define House</h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='relative w-full flex flex-col pt-4 items-center px-2 sm:px-4'
                >



                    {/* house Name */}
                    <FormField
                        control={form.control}
                        name='house_name'
                        render={({field}) => (
                            <FormItem className='w-full h-10 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>House Name</FormLabel>
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
                    <Buttons setIsViewOpened={setIsViewOpened} houses={houses} updateHouse={updateHouse} setUpdateHouse={setUpdateHouse} onSubmit={onSubmit} form={form}/>

                    
                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;