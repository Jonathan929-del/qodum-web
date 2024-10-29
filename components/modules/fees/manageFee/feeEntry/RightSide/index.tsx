// Imports
import Inputs from './Inputs';
import Search from './Search';
import {useContext, useEffect, useState} from 'react';
import EntryMode from './EntryMode';
import HeadsArea from './HeadsArea';
import { AuthContext } from '@/context/AuthContext';





// Main function
const index = ({installments, form, onSubmit, selectedStudent, setSelectedStudent, selectedInstallments, setSelectedInstallments, heads, setHeads, setIsViewOpened, setInstallments, students, sections, classes, chequeDetails, setChequeDetails, ddDetails, setddDetails, neftDetails, setNeftDetails, totalNumberGenerator, payments, setConcessionReason, showButtonClick, allInstallments, allPayments, isLoadingHeads, paymentsReceiptNo, swipedCardDetails, setSwipedCardDetails, upiDetails, setUpiDetails, setReceiptPaymentData, setIsReceiptOpened, setPaymentReceiptNo, headsSequence}:any) => {

    // User
    const {user} = useContext(AuthContext);


    // Permissions
    const [permissions, setPermissions] = useState({
        add:false,
        modify:false,
        delete:false,
        print:false,
        read_only:false
    });


    // Total paid amount
    const [totalPaidAmount, setTotalPaidAmount] = useState<any>();


    // Is QR code generated
    const [isQrCodeGenerated, setIsQrCodeGenerated] = useState(false);


    // Use effect
    useEffect(() => {
        const grantedPermissions = user?.permissions?.find((p:any) => p.name === 'Fees')?.permissions?.find((pp:any) => pp.sub_menu === 'Define SMS Template');
        setPermissions(grantedPermissions);
    }, [user]);

    return (
        <div className='w-[70%] h-full min-w-[400px] flex flex-col justify-between gap-1 px-2 overflow-y-scroll custom-sidebar-scrollbar'>
            <div className='flex flex-col gap-1'>

                {/* Search */}
                {permissions.read_only && (
                    <Search
                        classes={classes}
                        sections={sections}
                        students={students}
                        setSelectedStudent={setSelectedStudent}
                        setIsViewOpened={setIsViewOpened}
                        setSelectedInstallments={setSelectedInstallments}
                        setInstallments={setInstallments}
                        headsSequence={headsSequence}
                    />
                )}






                {/* Inputs */}
                <Inputs
                    form={form}
                    installments={installments}
                    selectedInstallments={selectedInstallments}
                    setSelectedInstallments={setSelectedInstallments}
                    selectedStudent={selectedStudent}
                    chequeDetails={chequeDetails}
                    setChequeDetails={setChequeDetails}
                    ddDetails={ddDetails}
                    setddDetails={setddDetails}
                    neftDetails={neftDetails}
                    setNeftDetails={setNeftDetails}
                    allInstallments={allInstallments}
                    paymentsReceiptNo={paymentsReceiptNo}
                    upiDetails={upiDetails}
                    setUpiDetails={setUpiDetails}
                    swipedCardDetails={swipedCardDetails}
                    setSwipedCardDetails={setSwipedCardDetails}
                    totalPaidAmount={totalPaidAmount}
                    setIsQrCodeGenerated={setIsQrCodeGenerated}
                />





                {/* Entry Mode */}
                <EntryMode
                    form={form}
                    selectedStudent={selectedStudent}
                    totalNumberGenerator={totalNumberGenerator}
                    installments={installments}
                    setSelectedInstallments={setSelectedInstallments}
                    payments={payments}
                    showButtonClick={showButtonClick}
                    allPayments={allPayments}
                    setIsReceiptOpened={setIsReceiptOpened}
                    setReceiptPaymentData={setReceiptPaymentData}
                />
            </div>





            {/* Heads Area */}
            <HeadsArea
                form={form}
                onSubmit={onSubmit}
                selectedStudent={selectedStudent}
                setSelectedStudent={setSelectedStudent}
                selectedInstallments={selectedInstallments}
                setSelectedInstallments={setSelectedInstallments}
                heads={heads}
                setHeads={setHeads}
                totalNumberGenerator={totalNumberGenerator}
                setConcessionReason={setConcessionReason}
                totalPaidAmount={totalPaidAmount}
                setTotalPaidAmount={setTotalPaidAmount}
                isLoadingHeads={isLoadingHeads}
                installments={installments}
                paymentsReceiptNo={paymentsReceiptNo}
                setInstallments={setInstallments}
                setPaymentReceiptNo={setPaymentReceiptNo}
                headsSequence={headsSequence}
                isQrCodeGenerated={isQrCodeGenerated}
                permissions={permissions}
            />
        </div>
    );
};





// Export
export default index;