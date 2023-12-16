// Imports
import {ExcelFile, ExcelSheet} from 'react-xlsx-wrapper';




// Main Function
const PrintButton = ({narrations, fileExtension}:any) => {


    // Narrations Array
    const narrationsArray = narrations.map((narration:any) => {
        let abbreviation;
        switch (narration.voucher_type) {
            case 'Cash Payment Voucher':
                abbreviation = 'CASHP';
                break;
            case 'Cash Receipt Voucher':
                abbreviation = 'CASHR';
                break;
            case 'Bank Payment Voucher':
                abbreviation = 'BANKP';
                break;
            case 'Bank Receipt Voucher':
                abbreviation = 'BANKR';
                break;
            case 'Contra Voucher':
                abbreviation = 'CONTRA';
                break;
            case 'Journal Voucher':
                abbreviation = 'JVENT';
                break;
            default:
                '';
        }
        return([
            {value:narrations.indexOf(narration)},
            {value:narration.narration},
            {value:narration.voucher_type},
            {value:abbreviation}
        ]);
    });


    // Data
    const data:any = [
        {
            columns:[
                {title:'', style:{fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}},
                {title:'', style:{fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}},
                {title:'Narrations List', width:{wpx:500}, style:{font:{bold:true, sz:'20', color:{rgb:'ffffff'}}, fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}},
                {title:'', style:{fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}},
                {title:'', style:{fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}}
            ],
            data:[]
        },
        {
            columns: [
                {title:'Id', width:{wpx:20}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}},
                {title:'Narrations', width:{wpx:100}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}},
                {title:'Voucher Type', width:{wpx:150}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}},
                {title:'Entry Type', width:{wpx:100}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}}
            ],
            data:narrationsArray,
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
            filename='Narration List'
            // fileExtension={fileExtension}
            fileExtension='txt'
        >
            <ExcelSheet
                dataSet={data}
                name='Narrations'
            />
        </ExcelFile>
    );
};





// Export
export default PrintButton;