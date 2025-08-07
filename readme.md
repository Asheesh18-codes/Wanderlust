# 🌍 Wanderlust - Airbnb-Style Travel Platform

Wanderlust is a modern, full-stack web application for discovering and booking unique travel accommodations around the world. Built with cutting-edge web technologies and featuring a beautiful Airbnb-inspired design, it provides a seamless experience for travelers and hosts alike.

## ✨ Features

### 🔐 **Authentication & User Management**
- Secure user registration and login system
- Passport.js integration with local strategy
- Session management with express-session
- User profile management

### 🏠 **Property Management**
- Create, edit, and delete property listings
- Upload and manage property images with Cloudinary
- Interactive property details with booking interface
- Location-based mapping with Mapbox integration

### ⭐ **Review System**
- Interactive 5-star rating system
- Add, view, and delete reviews
- User-friendly review cards with avatars
- Review validation and moderation

### 🎨 **Modern UI/UX Design**
- **Airbnb-inspired interface** with professional styling
- **Responsive design** that works on all devices
- **Modern color scheme** with CSS custom properties
- **Interactive animations** and hover effects
- **Clean typography** with Inter font family
- **Card-based layouts** with subtle shadows and rounded corners

### 🔍 **Enhanced Navigation**
- Sticky navigation bar with search functionality
- Category filters with active states
- User-friendly dropdown menus
- Mobile-responsive navigation

### 📱 **Mobile-First Design**
- Fully responsive layout for all screen sizes
- Touch-friendly interface elements
- Optimized mobile navigation
- Adaptive grid systems

## 🎨 Design Highlights

- **Color Palette**: Professional Airbnb-inspired colors (#FF385C primary red)
- **Typography**: Modern Inter font with proper weight hierarchy  
- **Cards**: Elevated cards with smooth hover animations
- **Filters**: Horizontal scrolling category filters with icons
- **Forms**: Clean, modern authentication forms
- **Reviews**: Beautiful review cards with user avatars
- **Navigation**: Sleek navbar with integrated search

## 📁 Project Structure

```
Wanderlust/
├── 📄 app.js                    # Main application entry point
├── 🔧 middleware.js             # Custom middleware functions
├── 📋 schema.js                 # Joi validation schemas
├── ☁️  cloudConfig.js           # Cloudinary configuration
├── 📂 models/                   # Mongoose data models
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── 🛣️  Routes/                   # Express route handlers
│   ├── listing.js
│   ├── reviews.js
│   └── user.js
├── 🔧 utils/                    # Utility functions
│   ├── ExpressError.js
│   └── wrapAsync.js
├── 🎨 public/                   # Static assets
│   ├── CSS/
│   │   ├── style.css           # Main Airbnb-style CSS
│   │   └── rating.css          # Star rating styles
│   ├── map.js                  # Mapbox integration
│   └── script.js               # Client-side JavaScript
├── 📋 views/                    # EJS templates
│   ├── layouts/
│   │   └── boilerplate.ejs     # Main layout template
│   ├── includes/
│   │   ├── navbar.ejs          # Modern navigation bar
│   │   ├── footer.ejs          # Enhanced footer
│   │   ├── flash.ejs           # Flash messages
│   │   └── filter.ejs          # Category filters
│   ├── user/
│   │   ├── login.ejs           # Modern login form
│   │   └── signup.ejs          # Modern signup form
│   ├── index.ejs               # Homepage with listings grid
│   ├── show.ejs                # Property details page
│   ├── edit.ejs                # Edit listing form
│   ├── Newform.ejs             # Create listing form
│   └── error.ejs               # Error handling page
└── 🗃️  init/                     # Database initialization
    ├── data.js
    └── index.js
```

## 🚀 Getting Started

### 📋 Prerequisites

- **Node.js** (v14 or higher) & npm
- **MongoDB** (running locally or MongoDB Atlas)
- **Cloudinary account** (for image uploads)
- **Mapbox account** (for interactive maps)

### ⚡ Quick Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Asheesh18-codes/Wanderlust.git
   cd Wanderlust
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory:
   ```env
   SESSION_SECRET=your_super_secret_session_key_here
   MONGODB_URI=mongodb://127.0.0.1:27017/wanderlust
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   MAP_TOKEN=your_mapbox_access_token
   ```

4. **Seed the database (optional):**
   ```bash
   node init/index.js
   ```

5. **Start the development server:**
   ```bash
   node app.js
   ```

6. **Open your browser and visit:**
   ```
   http://localhost:8080
   ```

## 🌐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `SESSION_SECRET` | Secret key for session management | ✅ Yes |
| `MONGODB_URI` | MongoDB connection string | ✅ Yes |
| `CLOUD_NAME` | Cloudinary cloud name | ✅ Yes |
| `CLOUD_API_KEY` | Cloudinary API key | ✅ Yes |
| `CLOUD_API_SECRET` | Cloudinary API secret | ✅ Yes |
| `MAP_TOKEN` | Mapbox access token | ✅ Yes |

## 🛠️ Technologies Used

### **Backend**
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Passport.js** - Authentication middleware
- **Express-session** - Session management
- **Joi** - Data validation
- **Multer** - File upload handling

### **Frontend**
- **EJS** - Templating engine
- **Bootstrap 5** - CSS framework
- **Custom CSS** - Airbnb-inspired styling
- **Font Awesome** - Icon library
- **Inter Font** - Modern typography

### **Cloud Services**
- **Cloudinary** - Image storage and optimization
- **Mapbox** - Interactive maps and geocoding

### **Development Tools**
- **Method-override** - HTTP verb support
- **Connect-flash** - Flash messaging
- **Dotenv** - Environment variable management

## 🎯 Key Features Showcase

### 🎨 **Modern Design System**
- CSS custom properties for consistent theming
- Airbnb-inspired color palette and typography
- Smooth animations and micro-interactions
- Mobile-first responsive design

### 🔧 **Advanced Functionality**
- Image upload with Cloudinary integration
- Interactive maps with Mapbox
- Real-time form validation
- Session-based authentication
- RESTful API architecture

### 📊 **Performance Optimized**
- Efficient database queries with Mongoose
- Image optimization through Cloudinary
- Minimal CSS and JavaScript footprint
- Fast server-side rendering with EJS

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch:** `git checkout -b feature-name`
3. **Make your changes** with proper commit messages
4. **Test thoroughly** on different screen sizes
5. **Submit a pull request** with a detailed description

### 🔧 Development Guidelines
- Follow the existing code style and structure
- Ensure mobile responsiveness for any UI changes
- Test authentication flows thoroughly
- Validate all forms on both client and server side

## 🙏 Acknowledgments

- **Airbnb** for design inspiration
- **Bootstrap** team for the excellent CSS framework
- **Mapbox** for providing amazing mapping services
- **Cloudinary** for reliable image management
- The **open-source community** for the incredible tools and libraries

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/Asheesh18-codes/Wanderlust/issues) page
2. Create a new issue with detailed description
3. Include screenshots for UI-related problems

---

<div align="center">

**Made with ❤️ for travelers around the world**

*Start your journey with Wanderlust today!* 🌍✈️

[![GitHub stars](https://img.shields.io/github/stars/Asheesh18-codes/Wanderlust?style=social)](https://github.com/Asheesh18-codes/Wanderlust/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Asheesh18-codes/Wanderlust?style=social)](https://github.com/Asheesh18-codes/Wanderlust/network)

</div>
