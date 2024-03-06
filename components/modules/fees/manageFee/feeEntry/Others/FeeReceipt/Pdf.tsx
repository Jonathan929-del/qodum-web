'use client';
// Imports
import {Document, Page, View, Text, Image, PDFViewer, StyleSheet, Font} from '@react-pdf/renderer';
import moment from 'moment';





// Pdf file
const PDF = ({receiptPaymentData, totalNumberGenerator}:any) => {


    // Font
    Font.register({family:'FamilyName', fontStyle:'normal', fontWeight:'normal', fonts:[]});


    // Styles
    const styles = StyleSheet.create({
        body: {
            width:'100%',
            height:'100%'
        }
    });


    // Numbers to words
    const numberToWords = (n:any) => {
        var num = "zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split(" ");
        var tens = "twenty thirty forty fifty sixty seventy eighty ninety".split(" ");
        if (n < 20) return num[n];
        var digit = n%10;
        if (n < 100) return tens[~~(n/10)-2] + (digit? "-" + num[digit]: "");
        if (n < 1000) return num[~~(n/100)] +" hundred" + (n%100 == 0? "": " " + numberToWords(n%100));
        return numberToWords(~~(n/1000)) + " thousand" + (n%1000 != 0? " " + numberToWords(n%1000): "");
    };


    return(
        <Document>
            <Page  style={styles.body}>


                {/* Top data */}
                <View style={{display:'flex', flexDirection:'column', alignItems:'center', paddingTop:10, paddingBottom:4, marginHorizontal:4, fontSize:10, borderBottom:1, borderBottomColor:'#F2EADD'}}>
                    <Text style={{fontWeight:400, fontSize:16}}>{receiptPaymentData.school_name}</Text>
                    <Text style={{marginTop:4}}>{receiptPaymentData.school_address}</Text>
                    <Text style={{marginTop:2}}>Website:{receiptPaymentData.website} | Contact:{receiptPaymentData.school_no}</Text>
                    <Text style={{marginTop:2}}>School Affiliation No : 0</Text>
                </View>


                {/* Fees receipt */}
                <View style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center', paddingTop:10, paddingBottom:4, marginHorizontal:4, fontSize:10, borderBottom:1, borderBottomColor:'#F2EADD'}}>
                    <Text style={{fontSize:12, color:'#323232'}}>FEES RECEIPT</Text>

                    {/* Row one */}
                    <View style={{width:'90%', margin:'4px auto', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                        <View style={{flex:2, display:'flex', flexDirection:'row', alignItems:'center'}}>
                            <Text>Rceipt No.:</Text>
                            <Text style={{marginLeft:4, fontSize:10}}>{receiptPaymentData.receipt_no}</Text>
                        </View>
                        <View style={{flex:1, display:'flex', flexDirection:'row', alignItems:'center', alignSelf:'flex-start'}}>
                            <Text>Date:</Text>
                            <Text style={{marginLeft:4}}>{moment(receiptPaymentData.received_date).format('D-MMM-yy')}</Text>
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
                            <Text style={{marginLeft:4}}>{receiptPaymentData.class_name}</Text>
                        </View>
                    </View>

                    {/* Row three */}
                    <View style={{width:'90%', margin:'4px auto', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                        <View style={{flex:2, display:'flex', flexDirection:'row', alignItems:'center'}}>
                            <Text>Adm No.:</Text>
                            <Text style={{marginLeft:4, fontSize:10}}>{receiptPaymentData.adm_no}</Text>
                        </View>
                        <View style={{flex:1, display:'flex', flexDirection:'row', alignItems:'center', alignSelf:'flex-start'}}>
                            <Text>Installment:</Text>
                            <Text style={{marginLeft:4}}>{receiptPaymentData.installments.map((i:any) => ` ${i}`)}</Text>
                        </View>
                    </View>

                    {/* Row Four */}
                    <View style={{width:'90%', margin:'4px auto', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                        <View style={{flex:2, display:'flex', flexDirection:'row', alignItems:'center'}}>
                            <Text>Name:</Text>
                            <Text style={{marginLeft:4, fontSize:10}}>{receiptPaymentData.student}</Text>
                        </View>
                        <View style={{flex:1, display:'flex', flexDirection:'row', alignItems:'center', alignSelf:'flex-start'}}>
                            <Text>Paymode:</Text>
                            <Text style={{marginLeft:4}}>{receiptPaymentData.paymode}</Text>
                        </View>
                    </View>

                    {/* Row Five */}
                    <View style={{width:'90%', margin:'4px auto', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                        <View style={{flex:2, display:'flex', flexDirection:'row', alignItems:'center'}}>
                            <Text>Father Name:</Text>
                            <Text style={{marginLeft:4, fontSize:10}}>{receiptPaymentData.father_name}</Text>
                        </View>
                        <View style={{flex:1, display:'flex', flexDirection:'row', alignItems:'center', alignSelf:'flex-start'}}>
                            <Text>Fee Type:</Text>
                            <Text style={{marginLeft:4}}>{receiptPaymentData.fee_type}</Text>
                        </View>
                    </View>

                    {/* Row Six */}
                    <View style={{width:'90%', margin:'4px auto', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                        <View style={{flex:2, display:'flex', flexDirection:'row', alignItems:'center'}}>
                            <Text>Board:</Text>
                            <Text style={{marginLeft:4, fontSize:10}}>{receiptPaymentData.board}</Text>
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
                    {receiptPaymentData.paid_heads.map((h:any) => (
                        <View style={{display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:'#fff', borderBottomWidth:1, borderBottomColor:'#C19859'}}>
                            <Text style={{flexBasis:'20%', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', paddingVertical:2,  borderRightWidth:1, borderRightColor:'#C19859'}}>{h.head_name}</Text>
                            <Text style={{flexBasis:'20%', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', paddingVertical:2,  borderRightWidth:1, borderRightColor:'#C19859'}}>{totalNumberGenerator(h.amounts.map((a:any) => Number(a.value)))}</Text>
                            <Text style={{flexBasis:'20%', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', paddingVertical:2,  borderRightWidth:1, borderRightColor:'#C19859'}}>{totalNumberGenerator(h.amounts.map((a:any) => Number(a.conc_amount)))}</Text>
                            <Text style={{flexBasis:'20%', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', paddingVertical:2,  borderRightWidth:1, borderRightColor:'#C19859'}}>{totalNumberGenerator(h.amounts.map((a:any) => Number(a.last_rec_amount)))}</Text>
                            <Text style={{flexBasis:'20%', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', paddingVertical:2,  borderRightWidth:1, borderRightColor:'#C19859'}}>{totalNumberGenerator(h.amounts.map((a:any) => Number(a.paid_amount)))}</Text>
                        </View>
                    ))}
                    {/* Total */}
                    <View style={{display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:'#fff'}}>
                        <Text style={{flexBasis:'20%', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', paddingVertical:2,  borderRightWidth:1, borderRightColor:'#C19859'}}>Total</Text>
                        <Text style={{flexBasis:'20%', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', paddingVertical:2,  borderRightWidth:1, borderRightColor:'#C19859'}}>{totalNumberGenerator(receiptPaymentData.paid_heads.map((h:any) => totalNumberGenerator(h.amounts.map((a:any) => Number(a.value)))))}</Text>
                        <Text style={{flexBasis:'20%', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', paddingVertical:2,  borderRightWidth:1, borderRightColor:'#C19859'}}>{totalNumberGenerator(receiptPaymentData.paid_heads.map((h:any) => totalNumberGenerator(h.amounts.map((a:any) => Number(a.conc_amount)))))}</Text>
                        <Text style={{flexBasis:'20%', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', paddingVertical:2,  borderRightWidth:1, borderRightColor:'#C19859'}}>{totalNumberGenerator(receiptPaymentData.paid_heads.map((h:any) => totalNumberGenerator(h.amounts.map((a:any) => Number(a.last_rec_amount)))))}</Text>
                        <Text style={{flexBasis:'20%', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', paddingVertical:2,  borderRightWidth:1, borderRightColor:'#C19859'}}>{totalNumberGenerator(receiptPaymentData.paid_heads.map((h:any) => totalNumberGenerator(h.amounts.map((a:any) => Number(a.paid_amount)))))}</Text>
                    </View>
                </View>

                {/* Paid area */}
                <View style={{display:'flex', flexDirection:'column', marginTop:20, paddingHorizontal:10, fontSize:12}}>
                    <View style={{display:'flex', alignItems:'center', flexDirection:'row', justifyContent:'space-between'}}>
                        {/* Amount */}
                        <View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                            <Text>Amount (in words): </Text>
                            <Text>{numberToWords(totalNumberGenerator(receiptPaymentData.paid_heads.map((h:any) => totalNumberGenerator(h.amounts.map((a:any) => Number(a.paid_amount))))))} ONLY</Text>
                        </View>
                        {/* Total Paid */}
                        <View style={{display:'flex', flexDirection:'row', alignItems:'center', minWidth:200, paddingLeft:4, paddingVertical:2, backgroundColor:'#C19859'}}>
                            <Text>Total Paid: </Text>
                            <Text>{totalNumberGenerator(receiptPaymentData.paid_heads.map((h:any) => totalNumberGenerator(h.amounts.map((a:any) => Number(a.paid_amount)))))}</Text>
                        </View>
                    </View>
                    <View style={{display:'flex', alignItems:'center', flexDirection:'row', justifyContent:'flex-end', marginTop:4}}>
                        {/* Total Paid */}
                        <View style={{display:'flex', flexDirection:'row', alignItems:'center', minWidth:200, paddingLeft:4, paddingVertical:2, backgroundColor:'#C19859'}}>
                            <Text>Advance/Dues:</Text>
                            <Text>{receiptPaymentData.advance_dues_number}</Text>
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
const PDFView = ({receiptPaymentData, totalNumberGenerator}:any) => {
    return(
    <PDFViewer className='h-full w-[90%] mt-4 border-[0.5px] border-[#ccc]'>
        <PDF
            receiptPaymentData={receiptPaymentData}
            totalNumberGenerator={totalNumberGenerator}
        />
    </PDFViewer>
    );
};





// Export
export default PDFView;