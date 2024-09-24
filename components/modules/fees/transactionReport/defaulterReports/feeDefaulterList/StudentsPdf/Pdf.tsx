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


    // Affected heads
    const affectedHeads = pdfData.students?.map((s:any) => s.affiliated_heads.heads.map((h:any) => h.head_name)).flat()?.filter((value:any, index:any, self:any) => self.indexOf(value) === index).filter((h:any) => pdfData.heads.map((head:any) => head.name).includes(h));


    // Classes
    const classes = pdfData.students?.map((s:any) => s.student.class)?.filter((value:any, index:any, self:any) => self.indexOf(value) === index);


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
            {/* <Page style={{width:'100%', display:'flex', flexDirection:'column', gap:2, margin:0}} size={{width:1900, height:1900}} orientation='landscape'> */}
            <Page style={{width:'100%', display:'flex', flexDirection:'column', gap:2, margin:0}} size={{width:700, height:800}} orientation='portrait'>

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
                    <Text>FEES DEFAULTER LIST</Text>
                    <Text>{pdfData.is_date_range ? 'From' : 'As on'} {moment(pdfData.from_date).format('DD-MMM-YYYY')}</Text>
                    {pdfData.is_date_range && (
                        <Text>To {moment(pdfData.till_date).format('DD-MMM-YYYY')}</Text>
                    )}
                </View>









                {pdfData.students?.length > 0 ? (
                    <View style={{width:'95%', display:'flex', flexDirection:'column', alignItems:'flex-start', marginHorizontal:5, marginLeft:20, fontSize:10, borderWidth:0.75, borderColor:'#ccc'}}>
                        {/* Headers */}
                        <View style={{display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:'#435680', borderBottomWidth:0.5, paddingLeft:5, borderBottomColor:'#ccc', color:'#fff'}}>
                            <View style={{width:30, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                <Text>SN</Text>
                            </View>
                            <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                <Text>NAME</Text>
                            </View>
                            <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                <Text>ADM NO.</Text>
                            </View>
                            <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                <Text>FATHER NAME</Text>
                            </View>
                            {pdfData.with_heads ? affectedHeads.map((h:any) => (
                                <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                    <Text>{h}</Text>
                                </View>
                            )) : pdfData.fee_type === 'All fee types' ? pdfData.fee_types.map((t:any) => (
                                    <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                        <Text>{t.name}</Text>
                                    </View>
                                )
                            ) : (
                                <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                    <Text>{pdfData.fee_type}</Text>
                                </View>
                            )}
                            <Text style={{width:50, display:'flex', alignItems:'flex-start', justifyContent:'center', paddingVertical:2,  borderRightWidth:1, paddingLeft:5, borderRightColor:'#ccc'}}>TOTAL</Text>
                        </View>


                        {/* Classes */}
                        {classes?.map((c:any) => (
                            <View style={{display:'flex', flexDirection:'column', borderBottomWidth:1, borderBottomColor:'#ccc'}}>
                                <View style={{
                                    display:'flex',
                                    flexDirection:'row',
                                    alignItems:'center',
                                    backgroundColor:'#F3F8FB'
                                }}>
                                    <View style={{width:355 + pdfData.with_heads ? affectedHeads.length*100 : pdfData.fee_type === 'All fee types' ? pdfData.fee_types.length*100 : 100, height:'100%', display:'flex', alignItems:'flex-start', justifyContent:'center', paddingVertical:4, paddingLeft:5, fontSize:14}}>
                                        <Text>Class: {c}</Text>
                                    </View>
                                </View>


                                {/* Students */}
                                {pdfData.students.filter((s:any) => s.student.class === c).map((s:any) => (
                                    <View style={{display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:'#fff', borderBottomWidth:0.5, paddingLeft:5, borderBottomColor:'#ccc', color:'#000'}}>
                                        <View style={{width:30, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                            <Text>{pdfData.students.filter((student:any) => student.student.class === c).indexOf(s) + 1}</Text>
                                        </View>
                                        <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                            <Text>{s.student.name}</Text>
                                        </View>
                                        <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                            <Text>{s.student.adm_no}</Text>
                                        </View>
                                        <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                            <Text>{s.parents.father.father_name}</Text>
                                        </View>
                                        {pdfData.with_heads ? affectedHeads.map((h:any) => (
                                            <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                <Text>{
                                                    totalNumberGenerator(s.affiliated_heads.heads.filter((head:any) => head.head_name === h).map((head:any) => totalNumberGenerator(head.amounts?.filter((a:any) => pdfData.installments?.map((i:any) => i.name)?.includes(a.name))?.map((a:any) => Number(a.value) - (Number(a.last_rec_amount || 0) + Number(a.conc_amount || 0)))))) || '-'
                                                }</Text>
                                            </View>
                                        )) : pdfData.fee_type === 'All fee types' ? pdfData.fee_types.map((t:any) => (
                                            <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                <Text>{
                                                    totalNumberGenerator(s.affiliated_heads.heads.filter((head:any) => head.type_name === t.name).map((head:any) => totalNumberGenerator(head.amounts?.filter((a:any) => pdfData.installments?.map((i:any) => i.name)?.includes(a.name))?.map((a:any) => Number(a.value) - (Number(a.last_rec_amount || 0) + Number(a.conc_amount || 0)))))) || '-'
                                                }</Text>
                                            </View>
                                        )) : (
                                            <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                <Text>{
                                                    totalNumberGenerator(s.affiliated_heads.heads.filter((head:any) => head.type_name === pdfData.fee_type).map((head:any) => totalNumberGenerator(head.amounts?.filter((a:any) => pdfData.installments?.map((i:any) => i.name)?.includes(a.name))?.map((a:any) => Number(a.value) - (Number(a.last_rec_amount || 0) + Number(a.conc_amount || 0)))))) || '-'
                                                }</Text>
                                            </View>
                                        )}
                                        <Text style={{width:50, display:'flex', alignItems:'flex-start', justifyContent:'center', paddingVertical:2,  borderRightWidth:1, paddingLeft:5, borderRightColor:'#ccc'}}>{
                                            totalNumberGenerator(s.affiliated_heads.heads.map((head:any) => totalNumberGenerator(head.amounts?.filter((a:any) => pdfData.installments?.map((i:any) => i.name)?.includes(a.name))?.map((a:any) => Number(a.value) - (Number(a.last_rec_amount || 0) + Number(a.conc_amount || 0)))))) || '-'
                                        }</Text>
                                    </View>
                                ))}


                                {/* Total on class */}
                                <View style={{display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:'#fff', paddingLeft:5, color:'#000'}}>
                                    <View style={{width:30, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc', color:'#fff'}}>
                                        <Text>-</Text>
                                    </View>
                                    <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                        <Text>Total</Text>
                                    </View>
                                    <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc', color:'#fff'}}>
                                        <Text>-</Text>
                                    </View>
                                    <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc', color:'#fff'}}>
                                        <Text>-</Text>
                                    </View>
                                    {pdfData.with_heads ? affectedHeads.map((h:any) => (
                                        <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                            <Text>{
                                                totalNumberGenerator(pdfData.students.filter((s:any) => s.student.class === c).map((s:any) => totalNumberGenerator(s.affiliated_heads.heads.filter((head:any) => head.head_name === h).map((head:any) => totalNumberGenerator(head.amounts?.filter((a:any) => pdfData.installments?.map((i:any) => i.name)?.includes(a.name))?.map((a:any) => Number(a.value) - (Number(a.last_rec_amount || 0) + Number(a.conc_amount || 0)))))))) || '-'
                                            }</Text>
                                        </View>
                                    )) : pdfData.fee_type === 'All fee types' ? pdfData.fee_types.map((t:any) => (
                                        <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                            <Text>{
                                                totalNumberGenerator(pdfData.students.filter((s:any) => s.student.class === c).map((s:any) => totalNumberGenerator(s.affiliated_heads.heads.filter((head:any) => head.type_name === t.name).map((head:any) => totalNumberGenerator(head.amounts?.filter((a:any) => pdfData.installments?.map((i:any) => i.name)?.includes(a.name))?.map((a:any) => Number(a.value) - (Number(a.last_rec_amount || 0) + Number(a.conc_amount || 0)))))))) || '-'
                                            }</Text>
                                        </View>
                                    )) : (
                                        <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                            <Text>{
                                                totalNumberGenerator(pdfData.students.filter((s:any) => s.student.class === c).map((s:any) => totalNumberGenerator(s.affiliated_heads.heads.filter((head:any) => head.type_name === pdfData.fee_type).map((head:any) => totalNumberGenerator(head.amounts?.filter((a:any) => pdfData.installments?.map((i:any) => i.name)?.includes(a.name))?.map((a:any) => Number(a.value) - (Number(a.last_rec_amount || 0) + Number(a.conc_amount || 0)))))))) || '-'
                                            }</Text>
                                        </View>
                                    )}
                                    <Text style={{width:50, display:'flex', alignItems:'flex-start', justifyContent:'center', paddingVertical:2,  borderRightWidth:1, paddingLeft:5, borderRightColor:'#ccc'}}>{
                                        totalNumberGenerator(pdfData.students.filter((s:any) => s.student.class === c).map((s:any) => totalNumberGenerator(s.affiliated_heads.heads.map((head:any) => totalNumberGenerator(head.amounts?.filter((a:any) => pdfData.installments?.map((i:any) => i.name)?.includes(a.name))?.map((a:any) => Number(a.value) - (Number(a.last_rec_amount || 0) + Number(a.conc_amount || 0)))))))) || '-'
                                    }</Text>
                                </View>
                            </View>
                        ))}


                        {/* Total */}
                        <View style={{display:'flex', flexDirection:'row', alignItems:'center', color:'#fff', backgroundColor:'#435680'}}>
                            <View style={{width:35, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc', color:'#fff'}}>
                                <Text>-</Text>
                            </View>
                            <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                <Text>G. Total</Text>
                            </View>
                            <View style={{width:75, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc', color:'#fff'}}>
                                <Text>-</Text>
                            </View>
                            <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc', color:'#fff'}}>
                                <Text>-</Text>
                            </View>
                            {pdfData.with_heads ? affectedHeads.map((h:any) => (
                                <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                    <Text>{
                                        totalNumberGenerator(pdfData.students.map((s:any) => totalNumberGenerator(s.affiliated_heads.heads.filter((head:any) => head.head_name === h).map((head:any) => totalNumberGenerator(head.amounts?.filter((a:any) => pdfData.installments?.map((i:any) => i.name)?.includes(a.name))?.map((a:any) => Number(a.value) - (Number(a.last_rec_amount || 0) + Number(a.conc_amount || 0)))))))) || '-'
                                    }</Text>
                                </View>
                            )) : pdfData.fee_type === 'All fee types' ? pdfData.fee_types.map((t:any) => (
                                <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                    <Text>{
                                        totalNumberGenerator(pdfData.students.map((s:any) => totalNumberGenerator(s.affiliated_heads.heads.filter((head:any) => head.type_name === t.name).map((head:any) => totalNumberGenerator(head.amounts?.filter((a:any) => pdfData.installments?.map((i:any) => i.name)?.includes(a.name))?.map((a:any) => Number(a.value) - (Number(a.last_rec_amount || 0) + Number(a.conc_amount || 0)))))))) || '-'
                                    }</Text>
                                </View>
                            )) : (
                                <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                    <Text>{
                                        totalNumberGenerator(pdfData.students.map((s:any) => totalNumberGenerator(s.affiliated_heads.heads.filter((head:any) => head.type_name === pdfData.fee_type).map((head:any) => totalNumberGenerator(head.amounts?.filter((a:any) => pdfData.installments?.map((i:any) => i.name)?.includes(a.name))?.map((a:any) => Number(a.value) - (Number(a.last_rec_amount || 0) + Number(a.conc_amount || 0)))))))) || '-'
                                    }</Text>
                                </View>
                            )}
                            <Text style={{width:50, display:'flex', alignItems:'flex-start', justifyContent:'center', paddingVertical:2,  borderRightWidth:1, paddingLeft:5, borderRightColor:'#ccc'}}>{
                                totalNumberGenerator(pdfData.students.map((s:any) => totalNumberGenerator(s.affiliated_heads.heads.map((head:any) => totalNumberGenerator(head.amounts?.filter((a:any) => pdfData.installments?.map((i:any) => i.name)?.includes(a.name))?.map((a:any) => Number(a.value) - (Number(a.last_rec_amount || 0) + Number(a.conc_amount || 0)))))))) || '-'
                            }</Text>
                        </View>
                    </View>
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