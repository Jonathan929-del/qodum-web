'use client';
// Imports
import * as z from 'zod';
import {useState} from 'react';
import LeftSide from './LeftSide';
import RightSide from './RightSide';
import {useForm} from 'react-hook-form';
import {Form} from '@/components/ui/form';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {FeeEntryValidation} from '@/lib/validations/fees/manageFee/feeEntry.validation';
import { ModifyStudentAffiliatedHeads } from '@/lib/actions/admission/admission/admittedStudent.actions';





// Main function
const FormCom = ({installments, classes, sections, setIsViewOpened, students, selectedStudent, setSelectedStudent, setIsLoading, selectedInstallments, setSelectedInstallments, setInstallments}: any) => {


    // Toast
    const {toast} = useToast();


    // Heads
    const [heads, setHeads] = useState<any>([]);


    // Form
    const form = useForm({
        resolver:zodResolver(FeeEntryValidation),
        defaultValues:{
            receipt_date:new Date(),
            ref_no:'',
            receipt_no:0,
            pay_mode:'',
            remarks:'',
            is_adjust_advance:false,
            adjust_advance:0,
            fee_type:'All Fee Types',
            bank_name:'',
            installment:[''],
            entry_mode:'School',
            heads:[{
                conc_amount:0,
                paid_amount:0
            }],
            total_paid_amount:0,
            dues:0,
            advance_amt:0
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof FeeEntryValidation>) => {


        // Unchanged heads
        const unChangedHeads = selectedStudent.affiliated_heads.heads.filter((studentHead:any) => !heads.map((head:any) => head.head_name).includes(studentHead.head_name)).map((studentHead:any) => {
            return {
                ...studentHead,
                amounts:selectedStudent.affiliated_heads.heads.map((h:any) => h.amounts.map((a:any) => {
                    return {
                        name:a.name,
                        value:Number(a.value)
                    };
                }))[0]
            };
        });


        // Changed heads
        const newHeads = {
            ...selectedStudent,
            affiliated_heads:{
                group_name:selectedStudent.affiliated_heads.group_name,
                heads:selectedStudent.affiliated_heads.heads.filter((studentHead:any) => heads.map((head:any) => head.head_name).includes(studentHead.head_name)).map((studentHead:any) => {
                    return {
                        ...studentHead,
                        amounts:heads.filter((h:any) => h.head_name === studentHead.head_name).map((h:any) => h.amounts.map((a:any) => {
                            return {
                                name:a.name,
                                value:Number(a.value) - (Number(a.paid_amount) + Number(a.conc_amount))
                            };
                        }))[0]
                    };
                }).concat(unChangedHeads)
            }
        };

        console.log(newHeads);


        // Updating student
        await ModifyStudentAffiliatedHeads({id:selectedStudent.id, affiliated_heads:newHeads});


        // Toast
        toast({title:'Saved Successfully!'});

        // Reseting
        form.reset({
            receipt_date:new Date(),
            ref_no:'',
            receipt_no:0,
            pay_mode:'',
            remarks:'',
            is_adjust_advance:false,
            adjust_advance:0,
            fee_type:'All Fee Types',
            bank_name:'',
            installment:[''],
            entry_mode:'School',
            heads:[{
                conc_amount:0,
                paid_amount:0
            }],
            total_paid_amount:0,
            dues:0,
            advance_amt:0
        });
        setSelectedInstallments([]);
        setSelectedStudent({
            id:'',
            image:'',
            name:'',
            address:'',
            father_name:'',
            mother_name:'',
            contact_no:'',
            admission_no:'',
            bill_no:'',
            class:'',
            affiliated_heads:{
                group_name:'',
                heads:[]
            }
        });
        setInstallments([]);
    };


    return (
        <div className='w-[100%] max-w-[1200px] flex flex-col items-center p-4 overflow-y-scroll custom-sidebar-scrollbar'>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='w-full border-[0.5px] border-[#ccc] rounded-[5px] overflow-scroll custom-sidebar-scrollbar'
                >
                    <div className='w-full flex flex-row gap-4 p-2 '>

                        {/* Left Side */}
                        <LeftSide
                            selectedStudent={selectedStudent}
                        />

                        {/* Right Side */}
                        <RightSide
                            form={form}
                            onSubmit={onSubmit}
                            classes={classes}
                            sections={sections}
                            installments={installments}
                            students={students}
                            setSelectedStudent={setSelectedStudent}
                            selectedStudent={selectedStudent}
                            setIsViewOpened={setIsViewOpened}
                            setIsLoading={setIsLoading}
                            selectedInstallments={selectedInstallments}
                            setSelectedInstallments={setSelectedInstallments}
                            setInstallments={setInstallments}
                            heads={heads}
                            setHeads={setHeads}
                        />

                    </div>
                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;