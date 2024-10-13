import mongoose from 'mongoose';

const courseSchema = mongoose.Schema({
    courseName: {
        required: true,
        type: String, // No need for quotes around String
    },
    description: { // Fixed typo from 'discription' to 'description'
        required: true,
        type: String,
    },
    class: { // Fixed typo from 'clas' to 'class'
        type: String,
        required: true,
    },
    listPrice: {
        type: Number,
        required: true,
    },
    disPrice: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
    },
    startDate: {
        type: Date,
    },
    validity: {
        type: String
    }
});

// Create the model using the schema
const Course = mongoose.model('Course', courseSchema); // Use the model name as the first argument

export default Course; // Export the Course model
