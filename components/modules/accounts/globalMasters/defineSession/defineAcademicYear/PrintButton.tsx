// Imports
import {ExcelFile, ExcelSheet} from 'react-xlsx-wrapper';




// Main Function
const PrintButton = ({academicYears}:any) => {


    // Academic Years Array
    const academicYearsArray = academicYears.map((academicYear:any) => {
        return([
            {value:academicYear.year_name},
            {value:academicYears.is_active},
            {value:academicYears.start_date},
            {value:academicYears.end_date},
            {value:academicYears.end_date}
        ]);
    });


    // Data
    const data:any = [
        {
            columns:[
                {title:'', style:{fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}},
                {title:'', style:{fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}},
                {title:'Academic Years List', width:{wpx:500}, style:{font:{bold:true, sz:'20', color:{rgb:'ffffff'}}, fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}},
                {title:'', style:{fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}},
                {title:'', style:{fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}}
            ],
            data:[]
        },
        {
            columns: [
                {title:'Year Name', width:{wpx:20}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}},
                {title:'Active', width:{wpx:100}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}},
                {title:'Start Date', width:{wpx:150}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}},
                {title:'End Date', width:{wpx:100}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}},
                {title:'Created Date', width:{wpx:100}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}},
            ],
            data:academicYearsArray,
        }
    ];


    return (
        <ExcelFile
            element={
                <span
                    className='flex items-center px-[8px] h-8 text-xs text-black bg-gradient-to-r from-[#FFC73A] to-[#FFF3AB] rounded-full transition border-[1px] border-white cursor-pointer
                    hover:border-[#FFC73A] hover:from-[#ffc73a1f] hover:to-[#ffc73a1f] hover:text-[#FFC73A] sm:text-[16px] sm:px-4'
                >
                    Print
                </span>
            }
            filename='Academic Years List'
        >
            <ExcelSheet
                dataSet={data}
                name='Academic Years'
            />
        </ExcelFile>
    );
};





// Export
export default PrintButton;