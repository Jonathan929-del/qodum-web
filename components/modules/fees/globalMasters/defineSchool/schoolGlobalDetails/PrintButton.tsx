// Imports
import moment from 'moment';
import {ExcelFile, ExcelSheet} from 'react-xlsx-wrapper';




// Main Function
const PrintButton = ({schoolsDetails}:any) => {


    // Schools details Array
    const schoolsDetailsArray = schoolsDetails.map((schoolD:any) => {
        return([
            {value:false},
            {value:schoolD.school_name},
            {value:schoolD.school_address},
            {value:schoolD.mobile},
            {value:schoolD.email},
            {value:schoolD.support_email},
            {value:schoolD.website},
            {value:schoolD.prefix},
            {value:schoolD.school_no},
            {value:schoolD.affiliation_no},
            {value:schoolD.udise_code},
            {value:schoolD.pen},
            {value:schoolD.renew_up_to},
            {value:schoolD.school_status},
            {value:schoolD.school_short_name},
            {value:schoolD.iso_details},
            {value:schoolD.recess},
            {value:schoolD.total_period},
            {value:schoolD.working_days},
            {value:moment(schoolD.createdAt).format('D-MMM-yy')}
        ]);
    });


    // Data
    const data:any = [
        {
            columns:[
                {title:'', style:{fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}},
                {title:'Schools Details List', width:{wpx:500}, style:{font:{bold:true, sz:'20', color:{rgb:'ffffff'}}, fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}},
                {title:'', style:{fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}},
                {title:'', style:{fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}},
                {title:'', style:{fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}},
                {title:'', style:{fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}},
                {title:'', style:{fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}},
                {title:'', style:{fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}},
                {title:'', style:{fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}},
                {title:'', style:{fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}},
                {title:'', style:{fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}},
                {title:'', style:{fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}},
                {title:'', style:{fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}},
                {title:'', style:{fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}},
                {title:'', style:{fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}},
                {title:'', style:{fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}},
                {title:'', style:{fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}},
                {title:'', style:{fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}},
                {title:'', style:{fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}},
                {title:'', style:{fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}},
            ],
            data:[]
        },
        {
            columns: [
                {title:'Is Admin', width:{wpx:50}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}},
                {title:'School Name', width:{wpx:200}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}},
                {title:'Address', width:{wpx:120}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}},
                {title:'Mobile', width:{wpx:50}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}},
                {title:'Email', width:{wpx:150}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}},
                {title:'Support Email', width:{wpx:200}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}},
                {title:'Website', width:{wpx:200}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}},
                {title:'Prefix', width:{wpx:100}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}},
                {title:'School No.', width:{wpx:80}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}},
                {title:'Affiliation No.', width:{wpx:100}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}},
                {title:'UDISE Code', width:{wpx:100}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}},
                {title:'PEN', width:{wpx:100}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}},
                {title:'School Status', width:{wpx:100}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}},
                {title:'Renewed', width:{wpx:50}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}},
                {title:'Short Name', width:{wpx:100}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}},
                {title:'ISO Details', width:{wpx:100}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}},
                {title:'Recess', width:{wpx:50}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}},
                {title:'Total Period', width:{wpx:100}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}},
                {title:'Working Days', width:{wpx:100}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}},
                {title:'Created Date', width:{wpx:100}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}}
            ],
            data:schoolsDetailsArray,
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
            filename='Schools Details List'
        >
            <ExcelSheet
                dataSet={data}
                name='Schools Details'
            />
        </ExcelFile>
    );
};





// Export
export default PrintButton;