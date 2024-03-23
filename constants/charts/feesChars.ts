// Fee Defaulters Bar Data
const feeDefaultersBarData = () => {
    return{
        title:{
            name:'Fee Defaulter Statistics',
            subName:'(Year To Date)',
            sideLabel:'No. of defaulter',
            bottomLabel:'Standard',
            bottomNote:''
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
};





// Exports
export {feeDefaultersBarData};