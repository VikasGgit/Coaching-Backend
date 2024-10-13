// routes/miscellaneousRoutes.js
import express from "express";
import Miscellaneous from "../modals/miscelleneous.modals.js"; // Adjust the path based on your folder structure

const router = express.Router();

// Middleware to handle updates
// Middleware to handle updates or create a new document if none exists
const updateField = async (field, value, res) => {
  try {
    // Check if a document exists
    const existingDoc = await Miscellaneous.findOne({});

    if (existingDoc) {
      // If the document exists, update the specified field
      const updateResult = await Miscellaneous.updateOne({}, { [field]: value });
      res.status(200).send({ message: `${field} updated successfully`, result: updateResult });
    } else {
      // If no document exists, create a new one with the provided field and value
      const newDoc = new Miscellaneous({ [field]: value });
      const savedDoc = await newDoc.save();
      res.status(201).send({ message: `New document created with ${field}`, result: savedDoc });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


// Route to change header data
router.post('/header/change', (req, res) => {
  const { header } = req.body;
  updateField('headerData', header, res);
});

// Route to change address
router.post('/address/change', (req, res) => {
  const { address } = req.body;
  updateField('address', address, res);
});

// Route to change footer
router.post('/footer/change', (req, res) => {
  const { footer } = req.body;
  updateField('footer', footer, res);
});

// Route to change contact number
router.post('/contact/change', (req, res) => {
  const { contactNumber } = req.body;
  updateField('contactNumber', contactNumber, res);
});

// Route to change email
router.post('/email/change', (req, res) => {
  const { email } = req.body;
  updateField('email', email, res);
});

// Route to change aim
router.post('/aim/change', (req, res) => {
  const { aim } = req.body;
  updateField('aim', aim, res);
});

// Route to change goals
router.post('/goals/change', (req, res) => {
  const { goals } = req.body;
  updateField('goals', goals, res);
});

// Route to change vision
router.post('/vision/change', (req, res) => {
  const { vision } = req.body;
  updateField('vision', vision, res);
});

// Route to change mission
router.post('/mission/change', (req, res) => {
  const { mission } = req.body;
  updateField('mission', mission, res);
});

router.post('/logo/change', (req, res) => {
  const { logo } = req.body;
  updateField('logo', logo, res);
});

// Route to change important notice
router.post('/important-notice/change', (req, res) => {
  const { importantNotice } = req.body;
  updateField('importantNotice', importantNotice, res);
});

// Route to update social media links
router.post('/social-media/change', async (req, res) => {
  const { socialMedia } = req.body; // Expecting an object with social media links
  try {
    const updateResult = await Miscellaneous.updateOne({}, { socialMedia });
    res.status(200).send({ message: 'Social media updated successfully', result: updateResult });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Route to update SEO data
router.post('/seo/change', async (req, res) => {
  const { metaTitle, metaDescription, metaKeywords } = req.body; // Destructure SEO data
  try {
    const updateResult = await Miscellaneous.updateOne({}, {
      seo: {
        metaTitle,
        metaDescription,
        metaKeywords,
      },
    });
    res.status(200).send({ message: 'SEO data updated successfully', result: updateResult });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});


router.get('/all', async (req, res) => {
  try {
    const miscellaneousData = await Miscellaneous.findOne();  // Assuming there's only one document
    if (!miscellaneousData) {
      return res.status(404).send({ message: 'No data found' });
    }
    res.status(200).json(miscellaneousData);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

export default router;