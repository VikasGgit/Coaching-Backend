// models/Miscellaneous.js

import mongoose from 'mongoose';

const miscellaneousSchema = new mongoose.Schema({
  headerData: {
    type: String,
  
  },
  address: {
    type: String,
  
  },
  logo:{
    type: String,
  },
  footer: {
    type: String,

  },
  contactNumber: {
    type: String,

  },
  email: {
    type: String,
 
  },
  aim: {
    type: String,

  },
  goals: {
    type: String,
   
  },
  vision: {
    type: String, // Optional, in case you want to add a vision statement for the organization
  },
  mission: {
    type: String, // Optional, to define the mission of the coaching center
  },
  socialMedia: {
    facebook: { type: String },
    twitter: { type: String },
    instagram: { type: String },
    linkedin: { type: String },
    youtube: { type: String },
  },
  importantNotice: {
    type: String,
  },
  seo: {
    metaTitle: { type: String },  // Meta title for SEO
    metaDescription: { type: String }, // Meta description for SEO
    metaKeywords: [{ type: String }] // Meta keywords for SEO
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Miscellaneous = mongoose.model('Miscellaneous', miscellaneousSchema);

export default Miscellaneous;
