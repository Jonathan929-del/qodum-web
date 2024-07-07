// Imports
import moment from 'moment';
import Search from './Search';
import {useState} from 'react';
import HeadsList from './HeadsList';
import MyDatePicker from '@/components/utils/CustomDatePicker';





// Main function
const index = ({sections, classes, totalNumberGenerator, setIsViewOpened, setSelectedStudent, selectedStudent, setPayments, selectedPayment, setSelectedPayment}:any) => {

    // Date
    const [date, setDate] = useState(moment());

    return (
        <div className='w-[70%] min-w-[400px] flex flex-col justify-between px-2 gap-2'>


            {/* Search */}
            <Search
                classes={classes}
                sections={sections}
                setIsViewOpened={setIsViewOpened}
                setSelectedStudent={setSelectedStudent}
                setPayments={setPayments}
            />


            {/* Reeiving date */}
            <div className='w-full flex items-center justify-center p-2 rounded-[4px] border-[0.5px] border-[#ccc] bg-[#F7F7F7]'>
                <div className='w-[100%] flex flex-col max-w-[400px]'>
                    <p className='text-xs text-hash-color'>Receiving Date</p>
                    <MyDatePicker
                        selectedDate={date}
                        setSelectedDate={setDate}
                    />
                </div>
            </div>


            {/* Payments List */}
            <HeadsList
                selectedStudent={selectedStudent}
                totalNumberGenerator={totalNumberGenerator}
                setSelectedStudent={setSelectedStudent}
                selectedPayment={selectedPayment}
                setSelectedPayment={setSelectedPayment}
            />


        </div>
    );
};





// Export
export default index;