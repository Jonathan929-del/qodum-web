'use client';
// Imports
import moment from 'moment';
import {useEffect, useState} from 'react';
import {Document, Page, View, Text, PDFViewer, Image} from '@react-pdf/renderer';
import {fetchAcademicYears} from '@/lib/actions/accounts/globalMasters/defineSession/defineAcademicYear.actions';
import {fetchGlobalSchoolDetails} from '@/lib/actions/fees/globalMasters/defineSchool/schoolGlobalDetails.actions';





// Pdf file
const PDF = ({pdfData}:any) => {


    // School date
    const [schoolData, setSchoolData] = useState({
        logo:'',
        school_name:'',
        school_address:''
    });


    // Active academic year
    const [activeAcademicYear, setActiveAcademicYear] = useState('');


    // Paymode fee type filter
    const paymodeFeeTypeFilter = (paymode:string) => {
        const paymentsHeadsNames = pdfData.payments?.filter((p:any) => p.paymode === paymode)?.map((p:any) => p.fee_type === 'All fee types' ? pdfData.fee_types : [p.fee_type]).flat();
        const uniquePaymentsHeadsNames = paymentsHeadsNames?.filter((value:any, index:any, self:any) => self.indexOf(value) === index);
        return uniquePaymentsHeadsNames;
    };


    // Total number generator
    const totalNumberGenerator = (array:any) => {
        let sum = 0;
        for (let i = 0; i < array?.length; i++ ) {sum += array[i];};
        return sum;
    };


    // Function to get a list of dates between two dates
    const getDatesBetween = (startDate: Date, endDate: Date): Date[] => {
        const dates: Date[] = [];
        let currentDate = new Date(startDate);
        // Iterate over the range of dates
        while (currentDate <= endDate) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
        }
        const filteredDates = dates.filter((d:any) => pdfData.payments.map((p:any) => moment(p.received_date).format('DD-MMM-YYYY')).includes(moment(d).format('DD-MMM-YYYY')));
        return filteredDates;
    };


    // Affected heads
    const affectedHeads = pdfData.payments?.map((p:any) => p.paid_heads.map((ph:any) => ph.head_name)).flat()?.filter((value:any, index:any, self:any) => self.indexOf(value) === index);


    // Page size
    const [pageSize, setPageSize] = useState({width:1900, height:1900});


    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const schools = await fetchGlobalSchoolDetails();
            const sessions = await fetchAcademicYears();
            setSchoolData({
                logo:schools[0].logo,
                school_name:schools[0].school_name,
                school_address:schools[0].school_address
            });
            setActiveAcademicYear(sessions.filter((s:any) => s.is_active)[0].year_name);
            switch (pdfData.preview) {
                case '':
                    setPageSize({width:1900, height:1900});
                    break;
                case 'Student Wise':
                    setPageSize({width:1000, height:1500});
                    break;
                case 'Head Wise':
                    setPageSize({width:1900, height:1900});
                    break;
                case 'Date Wise':
                    setPageSize({width:1700, height:1700});
                    break;
                default:
                    setPageSize({width:1900, height:1900});
                    break;
            }
        };
        fetcher();
    }, []);


    return(
        <Document>
            <Page style={{width:'100%', display:'flex', flexDirection:'column', gap:2, margin:0}} size={pageSize} orientation='landscape'>

                {/* School data */}
                <View style={{display:'flex', flexDirection:'row', width:'100%', alignItems:'center', gap:50, paddingVertical:10, paddingHorizontal:50, borderBottomWidth:0.5, borderBottomColor:'#ccc'}}>
                    <Image
                        src={schoolData?.logo}
                        style={{width:50, height:50}}
                    />
                    <View style={{display:'flex', flexDirection:'column', alignItems:'center', gap:2}}>
                        <Text>{schoolData.school_name}</Text>
                        <Text style={{fontSize:10}}>
                            {schoolData.school_address}
                        </Text>
                    </View>
                    <Text style={{color:'#fff'}}>-</Text>
                </View>

                {/* Date and mode */}
                <View style={{display:'flex', flexDirection:'row', gap:6, fontSize:12, paddingHorizontal:10, marginHorizontal:5, paddingVertical:5, marginVertical:5, borderWidth:1, borderColor:'#ccc'}}>
                    <Text>RECEIPT WISE FEE TYPE COLLECTION</Text>
                    <Text>From {moment(pdfData.date_from).format('DD-MMM-YYYY')}</Text>
                    <Text>To {moment(pdfData.date_to).format('DD-MMM-YYYY')}</Text>
                </View>









                {pdfData.payments.length > 0 ? (
                    <>

                        {/* Blank preview */}
                        {pdfData.preview === '' && (
                            <View style={{width:'95%', display:'flex', flexDirection:'column', alignItems:'flex-start', marginHorizontal:5, marginLeft:20, fontSize:10, borderWidth:0.75, borderColor:'#ccc'}}>


                                {/* Headers */}
                                <View style={{display:'flex', flexDirection:'column', gap:0, backgroundColor:'#435680'}}>
                                    <View style={{display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:'#435680', paddingLeft:5, color:'#fff'}}>
                                        <View style={{width:75, height:'100%', display:'flex', alignItems:'flex-start', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc', color:'#435680'}}>
                                            <Text>-</Text>
                                        </View>
                                        <View style={{width:50, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, color:'#435680', borderRightColor:'#ccc'}}>
                                            <Text>-</Text>
                                        </View>
                                        <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, color:'#435680', borderRightColor:'#ccc'}}>
                                            <Text>-</Text>
                                        </View>
                                        <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, color:'#435680', borderRightColor:'#ccc'}}>
                                            <Text>-</Text>
                                        </View>
                                        <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, color:'#435680', borderRightColor:'#ccc'}}>
                                            <Text>-</Text>
                                        </View>
                                        <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, color:'#435680', borderRightColor:'#ccc'}}>
                                            <Text>-</Text>
                                        </View>
                                        <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, color:'#435680', borderRightColor:'#ccc'}}>
                                            <Text>-</Text>
                                        </View>
                                        <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, color:'#435680', borderRightColor:'#ccc'}}>
                                            <Text>-</Text>
                                        </View>
                                        <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, color:'#435680', borderRightColor:'#ccc'}}>
                                            <Text>-</Text>
                                        </View>
                                        <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, color:'#435680', borderRightColor:'#ccc'}}>
                                            <Text>-</Text>
                                        </View>
                                        {pdfData.paymodes?.map((p:any) => paymodeFeeTypeFilter(p).length > 0 && (
                                            <View style={{width:paymodeFeeTypeFilter(p).length * 75, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', paddingVertical:2, borderRightWidth:1, borderBottomWidth:0.5, borderColor:'#ccc'}}>
                                                <Text>{p}</Text>
                                            </View>
                                        ))}
                                        <Text style={{width:50, display:'flex', alignItems:'flex-start', justifyContent:'center', paddingVertical:2,  borderRightWidth:1, paddingLeft:5, borderRightColor:'#ccc', color:'#435680',}}>-</Text>
                                    </View>
                                    <View style={{display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:'#435680', borderBottomWidth:0.5, paddingLeft:5, borderBottomColor:'#ccc', color:'#fff'}}>
                                        <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                            <Text>REC. DATE</Text>
                                        </View>
                                        <View style={{width:50, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                            <Text>SN</Text>
                                        </View>
                                        <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                            <Text>REC. NO.</Text>
                                        </View>
                                        <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                            <Text>REF. NO.</Text>
                                        </View>
                                        <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                            <Text>ADM NO.</Text>
                                        </View>
                                        <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                            <Text>NAME</Text>
                                        </View>
                                        <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                            <Text>CLASS</Text>
                                        </View>
                                        <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                            <Text>INSTALLMENT</Text>
                                        </View>
                                        <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                            <Text>PAYMODE</Text>
                                        </View>
                                        <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                            <Text>CHQ. NO.</Text>
                                        </View>
                                        {pdfData.paymodes?.map((p:any) => paymodeFeeTypeFilter(p).map((h:any) => (
                                            <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                <Text>{h}</Text>
                                            </View>
                                        )))}
                                        <Text style={{width:50, display:'flex', alignItems:'flex-start', justifyContent:'center', paddingVertical:2,  borderRightWidth:1, paddingLeft:5, borderRightColor:'#ccc'}}>TOTAL</Text>
                                    </View>
                                </View>


                                {/* Payments dates */}
                                {getDatesBetween(pdfData.date_from, pdfData.date_to)?.map((d:any) => (
                                    <View style={{display:'flex', flexDirection:'column', borderBottomWidth:1, borderBottomColor:'#ccc'}}>
                                        <View style={{
                                            display:'flex',
                                            flexDirection:'row',
                                            alignItems:'center',
                                            backgroundColor:'#F3F8FB'
                                        }}>
                                            <View style={{width:805, height:'100%', display:'flex', alignItems:'flex-start', justifyContent:'center', paddingVertical:4, paddingLeft:5, fontSize:14}}>
                                                <Text>Collection Statement: {moment(d).format('DD-MMM-YYYY')}</Text>
                                            </View>
                                        </View>


                                        {pdfData.payments.filter((p:any) => moment(p.received_date).format('DD-MMM-YYYY') === moment(d).format('DD-MMM-YYYY')).map((p:any) => (
                                            <View style={{display:'flex', flexDirection:'row'}}>
                                                <View style={{width:80, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                    <Text>{pdfData.payments.filter((p:any) => moment(p.received_date).format('DD-MMM-YYYY') === moment(d).format('DD-MMM-YYYY')).indexOf(p) === 0 && moment(p.received_date).format('DD-MMM-YYYY')}</Text>
                                                </View>
                                                <View style={{display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:'#fff', borderBottomWidth:0.5, paddingLeft:5, borderBottomColor:'#ccc', color:'#000'}}>
                                                    <View style={{width:45, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                        <Text>{pdfData.payments.filter((p:any) => moment(p.received_date).format('DD-MMM-YYYY') === moment(d).format('DD-MMM-YYYY')).indexOf(p) + 1}</Text>
                                                    </View>
                                                    <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                        <Text>{p.receipt_no}</Text>
                                                    </View>
                                                    <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                        <Text>-</Text>
                                                    </View>
                                                    <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                        <Text>{p.adm_no}</Text>
                                                    </View>
                                                    <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                        <Text>{p.student}</Text>
                                                    </View>
                                                    <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                        <Text>{p.class_name}</Text>
                                                    </View>
                                                    <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                        <Text>{p.installments.map((i:any) => i + ' ')}</Text>
                                                    </View>
                                                    <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                        <Text>{p.paymode}</Text>
                                                    </View>
                                                    <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                        <Text>{p?.paymode_details?.cheque_no || '-'}</Text>
                                                    </View>
                                                    {pdfData.paymodes?.map((pm:any) => paymodeFeeTypeFilter(pm).map((t:any) => (
                                                        <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                            <Text>{
                                                                totalNumberGenerator(p.paid_heads?.filter((ph:any) => ph.type_name === t && p.paymode === pm)?.map((ph:any) => totalNumberGenerator(ph?.amounts?.filter((a:any) => p.installments.includes(a.name)).map((a:any) => Number(a.paid_amount))))) || '-'
                                                            }</Text>
                                                        </View>
                                                    )))}
                                                    <Text style={{width:50, display:'flex', alignItems:'flex-start', justifyContent:'center', paddingVertical:2,  borderRightWidth:1, paddingLeft:5, borderRightColor:'#ccc'}}>{
                                                        totalNumberGenerator(p.paid_heads?.map((ph:any) => totalNumberGenerator(ph?.amounts?.filter((a:any) => p.installments.includes(a.name)).map((a:any) => Number(a.paid_amount))))) || '-'
                                                    }</Text>
                                                </View>
                                            </View>
                                        ))}


                                        <View style={{display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:'#fff', borderBottomWidth:0.5, paddingLeft:5, borderBottomColor:'#ccc', color:'#000'}}>
                                            <View style={{width:750, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, fontSize:14, borderRightColor:'#ccc'}}>
                                                <Text>Total fee on date: {moment(d).format('DD-MMM-YYYY')}</Text>
                                            </View>
                                            {pdfData.paymodes?.map((pm:any) => paymodeFeeTypeFilter(pm).map((t:any) => (
                                                <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                    <Text>{
                                                        totalNumberGenerator(
                                                            pdfData.payments
                                                                ?.filter((p:any) => moment(p.received_date).format('DD-MMM-YYYY') === moment(d).format('DD-MMM-YYYY') && p.paymode === pm)
                                                                ?.map((p:any) => totalNumberGenerator(p.paid_heads
                                                                        ?.filter((ph:any) => ph.type_name === t)
                                                                        ?.map((ph:any) => totalNumberGenerator(ph?.amounts?.filter((a:any) => p.installments.includes(a.name)).map((a:any) => Number(a.paid_amount))))
                                                                    )
                                                                )
                                                        )
                                                    }</Text>
                                                </View>
                                            )))}
                                            <Text style={{width:50, display:'flex', alignItems:'flex-start', justifyContent:'center', paddingVertical:2,  borderRightWidth:1, paddingLeft:5, borderRightColor:'#ccc'}}>{
                                                totalNumberGenerator(pdfData.payments.filter((p:any) => moment(p.received_date).format('DD-MMM-YYYY') === moment(d).format('DD-MMM-YYYY')).map((p:any) => Number(p.paid_amount)))
                                            }</Text>
                                        </View>
                                    </View>
                                ))}


                                {/* Total */}
                                <View style={{display:'flex', flexDirection:'row', alignItems:'center', color:'#fff', backgroundColor:'#435680'}}>
                                    <View style={{width:755, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, fontSize:14, borderRightColor:'#ccc'}}>
                                        <Text>Grand Total</Text>
                                    </View>
                                    {pdfData.paymodes?.map((pm:any) => paymodeFeeTypeFilter(pm).map((t:any) => (
                                        <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                            <Text>{
                                                totalNumberGenerator(
                                                    pdfData.payments
                                                        ?.filter((p:any) => p.paymode === pm)
                                                        ?.map((p:any) => totalNumberGenerator(p.paid_heads
                                                                ?.filter((ph:any) => ph.type_name === t)
                                                                ?.map((ph:any) => totalNumberGenerator(ph?.amounts?.filter((a:any) => p.installments.includes(a.name)).map((a:any) => Number(a.paid_amount))))
                                                            )
                                                        )
                                                )
                                            }</Text>
                                        </View>
                                    )))}
                                    <Text style={{width:50, display:'flex', alignItems:'flex-start', justifyContent:'center', paddingVertical:2,  borderRightWidth:1, paddingLeft:5, borderRightColor:'#ccc'}}>{
                                        totalNumberGenerator(pdfData.payments.map((p:any) => Number(p.paid_amount)))
                                    }</Text>
                                </View>


                                {/* Cheque bounced amount */}
                                <View style={{display:'flex', flexDirection:'row', alignItems:'center', fontSize:14, backgroundColor:'#fff', marginLeft:5}}>
                                    <View style={{width:750, display:'flex', flexDirection:'row', gap:4}}>
                                        <Text>Cheque Bounced Amount</Text>
                                        <Text>From {moment(pdfData.date_from).format('DD-MMM-YYYY')}</Text>
                                        <Text>To {moment(pdfData.date_to).format('DD-MMM-YYYY')}</Text>
                                    </View>
                                    {pdfData.paymodes?.map((pm:any) => paymodeFeeTypeFilter(pm).map((t:any) => (
                                        <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc', color:'#fff'}}>
                                            <Text>-</Text>
                                        </View>
                                    )))}
                                    <Text style={{width:50, display:'flex', alignItems:'flex-start', justifyContent:'center', paddingVertical:2,  borderRightWidth:1, paddingLeft:5, borderRightColor:'#ccc'}}>{
                                        0
                                    }</Text>
                                </View>


                            </View>
                        )}


                        {/* Student wise preview */}
                        {pdfData.preview === 'Student Wise' && (
                            <View style={{width:'95%', display:'flex', flexDirection:'column', alignItems:'flex-start', marginHorizontal:5, marginLeft:20, fontSize:10, borderWidth:1, borderColor:'#ccc'}}>


                                {/* Headers */}
                                <View style={{display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:'#435680', borderBottomWidth:0.5, paddingLeft:5, borderBottomColor:'#ccc', color:'#fff'}}>
                                    <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                        <Text>ADM NO.</Text>
                                    </View>
                                    <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                        <Text>NAME</Text>
                                    </View>
                                    <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                        <Text>CLASS</Text>
                                    </View>
                                    <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                        <Text>INSTALLMENT</Text>
                                    </View>
                                    <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                        <Text>PAYMODE</Text>
                                    </View>
                                    {pdfData.show_remark && (
                                        <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                            <Text>Remark</Text>
                                        </View>
                                    )}
                                    <Text style={{width:50, display:'flex', alignItems:'flex-start', justifyContent:'center', paddingVertical:2,  borderRightWidth:1, paddingLeft:5, borderRightColor:'#ccc'}}>TOTAL</Text>
                                </View>



                                {/* Payments dates */}
                                {getDatesBetween(pdfData.date_from, pdfData.date_to)?.map((d:any) => (
                                    <View style={{display:'flex', flexDirection:'column', borderBottomWidth:1, borderBottomColor:'#ccc'}}>
                                        <View style={{
                                            display:'flex',
                                            flexDirection:'row',
                                            alignItems:'center',
                                            backgroundColor:'#F3F8FB'
                                        }}>
                                            <View style={{width:pdfData.show_remark ? 500 : 400, height:'100%', display:'flex', alignItems:'flex-start', justifyContent:'center', paddingVertical:4, paddingLeft:5, fontSize:14}}>
                                                <Text>Collection Statement: {moment(d).format('DD-MMM-YYYY')}</Text>
                                            </View>
                                        </View>


                                        {pdfData.payments.filter((p:any) => moment(p.received_date).format('DD-MMM-YYYY') === moment(d).format('DD-MMM-YYYY')).map((p:any) => (
                                            <View style={{display:'flex', flexDirection:'row'}}>
                                                <View style={{display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:'#fff', borderBottomWidth:0.5, paddingLeft:5, borderBottomColor:'#ccc', color:'#000'}}>
                                                    <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                        <Text>{p.adm_no}</Text>
                                                    </View>
                                                    <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                        <Text>{p.student}</Text>
                                                    </View>
                                                    <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                        <Text>{p.class_name}</Text>
                                                    </View>
                                                    <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                        <Text>{p.installments.map((i:any) => i + ' ')}</Text>
                                                    </View>
                                                    <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                        <Text>{p.paymode}</Text>
                                                    </View>
                                                    {pdfData.show_remark && (
                                                        <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                            <Text>{p.remarks}</Text>
                                                        </View>
                                                    )}
                                                    <Text style={{width:50, display:'flex', alignItems:'flex-start', justifyContent:'center', paddingVertical:2,  borderRightWidth:1, paddingLeft:5, borderRightColor:'#ccc'}}>{
                                                        totalNumberGenerator(p.paid_heads?.map((ph:any) => totalNumberGenerator(ph?.amounts?.filter((a:any) => p.installments.includes(a.name)).map((a:any) => Number(a.paid_amount))))) || '-'
                                                    }</Text>
                                                </View>
                                            </View>
                                        ))}


                                        <View style={{display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:'#fff', borderBottomWidth:0.5, paddingLeft:5, borderBottomColor:'#ccc', color:'#000'}}>
                                            <View style={{width:pdfData.show_remark ? 525 : 425, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, fontSize:14, borderRightColor:'#ccc'}}>
                                                <Text>Total fee on date: {moment(d).format('DD-MMM-YYYY')}</Text>
                                            </View>
                                            <Text style={{width:50, display:'flex', alignItems:'flex-start', justifyContent:'center', paddingVertical:2,  borderRightWidth:1, paddingLeft:5, borderRightColor:'#ccc'}}>{
                                                totalNumberGenerator(pdfData.payments.filter((p:any) => moment(p.received_date).format('DD-MMM-YYYY') === moment(d).format('DD-MMM-YYYY')).map((p:any) => Number(p.paid_amount)))
                                            }</Text>
                                        </View>
                                    </View>
                                ))}


                                {/* Total */}
                                <View style={{display:'flex', flexDirection:'row', alignItems:'center', color:'#fff', backgroundColor:'#435680'}}>
                                    <View style={{width:pdfData.show_remark ? 530 : 430, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, fontSize:14, borderRightColor:'#ccc'}}>
                                        <Text>Grand Total</Text>
                                    </View>
                                    <Text style={{width:50, display:'flex', alignItems:'flex-start', justifyContent:'center', paddingVertical:2,  borderRightWidth:1, paddingLeft:5, borderRightColor:'#ccc'}}>{
                                        totalNumberGenerator(pdfData.payments.map((p:any) => Number(p.paid_amount)))
                                    }</Text>
                                </View>


                                {/* Cheque bounced amount */}
                                <View style={{display:'flex', flexDirection:'row', alignItems:'center', fontSize:14, backgroundColor:'#fff', marginLeft:5}}>
                                    <View style={{width:pdfData.show_remark ? 525 : 425, display:'flex', flexDirection:'row', gap:4}}>
                                        <Text>Cheque Bounced Amount</Text>
                                        <Text>From {moment(pdfData.date_from).format('DD-MMM-YYYY')}</Text>
                                        <Text>To {moment(pdfData.date_to).format('DD-MMM-YYYY')}</Text>
                                    </View>
                                    <Text style={{width:50, display:'flex', alignItems:'flex-start', justifyContent:'center', paddingVertical:2,  borderRightWidth:1, paddingLeft:5, borderRightColor:'#ccc'}}>{
                                        0
                                    }</Text>
                                </View>


                            </View>
                        )}


                        {/* Head wise preview */}
                        {pdfData.preview === 'Head Wise' && (
                            <View style={{width:'95%', display:'flex', flexDirection:'column', alignItems:'flex-start', marginHorizontal:5, marginLeft:20, fontSize:10, borderWidth:0.75, borderColor:'#ccc'}}>


                                {/* Headers */}
                                <View style={{display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:'#435680', borderBottomWidth:0.5, paddingLeft:5, borderBottomColor:'#ccc', color:'#fff'}}>
                                    <View style={{width:50, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                        <Text>SN</Text>
                                    </View>
                                    <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                        <Text>REC. NO.</Text>
                                    </View>
                                    <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                        <Text>ADM NO.</Text>
                                    </View>
                                    <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                        <Text>NAME</Text>
                                    </View>
                                    <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                        <Text>CLASS</Text>
                                    </View>
                                    <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                        <Text>INSTALLMENT</Text>
                                    </View>
                                    {pdfData.show_remark && (
                                        <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                            <Text>Remark</Text>
                                        </View>
                                    )}
                                    {affectedHeads.map((h:any) => (
                                        <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                            <Text>{h}</Text>
                                        </View>
                                    ))}
                                    {pdfData.paymodes.map((p:any) => (
                                        <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                            <Text>{p}</Text>
                                        </View>
                                    ))}
                                    <Text style={{width:50, display:'flex', alignItems:'flex-start', justifyContent:'center', paddingVertical:2,  borderRightWidth:1, paddingLeft:5, borderRightColor:'#ccc'}}>TOTAL</Text>
                                </View>


                                {/* Payments dates */}
                                {getDatesBetween(pdfData.date_from, pdfData.date_to)?.map((d:any) => (
                                    <View style={{display:'flex', flexDirection:'column', borderBottomWidth:1, borderBottomColor:'#ccc'}}>
                                        <View style={{
                                            display:'flex',
                                            flexDirection:'row',
                                            alignItems:'center',
                                            backgroundColor:'#F3F8FB'
                                        }}>
                                            <View style={{width:pdfData.show_remark ? 580 : 480, height:'100%', display:'flex', alignItems:'flex-start', justifyContent:'center', paddingVertical:4, paddingLeft:5, fontSize:14}}>
                                                <Text>Collection Statement: {moment(d).format('DD-MMM-YYYY')}</Text>
                                            </View>
                                        </View>


                                        {pdfData.payments.filter((p:any) => moment(p.received_date).format('DD-MMM-YYYY') === moment(d).format('DD-MMM-YYYY')).map((p:any) => (
                                            <View style={{display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:'#fff', borderBottomWidth:0.5, paddingLeft:5, borderBottomColor:'#ccc', color:'#000'}}>
                                                <View style={{width:50, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                    <Text>{pdfData.payments.filter((p:any) => moment(p.received_date).format('DD-MMM-YYYY') === moment(d).format('DD-MMM-YYYY')).indexOf(p) + 1}</Text>
                                                </View>
                                                <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                    <Text>{p.receipt_no}</Text>
                                                </View>
                                                <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                    <Text>{p.adm_no}</Text>
                                                </View>
                                                <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                    <Text>{p.student}</Text>
                                                </View>
                                                <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                    <Text>{p.class_name}</Text>
                                                </View>
                                                <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                    <Text>{p.installments.map((i:any) => i + ' ')}</Text>
                                                </View>
                                                {pdfData.show_remark && (
                                                    <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                        <Text>{p.remarks}</Text>
                                                    </View>
                                                )}
                                                {affectedHeads.map((h:any) => (
                                                    <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                        <Text>{
                                                            totalNumberGenerator(p.paid_heads.filter((ph:any) => ph.head_name === h).map((ph:any) => totalNumberGenerator(ph.amounts?.filter((a:any) => p.installments?.includes(a.name))?.map((a:any) => Number(a.paid_amount))))) || '-'
                                                        }</Text>
                                                    </View>
                                                ))}
                                                {pdfData.paymodes.map((pm:any) => (
                                                    <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                        <Text>{
                                                            p.paymode === pm ? p.paid_amount : 0
                                                        }</Text>
                                                    </View>
                                                ))}
                                                <Text style={{width:50, display:'flex', alignItems:'flex-start', justifyContent:'center', paddingVertical:2,  borderRightWidth:1, paddingLeft:5, borderRightColor:'#ccc'}}>{
                                                    totalNumberGenerator(p.paid_heads?.map((ph:any) => totalNumberGenerator(ph?.amounts?.filter((a:any) => p.installments.includes(a.name)).map((a:any) => Number(a.paid_amount))))) || '-'
                                                }</Text>
                                            </View>
                                        ))}


                                        <View style={{display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:'#fff', borderBottomWidth:0.5, paddingLeft:5, borderBottomColor:'#ccc', color:'#000'}}>
                                            <View style={{width:pdfData.show_remark ? 575 : 475, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, fontSize:14, borderRightColor:'#ccc'}}>
                                                <Text>Total fee on date: {moment(d).format('DD-MMM-YYYY')}</Text>
                                            </View>
                                            {affectedHeads.map((h:any) => (
                                                <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                    <Text>{
                                                        totalNumberGenerator(
                                                            pdfData.payments
                                                                ?.filter((p:any) => moment(p.received_date).format('DD-MMM-YYYY') === moment(d).format('DD-MMM-YYYY'))
                                                                ?.map((p:any) => totalNumberGenerator(p.paid_heads
                                                                        ?.filter((ph:any) => ph.head_name === h)
                                                                        ?.map((ph:any) => totalNumberGenerator(ph?.amounts?.filter((a:any) => p.installments.includes(a.name)).map((a:any) => Number(a.paid_amount))))
                                                                    )
                                                                )
                                                            )
                                                    }</Text>
                                                </View>
                                            ))}
                                            {pdfData.paymodes.map((pm:any) => (
                                                <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                    <Text>{
                                                        totalNumberGenerator(
                                                            pdfData.payments
                                                                ?.filter((p:any) => moment(p.received_date).format('DD-MMM-YYYY') === moment(d).format('DD-MMM-YYYY') && p.paymode === pm)
                                                                ?.map((p:any) => totalNumberGenerator(p.paid_heads
                                                                        ?.map((ph:any) => totalNumberGenerator(ph?.amounts?.filter((a:any) => p.installments.includes(a.name)).map((a:any) => Number(a.paid_amount))))
                                                                    )
                                                                )
                                                            )
                                                    }</Text>
                                                </View>
                                            ))}
                                            <Text style={{width:50, display:'flex', alignItems:'flex-start', justifyContent:'center', paddingVertical:2,  borderRightWidth:1, paddingLeft:5, borderRightColor:'#ccc'}}>{
                                                totalNumberGenerator(pdfData.payments.filter((p:any) => moment(p.received_date).format('DD-MMM-YYYY') === moment(d).format('DD-MMM-YYYY')).map((p:any) => Number(p.paid_amount)))
                                            }</Text>
                                        </View>
                                    </View>
                                ))}


                                {/* Total */}
                                <View style={{display:'flex', flexDirection:'row', alignItems:'center', color:'#fff', backgroundColor:'#435680'}}>
                                    <View style={{width:pdfData.show_remark ? 580 : 480, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, fontSize:14, borderRightColor:'#ccc'}}>
                                        <Text>Grand Total</Text>
                                    </View>
                                    {affectedHeads.map((h:any) => (
                                        <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                            <Text>{
                                                totalNumberGenerator(pdfData.payments?.map((p:any) => totalNumberGenerator(p.paid_heads.filter((ph:any) => ph.head_name === h).map((h:any) => totalNumberGenerator(h.amounts?.filter((a:any) => p.installments.includes(a.name)).map((a:any) => Number(a.paid_amount))))))) || '-'
                                            }</Text>
                                        </View>
                                    ))}
                                    {pdfData.paymodes.map((pm:any) => (
                                        <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                            <Text>{
                                                totalNumberGenerator(pdfData.payments?.filter((p:any) => p.paymode === pm)?.map((p:any) => totalNumberGenerator(p.paid_heads.map((h:any) => totalNumberGenerator(h.amounts?.filter((a:any) => p.installments.includes(a.name)).map((a:any) => Number(a.paid_amount))))))) || '-'
                                            }</Text>
                                        </View>
                                    ))}
                                    <Text style={{width:50, display:'flex', alignItems:'flex-start', justifyContent:'center', paddingVertical:2,  borderRightWidth:1, paddingLeft:5, borderRightColor:'#ccc'}}>{
                                        totalNumberGenerator(pdfData.payments.map((p:any) => Number(p.paid_amount)))
                                    }</Text>
                                </View>


                                {/* Cheque bounced amount */}
                                <View style={{display:'flex', flexDirection:'row', alignItems:'center', fontSize:14, backgroundColor:'#fff', marginLeft:5}}>
                                    <View style={{width:pdfData.show_remark ? 575 : 475, display:'flex', flexDirection:'row', gap:4}}>
                                        <Text>Cheque Bounced Amount</Text>
                                        <Text>From {moment(pdfData.date_from).format('DD-MMM-YYYY')}</Text>
                                        <Text>To {moment(pdfData.date_to).format('DD-MMM-YYYY')}</Text>
                                    </View>
                                    {pdfData.paymodes?.map((pm:any) => paymodeFeeTypeFilter(pm).map((t:any) => (
                                        <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc', color:'#fff'}}>
                                            <Text>-</Text>
                                        </View>
                                    )))}
                                    <Text style={{width:50, display:'flex', alignItems:'flex-start', justifyContent:'center', paddingVertical:2,  borderRightWidth:1, paddingLeft:5, borderRightColor:'#ccc'}}>{
                                        0
                                    }</Text>
                                </View>


                            </View>
                        )}


                        {/* Date wise preview */}
                        {pdfData.preview === 'Date Wise' && (
                            <View style={{width:'95%', display:'flex', flexDirection:'column', alignItems:'flex-start', marginHorizontal:5, marginLeft:20, fontSize:10, borderWidth:0.75, borderColor:'#ccc'}}>

                                {/* Headers */}
                                <View style={{display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:'#435680', borderBottomWidth:0.5, paddingLeft:5, borderBottomColor:'#ccc', color:'#fff'}}>
                                    <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                        <Text>REC. DATE</Text>
                                    </View>
                                    <View style={{width:50, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                        <Text>Slip(s)</Text>
                                    </View>
                                    {affectedHeads.map((h:any) => (
                                        <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                            <Text>{h}</Text>
                                        </View>
                                    ))}
                                    {pdfData.paymodes.map((p:any) => (
                                        <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                            <Text>{p}</Text>
                                        </View>
                                    ))}
                                    <Text style={{width:50, display:'flex', alignItems:'flex-start', justifyContent:'center', paddingVertical:2,  borderRightWidth:1, paddingLeft:5, borderRightColor:'#ccc'}}>TOTAL</Text>
                                </View>


                                {/* Payments Dates */}
                                {getDatesBetween(pdfData.date_from, pdfData.date_to)?.map((d:any) => (
                                    <View style={{display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:'#fff', borderBottomWidth:0.5, paddingLeft:5, borderBottomColor:'#ccc', color:'#000'}}>
                                        <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                            <Text>{moment(d).format('DD-MMM-YYYY')}</Text>
                                        </View>
                                        <View style={{width:50, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                            <Text>{0}</Text>
                                        </View>
                                        {affectedHeads.map((h:any) => (
                                            <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                <Text>{
                                                    totalNumberGenerator(pdfData.payments
                                                        ?.filter((p:any) => moment(p.received_date).format('DD-MMM-YYYY') === moment(d).format('DD-MMM-YYYY'))
                                                        ?.map((p:any) => totalNumberGenerator(p.paid_heads
                                                            ?.filter((ph:any) => ph.head_name === h)
                                                            ?.map((ph:any) => totalNumberGenerator(ph.amounts
                                                                ?.filter((a:any) => p.installments.includes(a.name))
                                                                ?.map((a:any) => Number(a.paid_amount))
                                                            ))    
                                                        ))
                                                    )
                                                }</Text>
                                            </View>
                                        ))}
                                        {pdfData.paymodes.map((pm:any) => (
                                            <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                <Text>{
                                                    totalNumberGenerator(pdfData.payments
                                                        ?.filter((p:any) => moment(p.received_date).format('DD-MMM-YYYY') === moment(d).format('DD-MMM-YYYY') && p.paymode === pm)
                                                        ?.map((p:any) => totalNumberGenerator(p.paid_heads
                                                            ?.map((ph:any) => totalNumberGenerator(ph.amounts
                                                                ?.filter((a:any) => p.installments.includes(a.name))
                                                                ?.map((a:any) => Number(a.paid_amount))
                                                            ))    
                                                        ))
                                                    )
                                                }</Text>
                                            </View>
                                        ))}
                                        <Text style={{width:50, display:'flex', alignItems:'flex-start', justifyContent:'center', paddingVertical:2,  borderRightWidth:1, paddingLeft:5, borderRightColor:'#ccc'}}>{
                                            totalNumberGenerator(pdfData.payments?.filter((p:any) => moment(p.received_date).format('DD-MMM-YYYY') === moment(d).format('DD-MMM-YYYY')).map((p:any) => Number(p.paid_amount)))
                                        }</Text>
                                    </View>
                                ))}


                                {/* Grand Total */}
                                <View style={{display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:'#435680', borderBottomWidth:0.5, paddingLeft:5, borderBottomColor:'#ccc', color:'#fff'}}>
                                    <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                        <Text>Grand Total</Text>
                                    </View>
                                    <View style={{width:50, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                        <Text>0</Text>
                                    </View>
                                    {affectedHeads.map((h:any) => (
                                        <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                            <Text>{
                                                totalNumberGenerator(pdfData.payments
                                                    ?.map((p:any) => totalNumberGenerator(p.paid_heads
                                                        ?.filter((ph:any) => ph.head_name === h)
                                                        ?.map((ph:any) => totalNumberGenerator(ph.amounts
                                                            ?.filter((a:any) => p.installments.includes(a.name))
                                                            ?.map((a:any) => Number(a.paid_amount))
                                                        ))    
                                                    ))
                                                )
                                            }</Text>
                                        </View>
                                    ))}
                                    {pdfData.paymodes.map((pm:any) => (
                                        <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                            <Text>{
                                                totalNumberGenerator(pdfData.payments
                                                    ?.filter((p:any) => p.paymode === pm)
                                                    ?.map((p:any) => totalNumberGenerator(p.paid_heads
                                                        ?.map((ph:any) => totalNumberGenerator(ph.amounts
                                                            ?.filter((a:any) => p.installments.includes(a.name))
                                                            ?.map((a:any) => Number(a.paid_amount))
                                                        ))    
                                                    ))
                                                )
                                            }</Text>
                                        </View>
                                    ))}
                                    <Text style={{width:50, display:'flex', alignItems:'flex-start', justifyContent:'center', paddingVertical:2,  borderRightWidth:1, paddingLeft:5, borderRightColor:'#ccc'}}>
                                        {
                                            totalNumberGenerator(pdfData.payments
                                                ?.map((p:any) => p.paid_amount)
                                            )
                                        }
                                    </Text>
                                </View>

                            </View>
                        )}

                    </>
                ) : (
                    <Text style={{fontSize:20, color:'#435680', marginLeft:20}}>No record found!</Text>
                )}










                {/* Footer */}
                <View style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between', fontSize:11, paddingHorizontal:10, marginHorizontal:5, paddingVertical:5, marginVertical:5, borderTopWidth:1, borderTopColor:'#ccc'}}>
                    <Text>Academic Year: {activeAcademicYear}</Text>
                    <Text>Daily Fee Collection printed on {moment(new Date()).format('DD-MMM-YYYY')} at {moment(new Date()).format('hh:mm A')}</Text>
                    <Text>Page 1 of 1</Text>
                </View>
            </Page>
        </Document>
    );
};





// Pdf view
const PDFView = ({pdfData}:any) => {
    return(
    <PDFViewer className='h-full w-[100%] mt-4 border-[0.5px] border-[#ccc]'>
        <PDF
            pdfData={pdfData}
        />
    </PDFViewer>
    );
};





// Export
export default PDFView;