// Imports
import {ChevronDown, Download} from 'lucide-react';
import {ExcelFile, ExcelSheet} from 'react-xlsx-wrapper';
import {Select, SelectContent, SelectTrigger} from '@/components/ui/select';
import { fetchGlobalSchoolDetails } from '@/lib/actions/fees/globalMasters/defineSchool/schoolGlobalDetails.actions';





// Main Function
const PrintButton = ({students, setPdfData, updateStudent, setIsReceiptOpened}:any) => {


    // Students Array
    const studentsArray = students.map((student:any) => {
        return([
            {value:students.indexOf(student) + 1},
            {value:student?.student?.name},
        ]);
    });


    // Data
    const excelData:any = [
        {
            columns:[
                {title:'Students', width:{wpx:500}, style:{font:{bold:true, sz:'16', color:{rgb:'ffffff'}}, fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}},
                {title:'', style:{fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}},
            ],
            data:[]
        },
        {
            columns: [
                {title:'Id', width:{wpx:100}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}},
                {title:'Name', width:{wpx:100}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}}
            ],
            data:studentsArray
        }
    ];


    // Registration receipt handler
    const registrationReceiptHandler = async () => {
        const schools = await fetchGlobalSchoolDetails();
        setPdfData({
            school_logo:schools[0].logo,
            school_name:schools[0].school_name,
            school_address:schools[0].school_address,
            school_affiliation_no:schools[0].affiliation_no,
            school_no:schools[0].school_no,
            school_website:schools[0].website,
            school_contact_no:schools[0].mobile,
            registration_no:updateStudent.student.reg_no,
            receipt_no:students.length,
            received_from:updateStudent.student.name,
            father_name:updateStudent.parents.father.father_name,
            amount:updateStudent.student.amount,
            payment_mode:updateStudent.student.payment_mode,
            class_name:updateStudent.student.class
        });
        setIsReceiptOpened(true);
    };

    return (
        <div>
            <Select>
                <SelectTrigger
                    className='flex items-center px-[8px] h-8 text-xs text-black bg-gradient-to-r from-[#FFC73A] to-[#FFF3AB] rounded-full transition border-[1px] border-white cursor-pointer
                        hover:border-[#FFC73A] hover:from-[#ffc73a1f] hover:to-[#ffc73a1f] hover:text-[#FFC73A] sm:text-[16px] sm:px-4'
                >
                    <span>Print</span>
                    <ChevronDown className='h-4 w-4 ml-2 opacity-50'/>
                </SelectTrigger>
                <SelectContent>

                        {/* Excel printing */}
                        <span className='pl-2 flex w-full cursor-pointer items-center rounded-[5px] py-1.5 pr-2 text-xs outline-none hover:bg-[#ccc] transition focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'>
                            .xlsx
                            <Download size={16} className='text-hash-color ml-2'/>
                        </span>



                        {/* Excel printing */}
                        <span className='pl-2 flex w-full cursor-pointer items-center rounded-[5px] py-1.5 pr-2 text-xs outline-none hover:bg-[#ccc] transition focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'>
                            .csv
                            <Download size={16} className='text-hash-color ml-2'/>
                        </span>



                        {/* Pdf printing */}
                        <span
                            className='pl-2 flex w-full cursor-pointer items-center rounded-[5px] py-1.5 pr-2 text-xs outline-none hover:bg-[#ccc] transition focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
                        >
                            .pdf
                            <Download size={16} className='text-hash-color ml-2'/>
                        </span>



                        {/* Registration Receipt */}
                        {updateStudent.id !== '' && (
                            <span
                                onClick={registrationReceiptHandler}
                                className='pl-2 flex w-full cursor-pointer items-center rounded-[5px] py-1.5 pr-2 text-xs outline-none hover:bg-[#ccc] transition focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
                            >
                                Registration Receipt
                                <Download size={16} className='text-hash-color ml-2'/>
                            </span>
                        )}

                </SelectContent>
            </Select>
        </div>
    );
};





// Export
export default PrintButton;