// Bar data
const fundFlowBarData = {
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





// Export
export {fundFlowBarData, categoryDoughnutData, entryTypeDoughnutData};