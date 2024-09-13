















































// Imports
import {X} from 'lucide-react';
import {useState} from 'react';
import Draggable from 'react-draggable';
import PaymodeWiseDetails from './PaymodeWiseDetails';
import InstallmentWiseDetails from './InstallmentWiseDetails';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';





// Main function
const index = ({setIsShowInstallment, selectedStudent, totalNumberGenerator, installments, setSelectedInstallments, payments, setReceiptPaymentData, setIsReceiptOpened}:any) => {


    // Selected tab
    const [selectedTab, setSelectedTab] = useState('installment');


    return (
        <Draggable
            defaultPosition={{x:-250, y:-250}}
        >
            <div className='absolute min-w-[900px] max-h-[500px] z-10 flex flex-col pb-6 bg-white border-[0.5px] border-[#ccc] overflow-scroll custom-sidebar-scrollbar'>
                {/* Header */}
                <div className='flex flex-row items-center justify-between w-full px-2 py-2 text-sm font-bold text-main-color bg-[#e7f0f7]'>
                    <h2>Paid and Unpaid Installment Details</h2>
                    <X color='#3a3a3a' size={18} cursor={'pointer'} onClick={() => setIsShowInstallment(false)}/>
                </div>

                <Tabs
                    defaultValue='installment'
                    className='w-full h-[85%]'
                >
                    <div className='flex justify-center w-full p-[2px] mt-2'>
                        <TabsList className='h-7 bg-[#F3F3F3] rounded-full'>
                            <TabsTrigger
                                value='installment'
                                onClick={() => setSelectedTab('installment')}
                                className={`px-[8px] h-6 text-xs transition rounded-full hover:opacity-90 hover:bg-[#3D67B0] hover:text-white ${selectedTab === 'installment' ? 'bg-[#3D67B0] text-white' : 'bg-transparent text-black'}`}
                            >
                                Installment Wise Details
                            </TabsTrigger>
                            <TabsTrigger
                                value='paymode'
                                onClick={() => setSelectedTab('paymode')}
                                className={`px-[8px] h-6 text-xs transition rounded-full hover:opacity-90 hover:bg-[#3D67B0] hover:text-white ${selectedTab === 'paymode' ? 'bg-[#3D67B0] text-white' : 'bg-transparent text-black'}`}
                            >
                                Paymode Wise Details
                            </TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent value='installment'>
                        <InstallmentWiseDetails
                            selectedStudent={selectedStudent}
                            totalNumberGenerator={totalNumberGenerator}
                            installments={installments}
                            setIsShowInstallment={setIsShowInstallment}
                            setSelectedInstallments={setSelectedInstallments}
                            payments={payments}
                            setIsReceiptOpened={setIsReceiptOpened}
                            setReceiptPaymentData={setReceiptPaymentData}
                        />
                    </TabsContent>
                    <TabsContent value='paymode'>
                        <PaymodeWiseDetails
                            payments={payments}
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </Draggable>
    );
};





// Export
export default index;