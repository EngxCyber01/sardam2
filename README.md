# SARDAM School Website - Security and Deployment Guide

## 🔒 SECURITY CHECKLIST

### Before Publishing:

1. **Configuration Files**
   - [ ] Update `config.js` with your actual WhatsApp number
   - [ ] Update social media links in `config.js`
   - [ ] Update school information
   - [ ] Keep `config.js` secure - DO NOT commit to public repositories

2. **Contact Form**
   - [ ] Replace WhatsApp number in index.html (line ~2203)
   - [ ] Test contact form submission
   - [ ] Verify WhatsApp link opens correctly

3. **Images and Assets**
   - [ ] Replace placeholder teacher photos in `images/` folder
   - [ ] Upload actual school logo
   - [ ] Optimize all images (compress for web)

4. **Data Updates**
   - [ ] Update teacher data with real information
   - [ ] Update student lists with actual names and scores
   - [ ] Update "About Us" content
   - [ ] Verify all translations (English, Kurdish, Arabic)

5. **Testing**
   - [ ] Test on Chrome, Firefox, Safari, Edge
   - [ ] Test on mobile devices (iOS & Android)
   - [ ] Test on tablets
   - [ ] Test all buttons and interactions
   - [ ] Test dark mode
   - [ ] Test all three languages
   - [ ] Test form validation

## 🚀 DEPLOYMENT OPTIONS

### Option 1: Static Hosting (Recommended for Start)
**Best for**: Simple, secure, no backend needed

1. **GitHub Pages** (Free)
   - Create GitHub account
   - Create new repository
   - Upload all files EXCEPT config.js
   - Enable GitHub Pages in settings
   - Access via: https://yourusername.github.io/sardam

2. **Netlify** (Free)
   - Create Netlify account
   - Drag and drop your folder
   - Auto-deploy on updates
   - Custom domain support

3. **Vercel** (Free)
   - Create Vercel account
   - Import project
   - Auto-deploy
   - Fast CDN

### Option 2: With Backend (Future Enhancement)
**Best for**: Database integration, advanced features

1. **Backend Requirements**
   - Node.js server
   - Database (MySQL/PostgreSQL/MongoDB)
   - API for contact form
   - Teacher/Student management system

2. **Recommended Stack**
   - Frontend: Current HTML/CSS/JS
   - Backend: Node.js + Express.js
   - Database: PostgreSQL or MongoDB
   - Hosting: DigitalOcean, AWS, or Heroku

## 📁 FILE STRUCTURE

```
sardam/
├── index.html          (Main website file)
├── config.js           (Configuration - KEEP SECURE)
├── README.md           (This file)
├── .gitignore          (Ignore sensitive files)
└── images/             (Create this folder)
    ├── teacher1.jpg
    ├── teacher2.jpg
    ├── ...
    └── logo.png
```

## 🔐 SECURITY BEST PRACTICES

### DO:
✅ Use HTTPS (SSL certificate)
✅ Validate all form inputs
✅ Sanitize user data
✅ Keep config.js private
✅ Regular backups
✅ Update dependencies regularly
✅ Monitor for suspicious activity
✅ Use strong passwords for admin access

### DON'T:
❌ Expose API keys in public code
❌ Store sensitive data in localStorage
❌ Allow unlimited file uploads
❌ Skip input validation
❌ Use default passwords
❌ Ignore security warnings
❌ Share admin credentials

## 🔙 BACKEND SETUP

A basic Express.js backend is included (`server.js`). To use it:

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment**:
   ```bash
   # Copy example file
   cp .env.example .env
   
   # Edit .env with your actual values
   ```

3. **Run Server**:
   ```bash
   # Development (with auto-reload)
   npm run dev
   
   # Production
   npm start
   ```

