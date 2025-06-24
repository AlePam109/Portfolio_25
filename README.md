# Alec Pham - Modern Portfolio Website

A modern, responsive portfolio website built with HTML, CSS, and JavaScript. Features a clean design, dark/light mode toggle, smooth animations, and mobile-first responsive design.

## 🚀 Features

- **Modern Design**: Clean, professional layout with smooth animations
- **Responsive**: Mobile-first design that works on all devices
- **Dark/Light Mode**: Toggle between themes with persistent storage
- **Smooth Scrolling**: Animated navigation between sections
- **Interactive Elements**: Hover effects, animations, and micro-interactions
- **Contact Form**: Functional contact form with validation
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Performance**: Optimized for fast loading and smooth performance
- **Project Links**: Direct links to GitHub repositories and live demos
- **Professional Integration**: LinkedIn and GitHub profile integration

## 📁 Project Structure

```
Portfolio/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🛠️ Setup Instructions

1. **Clone or Download**: Get the project files to your local machine
2. **Open in Browser**: Simply open `index.html` in your web browser
3. **Local Development**: For development, you can use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   ```

## 🎨 Customization Guide

### Personal Information
The portfolio is currently customized for Alec Pham with the following information:

1. **Hero Section**: 
   - Name: Alec Pham
   - Title: Cybersecurity Specialist & Team Leader
   - Current status: Computer Science Senior at ASU (3.72 GPA)
   - Links: LinkedIn, GitHub, Contact

2. **About Section**: 
   - Personal quote and description
   - Skills: Cybersecurity, Python, Java, SQL, HTML/CSS, JavaScript, Flask, PostgreSQL, AWS, MATLAB, Project Management, Team Leadership, Data Analysis, Social Media Management, Adobe Creative Suite

3. **Education**: 
   - Minor in Project Management (Jan 2024 - Dec 2025)
   - BS Computer Science - Cybersecurity (Aug 2021 - Dec 2025) | GPA: 3.72
   - FPT High School (2018 - 2021)

4. **Projects**: 
   - **Desert CodeSprouts** - Cybersecurity education game ([GitHub](https://github.com/AlePam109/Desert-CodeSprouts))
   - **The Spot** - Yelp-like web app ([GitHub](https://github.com/AlePam109/412))
   - **Network Intrusion Detection System** - Snort-based NIDS
   - **CommUnity** - AI-driven community platform ([Live Demo](https://main.dg788ocmeaqpm.amplifyapp.com/)) - 2nd Place Winner
   - **Vietnam Smart Irrigation System** - IoT/Raspberry Pi project
   - **SPYN** - Autonomous vehicle with MATLAB

5. **Experience**: 
   - Student Supervisor at ASU (Jul 2024 - Present) - Leading 60+ students
   - Data Analyst at ASU (Feb 2024 - Jul 2024) - 250 profiles per shift
   - Marketing Manager at SEN English Center (Aug 2021 - Sep 2023) - 250% engagement increase
   - Freelance Graphic Designer at FPT High School (Mar 2019 - May 2021)
   - Various leadership roles in professional organizations

6. **Contact**: 
   - Email: anh.pham@asu.edu
   - Location: Tempe, AZ
   - LinkedIn: https://www.linkedin.com/in/anhpham19/
   - GitHub: https://github.com/AlePam109

### Styling Customization

#### Colors
Update the CSS custom properties in `styles.css` (lines 6-30):

```css
:root {
    --primary-color: #2563eb;      /* Main brand color */
    --secondary-color: #1e40af;    /* Secondary color */
    --accent-color: #3b82f6;       /* Accent color */
    /* ... other colors */
}
```

#### Fonts
Change the font family in `styles.css` (line 35):
```css
body {
    font-family: 'Inter', sans-serif; /* Change to your preferred font */
}
```

To use a different Google Font:
1. Update the font link in `index.html` (line 8)
2. Update the font-family in `styles.css`

#### Animations
Modify animation speeds and effects in `styles.css`:
- Hero animations (lines 200-220)
- Scroll animations (lines 600-620)
- Hover effects throughout the file

### Adding Images

1. **Profile Picture**: Replace the placeholder in the hero section
   ```html
   <div class="profile-placeholder">
       <img src="path/to/your/image.jpg" alt="Alec Pham">
   </div>
   ```

2. **Project Images**: Add images to project cards
   ```html
   <div class="project-card">
       <img src="path/to/project-image.jpg" alt="Project Name" class="project-image">
       <!-- rest of project content -->
   </div>
   ```

### Project Links Integration

The portfolio includes direct links to:
- **GitHub Repositories**: View source code for projects
- **Live Demos**: Interactive web applications
- **Professional Profiles**: LinkedIn and GitHub integration

To add more project links:
```html
<div class="project-links">
    <a href="https://github.com/username/repo" target="_blank" rel="noopener" class="project-link">
        <i class="fab fa-github"></i> View Code
    </a>
    <a href="https://your-demo-url.com" target="_blank" rel="noopener" class="project-link">
        <i class="fas fa-external-link-alt"></i> Live Demo
    </a>
</div>
```

### Contact Form Integration

The contact form currently shows a success message. To make it functional:

1. **EmailJS** (Recommended):
   ```javascript
   // Add EmailJS script to index.html
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
   
   // Update script.js contact form handler
   emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
       from_name: name,
       from_email: email,
       subject: subject,
       message: message
   });
   ```

2. **Netlify Forms**:
   ```html
   <form class="contact-form" name="contact" method="POST" data-netlify="true">
   ```

3. **Custom Backend**: Replace the form handler in `script.js`

## 📱 Responsive Design

The website is fully responsive with breakpoints at:
- **Mobile**: < 480px
- **Tablet**: < 768px
- **Desktop**: > 768px

## 🌙 Dark Mode

The dark mode toggle:
- Persists user preference in localStorage
- Automatically applies saved theme on page load
- Smoothly transitions between themes

## ⚡ Performance Tips

1. **Optimize Images**: Compress images before adding them
2. **Minify CSS/JS**: Use minified versions for production
3. **CDN**: Use CDN for external resources (Font Awesome, Google Fonts)
4. **Lazy Loading**: Add lazy loading for images if you add many

## 🚀 Deployment

### GitHub Pages
1. Push your code to a GitHub repository
2. Go to Settings > Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://username.github.io/repository-name`

### Netlify
1. Drag and drop your project folder to Netlify
2. Or connect your GitHub repository
3. Your site will be deployed automatically

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project directory
3. Follow the prompts

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio. If you make improvements, consider sharing them!

## 📞 Support

If you need help customizing your portfolio or have questions, feel free to reach out!

---

**Happy coding! 🎉** 