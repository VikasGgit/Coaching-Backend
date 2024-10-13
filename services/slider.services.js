import express from 'express';
import multer from 'multer';
import {uploadImage} from '../utils/cloudinary.js';
import { TeacherImage, StudentImage } from '../modals/slider.modals.js';  // Import your Mongoose models

const router = express.Router();
const storage = multer.memoryStorage();  // Store uploaded files in memory
const upload = multer({ storage });

const handleImageUpload = async (fileBuffer, ImageModel, res) => {
  try {
    const imageUrl = await uploadImage(fileBuffer);  // Upload to Cloudinary
    const newImage = await ImageModel.create({ imageUrl });  // Save to MongoDB
    res.status(200).json({ message: 'Image uploaded successfully', newImage });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading image', error });
  }
};

// Route for uploading teacher images
router.post('/upload/teacher', upload.single('image'), (req, res) => {
  if (!req.file || !req.file.buffer) {
    return res.status(400).json({ message: 'No image uploaded' });
  }
  handleImageUpload(req.file.buffer, TeacherImage, res);  // Handle the upload
});

// Route for uploading student images
router.post('/upload/student', upload.single('image'), (req, res) => {
  if (!req.file || !req.file.buffer) {
    return res.status(400).json({ message: 'No image uploaded' });
  }
  handleImageUpload(req.file.buffer, StudentImage, res);  // Handle the upload
});

// Route to get all teacher images
router.get('/images/teacher', async (req, res) => {
  try {
    const teacherImages = await TeacherImage.find();  // Fetch all teacher images
    res.status(200).json({ message: 'Teacher images fetched successfully', teacherImages });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching teacher images', error });
  }
});

// Route to get all student images
router.get('/images/student', async (req, res) => {
  try {
    const studentImages = await StudentImage.find();  // Fetch all student images
    res.status(200).json({ message: 'Student images fetched successfully', studentImages });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching student images', error });
  }
});

export default router;
