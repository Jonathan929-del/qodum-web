'use client';
// Imports
import moment from 'moment';
import {useEffect, useState} from 'react';
import {Document, Page, View, Text, PDFViewer, StyleSheet, Font, Image} from '@react-pdf/renderer';
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


    // Payments heads
    const paymentsHeadsNames = pdfData.payments?.map((p:any) => p.paid_heads?.map((h:any) => h.head_name)).flat();
    const uniquePaymentsHeadsNames = paymentsHeadsNames?.filter((value:any, index:any, self:any) => self.indexOf(value) === index);


    // Total number generator
    const totalNumberGenerator = (array:any) => {
        let sum = 0;
        for (let i = 0; i < array?.length; i++ ) {sum += array[i];};
        return sum;
    };


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
        };
        fetcher();
    }, []);


    return(
        <Document>
            <Page style={{width:'100%', display:'flex', flexDirection:'column', gap:2}} orientation='portrait'>

                {/* School data */}
                <View style={{display:'flex', flexDirection:'row', width:'100%', alignItems:'center', justifyContent:'space-between', paddingVertical:10, paddingHorizontal:50, borderBottomWidth:0.5, borderBottomColor:'#ccc'}}>
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
                    <Text>Daily Fee Collection</Text>
                    <Text>From {moment(pdfData.date_from).format('DD-MMM-YYYY')}</Text>
                    <Text>To {moment(pdfData.date_to).format('DD-MMM-YYYY')}</Text>
                    <Text>Entry Mode: {pdfData.entry_modes?.map((e:any) => e + ' ')}</Text>
                </View>

                {/* Payments */}
                <View style={{width:'95%', display:'flex', flexDirection:'column', alignItems:'flex-start', marginHorizontal:5, fontSize:10, borderWidth:0.75, borderColor:'#ccc'}}>
                    {/* Headers */}
                    {pdfData.payments?.length > 0 && (
                        <View style={{display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:'#435680', borderBottomWidth:0.5, paddingLeft:5, borderBottomColor:'#ccc', color:'#fff',}}>
                            <View style={{width:50, height:'100%', display:'flex', alignItems:'flex-start', justifyContent:'center', paddingVertical:2, borderRightWidth:0.5, borderRightColor:'#ccc'}}>
                                <Text>SN</Text>
                            </View>
                            {pdfData.show_collection === 'With Head (One line data)' && (
                                <>
                                    <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:0.5, borderRightColor:'#ccc'}}>
                                        <Text>RCPT. NO.</Text>
                                    </View>
                                    <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:0.5, borderRightColor:'#ccc'}}>
                                        <Text>RCPT. DATE.</Text>
                                    </View>
                                    <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:0.5, borderRightColor:'#ccc'}}>
                                        <Text>ADM. NO.</Text>
                                    </View>
                                    <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:0.5, borderRightColor:'#ccc'}}>
                                        <Text>NAME</Text>
                                    </View>
                                    <View style={{width:50, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:0.5, borderRightColor:'#ccc'}}>
                                        <Text>CLASS</Text>
                                    </View>
                                    <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:0.5, borderRightColor:'#ccc'}}>
                                        <Text>INSTALLMENT</Text>
                                    </View>
                                </>                            
                            )}
                            {pdfData.show_collection === 'Without Head (One line data)' && (
                                <>
                                    <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:0.5, borderRightColor:'#ccc'}}>
                                        <Text>RCPT. NO.</Text>
                                    </View>
                                    <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:0.5, borderRightColor:'#ccc'}}>
                                        <Text>RCPT. DATE.</Text>
                                    </View>
                                    <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:0.5, borderRightColor:'#ccc'}}>
                                        <Text>ADM. NO.</Text>
                                    </View>
                                    <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:0.5, borderRightColor:'#ccc'}}>
                                        <Text>NAME</Text>
                                    </View>
                                    <View style={{width:80, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:0.5, borderRightColor:'#ccc'}}>
                                        <Text>CLASS</Text>
                                    </View>
                                </>                            
                            )}
                            {pdfData.show_collection === 'Head Wise' && (
                                <>
                                    <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:0.5, borderRightColor:'#ccc'}}>
                                        <Text>RCPT. NO.</Text>
                                        <Text>RCPT. DATE</Text>
                                        <Text>STATUS</Text>
                                    </View>
                                    <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:0.5, borderRightColor:'#ccc'}}>
                                        <Text>ADM. NO.</Text>
                                        <Text>NAME</Text>
                                        <Text>CLASS</Text>
                                    </View>
                                    <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:0.5, borderRightColor:'#ccc'}}>
                                        <Text>YEAR</Text>
                                        <Text>INSTALLMENT</Text>
                                        <Text>USER</Text>
                                    </View>
                                </>
                            )}
                            {pdfData.show_collection === 'Without Head (Total Amount)' && (
                                <>
                                    <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:0.5, borderRightColor:'#ccc'}}>
                                        <Text>RCPT. NO.</Text>
                                        <Text>RCPT. DATE</Text>
                                        <Text>STATUS</Text>
                                    </View>
                                    <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:0.5, borderRightColor:'#ccc'}}>
                                        <Text>ADM. NO.</Text>
                                        <Text>NAME</Text>
                                        <Text>CLASS</Text>
                                    </View>
                                    <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:0.5, borderRightColor:'#ccc'}}>
                                        <Text>YEAR</Text>
                                        <Text>INSTALLMENT</Text>
                                        <Text>USER</Text>
                                    </View>
                                </>
                            )}
                            {pdfData.show_collection === 'Head Wise' && uniquePaymentsHeadsNames?.map((h:any) => (
                                <View style={{width:75, height:'100%', display:'flex', alignItems:'flex-start', justifyContent:'center', paddingVertical:2, paddingLeft:2, borderRightWidth:0.5, borderRightColor:'#ccc'}}>
                                    <Text>{h}</Text>
                                </View>
                            ))}
                            {pdfData.show_collection === 'With Head (One line data)' && uniquePaymentsHeadsNames?.map((h:any) => (
                                <View style={{width:75, height:'100%', display:'flex', alignItems:'flex-start', justifyContent:'center', paddingVertical:2, paddingLeft:2, borderRightWidth:0.5, borderRightColor:'#ccc'}}>
                                    <Text>{h}</Text>
                                </View>
                            ))}
                            <Text style={{width:50, display:'flex', alignItems:'flex-start', justifyContent:'center', paddingVertical:2,  borderRightWidth:0.5, paddingLeft:5, borderRightColor:'#ccc'}}>TOTAL</Text>
                        </View>
                    )}





                    {/* Values */}
                    {pdfData.payments?.length === 0 ? (
                        <Text style={{fontSize:20, color:'#435680', marginLeft:20}}>No record found!</Text>
                    ) : pdfData.payments?.map((p:any) => (
                        <View style={{
                            display:'flex',
                            flexDirection:'row',
                            alignItems:'center',
                            borderBottomWidth:0.5,
                            borderBottomColor:'#ccc',
                            backgroundColor:Math.floor((pdfData.payments?.indexOf(p) + 1) / 2) * 2 !== pdfData.payments?.indexOf(p) + 1 ? '#fff' : '#F3F8FB'
                        }}>
                            <View style={{width:55, height:'100%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:0.5, borderRightColor:'#ccc'}}>
                                <Text>{pdfData.payments.indexOf(p) + 1}</Text>
                            </View>
                            {pdfData.show_collection === 'With Head (One line data)' && (
                                <>
                                    <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:0.5, borderRightColor:'#ccc'}}>
                                        <Text>{p.receipt_no}</Text>
                                    </View>
                                    <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:0.5, borderRightColor:'#ccc'}}>
                                        <Text>{moment(p.received_date).format('DD-MMM-YYYY')}</Text>
                                    </View>
                                    <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:0.5, borderRightColor:'#ccc'}}>
                                        <Text>{p.adm_no}</Text>
                                    </View>
                                    <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:0.5, borderRightColor:'#ccc'}}>
                                        <Text>{p.student}</Text>
                                    </View>
                                    <View style={{width:50, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:0.5, borderRightColor:'#ccc'}}>
                                        <Text>{p.class_name}</Text>
                                    </View>
                                    <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:0.5, borderRightColor:'#ccc'}}>
                                        <Text>{p.installments.map((i:any) => i + ' ')}</Text>
                                    </View>
                                </>                            
                            )}
                            {pdfData.show_collection === 'Without Head (One line data)' && (
                                <>
                                    <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:0.5, borderRightColor:'#ccc'}}>
                                        <Text>{p.receipt_no}</Text>
                                    </View>
                                    <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:0.5, borderRightColor:'#ccc'}}>
                                        <Text>{moment(p.received_date).format('DD-MMM-YYYY')}</Text>
                                    </View>
                                    <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:0.5, borderRightColor:'#ccc'}}>
                                        <Text>{p.adm_no}</Text>
                                    </View>
                                    <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:0.5, borderRightColor:'#ccc'}}>
                                        <Text>{p.student}</Text>
                                    </View>
                                    <View style={{width:80, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:0.5, borderRightColor:'#ccc'}}>
                                        <Text>{p.class_name}</Text>
                                    </View>
                                </>                            
                            )}
                            {pdfData.show_collection === 'Head Wise' && (
                                <>
                                    <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:0.5, borderRightColor:'#ccc'}}>
                                        <Text>{p.receipt_no}</Text>
                                        <Text>{moment(p.received_date).format('DD-MMM-YYYY')}</Text>
                                        <Text>Ok</Text>
                                    </View>
                                    <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:0.5, borderRightColor:'#ccc'}}>
                                        <Text>{p.adm_no}</Text>
                                        <Text>{p.student}</Text>
                                        <Text>{p.class_name}</Text>
                                    </View>
                                    <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:0.5, borderRightColor:'#ccc'}}>
                                        <Text>{p.session || '-'}</Text>
                                        <Text>{p.installments.map((i:any) => i + ' ')}</Text>
                                        <Text>USER</Text>
                                    </View>
                                </>
                            )}
                            {pdfData.show_collection === 'Without Head (Total Amount)' && (
                                <>
                                    <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:0.5, borderRightColor:'#ccc'}}>
                                        <Text>{p.receipt_no}</Text>
                                        <Text>{moment(p.received_date).format('DD-MMM-YYYY')}</Text>
                                        <Text>Ok</Text>
                                    </View>
                                    <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:0.5, borderRightColor:'#ccc'}}>
                                        <Text>{p.adm_no}</Text>
                                        <Text>{p.student}</Text>
                                        <Text>{p.class_name}</Text>
                                    </View>
                                    <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:0.5, borderRightColor:'#ccc'}}>
                                        <Text>{p.session || '-'}</Text>
                                        <Text>{p.installments.map((i:any) => i + ' ')}</Text>
                                        <Text>USER</Text>
                                    </View>
                                </>
                            )}
                            {pdfData.show_collection === 'Head Wise' && uniquePaymentsHeadsNames?.map((h:any) => (
                                <View style={{width:75, height:'100%', display:'flex', alignItems:'flex-start', justifyContent:'center', paddingVertical:2, paddingLeft:2, borderRightWidth:0.5, borderRightColor:'#ccc'}}>
                                    <Text>{totalNumberGenerator(p.paid_heads?.filter((ph:any) => ph.head_name === h)[0]?.amounts?.filter((a:any) => p.installments.includes(a.name))?.map((a:any) => a.paid_amount === a.value ? 0 : Number(a.paid_amount)))}</Text>
                                </View>
                            ))}
                            {pdfData.show_collection === 'With Head (One line data)' && uniquePaymentsHeadsNames?.map((h:any) => (
                                <View style={{width:75, height:'100%', display:'flex', alignItems:'flex-start', justifyContent:'center', paddingVertical:2, paddingLeft:2, borderRightWidth:0.5, borderRightColor:'#ccc'}}>
                                    <Text>{totalNumberGenerator(p.paid_heads?.filter((ph:any) => ph.head_name === h)[0]?.amounts?.filter((a:any) => p.installments.includes(a.name))?.map((a:any) => a.paid_amount === a.value ? 0 : Number(a.paid_amount)))}</Text>
                                </View>
                            ))}
                            <View style={{width:50, height:'100%', display:'flex', alignItems:'flex-start', justifyContent:'center', paddingVertical:2, paddingLeft:2, borderRightWidth:0.5, borderRightColor:'#ccc'}}>
                                <Text>{p.paid_amount}</Text>
                            </View>
                        </View>
                    ))}

                    {/* Total */}
                    {pdfData.payments?.length > 0 && (
                        <View style={{
                            display:'flex',
                            flexDirection:'row',
                            alignItems:'center',
                            color:'#fff',
                            backgroundColor:'#435680'
                        }}>
                            <View style={{width:55, height:'100%', display:'flex', alignItems:'flex-start', justifyContent:'center', paddingVertical:2, borderRightWidth:0.5, borderRightColor:'#ccc', color:'#435680'}}>
                                <Text>-</Text>
                            </View>
                            {pdfData.show_collection === 'With Head (One line data)' && (
                                <>
                                    <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:0.5, borderRightColor:'#ccc', color:'#435680'}}>
                                        <Text>-</Text>
                                    </View>
                                    <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:0.5, borderRightColor:'#ccc', color:'#435680'}}>
                                        <Text>-</Text>
                                    </View>
                                    <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:0.5, borderRightColor:'#ccc', color:'#435680'}}>
                                        <Text>-</Text>
                                    </View>
                                    <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:0.5, borderRightColor:'#ccc', color:'#435680'}}>
                                        <Text>-</Text>
                                    </View>
                                    <View style={{width:50, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:0.5, borderRightColor:'#ccc', color:'#435680'}}>
                                        <Text>-</Text>
                                    </View>
                                    <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:0.5, borderRightColor:'#ccc'}}>
                                        <Text>Grand Total</Text>
                                    </View>
                                </>                            
                            )}
                            {pdfData.show_collection === 'Without Head (One line data)' && (
                                <>
                                    <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:0.5, borderRightColor:'#ccc', color:'#435680'}}>
                                        <Text>-</Text>
                                    </View>
                                    <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:0.5, borderRightColor:'#ccc', color:'#435680'}}>
                                        <Text>-</Text>
                                    </View>
                                    <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:0.5, borderRightColor:'#ccc', color:'#435680'}}>
                                        <Text>-</Text>
                                    </View>
                                    <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:0.5, borderRightColor:'#ccc', color:'#435680'}}>
                                        <Text>-</Text>
                                    </View>
                                    <View style={{width:80, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:0.5, borderRightColor:'#ccc'}}>
                                        <Text>Grand total</Text>
                                    </View>
                                </>                            
                            )}
                            {pdfData.show_collection === 'Head Wise' && (
                                <>
                                    <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:0.5, borderRightColor:'#ccc', color:'#435680'}}>
                                        <Text>-</Text>
                                    </View>
                                    <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:0.5, borderRightColor:'#ccc', color:'#435680'}}>
                                        <Text>-</Text>
                                    </View>
                                    <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:0.5, borderRightColor:'#ccc'}}>
                                        <Text>Grand Total</Text>
                                    </View>
                                </>
                            )}
                            {pdfData.show_collection === 'Without Head (Total Amount)' && (
                                <>
                                    <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:0.5, borderRightColor:'#ccc', color:'#435680'}}>
                                        <Text>-</Text>
                                    </View>
                                    <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:0.5, borderRightColor:'#ccc', color:'#435680'}}>
                                        <Text>-</Text>
                                    </View>
                                    <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:0.5, borderRightColor:'#ccc'}}>
                                        <Text>Grand Total</Text>
                                    </View>
                                </>
                            )}
                            {pdfData.show_collection === 'Head Wise' && uniquePaymentsHeadsNames?.map((h:any) => (
                                <View style={{width:75, height:'100%', display:'flex', alignItems:'flex-start', justifyContent:'center', paddingVertical:2, paddingLeft:2, borderRightWidth:0.5, borderRightColor:'#ccc'}}>
                                    <Text>
                                        {totalNumberGenerator(pdfData.payments.map((p:any) => totalNumberGenerator(p.paid_heads?.filter((ph:any) => ph.head_name === h)[0]?.amounts?.filter((a:any) => p.installments.includes(a.name))?.map((a:any) => a.paid_amount === a.value ? 0 : Number(a.paid_amount)))))}
                                    </Text>
                                </View>
                            ))}
                            {pdfData.show_collection === 'With Head (One line data)' && uniquePaymentsHeadsNames?.map((h:any) => (
                                <View style={{width:75, height:'100%', display:'flex', alignItems:'flex-start', justifyContent:'center', paddingVertical:2, paddingLeft:2, borderRightWidth:0.5, borderRightColor:'#ccc'}}>
                                    <Text>
                                        {totalNumberGenerator(pdfData.payments.map((p:any) => totalNumberGenerator(p.paid_heads?.filter((ph:any) => ph.head_name === h)[0]?.amounts?.filter((a:any) => p.installments.includes(a.name))?.map((a:any) => a.paid_amount === a.value ? 0 : Number(a.paid_amount)))))}
                                    </Text>
                                </View>
                            ))}
                            <Text style={{width:50, display:'flex', alignItems:'flex-start', justifyContent:'center', paddingVertical:2, paddingLeft:5}}>{totalNumberGenerator(pdfData.payments.map((p:any) => p.paid_amount))}</Text>
                        </View>
                    )}
                </View>

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
    <PDFViewer className='h-full w-[90%] mt-4 border-[0.5px] border-[#ccc]'>
        <PDF
            pdfData={pdfData}
        />
    </PDFViewer>
    );
};





// Export
export default PDFView;