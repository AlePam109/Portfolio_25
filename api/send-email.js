// Vercel Serverless Function for Secure Email Sending
// This function handles contact form submissions with EmailJS

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: 'Only POST requests are accepted'
    });
  }

  try {
    // Parse request body
    const { from_name, from_email, subject, message } = req.body;

    // Input validation
    if (!from_name || !from_email || !subject || !message) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Name, email, subject, and message are required'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(from_email)) {
      return res.status(400).json({
        error: 'Invalid email format',
        message: 'Please provide a valid email address'
      });
    }

    // Length validation
    if (from_name.length < 2 || from_name.length > 50) {
      return res.status(400).json({
        error: 'Invalid name length',
        message: 'Name must be between 2 and 50 characters'
      });
    }

    if (subject.length > 100) {
      return res.status(400).json({
        error: 'Subject too long',
        message: 'Subject must be less than 100 characters'
      });
    }

    if (message.length < 10 || message.length > 1000) {
      return res.status(400).json({
        error: 'Invalid message length',
        message: 'Message must be between 10 and 1000 characters'
      });
    }

    // Sanitize inputs (basic XSS prevention)
    const sanitizeInput = (input) => {
      return input
        .trim()
        .replace(/[<>]/g, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+=/gi, '')
        .substring(0, 1000);
    };

    const sanitizedData = {
      from_name: sanitizeInput(from_name),
      from_email: sanitizeInput(from_email),
      subject: sanitizeInput(subject),
      message: sanitizeInput(message)
    };

    // Check environment variables
    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const userId = process.env.EMAILJS_USER_ID;

    if (!serviceId || !templateId || !userId) {
      console.error('Missing EmailJS environment variables');
      return res.status(500).json({
        error: 'Server configuration error',
        message: 'Email service is not properly configured'
      });
    }

    // Prepare EmailJS request
    const emailjsPayload = {
      service_id: serviceId,
      template_id: templateId,
      user_id: userId,
      template_params: {
        from_name: sanitizedData.from_name,
        from_email: sanitizedData.from_email,
        subject: sanitizedData.subject,
        message: sanitizedData.message,
        timestamp: new Date().toISOString(),
        user_agent: req.headers['user-agent'] || 'Unknown'
      }
    };

    // Send email via EmailJS API
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailjsPayload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('EmailJS API error:', response.status, errorText);
      
      return res.status(500).json({
        error: 'Email sending failed',
        message: 'Unable to send email at this time. Please try again later.'
      });
    }

    // Success response
    return res.status(200).json({
      success: true,
      message: 'Email sent successfully!'
    });

  } catch (error) {
    console.error('Server error:', error);
    
    return res.status(500).json({
      error: 'Internal server error',
      message: 'An unexpected error occurred. Please try again later.'
    });
  }
} 