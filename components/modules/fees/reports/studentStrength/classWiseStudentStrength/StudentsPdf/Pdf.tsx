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


    // Students classes
    const studentsClasses = pdfData.students?.map((s:any) => s.student.class)?.filter((value:any, index:any, self:any) => self.indexOf(value) === index);


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
            <Page style={{width:'100%', display:'flex', flexDirection:'column', gap:2, margin:0}} size='A4' orientation='landscape'>

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

                {/* Title */}
                <View style={{display:'flex', flexDirection:'row', gap:6, fontSize:12, paddingHorizontal:10, marginHorizontal:5, paddingVertical:5, marginVertical:5, borderWidth:1, borderColor:'#ccc'}}>
                    <Text>Class Wise Student Strength printed on {moment(new Date()).format('DD-MMM-YYYY')} at {moment(new Date()).format('hh:mm A')}</Text>
                </View>









                {pdfData.students?.length > 0 ? (
                    <View style={{width:'95%', display:'flex', flexDirection:'column', alignItems:'flex-start', marginHorizontal:5, marginLeft:20, fontSize:12, borderWidth:0.75, borderColor:'#ccc'}}>

                        {pdfData.previewWise === 'Row Wise' ? (
                            <>
                                {/* Headers */}
                                <View style={{display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:'#435680', borderBottomWidth:0.5, paddingLeft:5, borderBottomColor:'#ccc', color:'#fff'}}>
                                    <View style={{width:150, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                        <Text>Class</Text>
                                    </View>
                                    {pdfData.sections?.map((s:any) => (
                                        <View style={{width:150, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                            <Text>{s}</Text>
                                        </View>
                                    ))}
                                    <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                        <Text>Total</Text>
                                    </View>
                                </View>


                                {/* Students */}
                                {studentsClasses?.map((c:any) => (
                                    <View style={{display:'flex', flexDirection:'row', alignItems:'center', borderBottomWidth:0.5, paddingLeft:5, borderBottomColor:'#ccc', color:'#000', backgroundColor:Math.floor((studentsClasses.indexOf(c) + 1) / 2) * 2 !== studentsClasses.indexOf(c) + 1 ? '#F3F8FB' : '#fff'}}>
                                        <View style={{width:150, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                            <Text>{c}</Text>
                                        </View>
                                        {pdfData.sections?.map((s:any) => (
                                            <View style={{width:150, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                <Text>{pdfData.students.filter((student:any) => student.student.section === s && student.student.class === c).length}</Text>
                                            </View>
                                        ))}
                                        <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                            <Text>{pdfData.students.filter((student:any) => student.student.class === c).length}</Text>
                                        </View>
                                    </View>
                                ))}


                                {/* Total */}
                                <View style={{display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:'#435680', borderBottomWidth:0.5, paddingLeft:5, borderBottomColor:'#ccc', color:'#fff'}}>
                                    <View style={{width:150, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                        <Text>Total</Text>
                                    </View>
                                    {pdfData.sections?.map((s:any) => (
                                        <View style={{width:150, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                            <Text>{pdfData.students.filter((student:any) => student.student.section === s).length}</Text>
                                        </View>
                                    ))}
                                    <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                        <Text>{pdfData.students.length}</Text>
                                    </View>
                                </View>
                            </>
                        ) : (
                            <>
                                {/* Headers */}
                                <View style={{display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:'#435680', borderBottomWidth:0.5, paddingLeft:5, borderBottomColor:'#ccc', color:'#fff'}}>
                                    <View style={{width:50, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                        <Text>SN</Text>
                                    </View>
                                    <View style={{width:150, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                        <Text>Class</Text>
                                    </View>
                                    {pdfData.isSectionWise && (
                                        <View style={{width:150, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                            <Text>Section</Text>
                                        </View>
                                    )}
                                    <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                        <Text>Students</Text>
                                    </View>
                                </View>


                                {/* Students */}
                                {studentsClasses?.map((c:any) => (
                                    <View style={{display:'flex', flexDirection:'row', alignItems:'center', borderBottomWidth:0.5, paddingLeft:5, borderBottomColor:'#ccc', color:'#000', backgroundColor:Math.floor((studentsClasses.indexOf(c) + 1) / 2) * 2 !== studentsClasses.indexOf(c) + 1 ? '#F3F8FB' : '#fff'}}>
                                        <View style={{width:50, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                            <Text>{studentsClasses.indexOf(c) + 1}</Text>
                                        </View>
                                        <View style={{width:150, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                            <Text>{c}</Text>
                                        </View>
                                        {pdfData.isSectionWise && (
                                            <View style={{width:150, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                <Text>{pdfData.selectedSection}</Text>
                                            </View>
                                        )}
                                        <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                            <Text>{pdfData.students.filter((student:any) => student.student.class === c).length}</Text>
                                        </View>
                                    </View>
                                ))}


                                {/* Total */}
                                <View style={{display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:'#435680', borderBottomWidth:0.5, paddingLeft:5, borderBottomColor:'#ccc', color:'#fff'}}>
                                    <View style={{width:50, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc', color:'#435680'}}>
                                        <Text>-</Text>
                                    </View>
                                    <View style={{width:150, height:'100%', display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                        <Text>{!pdfData.isSectionWise && 'Total'}</Text>
                                    </View>
                                    {pdfData.isSectionWise && (
                                        <View style={{width:150, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                            <Text>Total</Text>
                                        </View>
                                    )}
                                    <View style={{width:100, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                        <Text>{pdfData.students.length}</Text>
                                    </View>
                                </View>
                            </>
                        )}


                    </View>
                ) : (
                    <Text style={{fontSize:20, color:'#435680', marginLeft:20}}>No record found!</Text>
                )}










                {/* Footer */}
                <View style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between', fontSize:11, paddingHorizontal:10, marginHorizontal:5, paddingVertical:5, marginVertical:5, borderTopWidth:1, borderTopColor:'#ccc'}}>
                    <Text>Academic Year: {activeAcademicYear}</Text>
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