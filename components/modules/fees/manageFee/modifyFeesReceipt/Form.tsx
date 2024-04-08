'use client';
// Imports
import LeftSide from './LeftSide';
import RightSide from './RightSide';





// Main function
const FormCom = ({selectedStudent, classes, sections, payments, totalNumberGenerator, setReceiptPaymentData, setIsReceiptOpened, setIsViewOpened, setSelectedStudent, setPayments, selectedPayment, setSelectedPayment}:any) => {
    return (
        <div className='w-[100%] max-w-[1200px] flex flex-col items-center px-4 overflow-y-scroll custom-sidebar-scrollbar min-h-[100%]'>
                <form className='h-full w-full flex flex-col gap-4 pt-4 overflow-scroll custom-sidebar-scrollbar'>
                    <div className='h-full w-full flex flex-row gap-1'>
                        {/* Left Side */}
                        <LeftSide
                            selectedStudent={selectedStudent}
                        />

                        {/* Right Side */}
                        <RightSide
                            classes={classes}
                            sections={sections}
                            payments={payments}
                            totalNumberGenerator={totalNumberGenerator}
                            setReceiptPaymentData={setReceiptPaymentData}
                            setIsReceiptOpened={setIsReceiptOpened}
                            setIsViewOpened={setIsViewOpened}
                            setSelectedStudent={setSelectedStudent}
                            selectedStudent={selectedStudent}
                            setPayments={setPayments}
                            selectedPayment={selectedPayment}
                            setSelectedPayment={setSelectedPayment}
                        />
                    </div>
                </form>
        </div>
    );
};





// Export
export default FormCom;