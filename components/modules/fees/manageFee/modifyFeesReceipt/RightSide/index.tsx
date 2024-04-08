// Imports
import Search from './Search';
import {useState} from 'react';
import {format} from 'date-fns';
import HeadsList from './HeadsList';
import {CalendarIcon} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Calendar} from '@/components/ui/calendar';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';





// Main function
const index = ({sections, classes, totalNumberGenerator, setIsViewOpened, setSelectedStudent, selectedStudent, setPayments, selectedPayment, setSelectedPayment}:any) => {


    // Date states
    const [isCalendarOpened, setIsCalendarOpened] = useState('');


    // Date
    const [date, setDate] = useState(new Date());


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
                    <Popover open={isCalendarOpened === 'dob'} onOpenChange={() => isCalendarOpened === 'dob' ? setIsCalendarOpened('') : setIsCalendarOpened('dob')}>
                        <PopoverTrigger asChild className='h-7'>
                            <Button
                                variant='outline'
                                className='flex flex-row items-center w-full text-[11px] bg-[#fff] border-[0.5px] border-[#E4E4E4]'
                            >
                                <CalendarIcon className='mr-2 h-4 w-4' />
                                {
                                    date
                                        ? <span>{format(date, 'PPP')}</span>
                                        : <span>Pick a date</span>
                                }
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className='w-auto'>
                            <Calendar
                                mode='single'
                                selected={date}
                                onSelect={(v:any) => {setIsCalendarOpened(''); setDate(v)}}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
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