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
            height:'100%',
            display:'flex',
            flexDirection:'column'
        }
    });


    return(
        <Document>
            <Page  style={styles.body}>

                <View style={{
                    display:'flex',
                    flexDirection:'row',
                    backgroundColor:'#1C7EC1',
                    paddingVertical:6,
                    paddingHorizontal:10,
                    justifyContent:'space-between'
                }}>
                    {/* <Image
                        src='https://qodum.s3.amazonaws.com/students/AARAV+SINGH001'
                        style={{width:100, height:100}}
                    /> */}
                    <Text>STUDENT IMAGE</Text>
                    <View style={{display:'flex', flexDirection:'row', gap:2}}>
                        <View style={{
                            gap:2,
                            display:'flex',
                            color:'#fff',
                            alignItems:'center',
                            flexDirection:'column'
                        }}>
                            <Text style={{fontSize:20}}>School Name</Text>
                            <Text style={{fontSize:16}}>School Address</Text>
                            <View style={{display:'flex', flexDirection:'row', alignItems:'center', gap:6, fontSize:10}}>
                                <Text>Ph. No. : 132456478</Text>
                                <Text>Mo. : 132456478</Text>
                            </View>
                        </View>
                        <Text>SCHOOL IMAGE</Text>
                    </View>
                </View>

                <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', paddingHorizontal:10, paddingVertical:5, backgroundColor:'#FFFEFE', paddingTop:20, fontSize:16}}>
                    <View style={{display:'flex', flexDirection:'row', gap:2}}>
                        <View style={{display:'flex', flexDirection:'column', gap:2, borderRightWidth:1, borderRightColor:'#ccc'}}>
                            <Text style={{color:'#1C7EC1'}}>Student's Name: </Text>
                            <Text style={{color:'#1C7EC1'}}>Class: </Text>
                            <Text style={{color:'#1C7EC1'}}>Admission No.: </Text>
                            <Text style={{color:'#1C7EC1'}}>Father's Name: </Text>
                            <Text style={{color:'#1C7EC1'}}>Mother's Name: </Text>
                            <Text style={{color:'#1C7EC1'}}>Mobile: </Text>
                            <Text style={{color:'#1C7EC1'}}>Address: </Text>
                        </View>

                        <View style={{display:'flex', flexDirection:'column', gap:2, marginLeft:10}}>
                            <Text style={{color:'#f00'}}>Student Name</Text>
                            <Text>Class</Text>
                            <Text>Admission No.</Text>
                            <Text>Father's Name</Text>
                            <Text>Mother's Name</Text>
                            <Text>Mobile</Text>
                            <Text>Address</Text>
                        </View>
                    </View>

                    <Text>QR CODE</Text>
                </View>

                <View style={{width:'100%', display:'flex', alignItems:'flex-end', paddingRight:10}}>
                    <Text style={{
                        color:'#fff',
                        paddingVertical:2,
                        paddingHorizontal:6,
                        backgroundColor:'#1C7EC1',
                    }}>
                        2024-2025
                    </Text>
                </View>

            </Page>
        </Document>
    );
};





// Pdf view
const PDFView = ({studentData}:any) => {
    return(
    <PDFViewer className='h-full w-[90%] mt-4 border-[0.5px] border-[#ccc]'>
        <PDF
            studentData={studentData}
        />
    </PDFViewer>
    );
};





// Export
export default PDFView;