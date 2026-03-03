# Maa Shakti Hospital Website

A beautiful, fully-featured hospital website with modern design and interactive features.

## Features

- 📱 Fully Responsive Design
- 🎨 Modern Gradient UI
- 🔄 Auto-sliding Hero Carousel
- 📊 Animated Statistics Counter
- 🏥 Complete Hospital Sections (Services, Doctors, Departments)
- 📅 Online Appointment Booking
- 💬 Patient Testimonials
- 📧 Contact Forms & Newsletter
- 🗺️ Google Maps Integration
- 📱 WhatsApp Float Button

## Sections

1. **Home** - Hero slider with call-to-action
2. **About Us** - Hospital information and features
3. **Services** - 8 medical departments
4. **Departments** - Detailed department information with tabs
5. **Doctors** - Team of expert doctors
6. **Appointment** - Online booking form
7. **Gallery** - Hospital facilities showcase
8. **Testimonials** - Patient reviews carousel
9. **Health Blog** - Latest health articles
10. **FAQ** - Frequently asked questions
11. **Contact** - Contact form and location map
12. **Newsletter** - Email subscription

## Technologies Used

- HTML5
- CSS3 (with CSS Variables and Animations)
- Vanilla JavaScript
- Google Fonts (Poppins, Playfair Display)
- Font Awesome Icons

## Setup & Deployment

### Local Development

1. Simply open `index.html` in any modern web browser
2. No build process or dependencies required

### Deploy to InfinityFree (Automated)

This repository is configured for automatic deployment to InfinityFree hosting using GitHub Actions.

#### Initial Setup:

1. **Create GitHub Repository:**
   ```bash
   cd "c:\Users\Akhil\Desktop\maa shakti hospital"
   git init
   git add .
   git commit -m "Initial commit: Maa Shakti Hospital website"
   git branch -M main
   ```

2. **Create a new repository on GitHub:**
   - Go to https://github.com/new
   - Name it (e.g., `maa-shakti-hospital`)
   - Don't initialize with README (we already have one)
   - Click "Create repository"

3. **Push to GitHub:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/maa-shakti-hospital.git
   git push -u origin main
   ```

4. **Configure GitHub Secrets:**
   - Go to your repository on GitHub
   - Click **Settings** → **Secrets and variables** → **Actions**
   - Click **New repository secret** and add these three secrets:
     
     **FTP_SERVER**: Your FTP server address (e.g., `ftpupload.net` or from InfinityFree control panel)
     
     **FTP_USERNAME**: Your FTP username (from InfinityFree control panel)
     
     **FTP_PASSWORD**: Your FTP password (from InfinityFree control panel)

5. **Test the Deployment:**
   - Go to **Actions** tab in your GitHub repository
   - Click on "Deploy to InfinityFree" workflow
   - Click **Run workflow** → **Run workflow**
   - Wait for deployment to complete (usually 1-2 minutes)

#### How to Deploy Changes (One-Click):

**Method 1: Automatic on Git Push**
```bash
git add .
git commit -m "Your change description"
git push
```
This automatically triggers deployment to InfinityFree!

**Method 2: Manual One-Click Deploy**
1. Go to your GitHub repository
2. Click **Actions** tab
3. Select "Deploy to InfinityFree" workflow
4. Click **Run workflow** button
5. Click the green **Run workflow** button

### InfinityFree FTP Details

Get your FTP credentials from InfinityFree:
1. Login to your InfinityFree control panel
2. Go to **Accounts** → Select your account
3. Click **FTP Details** or **Account Settings**
4. Copy the FTP hostname, username, and password

Typical format:
- **Server**: `ftpupload.net` or `ftp.yourdomain.com`
- **Port**: 21 (default FTP)
- **Protocol**: FTP or FTPS
- **Directory**: `/htdocs/` (files go here)

## File Structure

```
maa-shakti-hospital/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # JavaScript functionality
├── README.md           # This file
├── .gitignore          # Git ignore rules
└── .github/
    └── workflows/
        └── deploy.yml  # GitHub Actions deployment workflow
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Customization

### Change Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #10b981;
    --accent-color: #f59e0b;
}
```

### Update Contact Information
Search and replace in `index.html`:
- Phone: `+91 98765 43210`
- Email: `info@maashaktihospital.com`
- Address: `123 Hospital Road, Medical District`

### Modify Doctors/Services
Edit the respective sections in `index.html` and update the content.

## License

© 2026 Maa Shakti Hospital. All Rights Reserved.

## Support

For issues or questions, please contact the development team.
