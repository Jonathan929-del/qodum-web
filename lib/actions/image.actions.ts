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





// Upload school logo
const uploadSchoolLogoFile = async (file:any, school_name:any) => {
    const fileBuffer = file;
    const params = {
        Bucket:process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
        Key:`schools/${school_name}`,
        Body:fileBuffer,
        ContentType:'image'
    };
    const command = new PutObjectCommand(params);
    await configs.send(command);
    
    
    // Return
    return school_name;
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





// Upload school logo
export const uploadSchoolLogo = async ({data, school_name}:{data:any, school_name:any}) => {
    try {
        const formData = await data;
        const file = formData.get('file');
        if(!file){
            throw new Error('No file was sent');
        };
        const buffer = Buffer.from(await file.arrayBuffer());
        const res = await uploadSchoolLogoFile(buffer, school_name);

        // Return
        return res;
    } catch (err) {
        console.log(err);
    }
};





// Upload notice file
const uploadNoticeFile = async (file:any, notice_id:any) => {
    const fileBuffer = file;
    const params = {
        Bucket:process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
        Key:`notices/${notice_id}`,
        Body:fileBuffer,
        ContentType:'image'
    };
    const command = new PutObjectCommand(params);
    await configs.send(command);
    
    
    // Return
    return notice_id;
};





// Upload notice image
export const uploadNoticeImage = async ({data, notice_id}:{data:any, notice_id:any}) => {
    try {
        const formData = await data;
        const file = formData.get('file');
        if(!file){
            throw new Error('No file was sent');
        };
        const buffer = Buffer.from(await file.arrayBuffer());
        const res = await uploadNoticeFile(buffer, notice_id);

        // Return
        return res;
    } catch (err) {
        console.log(err);
    }
};





// Upload flash message file
const uploadFlashMessageFile = async (file:any, message_id:any) => {
    const fileBuffer = file;
    const params = {
        Bucket:process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
        Key:`flash-messages/${message_id}`,
        Body:fileBuffer,
        ContentType:'image'
    };
    const command = new PutObjectCommand(params);
    await configs.send(command);
    
    
    // Return
    return message_id;
};





// Upload flash message image
export const uploadFlashMessageImage = async ({data, message_id}:{data:any, message_id:any}) => {
    try {
        const formData = await data;
        const file = formData.get('file');
        if(!file){
            throw new Error('No file was sent');
        };
        const buffer = Buffer.from(await file.arrayBuffer());
        const res = await uploadFlashMessageFile(buffer, message_id);

        // Return
        return res;
    } catch (err) {
        console.log(err);
    }
};





// Upload class notice file
const uploadClassNoticeFile = async (file:any, class_notice_id:any) => {
    const fileBuffer = file;
    const params = {
        Bucket:process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
        Key:`class-notices/${class_notice_id}`,
        Body:fileBuffer,
        ContentType:'image'
    };
    const command = new PutObjectCommand(params);
    await configs.send(command);
    
    
    // Return
    return class_notice_id;
};





// Upload class notice image
export const uploadClassNoticeImage = async ({data, class_notice_id}:{data:any, class_notice_id:any}) => {
    try {
        const formData = await data;
        const file = formData.get('file');
        if(!file){
            throw new Error('No file was sent');
        };
        const buffer = Buffer.from(await file.arrayBuffer());
        const res = await uploadClassNoticeFile(buffer, class_notice_id);

        // Return
        return res;
    } catch (err) {
        console.log(err);
    }
};





// Upload staff file
const uploadStaffFile = async (file:any, reg_no:any) => {
    const fileBuffer = file;
    const params = {
        Bucket:process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
        Key:`staff/${reg_no}`,
        Body:fileBuffer,
        ContentType:'image'
    };
    const command = new PutObjectCommand(params);
    await configs.send(command);
    
    
    // Return
    return reg_no;
};





// Staff image
export const uploadStaffImage = async ({data, reg_no}:{data:any, reg_no:any}) => {
    try {
        const formData = await data;
        const file = formData.get('file');
        if(!file){
            throw new Error('No file was sent');
        };
        const buffer = Buffer.from(await file.arrayBuffer());
        const res = await uploadStaffFile(buffer, reg_no);

        // Return
        return res;
    } catch (err) {
        console.log(err);
    }
};





// Upload staff application file
const uploadStaffApplicationFile = async (file:any, reg_no:any) => {
    const fileBuffer = file;
    const params = {
        Bucket:process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
        Key:`staff-application/${reg_no}`,
        Body:fileBuffer,
        ContentType:'image'
    };
    const command = new PutObjectCommand(params);
    await configs.send(command);
    
    
    // Return
    return reg_no;
};





// Staff application image
export const uploadStaffApplicationImage = async ({data, reg_no}:{data:any, reg_no:any}) => {
    try {
        const formData = await data;
        const file = formData.get('file');
        if(!file){
            throw new Error('No file was sent');
        };
        const buffer = Buffer.from(await file.arrayBuffer());
        const res = await uploadStaffApplicationFile(buffer, reg_no);

        // Return
        return res;
    } catch (err) {
        console.log(err);
    }
};





// Upload staff file (PDF)
const uploadStaffPdfFile = async (file: any, reg_no: any, content_type:any) => {
    console.log(content_type);
    const fileBuffer = file;
    const params = {
        Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
        Key: `staff-documents/${reg_no}`,
        Body: fileBuffer,
        ContentType: content_type,
    };
    const command = new PutObjectCommand(params);
    await configs.send(command);

    return reg_no;
};





// Upload Staff PDF
export const uploadStaffPdf = async ({data, reg_no, content_type}: {data:any, reg_no:any, content_type:any}) => {
    try {
        const formData = await data;
        const file = formData.get('file');
        
        if (!file) {
            throw new Error('No file was sent');
        }

        // Convert file to buffer
        const buffer = Buffer.from(await file.arrayBuffer());
        
        // Upload the file (PDF) to S3
        const res = await uploadStaffPdfFile(buffer, reg_no, content_type);

        // Return the file key or reg_no
        return res;
    } catch (err) {
        console.error(err);
        throw new Error('Failed to upload PDF');
    }
};





// Upload user file
const uploadUserFile = async (file:any, name:any) => {
    const fileBuffer = file;
    const params = {
        Bucket:process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
        Key:`users/${name}`,
        Body:fileBuffer,
        ContentType:'image'
    };
    const command = new PutObjectCommand(params);
    await configs.send(command);
    
    
    // Return
    return name;
};





// User image
export const uploadUserImage = async ({data, name}:{data:any, name:any}) => {
    try {
        const formData = await data;
        const file = formData.get('file');
        if(!file){
            throw new Error('No file was sent');
        };
        const buffer = Buffer.from(await file.arrayBuffer());
        const res = await uploadUserFile(buffer, name);

        // Return
        return res;
    } catch (err) {
        console.log(err);
    }
};