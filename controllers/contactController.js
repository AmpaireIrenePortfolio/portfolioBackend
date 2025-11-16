const Contact = require('../models/contactModel');

// Handle form submission
const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Create a new contact submission
    const newContact = await Contact.create({ name, email, message });

    // TODO: Add logic here to send an email to yourself using nodemailer

    res.status(201).json({ 
      success: true, 
      message: 'Your message has been received successfully!' 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error. Please try again later.' 
    });
  }
};

module.exports = {
  submitContact
};