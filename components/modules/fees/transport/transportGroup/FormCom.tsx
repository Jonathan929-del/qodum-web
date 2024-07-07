'use client';
// Imports
import * as z from 'zod';
import Buttons from './Buttons';
import {deepEqual} from '@/lib/utils';
import {useForm} from 'react-hook-form';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {TransportGroupValidation} from '@/lib/validations/fees/transport/transportlGroup.validation';
import {createTransportGroup, deleteTransportGroup, modifyTransportGroup} from '@/lib/actions/fees/transport/transportGroup.actions';





// Main function
const FormCom = ({setIsViewOpened, transportGroups, updateTransportGroup, setUpdateTransportGroup}:any) => {

    // Toast
    const {toast} = useToast();


    // Comparison object
    const comparisonObject = {
        distance_name:updateTransportGroup.distance_name,
        distance_amount:updateTransportGroup.distance_amount,
        distance_from:updateTransportGroup.distance_from,
        distance_to:updateTransportGroup.distance_to,
        transport_term:updateTransportGroup.transport_term
    };
    
    
    // Form
    const form = useForm({
        resolver:zodResolver(TransportGroupValidation),
        defaultValues:{
            distance_name:updateTransportGroup.id === '' ? '' : updateTransportGroup.distance_name,
            distance_amount:updateTransportGroup.id === '' ? '' : updateTransportGroup.distance_amount,
            distance_from:updateTransportGroup.id === '' ? '' : updateTransportGroup.distance_from,
            distance_to:updateTransportGroup.id === '' ? '' : updateTransportGroup.distance_to,
            transport_term:updateTransportGroup.id === '' ? 'Monthly' : updateTransportGroup.transport_term
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof TransportGroupValidation>) => {
        // Create transport group
        if(updateTransportGroup.id === ''){
            if(transportGroups.map((transportGroup:any) => transportGroup.distance_name).includes(values.distance_name)){
                toast({title:'Distance name already exists', variant:'error'});
                return;
            };
            const res = await createTransportGroup({
                distance_name:values.distance_name,
                distance_amount:values.distance_amount,
                distance_from:values.distance_from,
                distance_to:values.distance_to,
                transport_term:values.transport_term
            });
            if(res === 0){
                toast({title:'Please create a session first', variant:'alert'});
                return;
            };
            toast({title:'Added Successfully!'});
        }
        // Modify transport group
        else if(!deepEqual(comparisonObject, values)){
            if(comparisonObject.distance_name !== values.distance_name && transportGroups.map((transportGroup:any) => transportGroup.distance_name).includes(values.distance_name)) {
                toast({title:'Distance name already exists', variant:'error'});
                return;
            };
            await modifyTransportGroup({
                id:updateTransportGroup.id,
                distance_name:values.distance_name,
                distance_amount:values.distance_amount,
                distance_from:values.distance_from,
                distance_to:values.distance_to,
                transport_term:values.transport_term
            });
            toast({title:'Updated Successfully!'});
        }
        // Delete transport group
        else if(updateTransportGroup.isDeleteClicked){
            await deleteTransportGroup({id:updateTransportGroup.id});
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdateTransportGroup({
            id:'',
            isDeleteClicked:false,
            distance_name:'',
            distance_amount:'',
            distance_from:'',
            distance_to:'',
            transport_term:''
        });
        // Reseting form
        form.reset({
            distance_name:'',
            distance_amount:'',
            distance_from:'',
            distance_to:'',
            transport_term:''
        });
    };

    return (
        <div className='w-[90%] max-w-[500px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define Transport Fare & Group</h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='w-full flex flex-col items-center gap-8 px-2 sm:px-4 sm:gap-3'
                >


                    {/* Distance Name */}
                    <FormField
                        control={form.control}
                        name='distance_name'
                        render={({field}) => (
                            <FormItem className='w-full h-8 mt-6 flex flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2'>
                                <FormLabel className='basis-auto text-center text-xs text-[#726E71] sm:basis-[30%]'>Distance Name</FormLabel>
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

                    {/* Distance Amount */}
                    <FormField
                        control={form.control}
                        name='distance_amount'
                        render={({field}) => (
                            <FormItem className='w-full h-8 flex flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2'>
                                <FormLabel className='basis-auto text-center text-xs text-[#726E71] sm:basis-[30%]'>Distance Amount (Monthly)</FormLabel>
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

                    {/* Distance From */}
                    <FormField
                        control={form.control}
                        name='distance_from'
                        render={({field}) => (
                            <FormItem className='w-full h-8 flex flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2'>
                                <FormLabel className='basis-auto text-center text-xs text-[#726E71] sm:basis-[30%]'>Distance From (K.M.)</FormLabel>
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

                    {/* Distance To */}
                    <FormField
                        control={form.control}
                        name='distance_to'
                        render={({field}) => (
                            <FormItem className='w-full h-8 flex flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2'>
                                <FormLabel className='basis-auto text-center text-xs text-[#726E71] sm:basis-[30%]'>Distance To (K.M.)</FormLabel>
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


                    {/* Transport Term */}
                    <div className='w-full flex flex-row gap:2'>
                        <FormLabel className='basis-auto text-center text-xs text-[#726E71] sm:basis-[30%]'>Distance To (K.M.)</FormLabel>
                        <RadioGroup
                            defaultValue={form.getValues().transport_term}
                            className='flex flex-row items-center'
                        >
                            <div className='flex items-center space-x-[2px]'>
                                <RadioGroupItem
                                    value='Monthly'
                                    id='Monthly'
                                    onClick={() => form.setValue('transport_term', 'Monthly')}
                                />
                                <Label
                                    htmlFor='Monthly'
                                >
                                    Monthly
                                </Label>
                            </div>
                            <div className='flex items-center space-x-[2px]'>
                                <RadioGroupItem
                                    value='Quarterly'
                                    id='Quarterly'
                                    onClick={() => form.setValue('transport_term', 'Quarterly')}
                                />
                                <Label
                                    htmlFor='Quarterly'
                                >
                                    Quarterly
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>


                    {/* Buttons */}
                    <div className='sm:px-10'>
                        <Buttons setIsViewOpened={setIsViewOpened} transportGroups={transportGroups} updateTransportGroup={updateTransportGroup} setUpdateTransportGroup={setUpdateTransportGroup} onSubmit={onSubmit} form={form}/>
                    </div>
                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;