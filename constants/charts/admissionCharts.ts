// Student Strength Bar Data
const studentStrengthBarData = {
    title:{
        name:'Student Strength Standard Wise',
        subName:'',
    },
    categories:[
        {
            name:'Total Students',
            color:'bg-[#C4CDDE]'
        },
        {
            name:'New Admission',
            color:'bg-[#15ABDE]'
        },
    ],
    data:{
        labels:['Nursery', 'LKG', 'UKG', 'I', 'II', 'III', 'IV', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'],
        datasets: [
            {
                data:[250, 210, 300, 240, 400, 100, 170, 250, 170, 320, 290, 500, 100, 300],
                borderWidth:2,
                backgroundColor:'#C4CDDE'
            },
            {
                data:[250, 0, 0, 240, 0, 100, 0, 250, 0, 320, 0, 500, 0, 0],
                borderWidth:2,
                backgroundColor:'#15ABDE',
            }
        ]
    }
};





// Student Comparision Bar Data
const studentComparisionBarData = {
    title:{
        name:'Student Statistics Comparison With Prev. Year',
        subName:'',
    },
    categories:[
        {
            name:'2017 - 18',
            color:'bg-[#C4CDDE]'
        },
        {
            name:'2018 - 19',
            color:'bg-[#FF9494]'
        },
    ],
    data:{
        labels:['Total Students', 'Boys', 'Girls', 'New Admission', 'TC Taken', 'Left'],
        datasets: [
            {
                data:[3510, 2100, 1460, 280, 128, 46],
                borderWidth:2,
                backgroundColor:'#C4CDDE'
            },
            {
                data:[3850, 2310, 1540, 240, 290, 145, 53],
                borderWidth:2,
                backgroundColor:'#FF9494',
            }
        ]
    }
};





// New Admission Doughnut Data
const newAdmissionDoughnutData = {
    labels:{
        title:'New Admissions In',
        subTitle:'',
        polls:[
            {
                name:'Boys',
                color:'bg-[#15ABDE]'
            },
            {
                name:'Girls',
                color:'bg-[#FF7779]'
            }
        ]
    },
    doughnutData:{
        labels:['Boys', 'Girls'],
        datasets: [
            {
                label:'Poll',
                data:[6, 4],
                backgroundColor:['#15ABDE', '#FF7779'],
                borderColor:['#15ABDE', '#FF7779']
            }
        ]
    }
};





// Standard Statistics Doughnut Data
const standardStatisticsDoughnutData = {
    labels:{
        title:'Standard Wise Statistics',
        subTitle:'',
        polls:[
            {
                name:'TC Taken',
                color:'bg-[#15ABDE]'
            },
            {
                name:'New Admission',
                color:'bg-[#FEC133]'
            },
            {
                name:'Old',
                color:'bg-[#FE8125]'
            }
        ]
    },
    doughnutData:{
        labels:['TC Taken', 'New Admission', 'Old'],
        datasets: [
            {
                label:'Poll',
                data:[25, 12, 63],
                backgroundColor:['#15ABDE', '#FEC133', '#FE8125'],
                borderColor:['#15ABDE', '#FEC133', '#FE8125']
            }
        ]
    }
};





// Transfer Statistics Statistics Doughnut Data
const transferDoughnutData = {
    labels:{
        title:'Transfer Certificate Statistics',
        subTitle:'',
        polls:[
            {
                name:'Drafted',
                color:'bg-[#0C7EFA]'
            },
            {
                name:'Generated',
                color:'bg-[#FF7779]'
            },
            {
                name:'Canceled',
                color:'bg-[#FEC133]'
            }
        ]
    },
    doughnutData:{
        labels:['Drafted', 'Generated', 'Canceled'],
        datasets: [
            {
                label:'Poll',
                data:[480, 290, 140],
                backgroundColor:['#0C7EFA', '#FF7779', '#FEC133'],
                borderColor:['#0C7EFA', '#FF7779', '#FEC133']
            }
        ]
    }
};





// Category Statistics Doughnut Data
const categoryDoughnutData = {
    labels:{
        title:'Category Wise Student Statistics',
        subTitle:'',
        polls:[
            {
                name:'General',
                color:'bg-[#0C7EFA]'
            },
            {
                name:'OBC',
                color:'bg-[#FF7779]'
            },
            {
                name:'SC/ST',
                color:'bg-[#FEC133]'
            }
        ]
    },
    doughnutData:{
        labels:['General', 'OBC', 'SC/ST'],
        datasets: [
            {
                label:'Poll',
                data:[72, 18, 10],
                backgroundColor:['#0C7EFA', '#FF7779', '#FEC133'],
                borderColor:['#0C7EFA', '#FF7779', '#FEC133']
            }
        ]
    }
};





// Standard Statistics Doughnut Data
const religionDoughnutData = {
    labels:{
        title:'Religion Wise Student Strength',
        subTitle:'',
        polls:[
            {
                name:'Hinduism',
                color:'bg-[#FE8125]'
            },
            {
                name:'Islam',
                color:'bg-[#009D24]'
            },
            {
                name:'Christianity',
                color:'bg-[#0C7EFA]'
            },
            {
                name:'Judaism',
                color:'bg-[#7F5CB0]'
            },
        ]
    },
    doughnutData:{
        labels:['Hinduism', 'Islam', 'Christianity', 'Judaism'],
        datasets: [
            {
                label:'Poll',
                data:[63.5, 12, 15, 9.5],
                backgroundColor:['#FE8125', '#009D24', '#0C7EFA', '#7F5CB0'],
                borderColor:['#FE8125', '#009D24', '#0C7EFA', '#7F5CB0']
            }
        ]
    }
};





// Export
export {studentStrengthBarData, studentComparisionBarData, newAdmissionDoughnutData, standardStatisticsDoughnutData, transferDoughnutData, categoryDoughnutData, religionDoughnutData};