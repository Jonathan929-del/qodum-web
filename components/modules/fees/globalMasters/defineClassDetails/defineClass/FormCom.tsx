// 'use client';
// // Imports
// import * as z from 'zod';
// import Buttons from './Buttons';
// import {deepEqual} from '@/lib/utils';
// import {useForm} from 'react-hook-form';
// import {Input} from '@/components/ui/input';
// import {useToast} from '@/components/ui/use-toast';
// import {zodResolver} from '@hookform/resolvers/zod';
// import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
// import {WingValidation} from '@/lib/validations/fees/globalMasters/defineClassDetails/wing.validation';
// import {createWing, modifyWing, deleteWing} from '@/lib/actions/fees/globalMasters/defineClassDetails/wing.actions';
// import { createClass, modifyClass } from '@/lib/actions/fees/globalMasters/defineClassDetails/class.actions';
// import { ClassValidation } from '@/lib/validations/fees/globalMasters/defineClassDetails/class.validation';





// // Main function
// const FormCom = ({setIsViewOpened, wings, classes, schools, updateClass, setUpdateClass}:any) => {


//     // Toast
//     const {toast} = useToast();


//     // Comparison object
//     const comparisonObject = {
//         class_name:updateClass.class_name,
//         wing_name:updateClass.wing_name,
//         school:updateClass.school,
//         order:updateClass.order
//     };


//     // Form
//     const form:any = useForm({
//         resolver:zodResolver(ClassValidation),
//         defaultValues:{
//             class_name:updateClass.id === '' ? '' : updateClass.class_name,
//             wing_name:updateClass.id === '' ? '' : updateClass.wing_name,
//             school:updateClass.id === '' ? '' : updateClass.school,
//             order:updateClass.id === '' ? 0 : updateClass.order
//         }
//     });


//     // Submit handler
//     const onSubmit = async (values:z.infer<typeof ClassValidation>) => {
//         // Create class
//         if(updateClass.id === ''){
//             if(classes.map((item:any) => item.class_name).includes(values.class_name)){
//                 toast({title:'Class name already exists', variant:'error'});
//                 return;
//             };
//             await createClass({
//                 class_name:values.class_name,
//                 wing_name:values.wing_name,
//                 school:values.school,
//                 order:values.order
//             });
//             setIsViewOpened(true);
//             toast({title:'Added Successfully!'});
//         }
//         // Modify wing
//         else if(!deepEqual(comparisonObject, values)){
//             if(comparisonObject.class_name !== values.class_name && classes.map((item:any) => item.class_name).includes(values.class_name)){
//                 toast({title:'Wing name is already exists', variant:'error'});
//                 return;
//             };
//             await modifyClass({
//                 id:updateClass.id,
//                 class_name:values.class_name,
//                 wing_name:values.wing_name,
//                 school:values.school,
//                 order:values.order
//             });
//             setIsViewOpened(true);
//             toast({title:'Updated Successfully!'});
//         }
//         // Delete wing
//         else if(updateClass.isDeleteClicked){
//             await deleteWing({id:updateClass.id});
//             setIsViewOpened(true);
//             toast({title:'Deleted Successfully!'});
//         };


//         // Reseting update entity
//         setUpdateClass({
//             id:'',
//             isDeleteClicked:false,
//             wing:''
//         });
//         // Reseting form
//         form.reset({
//             wing:''
//         });
//     };


//     return (
//         <div className='w-[90%] max-w-[500px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
//             <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define wing</h2>
//             <Form
//                 {...form}
//             >
//                 <form
//                     onSubmit={form.handleSubmit(onSubmit)}
//                     className='relative w-full flex flex-col pt-4 items-center px-2 sm:px-4'
//                 >



//                     {/* Wing Name */}
//                     <FormField
//                         control={form.control}
//                         name='wing'
//                         render={({field}) => (
//                             <FormItem className='w-full h-10 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center'>
//                                 <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Wing Name</FormLabel>
//                                 <div className='w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
//                                     <FormControl>
//                                         <Input
//                                             {...field}
//                                             className='flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
//                                         />
//                                     </FormControl>
//                                     <div className='mt-[-10px] text-xs'>
//                                         <FormMessage />
//                                     </div>
//                                 </div>
//                             </FormItem>
//                         )}
//                     />


//                     {/* Buttons */}
//                     <Buttons setIsViewOpened={setIsViewOpened} wings={wings} updateClass={updateClass} setUpdateClass={setUpdateClass} onSubmit={onSubmit} form={form}/>

                    
//                 </form>
//             </Form>
//         </div>
//     );
// };





// // Export
// export default FormCom;