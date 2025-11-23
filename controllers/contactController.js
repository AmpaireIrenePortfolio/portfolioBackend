const Contact = require('../models/contactModel');
const Brevo = require('@getbrevo/brevo');

// Handle form submission
const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    console.log('Received form data:', { name, email, message });

    // 1. Save to database
    const newContact = await Contact.create({ name, email, message });
    console.log('✅ Contact submission saved to DB.');

    // 2. Configure Brevo API
    const apiInstance = new Brevo.TransactionalEmailsApi();
    apiInstance.authentications['apiKey'].apiKey = process.env.BREVO_API_KEY;

    // 3. Prepare email content
    const sendSmtpEmail = new Brevo.SendSmtpEmail();

    sendSmtpEmail.subject = `New Contact Form Submission from ${name}`;
    sendSmtpEmail.htmlContent = `
      <h1>New Contact Form Submission</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p><em>This message was sent from your portfolio website.</em></p>
    `;

    sendSmtpEmail.sender = { 
      name: 'Portfolio Website', 
      email: process.env.BREVO_FROM_EMAIL 
    };

    sendSmtpEmail.to = [
      { email: process.env.BREVO_TO_EMAIL }
    ];

    // 4. Send email
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('✅ Email sent successfully via Brevo!');

    // 5. Response to frontend
    res.status(201).json({
      success: true,
      message: 'Your message has been received successfully!'
    });

  } catch (error) {
    console.error('❌ Brevo API Error:', error.message || error);

    res.status(400).json({
      success: false,
      message: `Could not send email: ${error.message}`
    });
  }
};

module.exports = {
  submitContact
};
