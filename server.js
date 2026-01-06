// server.js - Simple Express backend for SARDAM School Website
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Contact form rate limit (stricter)
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // limit each IP to 5 contact form submissions per hour
  message: 'Too many contact form submissions, please try again later.'
});

// Parse JSON bodies
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files from 'public' directory (where index.html will be)
app.use(express.static(path.join(__dirname)));

// API Routes
// Get configuration (only non-sensitive data)
app.get('/api/config', (req, res) => {
  res.json({
    school: {
      name: process.env.SCHOOL_NAME || 'SARDAM',
      establishedYear: process.env.ESTABLISHED_YEAR || '2015',
      email: process.env.SCHOOL_EMAIL || 'info@sardam.edu'
    },
    socialMedia: {
      facebook: process.env.FACEBOOK_URL || '',
      instagram: process.env.INSTAGRAM_URL || '',
      tiktok: process.env.TIKTOK_URL || ''
    },
    features: {
      enableWhatsApp: process.env.ENABLE_WHATSAPP === 'true',
      enableContactForm: process.env.ENABLE_CONTACT_FORM === 'true'
    }
  });
});

// WhatsApp configuration endpoint (returns formatted WhatsApp URL)
app.get('/api/whatsapp', (req, res) => {
  const whatsappNumber = process.env.WHATSAPP_NUMBER;
  if (!whatsappNumber) {
    return res.status(503).json({ error: 'WhatsApp service not configured' });
  }
  
  res.json({
    enabled: true,
    number: whatsappNumber.replace(/\D/g, '') // Return only digits
  });
});

// Contact form submission (for future use if implementing email backend)
app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Here you would integrate with email service (SendGrid, AWS SES, etc.)
    // For now, just log and return success
    console.log('Contact form submission:', { name, email, subject, message });

    // TODO: Implement actual email sending
    // await sendEmail({ to: process.env.SCHOOL_EMAIL, from: email, subject, text: message });

    res.json({
      success: true,
      message: 'Your message has been received. We will contact you soon!'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'An error occurred. Please try again later.' });
  }
});

// Logo upload endpoint (for future use)
app.post('/api/logo', rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10
}), async (req, res) => {
  try {
    const { logoData } = req.body;

    if (!logoData) {
      return res.status(400).json({ error: 'No logo data provided' });
    }

    // Validate base64 image
    if (!logoData.startsWith('data:image/')) {
      return res.status(400).json({ error: 'Invalid image format' });
    }

    // Check file size (2MB limit)
    const sizeInBytes = Buffer.from(logoData.split(',')[1], 'base64').length;
    const sizeInMB = sizeInBytes / (1024 * 1024);
    
    if (sizeInMB > 2) {
      return res.status(400).json({ error: 'Logo size must be less than 2MB' });
    }

    // TODO: Save to cloud storage (AWS S3, Cloudinary, etc.)
    // For now, just return success
    console.log('Logo upload request received');

    res.json({
      success: true,
      message: 'Logo uploaded successfully'
    });

  } catch (error) {
    console.error('Logo upload error:', error);
    res.status(500).json({ error: 'An error occurred. Please try again later.' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Catch-all route - serve index.html for any other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 SARDAM School Website running on http://localhost:${PORT}`);
  console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📧 School Email: ${process.env.SCHOOL_EMAIL || 'Not configured'}`);
  console.log(`💬 WhatsApp: ${process.env.WHATSAPP_NUMBER ? 'Configured' : 'Not configured'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  app.close(() => {
    console.log('HTTP server closed');
  });
});
