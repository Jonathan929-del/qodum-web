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
import {DocumentTypeValidation} from '@/lib/validations/admission/globalMasters/document/documentType.validation';
import {createDocumentType, deleteDocumentType, modifyDocumentType} from '@/lib/actions/admission/globalMasters/document/documentType.actions';
import { StaffDocumentTypeValidation } from '@/lib/validations/payroll/globalMasters/document/staffDocumentType.validation';
import { createStaffDocumentType, deleteStaffDocumentType, modifyStaffDocumentType } from '@/lib/actions/payroll/globalMasters/document/staffDocumentType.actions';
import { modifyStaffDocument } from '@/lib/actions/payroll/globalMasters/document/staffDocument.actions';





// Main function
const FormCom = ({setIsViewOpened, documentTypes, updateDocumentType, setUpdateDocumentType}:any) => {


    // Toast
    const {toast} = useToast();


    // Comparison object
    const comparisonObject = {
        document_type:updateDocumentType.document_type
    };


    // Form
    const form = useForm({
        resolver:zodResolver(StaffDocumentTypeValidation),
        defaultValues:{
            document_type:updateDocumentType.id === '' ? '' : updateDocumentType.document_type
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof StaffDocumentTypeValidation>) => {
        // Create document type
        if(updateDocumentType.id === ''){
            if(documentTypes.map((t:any) => t.document_type).includes(values.document_type)){
                toast({title:'Document type already exists', variant:'error'});
                return;
            };
            const res = await createStaffDocumentType({
                document_type:values.document_type
            });
            if(res === 0){
                toast({title:'Please create a session first', variant:'alert'});
                return;
            };
            toast({title:'Added Successfully!'});
        }
        // Modify document type
        else if(!deepEqual(comparisonObject, values)){
            if(comparisonObject.document_type !== values.document_type && documentTypes.map((d:any) => d.document_type).includes(values.document_type)){
                toast({title:'Document type already exists', variant:'error'});
                return;
            };
            await modifyStaffDocumentType({
                id:updateDocumentType.id,
                document_type:values.document_type
            });
            toast({title:'Updated Successfully!'});
        }
        // Delete document type
        else if(updateDocumentType.isDeleteClicked){
            await deleteStaffDocumentType({id:updateDocumentType.id});
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdateDocumentType({
            id:'',
            isDeleteClicked:false,
            document_type:''
        });
        // Reseting form
        form.reset({
            document_type:''
        });
    };


    return (

            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='relative w-full flex flex-col pt-4 items-center px-2 sm:px-4'
                >


                    {/* Document Type */}
                    <FormField
                        control={form.control}
                        name='document_type'
                        render={({field}) => (
                            <FormItem className='w-full h-10 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Document type</FormLabel>
                                <div className='w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className='flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                        />
                                    </FormControl>
                                    <div className='mt-[-20px] text-xs'>
                                        <FormMessage />
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Buttons */}
                    <Buttons setIsViewOpened={setIsViewOpened} documentTypes={documentTypes} updateDocumentType={updateDocumentType} setUpdateDocumentType={setUpdateDocumentType} onSubmit={onSubmit} form={form}/>

                    
                </form>
            </Form>
    );
};





// Export
export default FormCom;