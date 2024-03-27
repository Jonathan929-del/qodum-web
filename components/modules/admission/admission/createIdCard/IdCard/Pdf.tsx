'use client';
// Imports
import QRCodeLib from 'qrcode';
import {useEffect, useState} from 'react';
import {Document, Page, View, Text, PDFViewer, StyleSheet, Font, Image} from '@react-pdf/renderer';





// Pdf file
const PDF = ({studentData}:any) => {


    // Font registries
    Font.register({
        family:'Antiqua',
        fonts:[
            {src:'/fonts/Inknut_Antiqua/InknutAntiqua-Regular.ttf'},
            {src:'/fonts/Inknut_Antiqua/InknutAntiqua-Bold.ttf', fontWeight:'bold'}
        ]
    });
    Font.register({
        family:'Poppins',
        fonts:[
            {src:'/fonts/Poppins/Poppins-Bold.ttf', fontWeight:'bold'}
        ]
    });


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


    // Schoo name
    const [schoolName, setSchoolName] = useState<string>('');
  

    // Use effect
    useEffect(() => {
        const generateQRCode = async () => {
          try {

            // Setting QR code
            const qrDataURL = await QRCodeLib.toDataURL(`Name:${studentData.name} - Admission No.: ${studentData.adm_no}`, {width:100});
            setQRImage(qrDataURL);


            // School name font
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (ctx) {
                const width = 400;
                const height = 200;
                canvas.width = width;
                canvas.height = height;
                ctx.imageSmoothingEnabled = true;
                ctx.font = '40px OldEnglish, Arial';
                ctx.fillStyle = 'white';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(studentData.school_name, width / 2, height / 2);
                const dataUrl = canvas.toDataURL();
                setSchoolName(dataUrl);
            };
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
                        <View style={{position:'relative', display:'flex', flexDirection:'row', justifyContent:'flex-end', paddingVertical:10, paddingHorizontal:10, backgroundColor:studentData.color, color:'#fff'}}>
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
                                <View style={{position:'relative'}}>
                                    <Text style={{color:studentData.color}}>-</Text>
                                    <View style={{position:'absolute', top:-30, left:-95}}>
                                        {schoolName && <Image src={schoolName} style={{width:190, height:80}} />}
                                    </View>
                                </View>
                                <Text style={{fontSize:8}}>{studentData.school_address || '-'}</Text>
                                <View style={{display:'flex', flexDirection:'row', alignItems:'center', gap:6, fontSize:8}}>
                                    <View style={{display:'flex', flexDirection:'row', alignItems:'center', gap:2}}>
                                        <Text>Ph. No. :</Text>
                                        <Text style={{fontFamily:'Poppins', paddingTop:2}}>{studentData.school_phone || '-'}</Text>
                                    </View>
                                    <View style={{display:'flex', flexDirection:'row', alignItems:'center', gap:2}}>
                                        <Text>Mo. :</Text>
                                        <Text style={{fontFamily:'Poppins', paddingTop:2}}>{studentData.school_mo || '-'}</Text>
                                    </View>
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
                                <Text style={{position:'absolute', width:'100%', top:-35, left:90, fontSize:11, color:'#FF0605', fontWeight:'bold'}}>{studentData.name || '-'}</Text>
                                <Text style={{position:'absolute', width:'100%', top:-20, left:90, fontSize:11}}>{studentData.class_name || '-'}</Text>
                                <View style={{position:'relative', display:'flex', flexDirection:'column', gap:0, color:studentData.color, paddingRight:2}}>

                                    {/* Line */}
                                    <View style={{position:'absolute', top:10, right:0, height:75, width:1, backgroundColor:'#fff', borderRightWidth:1, borderRightColor:'#000', borderStyle:'dashed'}} />
                                    <Text>Adm No.</Text>
                                    <Text>Father's Name</Text>
                                    <Text>Mother's Name</Text>
                                    <Text>Mobile</Text>
                                    <Text>Address</Text>
                                </View>
                                <View style={{position:'relative', display:'flex', flexDirection:'column', gap:0, paddingLeft:6}}>
                                    <Text>{studentData.adm_no || '-'}</Text>
                                    <Text>Mr. {studentData.father_name || '-'}</Text>
                                    <Text>Mrs. {studentData.mother_name || '-'}</Text>
                                    <Text>{studentData.mobile || '-'}</Text>
                                    <Text style={{color:'#fff'}}>-</Text>
                                    <Text style={{position:'absolute', width:200, display:'flex', flexWrap:'wrap', lineHeight:1, top:60, left:5}}>{studentData.address || '-'}</Text>
                                </View>
                            </View>

                            <View style={{position:'relative', height:'100%', width:123.56}}>
                                <View style={{position:'absolute', top:-10, right:-10, width:80, height:80}}>
                                    <Image src={qrImage} />
                                </View>

                                {/* Session */}
                                <View style={{position:'absolute', height:16, width:110, bottom:-29, right:-4, gap:4, fontSize:10, color:'#fff', paddingHorizontal:6, backgroundColor:studentData.color}} />
                                <Text style={{position:'absolute', bottom:-33, right:0, gap:4, fontSize:10, color:'#fff'}}>
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