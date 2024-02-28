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
import {createPayment} from '@/lib/actions/fees/manageFee/payment.actions';
import {FeeEntryValidation} from '@/lib/validations/fees/manageFee/feeEntry.validation';
import {ModifyStudentAffiliatedHeads} from '@/lib/actions/admission/admission/admittedStudent.actions';





// Main function
const FormCom = ({installments, classes, sections, setIsViewOpened, students, selectedStudent, setSelectedStudent, setIsLoading, selectedInstallments, setSelectedInstallments, setInstallments, payments}: any) => {


    // Toast
    const {toast} = useToast();


    // Heads
    const [heads, setHeads] = useState<any>([]);


    // Cheuqe details
    const [chequeDetails, setChequeDetails] = useState({});


    // DD details
    const [ddDetails, setddDetails] = useState({});


    // Neft details
    const [neftDetails, setNeftDetails] = useState({});


    // Total number generator
    const totalNumberGenerator = (array:any) => {
        let sum = 0;
        for (let i = 0; i < array?.length; i++ ) {sum += array[i];};
        return sum;
    };


    // Form
    const form = useForm({
        resolver:zodResolver(FeeEntryValidation),
        defaultValues:{
            received_date:new Date(),
            receipt_no:'',
            remarks:'',
            installment:'',
            pay_mode:'',
            pay_mode_details:{},


            // Form inputs
            fee_type:'',
            bank_name:'',
            entry_mode:'',
            total_paid_amount:0,
            dues:0,
            advance_amt:0
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof FeeEntryValidation>) => {


        // Is loading
        setIsLoading(true);
        // Unchanged heads
        const unChangedHeads = selectedStudent.affiliated_heads.heads.filter((studentHead:any) => !heads.map((head:any) => head.head_name).includes(studentHead.head_name)).map((studentHead:any) => {
            return {
                ...studentHead,
                amounts:selectedStudent.affiliated_heads.heads.map((h:any) => h.amounts.map((a:any) => {
                    const conc_amount = a.conc_amount ? Number(a.conc_amount) : 0;
                    const last_rec_amount = a.last_rec_amount ? Number(a.last_rec_amount) : 0;
                    return {
                        name:a.name,
                        value:Number(a.value),
                        conc_amount:conc_amount,
                        last_rec_amount:last_rec_amount,
                        payable_amount:Number(a.value) - (last_rec_amount + conc_amount),
                        paid_amount:Number(a.value) - (last_rec_amount + conc_amount)
                    };
                }))[selectedStudent.affiliated_heads.heads.indexOf(studentHead)]
            };
        });

        // New student
        const newHeads = {
                group_name:selectedStudent.affiliated_heads.group_name,
                heads:
                    selectedStudent.affiliated_heads.heads
                        .filter((studentHead:any) => heads.map((head:any) => head.head_name).includes(studentHead.head_name))
                        .filter((studentHead:any) => studentHead.amounts.map((a:any) => Number(a.value) - (Number(a.last_rec_amount) + Number(a.conc_amount) + Number(a.paid_amount)) !== 0))
                        .map((studentHead:any) => {
                            return {
                                ...studentHead,
                                amounts:
                                    heads
                                        .filter((h:any) => h.head_name === studentHead.head_name)
                                        .map((h:any) =>
                                            h.amounts
                                                .filter((a:any) => selectedInstallments.includes(a.name))
                                                .filter((a:any) => Number(a.value) - (Number(a.last_rec_amount) + Number(a.conc_amount) + Number(a.paid_amount)) !== 0)
                                                .map((a:any) => {
                                                    const conc_amount = a.conc_amount ? Number(a.conc_amount) : 0;
                                                    const last_rec_amount = a.last_rec_amount ? Number(a.last_rec_amount) : 0;
                                                    return {
                                                        name:a.name,
                                                        value:Number(a.value),
                                                        conc_amount:conc_amount,
                                                        last_rec_amount:last_rec_amount + Number(a.paid_amount),
                                                        payable_amount:Number(a.value) - (last_rec_amount + conc_amount),
                                                        paid_amount:Number(a.value) - (last_rec_amount + conc_amount)
                                                    };
                                                })
                                        )[0].concat(
                                                heads
                                                    .filter((h:any) => h.head_name === studentHead.head_name)
                                                    .map((h:any) =>
                                                        h.amounts
                                                            .filter((a:any) => !selectedInstallments.includes(a.name))
                                                            .map((a:any) => {
                                                                const conc_amount = a.conc_amount ? Number(a.conc_amount) : 0;
                                                                const last_rec_amount = a.last_rec_amount ? Number(a.last_rec_amount) : 0;
                                                                return {
                                                                    name:a.name,
                                                                    value:Number(a.value),
                                                                    conc_amount:conc_amount,
                                                                    last_rec_amount:last_rec_amount,
                                                                    payable_amount:Number(a.value) - (last_rec_amount + conc_amount),
                                                                    paid_amount:Number(a.value) - (last_rec_amount + conc_amount)
                                                                };
                                                            })
                                                    )[0]
                                            )
                            };
                        })
                        .concat(unChangedHeads)
                        .filter((h:any) => h.amounts.length !== 0)
        };

        // Updating student
        await ModifyStudentAffiliatedHeads({
            id:selectedStudent.id,
            affiliated_heads:newHeads,
        });
        
        
        // Create payment
        const paidHeads = heads.filter((h:any) => h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.paid_amount) > 0)[0]);
        let paymodeDetails;
        switch (values.pay_mode) {
            case 'Cheque':
                paymodeDetails = chequeDetails;
                break;
            case 'DD':
                paymodeDetails = ddDetails;
                break;
            case 'NEFT':
                paymodeDetails = neftDetails;
                break;
            default:
                {}
                break;
        }
        await createPayment({
            // Others
            student:selectedStudent.name,
            receipt_no:payments?.length + 1 || '0',
            installments:selectedInstallments,
            received_date:values.received_date,
            remarks:values.remarks,
            paymode:values.pay_mode || 'Cash',
            paymode_details:paymodeDetails,
        
        
            // Amounts
            actual_amount:totalNumberGenerator(paidHeads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.value))))),
            concession_amount:totalNumberGenerator(paidHeads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.conc_amount))))),
            paid_amount:totalNumberGenerator(paidHeads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.paid_amount))))),

            paid_heads:paidHeads
        });
        
        // Toast
        toast({title:'Saved Successfully!'});
        
        // Reseting
        form.reset({
            received_date:new Date(),
            receipt_no:'',
            remarks:'',
            installment:'',
            pay_mode:'',
            pay_mode_details:{},


            // Form inputs
            fee_type:'',
            bank_name:'',
            entry_mode:'',
            total_paid_amount:0,
            dues:0,
            advance_amt:0
        });
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
        setSelectedInstallments([]);
        setIsLoading(false);
    };


    return (
        <div className='w-[100%] max-w-[1200px] flex flex-col items-center px-4 overflow-y-scroll custom-sidebar-scrollbar lg:min-h-[100%]'>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='h-full w-full flex flex-col gap-4 pt-4 overflow-scroll custom-sidebar-scrollbar'
                >
                    <div className='h-full w-full flex flex-row gap-1'>
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
                            chequeDetails={chequeDetails}
                            setChequeDetails={setChequeDetails}
                            ddDetails={ddDetails}
                            setddDetails={setddDetails}
                            neftDetails={neftDetails}
                            setNeftDetails={setNeftDetails}
                            totalNumberGenerator={totalNumberGenerator}
                            payments={payments}
                        />
                    </div>
                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;