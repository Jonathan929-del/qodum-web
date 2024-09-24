// Imports
import moment from 'moment';
import {ChevronDown, Download} from 'lucide-react';
import {ExcelFile, ExcelSheet} from 'react-xlsx-wrapper';
import {Select, SelectContent, SelectTrigger} from '@/components/ui/select';




// Main Function
const PrintButton = ({users}:any) => {


    // Users array
    const usersArray = users.map((u:any) => {
        return([
            {value:u.user_name},
            {value:u.email},
            {value:u.name},
            {value:u.mobile},
            {value:u.is_active ? 'True' : 'False'},
            {value:moment(u.createdAt).format('D-MMM-yy')},
            {value:moment(u.updatedAt).format('D-MMM-yy')}
        ]);
    });


    // Data
    const data:any = [
        {
            columns:[
                {title:'Users List', width:{wpx:400}, style:{font:{bold:true, sz:'11', color:{rgb:'ffffff'}}, fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}},
                {title:'', style:{fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}},
                {title:'', style:{fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}},
                {title:'', style:{fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}},
                {title:'', style:{fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}},
                {title:'', style:{fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}},
                {title:'', style:{fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}}
            ],
            data:[]
        },
        {
            columns: [
                {title:'User Name', width:{wpx:100}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}},
                {title:'Email', width:{wpx:150}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}},
                {title:'Name', width:{wpx:100}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}},
                {title:'Mobile No.', width:{wpx:75}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}},
                {title:'Active', width:{wpx:75}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}},
                {title:'Created Date', width:{wpx:75}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}},
                {title:'Modified Date', width:{wpx:100}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}}
            ],
            data:usersArray,
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
                            filename='Users List'
                            fileExtension='xlsx'
                        >
                            <ExcelSheet
                                dataSet={data}
                                name='User'
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
                            filename='Users List'
                            fileExtension='csv'
                        >
                            <ExcelSheet
                                dataSet={data}
                                name='Users'
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