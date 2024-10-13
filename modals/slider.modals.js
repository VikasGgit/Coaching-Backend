// models/Teacher.

import mongoose from 'mongoose';

const teacherImageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const studentImageSchema = new mongoose.Schema({
    imageUrl: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
export const StudentImage = mongoose.model('StudentImage', studentImageSchema);
export const TeacherImage = mongoose.model('TeacherImage', teacherImageSchema);


