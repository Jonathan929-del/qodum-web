// Imports
import moment from 'moment';
import {ExcelFile, ExcelSheet} from 'react-xlsx-wrapper';




// Main Function
const PrintButton = ({financialYears}:any) => {


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


    // Financial Years Array
    const financialYearsArray = financialYears.map((financialYear:any) => {
        return([
            {value:financialYear.year_name},
            {value:financialYear.is_active ? 'True' : 'False'},
            {value:`${financialYear.start_date?.day}-${monthConverter(financialYear.start_date?.month)}-${financialYear.start_date?.year}`},
            {value:`${financialYear.end_date?.day}-${monthConverter(financialYear.end_date?.month)}-${financialYear.end_date?.year}`},
            {value:moment(financialYear.createdAt).format('D-MMM-yy')}
        ]);
    });


    // Data
    const data:any = [
        {
            columns:[
                {title:'', width:{wpx:1000}, style:{fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}},
                {title:'', width:{wpx:1000}, style:{fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}},
                {title:'Financial Years', width:{wpx:1000}, style:{font:{bold:true, sz:'13', color:{rgb:'ffffff'}}, fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}},
                {title:'List', width:{wpx:1000}, style:{font:{bold:true, sz:'13', color:{rgb:'ffffff'}}, fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}},
                {title:'', width:{wpx:1000}, style:{fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}}
            ],
            data:[]
        },
        {
            columns: [
                {title:'Year Name', width:{wpx:100}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}},
                {title:'Active', width:{wpx:50}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}},
                {title:'Start Date', width:{wpx:100}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}},
                {title:'End Date', width:{wpx:100}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}},
                {title:'Created Date', width:{wpx:100}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}},
            ],
            data:financialYearsArray,
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
            filename='Financial Years List'
        >
            <ExcelSheet
                dataSet={data}
                name='Financial Years'
            />
        </ExcelFile>
    );
};





// Export
export default PrintButton;