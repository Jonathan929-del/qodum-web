// Imports
import moment from 'moment';
import {ChevronDown, Download} from 'lucide-react';
import {ExcelFile, ExcelSheet} from 'react-xlsx-wrapper';
import {Select, SelectContent, SelectTrigger} from '@/components/ui/select';





// Main Function
const PrintButton = ({transportMediums}:any) => {


    // Transport Mediums array
    const excelTransportMediumsArray = transportMediums?.map((transportMedium:any) => {
        return([
            {value:transportMedium.transport_medium},
            {value:moment(transportMedium.createdAt).format('D-MMM-yy')},
        ]);
    });


    // Data
    const excelData:any = [
        {
            columns:[
                {title:'Transport Medium List', width:{wpx:500}, style:{font:{bold:true, sz:'16', color:{rgb:'ffffff'}}, fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}},
                {title:'', style:{fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}}
            ],
            data:[]
        },
        {
            columns: [
                {title:'Transport Name', width:{wpx:200}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}},
                {title:'Created Date', width:{wpx:100}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}}
            ],
            data:excelTransportMediumsArray
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
                            filename='Transport Mediums List'
                            fileExtension='xlsx'
                        >
                            <ExcelSheet
                                dataSet={excelData}
                                name='transportMedium'
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
                            filename='Transport Mediums List'
                            fileExtension='csv'
                        >
                            <ExcelSheet
                                dataSet={excelData}
                                name='transportMedium'
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