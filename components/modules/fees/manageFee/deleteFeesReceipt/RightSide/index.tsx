// Imports
import Search from './Search';
import {useState} from 'react';
import {format} from 'date-fns';
import {CalendarIcon} from 'lucide-react';
import PaymentsList from './PaymentsList';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Calendar} from '@/components/ui/calendar';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';





// Main function
const index = ({sections, classes, setIsViewOpened, students, setSelectedStudent, selectedStudent}:any) => {


    // Date states
    const [isCalendarOpened, setIsCalendarOpened] = useState('');


    // Date
    const [date, setDate] = useState(new Date());


    // Concession reason
    const [concessionReason, setConcessionReason] = useState('');


    return (
        <div className='w-[70%] min-w-[400px] flex flex-col justify-between px-2 gap-4'>


            {/* Search */}
            <Search
                classes={classes}
                sections={sections}
                students={students}
                setIsViewOpened={setIsViewOpened}
                setSelectedStudent={setSelectedStudent}
            />


            {/* Inputs */}
            <div className='flex flex-row p-2 bg-[#F7F7F7] gap-4 text-xs text-hash-color rounded-[4px] border-[0.5px] border-[#ccc]'>
                <div className='flex-1 flex flex-col'>
                    <div className='w-full text-start text-[11px] text-[#726E71]'>Reason for deleting fee receipt</div>
                    <Input
                        value={concessionReason}
                        onChange={(e:any) => setConcessionReason(e.target.value)}
                        className='h-[40px] flex flex-row items-center text-[11px] pl-2 bg-[#fff] border-[0.5px] border-[#E4E4E4]'
                    />
                </div>
            </div>


            {/* Payments List */}
            <PaymentsList
                selectedStudent={selectedStudent}
                setSelectedStudent={setSelectedStudent}
                concessionReason={concessionReason}
                setConcessionReason={setConcessionReason}
            />


        </div>
    );
};





// Export
export default index;