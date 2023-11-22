'use client';
// Imports
import {Doughnut} from 'react-chartjs-2';
import {Chart as ChartJs, ArcElement, Tooltip, Legend} from 'chart.js';





// Main function
const CategoryDoughnut = () => {


    // Registering
    ChartJs.register(ArcElement, Tooltip, Legend);


    // Data
    const data = {
        labels:['Bank', 'General', 'Party'],
        datasets: [
            {
                label:'Poll',
                data:[3, 6, 8],
                backgroundColor:['#FBBA6B', '#EE706B', '#64B475'],
                borderColor:['#FBBA6B', '#EE706B', '#64B475']
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
        <div className='w-full flex flex-col items-center justify-between gap-4 bg-white rounded-[8px] p-2'>
            <div className='w-full flex flex-row items-center justify-between mb-2'>
                <div className='flex flex-row items-center justify-center text-sm'>
                    <p className='font-bold'>Voucher Statistics</p>
                    <span className='ml-[2px] text-hash-color text-xs'>(Category Wise)</span>
                </div>
                <div className='flex flex-col'>
                    <div className='flex flex-row items-center text-hash-color text-xs'>
                        <span className='w-2 h-2 bg-[#FBBA6B]'/>
                        <p className='pl-[2px]'>Bank</p>
                    </div>
                    <div className='flex flex-row items-center text-hash-color text-xs'>
                        <span className='w-2 h-2 bg-[#EE706B]'/>
                        <p className='pl-[2px]'>General</p>
                    </div>
                    <div className='flex flex-row items-center text-hash-color text-xs'>
                        <span className='w-2 h-2 bg-[#64B475]'/>
                        <p className='pl-[2px]'>Party</p>
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
export default CategoryDoughnut;