'use client';
// Imports
import QRCodeLib from 'qrcode';
import {useEffect, useState} from 'react';
import {Document, Page, View, Text, PDFViewer, StyleSheet, Font, Image} from '@react-pdf/renderer';





// Pdf file
const PDF = ({studentData}:any) => {


    // Font
    Font.register({family:'Antiqua', src:'/fonts/Inknut_Antiqua/InknutAntiqua-Regular.ttf'});


    // Styles
    const styles = StyleSheet.create({
        body:{
            fontSize:8,
            width:'100%',
            height:'100%',
            paddingTop:20,
            display:'flex',
            alignItems:'center',
            fontFamily:'Antiqua',
            justifyContent:'flex-start'
        }
    });


    // QR image
    const [qrImage, setQRImage] = useState('');


    useEffect(() => {
        const generateQRCode = async () => {
          try {
            const qrDataURL = await QRCodeLib.toDataURL(`Name:${studentData.name} - Admission No.: ${studentData.adm_no}`, {width:100});
            setQRImage(qrDataURL);
          } catch (error) {
            console.error('Error generating QR code:', error);
          }
        };
    
        generateQRCode();
    }, []);


    return(
        <Document>
            <Page  style={styles.body}>
                <View style={{width:323.56, height:203.95, position:'relative', borderWidth:0.5, borderColor:'#ccc'}}>

                    {/* Background image */}
                    <View style={{height:'100%', width:'100%', position:'absolute', top:0, left:0}}>
                        <Image
                            source='/assets/IdCardBackground.png'
                            style={{width:'100%', height:'100%'}}
                        />
                    </View>


                    {/* Page */}
                    <View style={{height:'100%', width:'100%', display:'flex', flexDirection:'column'}}>
                        {/* Top area */}
                        <View style={{position:'relative', display:'flex', flexDirection:'row', justifyContent:'flex-end', paddingVertical:10, paddingHorizontal:10, backgroundColor:'#1C7EC1', color:'#fff'}}>
                            {/* Student image */}
                            <View style={{position:'absolute', display:'flex', alignItems:'center', justifyContent:'center', height:94.4882, width:82.677, top:5, left:10, borderWidth:0.5, borderColor:'#ccc', backgroundColor:'#fff', color:'#000', fontSize:10}}>
                                {studentData.image === '' ? (
                                    <Text>No photo</Text>
                                ) : (
                                    <Image style={{height:'100%', width:'100%'}} src={studentData.image}/>
                                )}
                            </View>

                            {/* School data */}
                            <View style={{display:'flex', flexDirection:'column', alignItems:'center', gap:4}}>
                                <Text style={{fontSize:9}}>{studentData.school_name || '-'}</Text>
                                <Text style={{fontSize:8}}>{studentData.school_address || '-'}</Text>
                                <View style={{display:'flex', flexDirection:'row', alignItems:'center', gap:6, fontSize:8}}>
                                    <Text>Ph. No. : {studentData.school_phone || '-'}</Text>
                                    <Text>Mo. : {studentData.school_mo || '-'}</Text>
                                </View>
                            </View>

                            {/* School image */}
                            {studentData.image === '' ? (
                                <View style={{display:'flex', alignItems:'center', justifyContent:'center', width:40, height:40, borderWidth:0.5, borderColor:'#ccc', backgroundColor:'#fff', color:'#000', fontSize:7, borderRadius:'100%'}}>
                                    <Text>No photo</Text>
                                </View>
                            ) : (
                                <Image style={{height:40, width:40}} src={studentData.school_image}/>
                            )}
                        </View>

                        {/* Bottom area */}
                        <View style={{display:'flex', flexDirection:'row', paddingVertical:30, paddingHorizontal:10, fontSize:10}}>
                            <View style={{position:'relative', display:'flex', flexDirection:'row', width:200}}>
                                <Text style={{position:'absolute', width:'100%', top:-35, left:90, fontSize:11, color:'#FF0605'}}>{studentData.name || '-'}</Text>
                                <Text style={{position:'absolute', width:'100%', top:-20, left:90, fontSize:11}}>{studentData.class_name || '-'}</Text>
                                <View style={{display:'flex', flexDirection:'column', gap:0, color:'#129ADD', borderRightWidth:1, paddingRight:2, borderRightColor:'#000', borderRightStyle:'dashed'}}>
                                    <Text>Adm No.</Text>
                                    <Text>Father's Name</Text>
                                    <Text>Mother's Name</Text>
                                    <Text>Mobile</Text>
                                    <Text>Address</Text>
                                </View>
                                <View style={{display:'flex', flexDirection:'column', gap:0, paddingLeft:2}}>
                                    <Text>{studentData.adm_no || '-'}</Text>
                                    <Text>Mr. {studentData.father_name || '-'}</Text>
                                    <Text>Mrs. {studentData.mother_name || '-'}</Text>
                                    <Text>{studentData.mobile || '-'}</Text>
                                    <Text>{studentData.address || '-'}</Text>
                                </View>
                            </View>

                            <View style={{position:'relative', height:'100%', width:123.56}}>
                                <View style={{position:'absolute', top:-10, right:-10, width:80, height:80}}>
                                    <Image src={qrImage} />
                                </View>
                                <Text style={{position:'absolute', bottom:-14, right:-8, gap:4, fontSize:10, color:'#fff', paddingHorizontal:6, backgroundColor:'#1C7EC1'}}>
                                    Session {studentData.session}
                                </Text>
                            </View>
                        </View>
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









// {/* <View style={{
//     borderWidth:1,
//     paddingBottom:1,
//     display:'flex',
//     width:'323.56px',
//     height:'203.95px',
//     flexDirection:'column',
//     borderColor:'#ccc'
// }}> */}


    {/* Top Area */}
    {/* <View style={{
        display:'flex',
        height:100,
        flexDirection:'row',
        position:'relative',
        paddingVertical:0,
        paddingHorizontal:10,
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:'#1C7EC1',
    }}> */}
            {/* Student image */}
            {/* <View style={{height:'90%', display:'flex', justifyContent:'center', alignItems:'center',  overflow:'hidden'}}>
                {studentData.image === '' ? (
                    <Text style={{display:'flex', alignItems:'center', justifyContent:'center', height:60, width:60, borderWidth:1, borderColor:'#ccc', fontSize:10}}>No Image</Text>
                ) : (
                    <Image style={{height:60, width:60}} src={studentData.image}/>
                )}
            </View> */}

            {/* Schoo details */}
            {/* <View style={{display:'flex', flexDirection:'row', alignItems:'center', gap:2}}>
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
            </View> */}
    {/* </View> */}


    {/* Bottom Area */}
    {/* <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', paddingHorizontal:10, backgroundColor:'#FFFEFE', paddingTop:15, fontSize:11}}>
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
    </View> */}


    {/* Session */}
    {/* <View style={{width:'100%', display:'flex', alignItems:'flex-end', paddingRight:10}}>
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
    </View> */}

// </View>