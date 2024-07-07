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
import {BoardValidation} from '@/lib/validations/fees/globalMasters/defineSchool/board';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {createBoard, deleteBoard, modifyBoard} from '@/lib/actions/fees/globalMasters/defineSchool/board.actions';





// Main function
const FormCom = ({setIsViewOpened, boards, updateBoard, setUpdateBoard}:any) => {


    // Toast
    const {toast} = useToast();


    // Comparison object
    const comparisonObject = {
        board:updateBoard.board,
        is_default:updateBoard.is_default
    };


    // Form
    const form:any = useForm({
        resolver:zodResolver(BoardValidation),
        defaultValues:{
            board:updateBoard.id === '' ? '' : updateBoard.board,
            is_default:updateBoard.id === '' ? false : updateBoard.is_default,
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof BoardValidation>) => {
        // Create board
        if(updateBoard.id === ''){
            if(boards.map((board:any) => board.board).includes(values.board)){
                toast({title:'Board name already exists', variant:'error'});
                return;
            };
            const res = await createBoard({
                board:values.board,
                is_default:values.is_default
            });
            if(res === 0){
                toast({title:'Please create a session first', variant:'alert'});
                return;
            };
            toast({title:'Added Successfully!'});
        }
        // Modify board
        else if(!deepEqual(comparisonObject, values)){
            if(comparisonObject.board !== values.board && boards.map((board:any) => board.board).includes(values.board)){
                toast({title:'Board name already exists', variant:'error'});
                return;
            };
            await modifyBoard({
                id:updateBoard.id,
                board:values.board,
                is_default:values.is_default
            });
            toast({title:'Updated Successfully!'});
        }
        // Delete board
        else if(updateBoard.isDeleteClicked){
            await deleteBoard({id:updateBoard.id});
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdateBoard({
            id:'',
            isDeleteClicked:false,
            board:'',
            is_default:false
        });
        // Reseting form
        form.reset({
            board:'',
            is_default:false
        });
    };


    return (
        <div className='w-[90%] max-w-[500px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define School Board</h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='relative w-full flex flex-col pt-4 items-center px-2 sm:px-4'
                >



                    {/* Board Name */}
                    <FormField
                        control={form.control}
                        name='board'
                        render={({field}) => (
                            <FormItem className='w-full h-10 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Board Name</FormLabel>
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


                    {/* Is Default */}
                    <FormField
                        control={form.control}
                        name='is_default'
                        render={({field}) => (
                            <FormItem className='w-full flex-1 h-10 pt-4 flex flex-row items-start justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                <>
                                    <FormControl>
                                        <div className='flex-1 flex items-center justify-end space-x-2'>
                                            <Switch
                                                id='is_default'
                                                {...field}
                                                value={field.value}
                                                onCheckedChange={field.onChange}
                                                checked={field.value}
                                                disabled={updateBoard.id === '' ? false : updateBoard.is_default}
                                            />
                                            <Label
                                                htmlFor='is_default'
                                                className='text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                                            >
                                                Is Default
                                            </Label>
                                        </div>
                                    </FormControl>
                                </>
                            </FormItem>
                        )}
                    />


                    {/* Buttons */}
                    <Buttons setIsViewOpened={setIsViewOpened} boards={boards} updateBoard={updateBoard} setUpdateBoard={setUpdateBoard} onSubmit={onSubmit} form={form}/>

                    
                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;