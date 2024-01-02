// Imports
import moment from 'moment';
import {ExcelFile, ExcelSheet} from 'react-xlsx-wrapper';
import {Select, SelectContent, SelectTrigger} from '@/components/ui/select';
import { ChevronDown, Download } from 'lucide-react';




// Main Function
const PrintButton = ({heads}:any) => {

    

    // Heads Array
    const headsArray = heads.map((head:any) => {
        return([
            {value:head.name},
            {value:head.print_name},
            {value:head.pay_schedule},
            {value:head.type},
            {value:head.show_in_certificate},
            {value:head.fee_refundable},
            {value:moment(head.createdAt).format('D-MMM-yy')}
        ]);
    });


    // Data
    const data:any = [
        {
            columns:[
                {title:'Heads List', width:{wpx:400}, style:{font:{bold:true, sz:'20', color:{rgb:'ffffff'}}, fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}},
                {title:'', style:{fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}},
                {title:'', style:{fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}}
            ],
            data:[]
        },
        {
            columns: [
                {title:'Name ', width:{wpx:150}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}},
                {title:'Head Print Name', width:{wpx:100}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}},
                {title:'Pay Schedule', width:{wpx:100}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}},
                {title:'Type', width:{wpx:100}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}},
                {title:'Show In Certificate', width:{wpx:100}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}},
                {title:'Fee Refundable', width:{wpx:100}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}},
                {title:'Created At', width:{wpx:150}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}}
            ],
            data:headsArray,
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
                            filename='Heads List'
                            fileExtension='xlsx'
                        >
                            <ExcelSheet
                                dataSet={data}
                                name='Head'
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
                            filename='Heads List'
                            fileExtension='csv'
                        >
                            <ExcelSheet
                                dataSet={data}
                                name='Head'
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