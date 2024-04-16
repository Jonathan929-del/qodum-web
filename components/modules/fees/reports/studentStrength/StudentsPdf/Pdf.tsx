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
            <Page style={{width:'100%', display:'flex', flexDirection:'column', gap:2, margin:0}} size={{width:1000, height:700 + pdfData.fields.length * 150}} orientation='landscape'>

                {/* School data */}
                <View style={{display:'flex', flexDirection:'row', width:'100%', alignItems:'center', gap:100, paddingVertical:10, paddingHorizontal:50, borderBottomWidth:0.5, borderBottomColor:'#ccc'}}>
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
                    <Text>Student Report</Text>
                </View>









                {pdfData.students?.length > 0 ? (
                    <View style={{width:'95%', display:'flex', flexDirection:'column', alignItems:'flex-start', marginHorizontal:5, marginLeft:20, fontSize:11, borderWidth:0.75, borderColor:'#ccc'}}>


                        {/* Headers */}
                        <View style={{display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:'#435680', borderBottomWidth:0.5, paddingLeft:5, borderBottomColor:'#ccc', color:'#fff'}}>
                            <View style={{width:30, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                <Text>SN</Text>
                            </View>
                            {pdfData.fields.map((f:any) => (
                                <View style={{width:120, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                    <Text>{f}</Text>
                                </View>
                            ))}
                        </View>


                        {/* Students */}
                        {pdfData.students.map((s:any) => (
                            <View style={{display:'flex', flexDirection:'row', alignItems:'center', borderBottomWidth:0.5, paddingLeft:5, borderBottomColor:'#ccc', color:'#000', backgroundColor:Math.floor((pdfData.students.indexOf(s) + 1) / 2) * 2 !== pdfData.students.indexOf(s) + 1 ? '#F3F8FB' : '#fff'}}>
                                <View style={{width:30, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                    <Text>{pdfData.students.indexOf(s) + 1}</Text>
                                </View>
                                {pdfData.fields.map((f:any) => (
                                    <View style={{width:120, height:'100%', display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'center', paddingVertical:2, paddingLeft:5, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                        <Text>
                                            {f === 'Class Name' && s.student.class}
                                            {f === 'Roll No.' && s.student.roll_no}
                                            {f === 'Bill No.' && s.student.bill_no}
                                            {f === 'Adm. No.' && s.student.adm_no}
                                            {f === 'Student Name' && s.student.name}
                                            {f === 'Boarding/Day Scholar' && ''}
                                            {f === 'Section' && s.student.section}
                                            {f === 'Optional Sub. Name' && s.student.optional_subject}
                                            {f === 'General Description' && s.others.student_other_details.general_description}
                                            {f === 'Contact Mo.' && s.student.contact_person_mobile}
                                            {f === 'Student Middle Name' && s.student.middle_name}
                                            {f === 'Student Last Name' && s.student.last_name}
                                            {f === 'Student DOB' && moment(s.student.dob).format('DD-MMM-YYYY')}
                                            {f === 'Student DOA' && moment(s.student.doa).format('DD-MMM-YYYY')}
                                            {f === 'Student DOJ' && moment(s.student.doj).format('DD-MMM-YYYY')}
                                            {f === 'Religion' && s.student.religion}
                                            {f === 'Category' && s.student.category}
                                            {f === 'House' && s.student.house}
                                            {f === 'Address' && s.student.h_no_and_streets}
                                            {f === 'Contact No.' && s.student.secondary_contact_no}
                                            {f === 'Blood Group' && s.student.blood_group}
                                            {f === 'Nationality' && s.student.nationality}
                                            {f === 'Gender' && s.student.gender}
                                            {f === 'Student Email' && s.student.email}
                                            {f === 'Contact Person' && s.student.contact_person_name}
                                            {f === 'Contact Email' && s.student.contact_person_email}
                                            {f === 'Bar Code' && ''}
                                            {f === 'Prev. School Name' && s.others.previous_school_details[0].school_name}
                                            {f === 'Prev. School DOL' && s.others.previous_school_details[0].passing_year}
                                            {f === 'Emrg. Cont. Person' && s.student.contact_person_name}
                                            {f === 'Emrg. Cont. Mobile' && s.student.contact_person_mobile}
                                            {f === 'Emrg. Cont. Phone' && s.student.secondary_contact_no}
                                            {f === 'Emrg. Cont. Add.' && s.student.h_no_and_streets}
                                            {f === 'Emrg. Cont. RTL' && ''}
                                            {f === 'Familly Doc. Name' && s.others.student_other_details.family_doctor_name}
                                            {f === 'Familly Doc. Phone' && s.others.student_other_details.family_doctor_phone}
                                            {f === 'Familly Doc. Add.' && s.others.student_other_details.family_doctor_address}
                                            {f === 'Student Status' && s.student.student_status}
                                            {f === 'Aadhar Card No.' && s.student.aadhar_card_no}
                                            {f === 'Student Cont. 2' && s.student.secondary_contact_no}
                                            {f === 'Pin Code' && s.student.pin_code}
                                            {f === 'State' && s.student.state}
                                            {f === 'City' && s.student.city}
                                            {f === 'Birth Place' && s.student.place_of_birth}
                                            {f === 'Board Reg. No.' && s.student.re_adm_no}
                                            {f === 'Caste' && s.student.caste}
                                            {f === 'EWS' ? s.student.is_ews ? 'True' : 'False' : ''}
                                            {f === 'Mother Tongue' && ''}
                                            {f === 'Stream Name' && s.student.stream}
                                            {f === 'New/Old' ? s.student.is_new ? 'New' : 'Old' : ''}
                                            {f === 'Class' && s.student.class}
                                            {f === 'Father Full Name' && s.parents.father.father_name + s.parents.father.last_name}
                                            {f === 'Father Name' && s.parents.father.father_name}
                                            {f === 'Father Middle Name' && s.parents.father.middle_name}
                                            {f === 'Father Last Name' && s.parents.father.last_name}
                                            {f === 'Father Designation' && s.parents.father.designation}
                                            {f === 'Father Phone' && s.parents.father.mobile}
                                            {f === 'Father DOB' && moment(s.parents.father.dob).format('DD-MMM-YYYY')}
                                            {f === 'Father Address' && s.parents.father.residence_address}
                                            {f === 'Father Off. Add.' && s.parents.father.office_address}
                                            {f === 'Father Email 1' && s.parents.father.email}
                                            {f === 'Father Email 2' && s.parents.father.alternate_email}
                                            {f === 'Father Profession' && s.parents.father.profession}
                                            {f === 'Father Comp. Name' && s.parents.father.company_name}
                                            {f === 'Father Business Of' && s.parents.father.business_details}
                                            {f === 'Father Professional' && s.parents.father.profession}
                                            {f === 'Father Others' && ''}
                                            {f === 'Father Service In' && s.parents.father.service_in}
                                            {f === 'Father Off. Phone' && s.parents.father.office_phone}
                                            {f === 'Father Off. Mo.' && s.parents.father.office_mobile}
                                            {f === 'Father Off. Extension' && s.parents.father.office_extension}
                                            {f === 'Father Off. Email' && s.parents.father.office_email}
                                            {f === 'Father Off. Website' && s.parents.father.office_website}
                                            {f === 'Father Income' && s.parents.father.annual_income}
                                            {f === 'Mother Full Name' && s.parents.mother.mother_name + s.parents.mother.last_name}
                                            {f === 'Mother Name' && s.parents.mother.mother_name}
                                            {f === 'Mother Middle Name' && s.parents.mother.middle_name}
                                            {f === 'Mother Last Name' && s.parents.mother.last_name}
                                            {f === 'Mother DOB' && moment(s.parents.mother.dob).format('DD-MMM-YYYY')}
                                            {f === 'Mother Address' && s.parents.mother.residence_address}
                                            {f === 'Mother Off. Add.' && s.parents.mother.office_address}
                                            {f === 'Mother Email 1' && s.parents.mother.email}
                                            {f === 'Mother Email 2' && s.parents.mother.alternate_email}
                                            {f === 'Mother Profession' && s.parents.mother.profession}
                                            {f === 'Mother Comp. Name' && s.parents.mother.company_name}
                                            {f === 'Mother Business Of' && s.parents.mother.business_details}
                                            {f === 'Mother Professional' && s.parents.mother.profession}
                                            {f === 'Mother Others' && ''}
                                            {f === 'Mother Service In' && s.parents.mother.service_in}
                                            {f === 'Mother Off. Phone' && s.parents.mother.office_phone}
                                            {f === 'Mother Off. Mo.' && s.parents.mother.office_mobile}
                                            {f === 'Mother Off. Extension' && s.parents.mother.office_extension}
                                            {f === 'Mother Off. Email' && s.parents.mother.office_email}
                                            {f === 'Mother Off. Website' && s.parents.mother.office_website}
                                            {f === 'Date Of Anniversary' && moment(s.parents.mother.anniversary_date).format('DD-MMM-YYYY')}
                                            {f === 'Parent Status' && s.parents.father.parent_status}
                                            {f === 'Mother Income' && s.parents.mother.annual_income}
                                            {f === 'Guar. Name' && s.guardian_details.guardian_name}
                                            {f === 'Guar. Designation' && s.guardian_details.designation}
                                            {f === 'Guar. Phone' && ''}
                                            {f === 'Guar. DOB' && ''}
                                            {f === 'Guar. Address' && ''}
                                            {f === 'Guar. Office Address' && ''}
                                            {f === 'Guar. Email 1' && ''}
                                            {f === 'Guar. Email 2' && ''}
                                            {f === 'Guar. Mobile' && ''}
                                            {f === 'Guar. Profession' && s.guardian_details.profession}
                                            {f === 'Guar. Comp. Name' && s.guardian_details.company_name}
                                            {f === 'Guar. Professional' && ''}
                                            {f === 'Guar. Business Of' && ''}
                                            {f === 'Guar. Others' && ''}
                                            {f === 'Guar. Guar. Service In' && ''}
                                            {f === 'Guar. Off. Phone' && ''}
                                            {f === 'Guar. Off. Mo.' && ''}
                                            {f === 'Guar. Off. Extension' && ''}
                                            {f === 'Guar. Off. Email' && ''}
                                            {f === 'Guar. Off. Website' && ''}
                                            {f === 'Guar. Income' && ''}
                                            {f === 'Guar. Other Info' && ''}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        ))}


                    </View>
                ) : (
                    <Text style={{fontSize:20, color:'#435680', marginLeft:20}}>No record found!</Text>
                )}










                {/* Footer */}
                <View style={{display:'flex', flexDirection:'row', alignItems:'center', gap:50, fontSize:11, paddingHorizontal:10, marginHorizontal:5, paddingVertical:5, marginVertical:5, borderTopWidth:1, borderTopColor:'#ccc'}}>
                    <Text>Academic Year: {activeAcademicYear}</Text>
                    <Text>Student Report printed on {moment(new Date()).format('DD-MMM-YYYY')} at {moment(new Date()).format('hh:mm A')}</Text>
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