'use client';
// Imports
import {Doughnut} from 'react-chartjs-2';
import {Chart as ChartJs, ArcElement, Tooltip, Legend} from 'chart.js';





// Main function
const DoughnutCom = ({data, text}:any) => {


    // Registering
    ChartJs.register(ArcElement, Tooltip, Legend);


    // Options
    const options = {
        responsive:true,
        plugins:{
            legend: {
                display: false
            },
        },
    }


    // Center Text
    const textCenter = {
        id:'textCenter',
        beforeDatasetsDraw:(chart:any, args:any, pluginOptions:any) => {
            const {ctx} = chart;
            ctx.save();
            ctx.font = 'bolder 20px poppins';
            ctx.fillStyle = 'black';
            ctx.textAlign = 'center';
            ctx.fillText(text, chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y);
        }
    };
    console.log(data.labels.polls[0].color);


    return (
        <div className='w-full flex flex-col items-center justify-between gap-4 bg-white rounded-[8px] p-2'>
            <div className='w-full flex flex-row items-center justify-between mb-2'>
                <div className='flex flex-row items-center justify-center text-sm'>
                    <p className='font-bold'>{data.labels.title}</p>
                    <span className='ml-[2px] text-hash-color text-xs'>{data.labels.subTitle}</span>
                </div>
                <div className={`grid gap-2 ${data.labels.polls.length > 4 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                    {   
                        data?.labels?.polls?.map((poll:any) => (
                            <div className='flex flex-row items-center text-hash-color text-xs'>
                                <span className={`w-2 h-2 bg-[${poll.color}]`}/>
                                <p className='pl-[2px]'>{poll.name}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='flex-1 flex items-center justify-center h-[75%] w-[75%] p-2'>
                <Doughnut
                    data={data.doughnutData}
                    options={options}
                    plugins={[textCenter]}
                />
            </div>
        </div>
    );
};





// Export
export default DoughnutCom;