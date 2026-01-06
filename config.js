// ============================================
// SARDAM SCHOOL - BACKEND CONFIGURATION
// IMPORTANT: Keep this file secure and never commit to public repositories
// ============================================

const CONFIG = {
    // WhatsApp Configuration
    // Replace with your actual WhatsApp number (with country code, no + or spaces)
    // Example: 9647501234567 for Iraq
    whatsapp: {
        phoneNumber: '9647501234567', // REPLACE THIS
        defaultMessage: 'Hello SARDAM School'
    },

    // Email Configuration (for future email integration)
    email: {
        contactEmail: 'contact@sardam.edu',
        adminEmail: 'admin@sardam.edu'
    },

    // Social Media Links
    // REPLACE with your actual social media URLs
    socialMedia: {
        facebook: 'https://facebook.com/sardam',
        whatsapp: 'https://wa.me/9647501234567',
        tiktok: 'https://tiktok.com/@sardam',
        instagram: 'https://instagram.com/sardam',
        twitter: 'https://twitter.com/sardam'
    },

    // School Information
    school: {
        name: 'SARDAM',
        fullName: 'SARDAM Non-Governmental High School',
        establishedYear: 2010,
        address: 'Your School Address Here',
        city: 'Your City',
        country: 'Iraq'
    },

    // Security Settings
    security: {
        // Maximum file upload size for logo (in bytes)
        maxLogoSize: 2 * 1024 * 1024, // 2MB
        
        // Allowed image formats
        allowedImageFormats: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
        
        // Rate limiting for contact form (submissions per hour)
        contactFormRateLimit: 5,
        
        // Enable form validation
        enableValidation: true
    },

    // Features Toggle
    features: {
        enableDarkMode: true,
        enableHighContrast: true,
        enableLanguageSwitcher: true,
        enableTeacherCards: true,
        enableStudentList: true,
        enableContactForm: true,
        enableLogoUpload: true
    },

    // API Endpoints (for future backend integration)
    api: {
        baseURL: 'https://api.sardam.edu',
        endpoints: {
            contact: '/api/contact',
            teachers: '/api/teachers',
            students: '/api/students',
            uploadLogo: '/api/upload-logo'
        }
    }
};

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
