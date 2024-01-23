'use server';
// Imports
// @ts-ignore
import {S3Client, PutObjectCommand} from '@aws-sdk/client-s3';





// Configs
// @ts-ignore
const configs = new S3Client({
    region:process.env.NEXT_PUBLIC_AWS_REGION,
    credentials:{
        accessKeyId:process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
        secretAccessKey:process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    }
});





// Upload
const uploadFile = async (file:any, reg_no:any) => {
    const fileBuffer = file;
    const params = {
        Bucket:process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
        Key:`students/${reg_no}`,
        Body:fileBuffer,
        ContentType:'image'
    };
    const command = new PutObjectCommand(params);
    await configs.send(command);
    
    
    // Return
    return reg_no;
};





// Image
export const uploadStudentImage = async ({data, reg_no}:{data:any, reg_no:any}) => {
    try {
        const formData = await data;
        const file = formData.get('file');
        if(!file){
            throw new Error('No file was sent');
        };
        const buffer = Buffer.from(await file.arrayBuffer());
        const res = await uploadFile(buffer, reg_no);

        // Return
        return res;
    } catch (err) {
        console.log(err);
    }
};