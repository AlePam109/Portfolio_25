# Alec's Portfolio Website

A modern, responsive portfolio website showcasing Alec's skills, projects, and experience in cybersecurity and software development.

## 🌟 Features

### Design & UX
- **Modern Design**: Clean, minimalist interface with professional aesthetics
- **Dark/Light Mode**: Toggle between themes with smooth transitions
- **Responsive Layout**: Optimized for all devices and screen sizes
- **Smooth Animations**: CSS animations and transitions for enhanced UX
- **Professional Typography**: Modern font stack with excellent readability

### Content & Projects
- **Comprehensive Case Studies**: Detailed project pages with technical specifications
- **Interactive Elements**: Hover effects, smooth scrolling, and dynamic content
- **Professional Presentation**: Clean project showcases with clear value propositions
- **GitHub Integration**: Direct links to repositories and live demos

### Security Features 🔒
- **Serverless Backend**: Vercel serverless functions for secure email handling
- **Environment Variables**: Sensitive data protected with environment variables
- **Multi-Layer Security**: Comprehensive validation and sanitization
- **Rate Limiting**: Prevents abuse with intelligent throttling
- **Input Validation**: Server-side and client-side validation
- **XSS Protection**: Input sanitization and output encoding
- **CSRF Protection**: Cross-site request forgery prevention

## 🚀 Live Demo

Visit the live portfolio: [Your Vercel URL]

## 📁 Project Structure

```
Portfolio/
├── index.html                 # Main portfolio page
├── styles.css                 # Main stylesheet with dark/light themes
├── script.js                  # Main JavaScript with security features
├── api/
│   └── send-email.js         # Vercel serverless function
├── vercel.json               # Vercel configuration
├── .gitignore               # Excludes sensitive files
├── VERCEL_DEPLOYMENT.md     # Deployment guide
├── SECURITY.md              # Security implementation documentation
├── README.md                # This file
├── [project]-case-study.html # Detailed project pages
└── [project].html           # Project showcase pages
```

## 🛠️ Setup Instructions

### Prerequisites
- Modern web browser with JavaScript enabled
- Vercel account for hosting and serverless functions
- EmailJS account for email service
- GitHub account for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone [your-repo-url]
   cd Portfolio
   ```

2. **Deploy to Vercel**
   - Push your code to GitHub
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project" and import your repository
   - Vercel will auto-detect the configuration

3. **Configure EmailJS**
   - Create an account at [EmailJS](https://www.emailjs.com/)
   - Set up an email service (Gmail, Outlook, etc.)
   - Create an email template
   - Copy your service ID, template ID, and user ID

4. **Set Environment Variables**
   - In your Vercel project dashboard, go to **Settings** → **Environment Variables**
   - Add:
     - `EMAILJS_SERVICE_ID` = your service ID
     - `EMAILJS_TEMPLATE_ID` = your template ID
     - `EMAILJS_USER_ID` = your user ID

5. **Redeploy**
   - After adding environment variables, redeploy your project
   - Your contact form will now work securely!

## 🔐 Security Implementation

This portfolio implements enterprise-grade security measures:

### Serverless Backend Security
- **Environment Variables**: All secrets stored securely on Vercel
- **Server-side Validation**: Comprehensive input validation
- **Input Sanitization**: XSS prevention and data cleaning
- **Error Handling**: Secure error responses
- **Request Validation**: Method and content-type validation

### Frontend Security
- **Rate Limiting**: Prevents abuse and spam
- **Input Validation**: Client-side validation for UX
- **XSS Prevention**: Input sanitization
- **CSRF Protection**: Cross-site request forgery prevention

### Email Security
- **Secure API Communication**: HTTPS for all requests
- **No Client-side Secrets**: All sensitive data on server
- **Server-side Email Sending**: Secure email delivery

For detailed deployment instructions, see [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md).

## 🎨 Customization

### Colors & Themes
Edit `styles.css` to customize:
- Color schemes for light/dark modes
- Typography and fonts
- Animations and transitions
- Layout spacing and sizing

### Content
Update `index.html` to modify:
- Personal information and bio
- Project details and descriptions
- Contact information
- Social media links

### Projects
Add new projects by:
1. Creating a new case study HTML file
2. Adding project details to the main page
3. Updating navigation and links

## 📱 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🔧 Development

### Local Development
1. Install Vercel CLI: `npm i -g vercel`
2. Run locally: `vercel dev`
3. Test at `http://localhost:3000`

### Testing Security Features
1. Open browser developer tools
2. Check console for any errors
3. Test rate limiting by submitting multiple forms
4. Verify serverless function logs in Vercel dashboard

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

For questions or support:
- **Email**: alecpham0109@gmail.com
- **LinkedIn**: [https://www.linkedin.com/in/anhpham19/]
- **GitHub**: [https://github.com/AlePam109]
---

**Built with ❤️ by Alec Pham**

*Last updated: June 2025*

**Note**: This portfolio uses Vercel serverless functions for secure email handling. All sensitive data is protected with environment variables and never exposed to the client. 