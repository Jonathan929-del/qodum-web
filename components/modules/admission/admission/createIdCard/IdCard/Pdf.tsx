'use client';
// Imports
import {Document, Page, View, Text, PDFViewer, StyleSheet, Font, Image} from '@react-pdf/renderer';





// Pdf file
const PDF = ({studentData}:any) => {


    // Font
    Font.register({family:'FamilyName', fontStyle:'normal', fontWeight:'normal', fonts:[]});


    // Styles
    const styles = StyleSheet.create({
        body: {
            width:'100%',
            height:'100%',
            paddingTop:20,
            display:'flex',
            alignItems:'center',
            justifyContent:'flex-start'
        }
    });


    return(
        <Document>
            <Page  style={styles.body}>
                <View style={{
                    borderWidth:1,
                    paddingBottom:1,
                    display:'flex',
                    width:'323.56px',
                    height:'203.95px',
                    flexDirection:'column',
                    borderColor:'#ccc'
                }}>


                    {/* Top Area */}
                    <View style={{
                        display:'flex',
                        height:100,
                        flexDirection:'row',
                        position:'relative',
                        paddingVertical:0,
                        paddingHorizontal:10,
                        alignItems:'center',
                        justifyContent:'space-between',
                        backgroundColor:'#1C7EC1',
                    }}>
                            {/* Student image */}
                            <View style={{height:'90%', display:'flex', justifyContent:'center', alignItems:'center',  overflow:'hidden'}}>
                                {studentData.image === '' ? (
                                    <Text style={{display:'flex', alignItems:'center', justifyContent:'center', height:60, width:60, borderWidth:1, borderColor:'#ccc', fontSize:10}}>No Image</Text>
                                ) : (
                                    <Image style={{height:60, width:60}} src={studentData.image}/>
                                )}
                            </View>

                            {/* Schoo details */}
                            <View style={{display:'flex', flexDirection:'row', alignItems:'center', gap:2}}>
                                <View style={{
                                    gap:2,
                                    display:'flex',
                                    color:'#fff',
                                    alignItems:'center',
                                    flexDirection:'column'
                                }}>
                                    <Text style={{fontSize:12}}>{studentData.school_name}</Text>
                                    <Text style={{fontSize:11}}>{studentData.school_address}</Text>
                                    <View style={{display:'flex', flexDirection:'row', alignItems:'center', gap:6, fontSize:10}}>
                                        <Text>Ph. No. : {studentData.school_phone}</Text>
                                        <Text>Mo. : {studentData.school_mo}</Text>
                                    </View>
                                </View>
                                {studentData.school_image === '' ? (
                                    <Text style={{display:'flex', alignItems:'center', justifyContent:'center', height:60, width:60, borderWidth:1, borderColor:'#ccc', fontSize:10}}>No Image</Text>  
                                ) : (
                                    <Image style={{height:40, width:40}} src={studentData.school_image}/>
                                )}
                            </View>
                    </View>


                    {/* Bottom Area */}
                    <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', paddingHorizontal:10, backgroundColor:'#FFFEFE', paddingTop:15, fontSize:11}}>
                        <View style={{display:'flex', flexDirection:'row', gap:2}}>
                            <View style={{display:'flex', flexDirection:'column', gap:4, borderRightWidth:1, borderRightColor:'#ccc'}}>
                                <Text style={{color:'#1C7EC1'}}>Student's Name: </Text>
                                <Text style={{color:'#1C7EC1'}}>Class: </Text>
                                <Text style={{color:'#1C7EC1'}}>Admission No.: </Text>
                                <Text style={{color:'#1C7EC1'}}>Father's Name: </Text>
                                <Text style={{color:'#1C7EC1'}}>Mother's Name: </Text>
                                <Text style={{color:'#1C7EC1'}}>Mobile: </Text>
                                <Text style={{color:'#1C7EC1'}}>Address: </Text>
                            </View>

                            <View style={{display:'flex', flexDirection:'column', gap:2, marginLeft:10}}>
                                <Text style={{color:'#f00'}}>{studentData.name || '-'}</Text>
                                <Text>{studentData.class_name || '-'}</Text>
                                <Text>{studentData.adm_no || '-'}</Text>
                                <Text>Mr. {studentData.father_name || '-'}</Text>
                                <Text>Mrs. {studentData.mother_name || '-'}</Text>
                                <Text>{studentData.mobile || '-'}</Text>
                                <Text>{studentData.address || '-'}</Text>
                            </View>
                        </View>

                        <Text>QR CODE</Text>
                    </View>


                    {/* Session */}
                    <View style={{width:'100%', display:'flex', alignItems:'flex-end', paddingRight:10}}>
                        <Text style={{
                            gap:4,
                            fontSize:10,
                            color:'#fff',
                            paddingBottom:60,
                            paddingVertical:2,
                            paddingHorizontal:6,
                            backgroundColor:'#1C7EC1'
                        }}>
                            Session {studentData.session}
                        </Text>
                    </View>

                </View>
            </Page>
        </Document>
    );
};





// Pdf view
const PDFView = ({studentData}:any) => {
    return(
    <PDFViewer className='w-[90%] h-full mt-4 border-[0.5px] border-[#ccc] custom-sidebar-scrollbar'>
        <PDF
            studentData={studentData}
        />
    </PDFViewer>
    );
};





// Export
export default PDFView;