4. **Available Endpoints**:
   - `GET /api/config` - Public configuration
   - `GET /api/whatsapp` - WhatsApp number
   - `POST /api/contact` - Contact form (TODO: implement email)
   - `POST /api/logo` - Logo upload (TODO: implement storage)
   - `GET /api/health` - Server health check

**Note**: Backend is optional. The website works fully as a static site.

## 🛡️ PRIVACY & COMPLIANCE

1. **Data Protection**
   - No personal data stored without consent
   - Clear privacy policy
   - GDPR compliance (if applicable)

2. **Contact Form**
   - Data sent directly to WhatsApp
   - No data stored on server
   - User aware of data transmission

3. **Cookies**
   - Only localStorage for preferences
   - No tracking cookies
   - No third-party analytics (optional)

## 🔧 CONFIGURATION STEPS

1. **Update WhatsApp Number**
   ```javascript
   // In index.html (line ~2203)
   const whatsappNumber = '9647501234567'; // YOUR NUMBER
   
   // In config.js
   whatsapp: {
       phoneNumber: '9647501234567' // YOUR NUMBER
   }
   ```

2. **Update Social Links**
   ```javascript
   // In config.js
   socialMedia: {
       facebook: 'https://facebook.com/YOUR_PAGE',
       whatsapp: 'https://wa.me/YOUR_NUMBER',
       tiktok: 'https://tiktok.com/@YOUR_ACCOUNT'
   }
   ```

3. **Update Teacher Data**
   ```javascript
   // In index.html (line ~1645)
   const teachersData = {
       grade10: [/* your teachers */],
       grade11: [/* your teachers */],
       grade12: [/* your teachers */]
   }
   ```

## 📱 MOBILE OPTIMIZATION

Already implemented:
- Responsive design for all screen sizes
- Touch-friendly buttons (min 44px)
- Mobile-friendly navigation
- Optimized images
- Fast loading

## 🌐 DOMAIN & HOSTING

### Custom Domain Setup:
1. Purchase domain (namecheap.com, godaddy.com)
2. Point DNS to hosting provider
3. Enable SSL certificate (free with Let's Encrypt)
4. Configure domain in hosting settings

### Recommended Providers:
- **Netlify**: Best for static sites, free SSL
- **Vercel**: Fast, developer-friendly
- **DigitalOcean**: Full control, requires setup
- **GitHub Pages**: Free, simple, limited features

## 📊 ANALYTICS (Optional)

If you want to track visitors:
1. Google Analytics (free)
2. Plausible Analytics (privacy-focused)
3. Simple Analytics (GDPR compliant)

## 🆘 SUPPORT & MAINTENANCE

### Regular Tasks:
- Weekly: Check contact form works
- Monthly: Update content, check links
- Quarterly: Review security, update data
- Annually: Renew domain, review design

### Backup Strategy:
- Daily: Automatic hosting backups
- Weekly: Manual local backup
- Monthly: Full site archive

## 📞 GETTING HELP

If you need assistance:
1. Check browser console for errors (F12)
2. Test in different browsers
3. Verify all configurations
4. Check hosting provider status
5. Review this documentation

## 🎨 CUSTOMIZATION

### Colors:
Edit CSS variables in index.html (line ~15-45)
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    /* Customize here */
}
```

### Fonts:
Currently using system fonts (fast, reliable)
To add custom fonts: Use Google Fonts

### Layout:
All responsive breakpoints defined in CSS
Modify as needed for your design preferences

## ✅ FINAL CHECKLIST BEFORE GOING LIVE

- [ ] All personal information updated
- [ ] Images uploaded and optimized
- [ ] Contact form tested
- [ ] All links work correctly
- [ ] Tested on multiple devices
- [ ] Tested in all browsers
- [ ] SSL certificate active
- [ ] Domain configured
- [ ] Backup created
- [ ] Privacy policy added (if needed)
- [ ] Terms of service added (if needed)

---

**Last Updated**: December 2025
**Version**: 1.0.0
**Contact**: Update config.js with your contact information
