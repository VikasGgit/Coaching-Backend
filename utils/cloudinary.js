import cloudinary from 'cloudinary';

import dotenv from 'dotenv';



dotenv.config();




// Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export const uploadImage = (imageBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream((error, result) => {
      if (error) return reject(error);
      resolve(result.secure_url);  // Resolve with image URL
    });
    uploadStream.end(imageBuffer);  // Send the buffer to Cloudinary
  });
};
