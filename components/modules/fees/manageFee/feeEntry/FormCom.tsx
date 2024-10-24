'use client';
// Imports
import * as z from 'zod';
import LeftSide from './LeftSide';
import RightSide from './RightSide';
import {useForm} from 'react-hook-form';
import {useEffect, useState} from 'react';
import {Form} from '@/components/ui/form';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {FeeEntryValidation} from '@/lib/validations/fees/manageFee/feeEntry.validation';
import {createPayment, fetchPayments} from '@/lib/actions/fees/manageFee/payment.actions';
import {fetchGlobalSchoolDetails} from '@/lib/actions/fees/globalMasters/defineSchool/schoolGlobalDetails.actions';
import {ModifyStudentAffiliatedHeads, fetchStudentByAdmNo} from '@/lib/actions/admission/admission/admittedStudent.actions';





// Main function
const FormCom = ({installments, classes, sections, setIsViewOpened, students, selectedStudent, setSelectedStudent, setIsLoading, selectedInstallments, setSelectedInstallments, setInstallments, payments, heads, setHeads, totalNumberGenerator, allInstallments, isLoadingHeads, setIsReceiptOpened, setReceiptPaymentData, setIsLoadingHeads, headsSequence, paymentsReceiptNo, setPaymentReceiptNo, allPayments}: any) => {

    // Toast
    const {toast} = useToast();


    // Cheuqe details
    const [chequeDetails, setChequeDetails] = useState({});


    // DD details
    const [ddDetails, setddDetails] = useState({});


    // Neft details
    const [neftDetails, setNeftDetails] = useState({});


    // Swiped Card details
    const [swipedCardDetails, setSwipedCardDetails] = useState({});


    // UPI details
    const [upiDetails, setUpiDetails] = useState({});


    // Concession reason
    const [concessionReason, setConcessionReason] = useState('');


    // Show button click
    const showButtonClick = async () => {
        setIsLoadingHeads(true);
        const student = await fetchStudentByAdmNo({adm_no:selectedStudent.admission_no});
        setSelectedStudent({
            id:student._id,
            image:student.student.image,
            name:student.student.name,
            address:student.student.h_no_and_streets,
            father_name:student.parents.father.father_name,
            mother_name:student.parents.mother.mother_name,
            contact_no:student.student.contact_person_mobile,
            admission_no:student.student.adm_no,
            bill_no:student.student.bill_no,
            class:student.student.class,
            section:student.student.section,
            phone:student.student.mobile,
            email:student.student.email,
            board:student?.student?.board,
            route_name:student?.transport_details?.route,
            stop_name:student?.transport_details?.stop,
            vehicle_name:student?.transport_details?.vehicle,
            affiliated_heads:{
                group_name:student.affiliated_heads.group_name,
                heads:student.affiliated_heads.heads.map((h:any) => {
                    return {
                        ...h,
                        amounts:h.amounts.map((a:any) => {
                            const conc_amount = a.conc_amount ? Number(a.conc_amount) : 0;
                            const last_rec_amount = a.last_rec_amount ? Number(a.last_rec_amount) : 0;
                            return {
                                name:a.name,
                                value:Number(a.value),
                                conc_amount:conc_amount,
                                last_rec_amount:last_rec_amount,
                                payable_amount:Number(a.payable_amount) || (Number(a.value) - (last_rec_amount + conc_amount)),
                                paid_amount:Number(a.paid_amount) || (Number(a.value) - (last_rec_amount + conc_amount))
                            };
                        })
                    };
                })
            }
        });
        const singleInstallments = student?.affiliated_heads?.heads?.filter((h:any) => h.amounts?.filter((a:any) => Number(a.value) !== (Number(a.last_rec_amount) + Number(a.conc_amount))).length === 1)?.map((h:any) => h.amounts?.filter((a:any) => Number(a.value) !== (Number(a.last_rec_amount) + Number(a.conc_amount)))?.map((a:any) => a.name)[0]);
        const installments = student?.affiliated_heads?.heads?.filter((h:any) => h.amounts?.filter((a:any) => Number(a.value) !== (Number(a.last_rec_amount) + Number(a.conc_amount))).length > 1).length > 0
            ? student?.affiliated_heads?.heads?.filter((h:any) => h.amounts?.filter((a:any) => Number(a.value) !== (Number(a.last_rec_amount) + Number(a.conc_amount))).length > 1)?.map((h:any) => h.amounts?.filter((a:any) => Number(a.value) !== (Number(a.last_rec_amount) + Number(a.conc_amount)))?.map((a:any) => a.name).concat(singleInstallments))[0]
            : student?.affiliated_heads?.heads?.filter((h:any) => h.amounts?.filter((a:any) => Number(a.value) !== (Number(a.last_rec_amount) + Number(a.conc_amount))).length === 1)?.map((h:any) => h.amounts?.filter((a:any) => Number(a.value) !== (Number(a.last_rec_amount) + Number(a.conc_amount)))?.map((a:any) => a.name)[0]);
        const filteredInstallments = installments?.filter((item:any, pos:any) => installments.indexOf(item) == pos);
        const sortedInstallments = allInstallments?.filter((i:any) => filteredInstallments?.includes(i.name)).map((i:any) => i.name);
        setInstallments(sortedInstallments);
        setSelectedInstallments([sortedInstallments[0]]);
        setIsViewOpened(false);
        form.reset({
            received_date:new Date(),
            receipt_no:'',
            remarks:'',
            installment:'',
            pay_mode:'',
            pay_mode_details:{},


            // Form inputs
            fee_type:'All fee types',
            bank_name:'',
            entry_mode:'School',
            total_paid_amount:0,
            dues:0,
            advance_amt:0
        });
        setIsLoadingHeads(false);
    };


    // Form
    const form = useForm({
        resolver:zodResolver(FeeEntryValidation),
        defaultValues:{
            received_date:new Date(),
            receipt_no:'',
            remarks:'',
            installment:'',
            pay_mode:localStorage.getItem('fee_pay_mode_used') ? localStorage.getItem('fee_pay_mode_used') : '',
            pay_mode_details:{},


            // Form inputs
            fee_type:'All fee types',
            bank_name:'',
            entry_mode:localStorage.getItem('fee_entry_mode_used') ? localStorage.getItem('fee_entry_mode_used') : 'School',
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
                amounts:selectedStudent?.affiliated_heads?.heads?.map((h:any) => h?.amounts?.map((a:any) => {
                    const conc_amount = a.conc_amount ? Number(a.conc_amount) : 0;
                    const last_rec_amount = a.last_rec_amount ? Number(a.last_rec_amount) : 0;
                    return {
                        name:a.name,
                        value:Number(a.value),
                        conc_amount:conc_amount,
                        last_rec_amount:last_rec_amount,
                        payable_amount:Number(a.value) - (last_rec_amount + conc_amount + Number(a.paid_amount)),
                        paid_amount:Number(a.value) - (last_rec_amount + conc_amount + Number(a.paid_amount))
                    };
                }))[selectedStudent.affiliated_heads.heads.indexOf(studentHead)]
            };
        });

        // New student fee heads
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
                                                .map((a:any) => {
                                                    const conc_amount = a.conc_amount ? Number(a.conc_amount) : 0;
                                                    const last_rec_amount = a.last_rec_amount ? Number(a.last_rec_amount) : 0;
                                                    return {
                                                        name:a.name,
                                                        value:Number(a.value),
                                                        conc_amount:conc_amount,
                                                        last_rec_amount:last_rec_amount + Number(a.paid_amount),
                                                        payable_amount:Number(a.value) - (last_rec_amount + conc_amount + Number(a.paid_amount)),
                                                        paid_amount:Number(a.value) - (last_rec_amount + conc_amount + Number(a.paid_amount))
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
                                                                    payable_amount:Number(a.value) - (last_rec_amount + conc_amount + Number(a.paid_amount)),
                                                                    paid_amount:Number(a.value) - (last_rec_amount + conc_amount + Number(a.paid_amount))
                                                                };
                                                            })
                                                    )[0]
                                            )
                            };
                        })
                        .concat(unChangedHeads)
                        .filter((h:any) => h?.amounts?.length !== 0)
        };

    
        // Updating student
        await ModifyStudentAffiliatedHeads({
            id:selectedStudent.id,
            affiliated_heads:newHeads,
        });
        
        
        // Create payment
        let advanceDuesNumber;
        if(values.dues > 0){
            advanceDuesNumber = - values.dues;
        }else if (values.advance_amt > 0){
            advanceDuesNumber = values.advance_amt;
        };
        const paidHeads = heads.filter((h:any) => h.amounts.filter((a:any) => selectedInstallments.includes(a.name) && Number(a.paid_amount) > 0).map((a:any) => Number(a.paid_amount))[0]).map((h:any) => {
            return{
                ...h,
                amounts:h.amounts.filter((a:any) => selectedInstallments.includes(a.name))
            };
        });
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
            case 'UPI':
                paymodeDetails = upiDetails;
                break;
            case 'Swiped Card':
                paymodeDetails = swipedCardDetails;
                break;
            default:
                {}
                break;
        };
        const schools = await fetchGlobalSchoolDetails();
        const res = await createPayment({
            // Others
            student:selectedStudent.name,
            receipt_no:paymentsReceiptNo,
            ref_no:'0',
            installments:selectedInstallments,
            received_date:values.received_date,
            remarks:values.remarks,
            paymode:values.pay_mode || 'Cash',
            paymode_details:paymodeDetails,
            fee_type:values.fee_type,
            advance_dues_number:advanceDuesNumber,
            class_name:selectedStudent.class,
            section:selectedStudent.section,
            board:selectedStudent.board,
            adm_no:selectedStudent.admission_no,
            father_name:selectedStudent.father_name,
            school_name:schools[0].school_name,
            school_address:schools[0].school_address,
            website:schools[0].website,
            school_no:schools[0].school_no,
            affiliation_no:schools[0].affiliation_no,
            logo:schools[0].logo,
            wing_name:selectedStudent.wing_name,
            entry_mode:values.entry_mode,
            is_new:selectedStudent.is_new,
            is_active:selectedStudent.is_active,
            student_status:selectedStudent.student_status,
            bank_name:values.bank_name,
            fee_group:selectedStudent.affiliated_heads.group_name,
            // Amounts
            actual_amount:totalNumberGenerator(paidHeads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.value))))),
            concession_amount:totalNumberGenerator(paidHeads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.conc_amount))))),
            paid_amount:totalNumberGenerator(paidHeads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.paid_amount))))),

            paid_heads:paidHeads,
            concession_reason:concessionReason
        });
        if(res === 0){
            toast({title:'Please create a session first', variant:'alert'});
            return;
        };

        // Fee receipt
        if(localStorage.getItem('print_fee_receipt_after_save') ? localStorage.getItem('print_fee_receipt_after_save') === 'true' : false){
            setReceiptPaymentData({
                ...res,
                installments:selectedInstallments,
                paid_heads:paidHeads
            });
            setIsReceiptOpened(true);
        };


        // Toast
        toast({title:'Saved Successfully!'});


        // Reseting
        setHeads([]);
        form.reset({
            received_date:new Date(),
            receipt_no:'',
            remarks:'',
            installment:'',
            pay_mode:'',
            pay_mode_details:{},


            // Form inputs
            fee_type:'All fee types',
            bank_name:'',
            entry_mode:'School',
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
            section:'',
            phone:'',
            email:'',
            affiliated_heads:{
                    group_name:'',
                heads:[]
            }
        });
        setInstallments([]);
        setSelectedInstallments([]);
        setConcessionReason('');
        setPaymentReceiptNo('');


        // Fetching student again
        const student = await fetchStudentByAdmNo({adm_no:selectedStudent.admission_no});
        setSelectedStudent({
            id:student._id,
            image:student.student.image,
            name:student.student.name,
            address:student.student.h_no_and_streets,
            father_name:student.parents.father.father_name,
            mother_name:student.parents.mother.mother_name,
            contact_no:student.student.contact_person_mobile,
            admission_no:student.student.adm_no,
            bill_no:student.student.bill_no,
            class:student.student.class,
            section:student.student.section,
            phone:student.student.mobile,
            email:student.student.email,
            board:student?.student?.board,
            route_name:student?.transport_details?.route,
            stop_name:student?.transport_details?.stop,
            vehicle_name:student?.transport_details?.vehicle,
            wing_name:selectedStudent?.student?.wing || '',
            is_new:selectedStudent?.student?.is_new || false,
            is_active:selectedStudent?.student?.is_active || false,
            student_status:selectedStudent?.student?.student_status || '',
            affiliated_heads:{
                group_name:student.affiliated_heads.group_name,
                heads:student.affiliated_heads.heads.map((h:any) => {
                    return {
                        ...h,
                        amounts:h?.amounts?.map((a:any) => {
                            const conc_amount = a.conc_amount ? Number(a.conc_amount) : 0;
                            const last_rec_amount = a.last_rec_amount ? Number(a.last_rec_amount) : 0;
                            return {
                                name:a.name,
                                value:Number(a.value),
                                conc_amount:conc_amount,
                                last_rec_amount:last_rec_amount,
                                payable_amount:Number(a.payable_amount) || (Number(a.value) - (last_rec_amount + conc_amount)),
                                paid_amount:Number(a.paid_amount) || (Number(a.value) - (last_rec_amount + conc_amount))
                            };
                        })
                    };
                })
            }
        });
        const singleInstallments = student?.affiliated_heads?.heads?.filter((h:any) => h.amounts?.filter((a:any) => Number(a.value) !== (Number(a.last_rec_amount) + Number(a.conc_amount))).length === 1)?.map((h:any) => h.amounts?.filter((a:any) => Number(a.value) !== (Number(a.last_rec_amount) + Number(a.conc_amount)))?.map((a:any) => a.name)[0]);
        const installments = student?.affiliated_heads?.heads?.filter((h:any) => h.amounts?.filter((a:any) => Number(a.value) !== (Number(a.last_rec_amount) + Number(a.conc_amount))).length > 1).length > 0
            ? student?.affiliated_heads?.heads?.filter((h:any) => h.amounts?.filter((a:any) => Number(a.value) !== (Number(a.last_rec_amount) + Number(a.conc_amount))).length > 1)?.map((h:any) => h.amounts?.filter((a:any) => Number(a.value) !== (Number(a.last_rec_amount) + Number(a.conc_amount)))?.map((a:any) => a.name).concat(singleInstallments))[0]
            : student?.affiliated_heads?.heads?.filter((h:any) => h.amounts?.filter((a:any) => Number(a.value) !== (Number(a.last_rec_amount) + Number(a.conc_amount))).length === 1)?.map((h:any) => h.amounts?.filter((a:any) => Number(a.value) !== (Number(a.last_rec_amount) + Number(a.conc_amount)))?.map((a:any) => a.name)[0]);
        const filteredInstallments = installments?.filter((item:any, pos:any) => installments.indexOf(item) == pos);
        const sortedInstallments = allInstallments?.filter((i:any) => filteredInstallments?.includes(i.name)).map((i:any) => i.name);
        setInstallments(sortedInstallments);
        setSelectedInstallments([sortedInstallments[0]]);

    
        // Loading end
        setIsLoading(false);
    };


    // Use effect
    useEffect(() => {
        form.setValue('bank_name', selectedStudent?.affiliated_heads?.heads[0]?.post_account || '');
    }, [selectedStudent]);

    return (
        <div className='w-[100%] max-w-[1200px] flex flex-col items-center px-4 lg:min-h-[100%]'>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='h-full w-full flex flex-row gap-4 justify-center items-center py-4'
                >
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
                            setConcessionReason={setConcessionReason}
                            showButtonClick={showButtonClick}
                            allInstallments={allInstallments}
                            allPayments={allPayments}
                            isLoadingHeads={isLoadingHeads}
                            paymentsReceiptNo={paymentsReceiptNo}
                            upiDetails={upiDetails}
                            setUpiDetails={setUpiDetails}
                            swipedCardDetails={swipedCardDetails}
                            setSwipedCardDetails={setSwipedCardDetails}
                            setIsReceiptOpened={setIsReceiptOpened}
                            setReceiptPaymentData={setReceiptPaymentData}
                            setPaymentReceiptNo={setPaymentReceiptNo}
                            headsSequence={headsSequence}
                        />

                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;