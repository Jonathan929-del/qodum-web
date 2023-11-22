'use client';
// Imports
import {Doughnut} from 'react-chartjs-2';
import {Chart as ChartJs, ArcElement, Tooltip, Legend} from 'chart.js';





// Main function
const EntryTypeDoughnut = () => {


    // Registering
    ChartJs.register(ArcElement, Tooltip, Legend);


    // Data
    const data = {
        labels:['CASHR', 'JVENT', 'ADENT', 'BANKR', 'FEEDB', 'BANKP'],
        datasets: [
            {
                label:'Poll',
                data:[3, 6, 8, 1, 7, 9],
                backgroundColor:['#FBBA6B', '#EE706B', '#59A1CF', '#4C4A53', '#4CB5B3', '#444587'],
                borderColor:['#FBBA6B', '#EE706B', '#59A1CF', '#4C4A53', '#4CB5B3', '#444587']
            }
        ]
    };


    // Options
    const options = {
        responsive:true,
        plugins:{
            legend:{
                display:false
            }
        }
    }


    // Center Text
    const textCenter = {
        id:'textCenter',
        beforeDatasetsDraw:(chart:any, args:any, pluginOptions:any) => {
            const {ctx, data} = chart;
            ctx.save();
            ctx.font = 'bolder 30px poppins';
            ctx.fillStyle = 'black';
            ctx.textAlign = 'center';
            ctx.fillText('81.60', chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y);
        }
    };


    return (
        <div className='w-full flex flex-col items-center justify-between bg-white rounded-[8px] p-2'>
            <div className='w-full flex flex-row items-center justify-between mb-2 gap-4'>
                <div className='flex flex-row items-center justify-center text-sm'>
                    <p className='font-bold'>Voucher Statistics</p>
                    <span className='ml-[2px] text-hash-color text-xs'>(Entry Type Wise)</span>
                </div>
                <div className='grid grid-cols-2 grid-rows-3 gap-y-2 gap-x-4'>
                    <div className='flex flex-row items-center text-hash-color text-xs'>
                        <span className='w-2 h-2 bg-[#FBBA6B]'/>
                        <p className='pl-[2px]'>CASHR</p>
                    </div>
                    <div className='flex flex-row items-center text-hash-color text-xs'>
                        <span className='w-2 h-2 bg-[#EE706B]'/>
                        <p className='pl-[2px]'>JVENT</p>
                    </div>
                    <div className='flex flex-row items-center text-hash-color text-xs'>
                        <span className='w-2 h-2 bg-[#59A1CF]'/>
                        <p className='pl-[2px]'>ADENT</p>
                    </div>
                    <div className='flex flex-row items-center text-hash-color text-xs'>
                        <span className='w-2 h-2 bg-[#4C4A53]'/>
                        <p className='pl-[2px]'>BANKR</p>
                    </div>
                    <div className='flex flex-row items-center text-hash-color text-xs'>
                        <span className='w-2 h-2 bg-[#4CB5B3]'/>
                        <p className='pl-[2px]'>FEEDB</p>
                    </div>
                    <div className='flex flex-row items-center text-hash-color text-xs'>
                        <span className='w-2 h-2 bg-[#444587]'/>
                        <p className='pl-[2px]'>BANKP</p>
                    </div>
                </div>
            </div>
            <div className='flex-1 flex items-center justify-center h-[75%] w-[75%] p-2'>
                <Doughnut
                    data={data}
                    options={options}
                    plugins={[textCenter]}
                />
            </div>
        </div>
    );
};





// Export
export default EntryTypeDoughnut;