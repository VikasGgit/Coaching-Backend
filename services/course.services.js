import { uploadImage } from "../utils/cloudinary.js";
import Course from "../modals/course.modals.js";
import express from 'express';
import multer from 'multer';

export const addCourse = async (req, res) => {
  try {
    const { courseName, description, class: courseClass, listPrice, disPrice, startDate, validity } = req.body;
    
    let imageUrl = '';
    if (req.file) {
      imageUrl = await uploadImage(req.file.buffer); // Upload the image to Cloudinary
    }

    const newCourse = new Course({
      courseName,
      description,
      class: courseClass,
      listPrice,
      disPrice,
      image: imageUrl,  // Save the Cloudinary image URL
      startDate,
      validity
    });

    await newCourse.save();
    res.status(201).json({ message: 'Course created successfully', newCourse });
  } catch (error) {
    res.status(500).json({ message: 'Error adding course', error });
  }
};

export const updateCourse = async (req, res) => {
    try {
      const { id } = req.params; // Course ID to update
      const { courseName, description, class: courseClass, listPrice, disPrice, startDate, validity } = req.body;
  
      let updatedData = { courseName, description, class: courseClass, listPrice, disPrice, startDate, validity };
  
      if (req.file) {
        const imageUrl = await uploadImage(req.file.buffer);  // Upload new image if provided
        updatedData.image = imageUrl;  // Update image URL if a new image is uploaded
      }
  
      const updatedCourse = await Course.findByIdAndUpdate(id, updatedData, { new: true });
      res.status(200).json({ message: 'Course updated successfully', updatedCourse });
    } catch (error) {
      res.status(500).json({ message: 'Error updating course', error });
    }
  };


  export const deleteCourse = async (req, res) => {
    try {
      const { id } = req.params; // Course ID to delete
      await Course.findByIdAndDelete(id);
      res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting course', error });
    }
  };
    



const router = express.Router();
const storage = multer.memoryStorage();  // Store uploaded files in memory
const upload = multer({ storage });

// Route to add a new course with image
router.post('/add', upload.single('image'), addCourse);

// Route to update an existing course
router.put('/update/:id', upload.single('image'), updateCourse);

// Route to delete a course
router.delete('/delete/:id', deleteCourse);
router.get('/', async function (req, res) {
    try {
        const courses = await Course.find();  // Use find() to fetch all courses
        if (courses.length < 1) {
            return res.status(404).json({ message: "No courses found" });
        }
        return res.status(200).json(courses);
    } catch (err) {
        return res.status(500).json({ message: "Error fetching courses", error: err.message });
    }
});


export default router;
