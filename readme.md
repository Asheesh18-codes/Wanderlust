<div align="center">

# 🌍 Wanderlust
**An Airbnb‑style platform for discovering & sharing unique stays**

[![Stars](https://img.shields.io/github/stars/Asheesh18-codes/Wanderlust?style=flat-square)](https://github.com/Asheesh18-codes/Wanderlust/stargazers)
[![Issues](https://img.shields.io/github/issues/Asheesh18-codes/Wanderlust?style=flat-square)](https://github.com/Asheesh18-codes/Wanderlust/issues)
[![Node](https://img.shields.io/badge/Node.js-18+-green?style=flat-square)](https://nodejs.org)
[![Live Demo](https://img.shields.io/badge/Live-Demo-FF385C?style=flat-square)](https://wanderlust-1-f7ft.onrender.com/listings)

</div>

Wanderlust is a modern full‑stack web application for discovering and publishing travel accommodation listings. It delivers an Airbnb‑inspired UX with secure auth, image hosting, geocoded locations, ratings & reviews, and a clean responsive design.

## 🌐 Live Demo

**Experience Wanderlust live:** [https://wanderlust-1-f7ft.onrender.com/listings](https://wanderlust-1-f7ft.onrender.com/listings)

> 🚀 The application is deployed on Render and ready to use. Create an account to start exploring and listing properties!

---

## 📑 Table of Contents
1. [Live Demo](#-live-demo)
2. [Features](#-features)
3. [Design Highlights](#-design-highlights)
4. [Project Structure](#-project-structure)
5. [Tech Stack](#️-technologies-used)
6. [Getting Started](#-getting-started)
7. [Environment Variables](#-environment-variables)
8. [Data Models](#-data-models)
9. [Primary Routes](#-primary-routes)
10. [Security & Validation](#-security--validation)
11. [Troubleshooting](#-troubleshooting)
12. [Roadmap](#-roadmap)
13. [Contributing](#-contributing)
14. [Acknowledgments](#-acknowledgments)
15. [License](#license)

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

> **Live Demo**: [https://wanderlust-1-f7ft.onrender.com/listings](https://wanderlust-1-f7ft.onrender.com/listings)  
> **Local Development**: The app runs on `http://localhost:8080`

### ⏱ Quick Start (Copy & Run)

```powershell
# 1. Clone
git clone https://github.com/Asheesh18-codes/Wanderlust.git
cd Wanderlust

# 2. Install dependencies
npm install

# 3. (Optional) Create .env from template
Copy-Item .env.example .env -ErrorAction SilentlyContinue

# 4. Seed sample data
node init/index.js

# 5. Start server
node app.js
```

Open: http://localhost:8080

### 📋 Prerequisites

- **Node.js** (v14 or higher) & npm
- **MongoDB** (running locally or MongoDB Atlas)
- **Cloudinary account** (for image uploads)
- **Mapbox account** (for interactive maps)

### ⚙️ Manual Setup Steps
1. Clone repository (see Quick Start above).
2. Run `npm install`.
3. Create `.env` (see below). 
4. Ensure MongoDB service is running locally OR provide an Atlas URI.
5. (Optional) Seed database with curated sample listings: `node init/index.js`.
6. Start the server: `node app.js` (or add a `start` script to `package.json`).

### 🧪 Suggested NPM Scripts (add to `package.json`)
```jsonc
"scripts": {
   "start": "node app.js",
   "dev": "nodemon app.js" // install nodemon as a dev dependency
}
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

Optional (future enhancements):
- `NODE_ENV=production` (enables secure cookies if you adjust session config)
- `PORT=8080` (currently hard-coded; abstract if you prefer deployment flexibility)

> Tip: Create an `.env.example` file to help contributors (a template is recommended – see below).

### 📄 Example `.env.example`
```env
SESSION_SECRET=change_me
MONGODB_URI=mongodb://127.0.0.1:27017/wanderlust
CLOUD_NAME=xxxx
CLOUD_API_KEY=xxxxxxxxxxxxxxxxxxxx
CLOUD_API_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
MAP_TOKEN=pk.eyJ....
```

Commit `.env.example` – NEVER commit your real `.env`.

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
- **Render** - Cloud application hosting

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

## 🧬 Data Models

### Listing
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| title | String | ✅ | Listing title |
| description | String | ✅ | Rich text description |
| image.filename | String | ❌ | Defaults to placeholder |
| image.url | String | ❌ | Defaults to Unsplash image |
| price | Number | ✅ | Must be >= 0 |
| location | String | ✅ | City / locality |
| country | String | ✅ | Country name |
| review[] | ObjectId(Review) | ❌ | Auto‑deleted cascade on listing removal |
| owner | ObjectId(User) | ✅ | Authenticated creator |
| geometry | GeoJSON Point | ✅ | `[lng, lat]` for Mapbox |

### Review
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| rating | Number | ✅ | 1–5 |
| comment | String | ✅ | User text |
| author | ObjectId(User) | ✅ | Reference to user |
| created_at | Date | ❌ | Default now |

### User
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| username | String | ✅ | Added by passport-local-mongoose |
| email | String | ✅ | Unique email |
| hash/salt | String | ✅ | Managed internally by passport-local-mongoose |

## 📡 Primary Routes

### Listings (`/listings`)
| Method | Path | Purpose | Middleware |
|--------|------|---------|------------|
| GET | / | List all listings | — |
| GET | /new | Render create form | isLoggedIn |
| POST | / | Create new listing | isLoggedIn, upload.single, validateListing |
| GET | /:id | Show listing details | — |
| GET | /:id/edit | Edit form | isLoggedIn, isOwner |
| PUT | /:id | Update listing | isLoggedIn, isOwner, upload.single, validateListing |
| DELETE | /:id | Delete listing | isLoggedIn, isOwner |

### Reviews (`/listings/:id/reviews`)
| Method | Path | Purpose | Middleware |
|--------|------|---------|------------|
| POST | / | Add review | isLoggedIn, validateReview |
| DELETE | /:reviewId | Delete review | isLoggedIn, isReviewAuthor |

### Auth (`/`)
| Method | Path | Purpose |
|--------|------|---------|
| GET | /signup | Signup form |
| POST | /signup | Create user |
| GET | /login | Login form |
| POST | /login | Authenticate |
| GET | /logout | Destroy session |

## 🔐 Security & Validation
- Password hashing & salting via `passport-local-mongoose`
- Session cookies: `httpOnly` (toggle `secure` for HTTPS deployments)
- Server-side validation: Joi schemas (`schema.js`)
- Auth guards: `isLoggedIn`, `isOwner`, `isReviewAuthor`
- Controlled file uploads via Multer + Cloudinary storage adapter
- Cascade delete of associated reviews on listing removal

> Consider enabling Helmet & rate limiting (`express-rate-limit`) in production.

## 🧪 Testing (Planned)
Currently no automated tests. Suggested stack:
- Jest + Supertest for route/integration tests
- MongoDB Memory Server for isolated DB runs
- Lighthouse / Playwright for UX regression (optional)

## 🛟 Troubleshooting
| Issue | Possible Cause | Fix |
|-------|----------------|-----|
| Cannot connect to DB | MongoDB not running | Start local service / check URI |
| Images not uploading | Cloudinary creds invalid | Recreate API key / verify env vars |
| Map not loading | Invalid Mapbox token | Regenerate public token |
| Session not persisting | Missing SESSION_SECRET | Add to `.env` |
| 404 on edit/delete | Ownership check failing | Ensure logged in as listing owner |

## 🧭 Roadmap
- [ ] Add search & advanced filtering (price range, country)
- [ ] Favorites / wishlist feature
- [ ] Pagination & infinite scroll for listings
- [ ] Image gallery & multi‑image uploads
- [ ] Email verification & password reset flow
- [ ] Enhanced deployment monitoring and logging
- [ ] API layer (JSON endpoints) for future SPA/mobile client

## 🚀 Deployment

The application is currently deployed on **Render** at: [https://wanderlust-1-f7ft.onrender.com/listings](https://wanderlust-1-f7ft.onrender.com/listings)

### Deployment Features:
- ✅ **Production-ready** with secure HTTPS
- ✅ **MongoDB Atlas** integration
- ✅ **Cloudinary** for image management  
- ✅ **Environment variables** configured
- ✅ **Automatic deployments** from main branch

## 🔧 Dev Tips
- Run `node --watch app.js` (Node 18+) for a lightweight dev reload if you don't add Nodemon.
- Use MongoDB Compass to inspect seeded data.
- Validate GeoJSON coordinates are `[longitude, latitude]` (order matters for Mapbox).

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
- **Render** for seamless deployment platform
- The **open-source community** for the incredible tools and libraries

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/Asheesh18-codes/Wanderlust/issues) page
2. Create a new issue with detailed description
3. Include screenshots for UI-related problems
4. Try the live demo first: [https://wanderlust-1-f7ft.onrender.com/listings](https://wanderlust-1-f7ft.onrender.com/listings)

---

<div align="center">

**Made with ❤️ for travelers around the world**

*Start your journey with Wanderlust today!* 🌍✈️

**🌐 [Try Live Demo](https://wanderlust-1-f7ft.onrender.com/listings)**

</div>
