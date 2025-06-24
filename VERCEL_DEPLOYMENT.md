# Vercel Deployment Guide for Secure Contact Form

This guide will help you deploy your portfolio with a secure contact form using Vercel serverless functions.

## 🚀 Quick Setup

### Step 1: Create Vercel Account
1. Go to [Vercel](https://vercel.com/) and sign up with your GitHub account
2. Install Vercel CLI (optional but recommended):
   ```bash
   npm i -g vercel
   ```

### Step 2: Deploy to Vercel
1. **Option A: Via Vercel Dashboard**
   - Push your code to GitHub
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect the configuration

2. **Option B: Via CLI**
   ```bash
   vercel
   ```

### Step 3: Configure Environment Variables
1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

| Variable Name | Description | Example |
|---------------|-------------|---------|
| `EMAILJS_SERVICE_ID` | Your EmailJS service ID | `service_1q7np2pr` |
| `EMAILJS_TEMPLATE_ID` | Your EmailJS template ID | `template_yen55ep` |
| `EMAILJS_USER_ID` | Your EmailJS user ID | `Setz6hgLJjxuCN-S-` |

### Step 4: Redeploy
After adding environment variables, redeploy your project:
- **Dashboard**: Go to Deployments → Redeploy
- **CLI**: `vercel --prod`

## 🔧 EmailJS Setup

### 1. Create EmailJS Account
1. Go to [EmailJS](https://www.emailjs.com/) and sign up
2. Verify your email address

### 2. Set Up Email Service
1. Go to **Email Services** → **Add New Service**
2. Choose your email provider (Gmail, Outlook, etc.)
3. Follow the setup instructions
4. Copy your **Service ID**

### 3. Create Email Template
1. Go to **Email Templates** → **Create New Template**
2. Use this template structure:
   ```html
   Subject: New Contact Form Message from {{from_name}}

   Name: {{from_name}}
   Email: {{from_email}}
   Subject: {{subject}}
   Message: {{message}}
   Timestamp: {{timestamp}}
   User Agent: {{user_agent}}
   ```
3. Copy your **Template ID**

### 4. Get User ID
1. Go to **Account** → **API Keys**
2. Copy your **Public Key** (this is your User ID)

## 🛡️ Security Features

Your contact form now includes:

### Frontend Security
- ✅ Rate limiting (3 attempts per 5 minutes)
- ✅ Input validation and sanitization
- ✅ XSS prevention
- ✅ CSRF protection

### Backend Security
- ✅ Environment variables (secrets never exposed)
- ✅ Server-side validation
- ✅ Input sanitization
- ✅ Error handling
- ✅ Request method validation

### Email Security
- ✅ Secure API communication
- ✅ No client-side secrets
- ✅ Server-side email sending

## 🔍 Testing

### Local Testing
1. Install Vercel CLI: `npm i -g vercel`
2. Run locally: `vercel dev`
3. Test contact form at `http://localhost:3000`

### Production Testing
1. Deploy to Vercel
2. Test contact form on your live site
3. Check Vercel function logs for any errors

## 📊 Monitoring

### Vercel Function Logs
1. Go to your Vercel dashboard
2. Navigate to **Functions** → **api/send-email**
3. View real-time logs and performance metrics

### EmailJS Dashboard
1. Monitor email delivery in EmailJS dashboard
2. Check for any failed deliveries
3. Review email templates and services

## 🚨 Troubleshooting

### Common Issues

**1. "Email service is not properly configured"**
- Check that all environment variables are set correctly
- Verify EmailJS credentials are valid
- Redeploy after adding environment variables

**2. "Failed to send email"**
- Check EmailJS service is active
- Verify email template exists
- Check Vercel function logs for detailed errors

**3. CORS Errors**
- Ensure you're using the correct API endpoint
- Check that the function is deployed correctly

**4. Rate Limiting**
- Wait 5 minutes between attempts
- Check if you've exceeded EmailJS limits

### Debug Steps
1. Check Vercel function logs
2. Verify environment variables
3. Test EmailJS credentials manually
4. Check browser console for errors

## 🔄 Updates and Maintenance

### Updating the Function
1. Make changes to `api/send-email.js`
2. Commit and push to GitHub
3. Vercel will auto-deploy

### Updating Environment Variables
1. Go to Vercel dashboard
2. Update environment variables
3. Redeploy the project

### Monitoring Performance
- Vercel provides function execution metrics
- Monitor cold start times
- Check for any timeout issues

## 📈 Scaling

### Free Tier Limits
- Vercel: 100GB-hours per month
- EmailJS: 200 emails per month (free tier)

### Upgrading
- Vercel Pro: $20/month for more resources
- EmailJS Pro: $15/month for more emails

## 🔐 Security Best Practices

1. **Never commit secrets** to your repository
2. **Use environment variables** for all sensitive data
3. **Validate all inputs** on both frontend and backend
4. **Monitor function logs** for suspicious activity
5. **Keep dependencies updated** regularly
6. **Use HTTPS** for all communications

## 📞 Support

- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **EmailJS Support**: [emailjs.com/support](https://emailjs.com/support)
- **GitHub Issues**: Create an issue in your repository

---

**Your contact form is now enterprise-grade secure!** 🎉 