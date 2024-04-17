'use client';
// Imports
import moment from 'moment';
import {useEffect, useState} from 'react';
import {Document, Page, View, Text, PDFViewer, Image} from '@react-pdf/renderer';
import {fetchInstallments} from '@/lib/actions/fees/feeMaster/feeMaster/installment.actions';
import {fetchClasses} from '@/lib/actions/fees/globalMasters/defineClassDetails/class.actions';
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


    // Classes
    const [classes, setClasses] = useState([{}]);


    // Active academic year
    const [activeAcademicYear, setActiveAcademicYear] = useState('');


    // Students classes
    const studentsClasses = pdfData.students?.map((s:any) => s.student.class)?.filter((value:any, index:any, self:any) => self.indexOf(value) === index);


    // Student heads
    const studentHeads = pdfData.students.map((s:any) => s.affiliated_heads.heads.map((h:any) => h.head_name)).flat();
    const filteredHeads = studentHeads.filter((name:any, index:any) => studentHeads.indexOf(name) === index);


    // Defaulter students
    const [defaulterStudents, setDefaulterStudents] = useState([{}]);
 

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
            const classesRes = await fetchClasses();
            const installmentsRes = await fetchInstallments();
            setSchoolData({
                logo:schools[0].logo,
                school_name:schools[0].school_name,
                school_address:schools[0].school_address
            });
            setClasses(classesRes);
            setActiveAcademicYear(sessions.filter((s:any) => s.is_active)[0].year_name);

        
            // Setting defaulter students
            const pastDueDateInstallments = installmentsRes?.filter((i:any) => {

                // Installment due date
                const installmentDueDate = `${i.due_date.day}-${i.due_date.month}-${i.due_date.year}`;
                const [day, monthName, year] = installmentDueDate.split('-');
                const monthMap = {
                    'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
                    'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
                };
                const month = monthMap[monthName];
                // @ts-ignore
                const dateObject = new Date(year, month, day);

                return dateObject < new Date();
            }).map((i:any) => i.name);
            const theDefaulterStudents = pdfData.students?.filter((s:any) => (s.affiliated_heads.heads.map((h:any) => h.amounts.map((a:any) => a.name)).flat().filter((i:any) => pastDueDateInstallments.includes(i)).length > 0 && (totalNumberGenerator(s.affiliated_heads.heads.map((h:any) => totalNumberGenerator(h.amounts.map((a:any) => Number(a.value) - (Number(a.last_rec_amount) + Number(a.conc_amount)))))) !== 0)) || s.affiliated_heads.heads.length === 0);
            setDefaulterStudents(theDefaulterStudents);
        };
        fetcher();
    }, []);


    return(
        <Document title='Class wise student strength'>
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

                        {pdfData.previewWise === 'Row Wise' && (
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
                        )}

                        {pdfData.previewWise === 'Column Wise' && (
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

                        {pdfData.previewWise === 'showStudents' && (
                            <>
                                <View style={{width:'100%', height:'100%', display:'flex', flexDirection:'row', gap:10}}>

                                    {/* Classes table */}
                                    <View style={{width:'50%', display:'flex', flexDirection:'column'}}>
                                        {/* Headers */}
                                        <View style={{display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:'#435680', borderBottomWidth:0.5, borderBottomColor:'#ccc', color:'#fff'}}>
                                            <View style={{width:'12.5%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                <Text>Class</Text>
                                            </View>
                                            <View style={{width:'17.5%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                <Text>Total Adm.</Text>
                                            </View>
                                            <View style={{width:'35%', display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                <Text style={{width:'100%', textAlign:'center', borderBottomWidth:0.5, borderBottomColor:'#ccc'}}>New</Text>
                                                <View style={{display:'flex', flexDirection:'row'}}>
                                                    <Text style={{width:'33.3%', textAlign:'center', borderRightWidth:0.5, borderRightColor:'#ccc'}}>Total</Text>
                                                    <Text style={{width:'33.3%', textAlign:'center', borderRightWidth:0.5, borderRightColor:'#ccc'}}>Paid</Text>
                                                    <Text style={{width:'33.3%', textAlign:'center'}}>Unpaid</Text>
                                                </View>
                                            </View>
                                            <View style={{width:'35%', display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                <Text style={{width:'100%', textAlign:'center', borderBottomWidth:0.5, borderBottomColor:'#ccc'}}>Old</Text>
                                                <View style={{display:'flex', flexDirection:'row'}}>
                                                    <Text style={{width:'33.3%', textAlign:'center', paddingBottom:2, borderRightWidth:0.5, borderRightColor:'#ccc'}}>Total</Text>
                                                    <Text style={{width:'33.3%', textAlign:'center', borderRightWidth:0.5, borderRightColor:'#ccc'}}>Paid</Text>
                                                    <Text style={{width:'33.3%', textAlign:'center'}}>Unpaid</Text>
                                                </View>
                                            </View>
                                        </View>


                                        {/* Classes */}
                                        {classes?.map((c:any) => (
                                            <View style={{display:'flex', flexDirection:'row', alignItems:'center', borderBottomWidth:0.5, borderBottomColor:'#ccc', color:'#000', backgroundColor:Math.floor((classes.indexOf(c) + 1) / 2) * 2 !== classes.indexOf(c) + 1 ? '#F3F8FB' : '#fff'}}>
                                                <View style={{width:'12.5%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                    <Text>{c.class_name}</Text>
                                                </View>
                                                <View style={{width:'17.5%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                    <Text>{pdfData.students.filter((s:any) => s.student.class === c.class_name).length}</Text>
                                                </View>
                                                <View style={{width:'11.655%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                    <Text>{pdfData.students.filter((s:any) => s.student.class === c.class_name && s.student.is_new).length}</Text>
                                                </View>
                                                <View style={{width:'11.655%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                    <Text>{pdfData.students.filter((s:any) => s.student.class === c.class_name && s.student.is_new && (totalNumberGenerator(s.affiliated_heads.heads.map((h:any) => totalNumberGenerator(h.amounts.map((a:any) => Number(a.value) - (Number(a.last_rec_amount) + Number(a.conc_amount)))))) === 0 && s.affiliated_heads.heads.length > 0)).length}</Text>
                                                </View>
                                                <View style={{width:'11.655%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                    <Text>{pdfData.students.filter((s:any) => s.student.class === c.class_name && s.student.is_new && (totalNumberGenerator(s.affiliated_heads.heads.map((h:any) => totalNumberGenerator(h.amounts.map((a:any) => Number(a.value) - (Number(a.last_rec_amount) + Number(a.conc_amount)))))) !== 0 && s.affiliated_heads.heads.length > 0)).length}</Text>
                                                </View>
                                                <View style={{width:'11.655%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                    <Text>{pdfData.students.filter((s:any) => s.student.class === c.class_name && !s.student.is_new).length}</Text>
                                                </View>
                                                <View style={{width:'11.655%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                    <Text>{pdfData.students.filter((s:any) => s.student.class === c.class_name && !s.student.is_new && (totalNumberGenerator(s.affiliated_heads.heads.map((h:any) => totalNumberGenerator(h.amounts.map((a:any) => Number(a.value) - (Number(a.last_rec_amount) + Number(a.conc_amount)))))) === 0 && s.affiliated_heads.heads.length > 0)).length}</Text>
                                                </View>
                                                <View style={{width:'11.655%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                    <Text>{pdfData.students.filter((s:any) => s.student.class === c.class_name && !s.student.is_new && (totalNumberGenerator(s.affiliated_heads.heads.map((h:any) => totalNumberGenerator(h.amounts.map((a:any) => Number(a.value) - (Number(a.last_rec_amount) + Number(a.conc_amount)))))) !== 0 || s.affiliated_heads.heads.length === 0)).length}</Text>
                                                </View>
                                            </View>
                                        ))}


                                        {/* Total */}
                                        <View style={{display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:'#435680', borderBottomWidth:0.5, borderBottomColor:'#ccc', color:'#fff'}}>
                                            <View style={{width:'12.5%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                <Text>Total</Text>
                                            </View>
                                            <View style={{width:'17.5%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                <Text>{pdfData.students.length}</Text>
                                            </View>
                                            <View style={{width:'11.655%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                <Text>{pdfData.students.filter((s:any) => s.student.is_new).length}</Text>
                                            </View>
                                            <View style={{width:'11.655%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                <Text>{pdfData.students.filter((s:any) => s.student.is_new && (totalNumberGenerator(s.affiliated_heads.heads.map((h:any) => totalNumberGenerator(h.amounts.map((a:any) => Number(a.value) - (Number(a.last_rec_amount) + Number(a.conc_amount)))))) === 0 && s.affiliated_heads.heads.length > 0)).length}</Text>
                                            </View>
                                            <View style={{width:'11.655%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                <Text>{pdfData.students.filter((s:any) => s.student.is_new && (totalNumberGenerator(s.affiliated_heads.heads.map((h:any) => totalNumberGenerator(h.amounts.map((a:any) => Number(a.value) - (Number(a.last_rec_amount) + Number(a.conc_amount)))))) !== 0 && s.affiliated_heads.heads.length > 0)).length}</Text>
                                            </View>
                                            <View style={{width:'11.655%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                <Text>{pdfData.students.filter((s:any) => !s.student.is_new).length}</Text>
                                            </View>
                                            <View style={{width:'11.655%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                <Text>{pdfData.students.filter((s:any) => !s.student.is_new && (totalNumberGenerator(s.affiliated_heads.heads.map((h:any) => totalNumberGenerator(h.amounts.map((a:any) => Number(a.value) - (Number(a.last_rec_amount) + Number(a.conc_amount)))))) === 0 && s.affiliated_heads.heads.length > 0)).length}</Text>
                                            </View>
                                            <View style={{width:'11.655%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                <Text>{pdfData.students.filter((s:any) => !s.student.is_new && (totalNumberGenerator(s.affiliated_heads.heads.map((h:any) => totalNumberGenerator(h.amounts.map((a:any) => Number(a.value) - (Number(a.last_rec_amount) + Number(a.conc_amount)))))) !== 0 || s.affiliated_heads.heads.length === 0)).length}</Text>
                                            </View>
                                        </View>
                                    </View>





                                    {/* Other tables */}
                                    <View style={{width:'50%', display:'flex', flexDirection:'row', gap:5}}>
                                        <View style={{display:'flex', flexDirection:'column', gap:5}}>


                                            {/* Admission Details */}
                                            <View style={{display:'flex', flexDirection:'column'}}>
                                                {/* Headers */}
                                                <View style={{display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:'#435680', borderBottomWidth:0.5, borderBottomColor:'#ccc', color:'#fff'}}>
                                                    <View style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                        <Text>Admission Details</Text>
                                                    </View>
                                                </View>

                                                {/* Table */}
                                                <View style={{display:'flex', flexDirection:'row', alignItems:'center', borderBottomWidth:0.5, borderBottomColor:'#ccc', color:'#000', backgroundColor:'#F3F8FB'}}>
                                                    <View style={{width:'50%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                        <Text>Old Admission</Text>
                                                    </View>
                                                    <View style={{width:'50%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                        <Text style={{gap:2}}>
                                                            {pdfData.students.filter((s:any) => !s.student.is_new).length}
                                                            ({totalNumberGenerator(pdfData.students.filter((s:any) => !s.student.is_new).map((s:any) => totalNumberGenerator(s.affiliated_heads.heads.map((h:any) => totalNumberGenerator(h.amounts.map((a:any) => Number(a.value)))))))})
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View style={{display:'flex', flexDirection:'row', alignItems:'center', borderBottomWidth:0.5, borderBottomColor:'#ccc', color:'#000', backgroundColor:'#fff'}}>
                                                    <View style={{width:'50%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                        <Text>New Admission</Text>
                                                    </View>
                                                    <View style={{width:'50%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                        <Text style={{gap:2}}>
                                                            {pdfData.students.filter((s:any) => s.student.is_new).length}
                                                            ({totalNumberGenerator(pdfData.students.filter((s:any) => s.student.is_new).map((s:any) => totalNumberGenerator(s.affiliated_heads.heads.map((h:any) => totalNumberGenerator(h.amounts.map((a:any) => Number(a.value)))))))})
                                                        </Text>
                                                    </View>
                                                </View>

                                                {/* Total */}
                                                <View style={{display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:'#435680', borderBottomWidth:0.5, borderBottomColor:'#ccc', color:'#fff'}}>
                                                    <View style={{width:'50%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                        <Text>Total Admission</Text>
                                                    </View>
                                                    <View style={{width:'50%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                        <Text style={{gap:2}}>
                                                            {pdfData.students.length}
                                                            ({totalNumberGenerator(pdfData.students.map((s:any) => totalNumberGenerator(s.affiliated_heads.heads.map((h:any) => totalNumberGenerator(h.amounts.map((a:any) => Number(a.value)))))))})
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>


                                            {/* Total Fee Collection */}
                                            <View style={{display:'flex', flexDirection:'column'}}>
                                                {/* Headers */}
                                                <View style={{display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:'#435680', borderBottomWidth:0.5, borderBottomColor:'#ccc', color:'#fff'}}>
                                                    <View style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                        <Text>Total Fee Collection</Text>
                                                    </View>
                                                </View>

                                                {/* Table */}
                                                <View style={{display:'flex', flexDirection:'row', alignItems:'center', borderBottomWidth:0.5, borderBottomColor:'#ccc', color:'#000', backgroundColor:'#F3F8FB'}}>
                                                    <View style={{width:'50%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                        <Text>Old Admission</Text>
                                                    </View>
                                                    <View style={{width:'50%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                        <Text style={{gap:2}}>
                                                            {pdfData.students.filter((s:any) => !s.student.is_new && (totalNumberGenerator(s.affiliated_heads.heads.map((h:any) => totalNumberGenerator(h.amounts.map((a:any) => Number(a.value) - (Number(a.last_rec_amount) + Number(a.conc_amount)))))) === 0 && s.affiliated_heads.heads.length > 0)).length}
                                                            ({totalNumberGenerator(pdfData.students.filter((s:any) => !s.student.is_new).map((s:any) => totalNumberGenerator(s.affiliated_heads.heads.map((h:any) => totalNumberGenerator(h.amounts.map((a:any) => Number(a.last_rec_amount)))))))})
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View style={{display:'flex', flexDirection:'row', alignItems:'center', borderBottomWidth:0.5, borderBottomColor:'#ccc', color:'#000', backgroundColor:'#fff'}}>
                                                    <View style={{width:'50%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                        <Text>New Admission</Text>
                                                    </View>
                                                    <View style={{width:'50%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                        <Text style={{gap:2}}>
                                                            {pdfData.students.filter((s:any) => s.student.is_new && (totalNumberGenerator(s.affiliated_heads.heads.map((h:any) => totalNumberGenerator(h.amounts.map((a:any) => Number(a.value) - (Number(a.last_rec_amount) + Number(a.conc_amount)))))) !== 0 && s.affiliated_heads.heads.length > 0)).length}
                                                            ({totalNumberGenerator(pdfData.students.filter((s:any) => s.student.is_new).map((s:any) => totalNumberGenerator(s.affiliated_heads.heads.map((h:any) => totalNumberGenerator(h.amounts.map((a:any) => Number(a.last_rec_amount)))))))})
                                                        </Text>
                                                    </View>
                                                </View>

                                                {/* Total */}
                                                <View style={{display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:'#435680', borderBottomWidth:0.5, borderBottomColor:'#ccc', color:'#fff'}}>
                                                    <View style={{width:'50%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                        <Text>Total Collection</Text>
                                                    </View>
                                                    <View style={{width:'50%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                        <Text style={{gap:2}}>
                                                            {pdfData.students.filter((s:any) => (totalNumberGenerator(s.affiliated_heads.heads.map((h:any) => totalNumberGenerator(h.amounts.map((a:any) => Number(a.value) - (Number(a.last_rec_amount) + Number(a.conc_amount)))))) !== 0 && s.affiliated_heads.heads.length > 0)).length}
                                                            ({totalNumberGenerator(pdfData.students.map((s:any) => totalNumberGenerator(s.affiliated_heads.heads.map((h:any) => totalNumberGenerator(h.amounts.map((a:any) => Number(a.last_rec_amount)))))))})
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>


                                            {/* Total Fee Defaulter */}
                                            <View style={{display:'flex', flexDirection:'column'}}>
                                                {/* Headers */}
                                                <View style={{display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:'#435680', borderBottomWidth:0.5, borderBottomColor:'#ccc', color:'#fff'}}>
                                                    <View style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                        <Text>Total Fee Defaulter</Text>
                                                    </View>
                                                </View>

                                                {/* Table */}
                                                <View style={{display:'flex', flexDirection:'row', alignItems:'center', borderBottomWidth:0.5, borderBottomColor:'#ccc', color:'#000', backgroundColor:'#F3F8FB'}}>
                                                    <View style={{width:'50%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                        <Text>Old Admission</Text>
                                                    </View>
                                                    <View style={{width:'50%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                        <Text style={{gap:2}}>
                                                            {defaulterStudents.filter((s:any) => !s?.student?.is_new).length}
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View style={{display:'flex', flexDirection:'row', alignItems:'center', borderBottomWidth:0.5, borderBottomColor:'#ccc', color:'#000', backgroundColor:'#fff'}}>
                                                    <View style={{width:'50%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                        <Text>New Admission</Text>
                                                    </View>
                                                    <View style={{width:'50%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                        <Text>
                                                            {defaulterStudents.filter((s:any) => s?.student?.is_new).length}
                                                        </Text>
                                                    </View>
                                                </View>

                                                {/* Total */}
                                                <View style={{display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:'#435680', borderBottomWidth:0.5, borderBottomColor:'#ccc', color:'#fff'}}>
                                                    <View style={{width:'50%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                        <Text>Total Collection</Text>
                                                    </View>
                                                    <View style={{width:'50%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                        <Text>
                                                            {defaulterStudents.length}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>


                                        </View>
                                        <View style={{display:'flex', flexDirection:'column', gap:5}}>


                                            {/* Concession */}
                                            <View style={{display:'flex', flexDirection:'column'}}>
                                                {/* Headers */}
                                                <View style={{display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:'#435680', borderBottomWidth:0.5, borderBottomColor:'#ccc', color:'#fff'}}>
                                                    <View style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                        <Text>Concession</Text>
                                                    </View>
                                                </View>

                                                {/* Heads */}
                                                {filteredHeads.map((h:any) => (
                                                    <View style={{display:'flex', flexDirection:'row', alignItems:'center', borderBottomWidth:0.5, borderBottomColor:'#ccc', color:'#000', backgroundColor:Math.floor((filteredHeads.indexOf(h) + 1) / 2) * 2 !== filteredHeads.indexOf(h) + 1 ? '#F3F8FB' : '#fff'}}>
                                                        <View style={{width:'50%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                            <Text>{h}</Text>
                                                        </View>
                                                        <View style={{width:'25%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                            <Text style={{gap:2}}>
                                                                0
                                                            </Text>
                                                        </View>
                                                        <View style={{width:'25%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                            <Text style={{gap:2}}>
                                                                {totalNumberGenerator(pdfData.students.map((s:any) => totalNumberGenerator(s.affiliated_heads.heads.filter((head:any) => head.head_name === h).map((head:any) => totalNumberGenerator(head.amounts.map((a:any) => Number(a.conc_amount)))))))}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                ))}

                                                {/* Total */}
                                                <View style={{display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:'#435680', borderBottomWidth:0.5, borderBottomColor:'#ccc', color:'#fff'}}>
                                                    <View style={{width:'50%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                        <Text>Total</Text>
                                                    </View>
                                                    <View style={{width:'25%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                        <Text>
                                                            0
                                                        </Text>
                                                    </View>
                                                    <View style={{width:'25%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                        <Text>
                                                            {totalNumberGenerator(pdfData.students.map((s:any) => totalNumberGenerator(s.affiliated_heads.heads.map((head:any) => totalNumberGenerator(head.amounts.map((a:any) => Number(a.conc_amount)))))))}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>


                                            {/* Estimated Collection */}
                                            <View style={{display:'flex', flexDirection:'column'}}>
                                                {/* Headers */}
                                                <View style={{display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:'#435680', borderBottomWidth:0.5, borderBottomColor:'#ccc', color:'#fff'}}>
                                                    <View style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                        <Text>Estimated Collection</Text>
                                                    </View>
                                                </View>

                                                {/* Fee */}
                                                <View style={{display:'flex', flexDirection:'row', alignItems:'center', borderBottomWidth:0.5, borderBottomColor:'#ccc', color:'#000', backgroundColor:'#F3F8FB'}}>
                                                    <View style={{width:'70%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                        <Text>Fee</Text>
                                                    </View>
                                                    <View style={{width:'30%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                        <Text style={{gap:2}}>
                                                            {totalNumberGenerator(pdfData.students.map((s:any) => totalNumberGenerator(s.affiliated_heads.heads.map((head:any) => totalNumberGenerator(head.amounts.map((a:any) => Number(a.value)))))))}
                                                        </Text>
                                                    </View>
                                                </View>

                                                {/* Concession */}
                                                <View style={{display:'flex', flexDirection:'row', alignItems:'center', borderBottomWidth:0.5, borderBottomColor:'#ccc', color:'#000', backgroundColor:'#fff'}}>
                                                    <View style={{width:'70%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                        <Text>Concession</Text>
                                                    </View>
                                                    <View style={{width:'30%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                        <Text style={{gap:2}}>
                                                            {totalNumberGenerator(pdfData.students.map((s:any) => totalNumberGenerator(s.affiliated_heads.heads.map((head:any) => totalNumberGenerator(head.amounts.map((a:any) => Number(a.conc_amount)))))))}
                                                        </Text>
                                                    </View>
                                                </View>

                                                {/* Total */}
                                                <View style={{display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:'#435680', borderBottomWidth:0.5, borderBottomColor:'#ccc', color:'#fff'}}>
                                                    <View style={{width:'70%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                        <Text>Total Estimated Collection</Text>
                                                    </View>
                                                    <View style={{width:'30%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                        <Text>
                                                            {
                                                                totalNumberGenerator(pdfData.students.map((s:any) => totalNumberGenerator(s.affiliated_heads.heads.map((head:any) => totalNumberGenerator(head.amounts.map((a:any) => Number(a.value)))))))
                                                                    -
                                                                totalNumberGenerator(pdfData.students.map((s:any) => totalNumberGenerator(s.affiliated_heads.heads.map((head:any) => totalNumberGenerator(head.amounts.map((a:any) => Number(a.conc_amount)))))))
                                                            }
                                                        </Text>
                                                    </View>
                                                </View>

                                                {/* Received */}
                                                <View style={{display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:'#4BB543', borderBottomWidth:0.5, borderBottomColor:'#ccc', color:'#fff'}}>
                                                    <View style={{width:'70%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                        <Text>Received</Text>
                                                    </View>
                                                    <View style={{width:'30%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                        <Text>
                                                            {totalNumberGenerator(pdfData.students.map((s:any) => totalNumberGenerator(s.affiliated_heads.heads.map((h:any) => totalNumberGenerator(h.amounts.map((a:any) => Number(a.last_rec_amount)))))))}
                                                        </Text>
                                                    </View>
                                                </View>

                                                {/* Defaulter (Dues) */}
                                                <View style={{display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:'#F0343A', borderBottomWidth:0.5, borderBottomColor:'#ccc', color:'#fff'}}>
                                                    <View style={{width:'70%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                        <Text>Defaulter (Dues)</Text>
                                                    </View>
                                                    <View style={{width:'30%', display:'flex', alignItems:'center', justifyContent:'center', paddingVertical:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                                        <Text>
                                                            {totalNumberGenerator(pdfData.students.map((s:any) => totalNumberGenerator(s.affiliated_heads.heads.map((h:any) => totalNumberGenerator(h.amounts.map((a:any) => Number(a.value) - (Number(a.last_rec_amount) + Number(a.conc_amount))))))))}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>


                                        </View>
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