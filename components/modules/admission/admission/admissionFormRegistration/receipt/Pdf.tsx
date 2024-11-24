'use client';
// Imports
import moment from 'moment';
import {Document, Page, View, Text, PDFViewer, StyleSheet, Font, Image, pdf} from '@react-pdf/renderer';





// Pdf file
const PDF = ({pdfData}:any) => {

    // Font
    Font.register({family:'FamilyName', fontStyle:'normal', fontWeight:'normal', fonts:[]});


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


    // Styles
    const styles = StyleSheet.create({
        body: {
            paddingHorizontal:10,
            height:'100%'
        }
    });

    return(
        <Document>
            <Page  style={styles.body}>
                
                {/* Top data */}
                <View style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingTop:10, paddingBottom:4, marginHorizontal:4, fontSize:10, borderBottomWidth:1, borderBottomColor:'#ccc'}}>
                    <View style={{flex:1}}>
                        <Image
                            style={{width:100, height:100}}
                            src={pdfData?.school_logo || ''}
                        />
                    </View>
                    <View style={{flexBasis:'70%', display:'flex', flexDirection:'column', alignItems:'flex-end'}}>
                        <Text style={{fontWeight:400, fontSize:22}}>{pdfData?.school_name || ''}</Text>
                        <Text style={{marginTop:2, fontSize:12}}>{pdfData?.school_address || ''}</Text>
                        <Text style={{marginTop:2, fontSize:11}}>Affiliation No.: {pdfData?.school_affiliation_no || ''} | School Code: {pdfData?.school_no || ''}</Text>
                        <Text style={{marginTop:2, fontSize:11}}>Website: {pdfData?.school_website || ''} | Contact: {pdfData?.school_contact_no || ''}</Text>
                    </View>
                </View>


                {/* Receipt */}
                <View style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center', paddingTop:10, paddingBottom:4, marginHorizontal:4}}>
                    <Text style={{fontSize:14, textDecoration:'underline'}}>RECEIPT</Text>
                    <View style={{width:'90%', display:'flex', flexDirection:'row', justifyContent:'flex-end'}}>
                        <Text style={{fontSize:10}}>Date: {moment(new Date()).format('D-MM-YYYY')}</Text>
                    </View>
                </View>


                {/* Data */}
                <View style={{paddingTop:40, paddingHorizontal:20, rowGap:10}}>

                    {/* Row One */}
                    <View style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', gap:10}}>

                        {/* Receipt No. */}
                        <View style={{flex:1, display:'flex', flexDirection:'row', gap:10}}>
                            <Text style={{fontSize:11}}>Receipt No.:</Text>
                            <Text style={{flex:1, fontSize:12, paddingLeft:4, borderBottom:1, borderBottomWidth:1}}></Text>
                        </View>

                        {/* Registration No. */}
                        <View style={{flex:1, display:'flex', flexDirection:'row', gap:10}}>
                            <Text style={{fontSize:11}}>Prospectus / Registration No.:</Text>
                            <Text style={{flex:1, fontSize:12, paddingLeft:4, borderBottom:1, borderBottomWidth:1}}>{pdfData?.registration_no || ''}</Text>
                        </View>

                    </View>

                    {/* Row Two */}
                    <View style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', gap:10}}>

                        {/* Received From */}
                        <View style={{flex:1, display:'flex', flexDirection:'row', gap:10}}>
                            <Text style={{fontSize:11}}>Received With Thanks From:</Text>
                            <Text style={{flex:1, fontSize:12, paddingLeft:4, borderBottom:1, borderBottomWidth:1}}>{pdfData?.received_from || ''}</Text>
                        </View>

                    </View>


                    {/* Row Three */}
                    <View style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', gap:10}}>

                        {/* Son / Daughter of */}
                        <View style={{flex:1, display:'flex', flexDirection:'row', gap:10}}>
                            <Text style={{fontSize:11}}>Son / Daughter of:</Text>
                            <Text style={{flex:1, fontSize:12, paddingLeft:4, borderBottom:1, borderBottomWidth:1}}>{pdfData?.father_name || ''}</Text>
                        </View>

                        {/* Amount(in Numeric) Rs. */}
                        <View style={{flex:1, display:'flex', flexDirection:'row', gap:10}}>
                            <Text style={{fontSize:11}}>Amount(in Numeric) Rs.:</Text>
                            <Text style={{flex:1, fontSize:12, paddingLeft:4, borderBottom:1, borderBottomWidth:1}}>{pdfData?.amount || ''}</Text>
                        </View>

                    </View>


                    {/* Row Four */}
                    <View style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', gap:10}}>

                        {/* Amounts(in word) */}
                        <View style={{flex:1, display:'flex', flexDirection:'row', gap:10}}>
                            <Text style={{fontSize:11}}>Amounts(in word):</Text>
                            <Text style={{flex:1, fontSize:12, paddingLeft:4, borderBottom:1, borderBottomWidth:1}}>{numberToWords(pdfData?.amount || 0)} ONLY</Text>
                        </View>

                    </View>


                    {/* Row Five */}
                    <View style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', gap:10}}>

                        {/* Mode of Payment(Cash/Cheque/DD) */}
                        <View style={{width:'60%', display:'flex', flexDirection:'row', gap:10}}>
                            <Text style={{fontSize:11}}>Mode of Payment(Cash/Cheque/DD):</Text>
                            <Text style={{flex:1, fontSize:12, paddingLeft:4, borderBottom:1, borderBottomWidth:1}}>{pdfData?.payment_mode || ''}</Text>
                        </View>

                        {/* No. */}
                        <View style={{width:'20%', display:'flex', flexDirection:'row', gap:10}}>
                            <Text style={{fontSize:11}}>No.:</Text>
                            <Text style={{flex:1, fontSize:12, paddingLeft:4, borderBottom:1, borderBottomWidth:1}}></Text>
                        </View>

                        {/* Dated */}
                        <View style={{width:'20%', display:'flex', flexDirection:'row', gap:10}}>
                            <Text style={{fontSize:11}}>Dated:</Text>
                            <Text style={{flex:1, fontSize:12, paddingLeft:4, borderBottom:1, borderBottomWidth:1}}></Text>
                        </View>

                    </View>


                    {/* Row Six */}
                    <View style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', gap:10}}>

                        {/* Against the */}
                        <View style={{flex:1, display:'flex', flexDirection:'row', gap:10}}>
                            <Text style={{fontSize:11}}>Against the:</Text>
                            <Text style={{flex:1, fontSize:12, paddingLeft:4, borderBottom:1, borderBottomWidth:1}}>Registration</Text>
                        </View>

                        {/* Class */}
                        <View style={{flex:1, display:'flex', flexDirection:'row', gap:10}}>
                            <Text style={{fontSize:11}}>Class:</Text>
                            <Text style={{flex:1, fontSize:12, paddingLeft:4, borderBottom:1, borderBottomWidth:1}}>{pdfData?.class_name || ''}</Text>
                        </View>

                    </View>


                    {/* Row Seven */}
                    <View style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'flex-end', gap:10}}>

                        {/* For A/C Department */}
                        <View style={{width:'30%', display:'flex', flexDirection:'row', gap:10, marginTop:20}}>
                            <Text style={{fontSize:11}}>For A/C Department:</Text>
                            <Text style={{flex:1, fontSize:12, paddingLeft:4, borderBottom:1, borderBottomWidth:1}}></Text>
                        </View>

                    </View>


                    {/* Row Eight */}
                    <View style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'flex-end', gap:10}}>

                        {/* Authorized Signatory */}
                        <View style={{width:'30%', display:'flex', flexDirection:'row', gap:10}}>
                            <Text style={{fontSize:11}}>Authorized Signatory:</Text>
                            <Text style={{flex:1, fontSize:12, paddingLeft:4, borderBottom:1, borderBottomWidth:1}}></Text>
                        </View>

                    </View>


                    {/* Row Nine */}
                    <View style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'flex-end', gap:10}}>

                        {/* School Seal */}
                        <View style={{width:'30%', display:'flex', flexDirection:'row', gap:10}}>
                            <Text style={{fontSize:11}}>School Seal:</Text>
                            <Text style={{flex:1, fontSize:12, paddingLeft:4, borderBottom:1, borderBottomWidth:1}}></Text>
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