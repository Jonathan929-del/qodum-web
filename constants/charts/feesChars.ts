// Transaction History Line Data
const transactionHistoryLineData = {
    title:'Transaction History of The Last 30 Days',
    subTitle:'',
    categories:[],
    data:{
        labels:['1-Jan', '2-Jan', '3-Jan', '4-Jan', '5-Jan', '6-Jan', '7-Jan', '8-Jan', '9-Jan', '10-Jan', '11-Jan', '12-Jan', '13-Jan', '14-Jan', '15-Jan', '16-Jan',],
        datasets: [
            {
                label:'',
                fill:true,
                data:[61, 45, 40, 66, 44, 69, 42, 36, 28, 35, 97, 27, 28, 38, 98, 24],
                borderWidth:2,
                borderColor:'#2AA9EF',
                backgroundColor:'#3babc540',
                datalabels:{
                    labels:{
                        labels:{
                            color:'#a3a3a3',
                            formatter:(val:any, ctx:any) => `${ctx.chart.data.datasets[0].data[ctx.dataIndex]}`,
                            align:'end',
                            anchor:'end',
                        }
                    },
                },
            }
        ]
    }
};





// Estimated Collection Bar Data
const estimatedCollectionBarData = {
    title:{
        name:'Estimated Collection',
        subName:'(Installment Wise) (2018 - 2019)',
    },
    titleTwo:{
        name:'Total: ',
        subName:'₹ 4,55,07,620'
    },
    categories:[
        {
            name:'Estimated',
            color:'#31C0C9'
        },
        {
            name:'Received',
            color:'#956ED5'
        },
        {
            name:'Due',
            color:'#FFBD1D'
        },
    ],
    data:{
        labels:['APR-JUN', 'JUL-SEP', 'OCT-DEC', 'JAN-MAR'],
        datasets: [
            {
                data:[126.81, 109.95, 109.62, 109.52],
                borderWidth:2,
                backgroundColor:'#31C0C9',
                datalabels:{
                    labels:{
                        labels:{
                            color:'#a3a3a3',
                            formatter:(val:any, ctx:any) => `${ctx.chart.data.datasets[0].data[ctx.dataIndex]} L`,
                            align:'end',
                            anchor:'end',
                        }
                    },
                },
            },
            {
                data:[83.5, 4.04, 0.51, 0.42],
                borderWidth:2,
                backgroundColor:'#956ED5',
                datalabels:{
                    labels:{
                        labels:{
                            color:'#a3a3a3',
                            formatter:(val:any, ctx:any) => `${ctx.chart.data.datasets[1].data[ctx.dataIndex]} L`,
                            align:'end',
                            anchor:'end',
                        }
                    },
                },
            },
            {
                data:[43.18, 105.91, 105.91, 109],
                borderWidth:2,
                backgroundColor:'#FFBD1D',
                datalabels:{
                    labels:{
                        labels:{
                            color:'#a3a3a3',
                            formatter:(val:any, ctx:any) => `${ctx.chart.data.datasets[2].data[ctx.dataIndex]} L`,
                            align:'end',
                            anchor:'end',
                        }
                    },
                },
            },
        ]
    }
};





// Collection Summary Bar Data
const collectionSummaryBarData = {
    title:{
        name:'Collection Summary',
        subName:'',
    },
    titleTwo:{
        name:'Total: ',
        subName:'₹ 2,66,365'
    },
    tabs:["Today's", 'Last 7 Days', 'Last 30 Days'],
    select:[
        {
            name:'School Fees',
            amount:'₹ 1,05,540'
        },
        {
            name:'School Counter (Amt./TXN)',
            amount:'₹ 75,500/5'
        },
        {
            name:'Bank (Amt./TXN)',
            amount:'₹ 21,000/3'
        },
        {
            name:'Online (Amt./TXN)',
            amount:'₹ 9,040/3'
        },
    ],
    categories:[],
    data:{
        labels:['Nursery', 'LKG', 'UKG', 'I', 'II', 'III', 'IV', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'],
        datasets: [
            {
                data:[250, 210, 300, 240, 400, 100, 170, 250, 170, 320, 290, 500, 100, 300],
                borderWidth:2,
                backgroundColor:'#2EABE5',
                datalabels:{
                    labels:{
                        labels:{
                            color:'#a3a3a3',
                            formatter:(val:any, ctx:any) => `${ctx.chart.data.datasets[0].data[ctx.dataIndex]} K`,
                            align:'end',
                            anchor:'end',
                        }
                    },
                },
            }
        ]
    }
};





// Fee Defaulters Bar Data
const feeDefaultersBarData = {
    title:{
        name:'Fee Defaulter Statistics',
        subName:'(Year To Date)',
    },
    titleTwo:{
        name:'Total: ',
        subName:'₹ 2,66,365'
    },
    tabs:[
        'Standard Wise',
        'Installment Wise'
    ],
    rightText:{
        main:'Total No. of Defaulter Students: ',
        secondary:'768/1217'
    },
    select:[],
    categories:[],
    data:{
        labels:['Nursery', 'LKG', 'UKG', 'I', 'II', 'III', 'IV', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'],
        datasets: [
            {
                data:[250, 210, 300, 240, 400, 100, 170, 250, 170, 320, 290, 500, 100, 300],
                borderWidth:2,
                backgroundColor:'#53CC89',
                datalabels:{
                    labels:{
                        labels:{
                            color:'#a3a3a3',
                            formatter:(val:any, ctx:any) => ctx.chart.data.datasets[0].data[ctx.dataIndex],
                            align:'end',
                            anchor:'end',
                        }
                    },
                },
            }
        ]
    }
};





// Exports
export {transactionHistoryLineData, estimatedCollectionBarData, collectionSummaryBarData, feeDefaultersBarData};