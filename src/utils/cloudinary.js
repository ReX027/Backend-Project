import { v2 as cloudinary } from 'cloudinary';
import fs from "fs" //by default library

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Custom Method to give local path
const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload
        (localFilePath, {
            resource_type: "auto"
        })
        // File has been uploaded successfull
        console.log(response);
        console.log("File is uploaded on cloudinary",respose.url);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath) // to remove the locally saved temporary file as the upload operation got failed.
        return null;
    }
}

export {uploadOnCloudinary}