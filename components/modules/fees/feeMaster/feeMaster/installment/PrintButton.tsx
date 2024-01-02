// Imports
import moment from 'moment';
import {ChevronDown, Download} from 'lucide-react';
import {ExcelFile, ExcelSheet} from 'react-xlsx-wrapper';
import {Select, SelectContent, SelectTrigger} from '@/components/ui/select';




// Main Function
const PrintButton = ({installments}:any) => {


    // Month abbreviation converter
    const monthConverter = (month:String) => {
        let monthAbr;
        switch (month) {
            case 'January':
                monthAbr = 'Jan';
                break;
            case 'February':
                monthAbr = 'Feb';
                break;
            case 'March':
                monthAbr = 'Mar';
                break;
            case 'April':
                monthAbr = 'Apr';
                break;
            case 'May':
                monthAbr = 'May';
                break;
            case 'June':
                monthAbr = 'Jun';
                break;
            case 'July':
                monthAbr = 'Jul';
                break;
            case 'August':
                monthAbr = 'Aug';
                break;
            case 'September':
                monthAbr = 'Sep';
                break;
            case 'October':
                monthAbr = 'Oct';
                break;
            case 'November':
                monthAbr = 'Nov';
                break;
            case 'December':
                monthAbr = 'Dec';
                break;
        }
        return monthAbr;
    };


    // Installments Array
    const installmentsArray = installments.map((installment:any) => {
        return([
            {value:installment.name},
            {value:installment.print_name},
            {value:`${installment.due_date?.day}-${monthConverter(installment.due_date?.month)}-${installment.due_date?.year}`},
            {value:`${installment.due_on_date?.day}-${monthConverter(installment.due_on_date?.month)}-${installment.due_on_date?.year}`},
            {value:moment(installment.createdAt).format('D-MMM-yy')}
        ]);
    });


    // Data
    const data:any = [
        {
            columns:[
                {title:'', style:{fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}},
                {title:'Installments List', width:{wpx:600}, style:{font:{bold:true, sz:'16', color:{rgb:'ffffff'}}, fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}},
                {title:'', style:{fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}},
                {title:'', style:{fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}},
                {title:'', style:{fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}}
            ],
            data:[]
        },
        {
            columns: [
                {title:'Installment Name', width:{wpx:150}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}},
                {title:'Print Name', width:{wpx:150}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}},
                {title:'Due Date', width:{wpx:100}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}},
                {title:'Due On Date', width:{wpx:100}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}},
                {title:'Created At', width:{wpx:100}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}}
            ],
            data:installmentsArray,
        }
    ];


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
                        <ExcelFile
                            element={
                                <span className='pl-2 flex w-full cursor-pointer items-center rounded-[5px] py-1.5 pr-2 text-xs outline-none hover:bg-[#ccc] transition focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'>
                                    .xlsx
                                    <Download size={16} className='text-hash-color ml-2'/>
                                </span>
                            }
                            filename='Installments List'
                            fileExtension='xlsx'
                        >
                            <ExcelSheet
                                dataSet={data}
                                name='Installment'
                            />
                        </ExcelFile>


                        {/* Excel printing */}
                        <ExcelFile
                            element={
                                <span className='pl-2 flex w-full cursor-pointer items-center rounded-[5px] py-1.5 pr-2 text-xs outline-none hover:bg-[#ccc] transition focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'>
                                    .csv
                                    <Download size={16} className='text-hash-color ml-2'/>
                                </span>
                            }
                            filename='Installments List'
                            fileExtension='csv'
                        >
                            <ExcelSheet
                                dataSet={data}
                                name='Installment'
                            />
                        </ExcelFile>


                        {/* Pdf printing */}
                        <span
                            className='pl-2 flex w-full cursor-pointer items-center rounded-[5px] py-1.5 pr-2 text-xs outline-none hover:bg-[#ccc] transition focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
                        >
                            .pdf
                            <Download size={16} className='text-hash-color ml-2'/>
                        </span>



                </SelectContent>
            </Select>
        </div>
    );
};





// Export
export default PrintButton;