'use client';
// Imports
import {Document, Page, View, Text, Image, PDFViewer, StyleSheet, Font} from '@react-pdf/renderer';
import moment from 'moment';





// Pdf file
const PDF = ({pdfData}:any) => {


    // Font
    Font.register({family:'FamilyName', fontStyle:'normal', fontWeight:'normal', fonts:[]});


    // Styles
    const styles = StyleSheet.create({
        body: {
            width:'100%',
            height:'100%'
        }
    });


    return(
        <Document>
            <Page  style={styles.body}>


                {/* Top data */}
                <View style={{display:'flex', flexDirection:'column', alignItems:'center', paddingTop:10, paddingBottom:4, marginHorizontal:4, fontSize:10, borderBottom:1, borderBottomColor:'#F2EADD'}}>
                    <Text style={{fontWeight:400, fontSize:16}}>{pdfData.school_data.school_name}</Text>
                    <Text style={{marginTop:4}}>{pdfData.school_data.school_address}</Text>
                    <Text style={{marginTop:2}}>Website:{pdfData.school_data.website} | Contact:{pdfData.school_data.school_no}</Text>
                    <Text style={{marginTop:2}}>School Affiliation No : 0</Text>
                </View>


                {/* Fees receipt */}
                <View style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center', paddingTop:10, paddingBottom:4, marginHorizontal:4, fontSize:10, borderBottom:1, borderBottomColor:'#F2EADD'}}>
                    <Text style={{fontSize:12, color:'#323232'}}>FEES RECEIPT</Text>

                    {/* Row one */}
                    <View style={{width:'90%', margin:'4px auto', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                        <View style={{flex:2, display:'flex', flexDirection:'row', alignItems:'center'}}>
                            <Text>Rceipt No.:</Text>
                            <Text style={{marginLeft:4, fontSize:10}}>{pdfData.payment_data.receipt_no}</Text>
                        </View>
                        <View style={{flex:1, display:'flex', flexDirection:'row', alignItems:'center', alignSelf:'flex-start'}}>
                            <Text>Date:</Text>
                            <Text style={{marginLeft:4}}>{moment(pdfData.payment_data.received_date).format('D-MMM-yy')}</Text>
                        </View>
                    </View>

                    {/* Row two */}
                    <View style={{width:'90%', margin:'4px auto', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                        <View style={{flex:2, display:'flex', flexDirection:'row', alignItems:'center'}}>
                            <Text>Ref No.:</Text>
                            <Text style={{marginLeft:4, fontSize:10}}></Text>
                        </View>
                        <View style={{flex:1, display:'flex', flexDirection:'row', alignItems:'center', alignSelf:'flex-start'}}>
                            <Text>Class:</Text>
                            <Text style={{marginLeft:4}}>{pdfData.payment_data.class_name}</Text>
                        </View>
                    </View>

                    {/* Row three */}
                    <View style={{width:'90%', margin:'4px auto', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                        <View style={{flex:2, display:'flex', flexDirection:'row', alignItems:'center'}}>
                            <Text>Adm No.:</Text>
                            <Text style={{marginLeft:4, fontSize:10}}>{pdfData.payment_data.adm_no}</Text>
                        </View>
                        <View style={{flex:1, display:'flex', flexDirection:'row', alignItems:'center', alignSelf:'flex-start'}}>
                            <Text>Installment:</Text>
                            <Text style={{marginLeft:4}}>{pdfData.payment_data.installments.map((i:any) => ` ${i}`)}</Text>
                        </View>
                    </View>

                    {/* Row Four */}
                    <View style={{width:'90%', margin:'4px auto', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                        <View style={{flex:2, display:'flex', flexDirection:'row', alignItems:'center'}}>
                            <Text>Name:</Text>
                            <Text style={{marginLeft:4, fontSize:10}}>{pdfData.payment_data.student}</Text>
                        </View>
                        <View style={{flex:1, display:'flex', flexDirection:'row', alignItems:'center', alignSelf:'flex-start'}}>
                            <Text>Paymode:</Text>
                            <Text style={{marginLeft:4}}>{pdfData.payment_data.paymode}</Text>
                        </View>
                    </View>

                    {/* Row Five */}
                    <View style={{width:'90%', margin:'4px auto', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                        <View style={{flex:2, display:'flex', flexDirection:'row', alignItems:'center'}}>
                            <Text>Fatehr Name:</Text>
                            <Text style={{marginLeft:4, fontSize:10}}>{pdfData.payment_data.father_name}</Text>
                        </View>
                        <View style={{flex:1, display:'flex', flexDirection:'row', alignItems:'center', alignSelf:'flex-start'}}>
                            <Text>Fee Type:</Text>
                            <Text style={{marginLeft:4}}>{pdfData.payment_data.fee_type}</Text>
                        </View>
                    </View>

                    {/* Row Six */}
                    <View style={{width:'90%', margin:'4px auto', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                        <View style={{flex:2, display:'flex', flexDirection:'row', alignItems:'center'}}>
                            <Text>Board:</Text>
                            <Text style={{marginLeft:4, fontSize:10}}>{pdfData.payment_data.board}</Text>
                        </View>
                    </View>
                </View>


                {/* Table */}
                <View style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center', marginTop:20, fontSize:10, border:1, borderColor:'#C19859'}}>
                    {/* Headers */}
                    <View style={{display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:'#F2EADD', borderBottomWidth:1, borderBottomColor:'#C19859'}}>
                        <Text style={{flexBasis:'20%', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', paddingVertical:2,  borderRightWidth:1, borderRightColor:'#C19859'}}>HEAD NAME</Text>
                        <Text style={{flexBasis:'20%', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', paddingVertical:2,  borderRightWidth:1, borderRightColor:'#C19859'}}>ACTUAL AMOUNT</Text>
                        <Text style={{flexBasis:'20%', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', paddingVertical:2,  borderRightWidth:1, borderRightColor:'#C19859'}}>CONCESSION AMOUNT</Text>
                        <Text style={{flexBasis:'20%', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', paddingVertical:2,  borderRightWidth:1, borderRightColor:'#C19859'}}>LAST PAID</Text>
                        <Text style={{flexBasis:'20%', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', paddingVertical:2,  borderRightWidth:1, borderRightColor:'#C19859'}}>PAID AMOUNT</Text>
                    </View>
                    {/* Values */}
                    <View style={{display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:'#fff'}}>
                        <Text style={{flexBasis:'20%', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', paddingVertical:2,  borderRightWidth:1, borderRightColor:'#C19859'}}>TUITION FEE</Text>
                        <Text style={{flexBasis:'20%', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', paddingVertical:2,  borderRightWidth:1, borderRightColor:'#C19859'}}>1000</Text>
                        <Text style={{flexBasis:'20%', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', paddingVertical:2,  borderRightWidth:1, borderRightColor:'#C19859'}}>0</Text>
                        <Text style={{flexBasis:'20%', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', paddingVertical:2,  borderRightWidth:1, borderRightColor:'#C19859'}}>2</Text>
                        <Text style={{flexBasis:'20%', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', paddingVertical:2,  borderRightWidth:1, borderRightColor:'#C19859'}}>1</Text>
                    </View>
                </View>

                {/* Paid area */}
                <View style={{display:'flex', flexDirection:'column', marginTop:20, paddingHorizontal:10, fontSize:12}}>
                    <View style={{display:'flex', alignItems:'center', flexDirection:'row', justifyContent:'space-between'}}>
                        {/* Amount */}
                        <View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                            <Text>Amount (in words): </Text>
                            <Text>ONE ONLY</Text>
                        </View>
                        {/* Total Paid */}
                        <View style={{display:'flex', flexDirection:'row', alignItems:'center', minWidth:200, paddingLeft:4, paddingVertical:2, backgroundColor:'#C19859'}}>
                            <Text>Total Paid: </Text>
                            <Text>1</Text>
                        </View>
                    </View>
                    <View style={{display:'flex', alignItems:'center', flexDirection:'row', justifyContent:'flex-end', marginTop:4}}>
                        {/* Total Paid */}
                        <View style={{display:'flex', flexDirection:'row', alignItems:'center', minWidth:200, paddingLeft:4, paddingVertical:2, backgroundColor:'#C19859'}}>
                            <Text>Advance/Dues:</Text>
                            <Text>1000</Text>
                        </View>
                    </View>
                    <View style={{display:'flex', alignItems:'center', flexDirection:'row', justifyContent:'flex-end', marginTop:4}}>
                        {/* Total Paid */}
                        <View style={{display:'flex', flexDirection:'row', alignItems:'center', minWidth:200, paddingLeft:4, paddingVertical:2}}>
                            <Text>Cashier</Text>
                        </View>
                    </View>
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