'use client';
// Imports
import BarCom from '@/components/dashboards/shared/BarCom';
import DoughnutCom from '@/components/dashboards/shared/DoughnutCom';
import LineCom from '@/components/dashboards/accountsDashboard/LineCom';
import AccountCards from '@/components/dashboards/accountsDashboard/AccountCards';
import TodayVouchers from '@/components/dashboards/accountsDashboard/TodayVouchers';






// Main function
const page = () => {


    // Bar data
    const barData = {
        title:{
            name:'Fund Flow',
            subName:'(YTD)',
        },
        categories:[
            {
                name:'Debit',
                color:'#ccc'
            },
            {
                name:'Credit',
                color:'#FF9494'
            },
        ],
        data:{
            labels:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    data:[2, 6, 3, 4, 5, 1, 5, 4, 1, 3, 4, 2],
                    borderWidth:2,
                    backgroundColor:'#ccc'
                },
                {
                    data:[4, 6, 4, 3, 1, 1, 5, 2, 4, 6, 5, 3],
                    borderWidth:2,
                    backgroundColor:'#FF9494',
                }
            ]
        }
    };


    // Category Doughnut Data
    const categoryDoughnutData = {
        labels:{
            title:'Voucher Statistics',
            subTitle:'(Category Wise)',
            polls:[
                {
                    name:'Bank',
                    color:'bg-[#FBBA6B]'
                },
                {
                    name:'General',
                    color:'bg-[#EE706B]'
                },
                {
                    name:'Party',
                    color:'bg-[#64B475]'
                },
            ]
        },
        doughnutData:{
            labels:['Bank', 'General', 'Party'],
            datasets: [
                {
                    label:'Poll',
                    data:[3, 6, 8],
                    backgroundColor:['#FBBA6B', '#EE706B', '#64B475'],
                    borderColor:['#FBBA6B', '#EE706B', '#64B475']
                }
            ]
        }
    };


    // Category Doughnut Data
    const entryTypeDoughnutData = {
        labels:{
            title:'Voucher Statistics',
            subTitle:'(Entry Type Wise)',
            polls:[
                {
                    name:'CASHR',
                    color:'bg-[#FBBA6B]'
                },
                {
                    name:'JVENT',
                    color:'bg-[#EE706B]'
                },
                {
                    name:'ADENT',
                    color:'bg-[#59A1CF]'
                },
                {
                    name:'BANKR',
                    color:'bg-[#4C4A53]'
                },
                {
                    name:'FEEDB',
                    color:'bg-[#4CB5B3]'
                },
                {
                    name:'BANKP',
                    color:'bg-[#444587]'
                },
            ]
        },
        doughnutData:{
            labels:['CASHR', 'JVENT', 'ADENT', 'BANKR', 'FEEDB', 'BANKP'],
            datasets: [
                {
                    label:'Poll',
                    data:[3, 6, 8, 1, 7, 9],
                    backgroundColor:['#FBBA6B', '#EE706B', '#59A1CF', '#4C4A53', '#4CB5B3', '#444587'],
                    borderColor:['#FBBA6B', '#EE706B', '#59A1CF', '#4C4A53', '#4CB5B3', '#444587']
                }
            ]
        }
    };


    return (
        <section className='flex flex-col w-full gap-4'>


            {/* Cards */}
            <AccountCards />


            {/* Income and Expenditure */}
            <div className='flex flex-col justify-between mx-4 gap-4 lg:flex-row'>
                <LineCom />
                <TodayVouchers />
            </div>


            {/* Bar */}
            <div className='flex-1 flex flex-col justify-between mx-4 gap-4'>
                <BarCom barData={barData}/>
            </div>


            {/* Doughnuts */}
            <div className='flex-1 flex flex-col mx-4 gap-4 lg:flex-row'>
                <DoughnutCom data={categoryDoughnutData} text='81.60'/>
                <DoughnutCom data={entryTypeDoughnutData} text='81.60'/>
            </div>


        </section>
    );
};





// Export
export default page;