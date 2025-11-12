# 📝 Blog Application

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) blog application that allows users to create, read, update, and delete blog posts with user authentication and image uploads.



## 🌟 Features

### 🔐 Authentication System
- **User Registration**: Create new accounts with secure password hashing
- **User Login**: JWT-based authentication system
- **Session Management**: Persistent login sessions with refresh tokens
- **Protected Routes**: Route protection for authenticated users only

### 📝 Blog Management
- **Create Posts**: Rich text editor for creating engaging blog posts
- **Read Posts**: Browse and view all published blog posts
- **Update Posts**: Edit your own published posts
- **Delete Posts**: Remove posts with proper authorization
- **Categories**: Organize posts by categories for better navigation

### 🖼️ Media Management
- **Image Upload**: Upload cover images for blog posts
- **Image Preview**: Real-time image preview before publishing
- **GridFS Storage**: Efficient image storage using MongoDB GridFS

### 💬 Interactive Features
- **Comments System**: Users can comment on blog posts
- **Responsive Design**: Mobile-friendly interface
- **User Profiles**: Author information display

### 🎨 User Interface
- **Modern Design**: Clean and intuitive user interface
- **Material-UI Components**: Professional UI components
- **Responsive Layout**: Works seamlessly on all devices
- **Dark/Light Theme Support**: User preference-based theming

## 🛠️ Tech Stack

### Frontend
- **React 19**: Latest React version with hooks
- **Material-UI (MUI)**: Component library for beautiful UI
- **React Router DOM**: Client-side routing
- **Axios**: HTTP client for API requests
- **Vite**: Fast build tool and development server

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Tokens for authentication
- **Bcrypt**: Password hashing
- **Multer**: File upload handling
- **GridFS**: File storage system

## 📁 Project Structure

```
Blog App/
├── blogging-app/          # Frontend React application
│   ├── public/           # Static assets
│   ├── src/
│   │   ├── components/   # React components
│   │   │   ├── account/  # Login/Signup components
│   │   │   ├── banner/   # Hero banner component
│   │   │   ├── create/   # Post creation components
│   │   │   ├── details/  # Post detail view
│   │   │   ├── header/   # Navigation header
│   │   │   ├── home/     # Home page components
│   │   │   └── common/   # Shared components
│   │   ├── constants/    # Configuration constants
│   │   ├── context/      # React context providers
│   │   ├── service/      # API service functions
│   │   └── utils/        # Utility functions
│   ├── package.json
│   └── vite.config.js
│
├── server/               # Backend Node.js application
│   ├── controller/       # Route controllers
│   ├── database/         # Database configuration
│   ├── middleware/       # Custom middleware
│   ├── model/           # Mongoose models
│   ├── routes/          # API routes
│   ├── package.json
│   └── index.js         # Server entry point
│
└── README.md            # Project documentation
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/prachipatilcloud/Blog-Application.git
cd Blog-Application
```

### 2. Backend Setup
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Configure your environment variables in .env:
# PORT=8000
# MONGODB_URI=mongodb://localhost:27017/blogapp
# JWT_SECRET=your_jwt_secret_key
# JWT_REFRESH_SECRET=your_refresh_secret_key

# Start the backend server
npm start
```

### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd ../blogging-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

### 4. Access the Application
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:8000

## 🔧 Environment Variables

Create a `.env` file in the server directory with the following variables:

```env
PORT=your_preferred_port
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_jwt_secret
JWT_REFRESH_SECRET=your_strong_refresh_secret
```

**⚠️ Security Note**: 
- Never commit your `.env` file to version control
- Use strong, unique secrets for JWT tokens
- Keep your MongoDB connection string secure

## 📖 API Endpoints

### Authentication
- `POST /api/signup` - User registration
- `POST /api/login` - User login
- `POST /api/logout` - User logout
- `POST /api/token` - Refresh access token

### Blog Posts
- `GET /api/posts` - Get all posts
- `GET /api/post/:id` - Get single post
- `POST /api/create` - Create new post
- `PUT /api/update/:id` - Update post
- `DELETE /api/delete/:id` - Delete post

### Comments
- `GET /api/comments/:id` - Get comments for post
- `POST /api/comment/new` - Add new comment
- `DELETE /api/comment/delete/:id` - Delete comment

### File Upload
- `POST /api/file/upload` - Upload image
- `GET /api/file/:filename` - Get uploaded file

## 🎯 Usage

### Creating a Blog Post
1. Register/Login to your account
2. Navigate to "Create Post"
3. Add a title and content
4. Upload a cover image (optional)
5. Select a category
6. Click "Publish"

### Reading Blog Posts
1. Visit the home page
2. Browse posts by category
3. Click on any post to read the full content
4. View comments and add your own

### Managing Your Posts
1. View your published posts
2. Click "Edit" to modify content
3. Use "Delete" to remove posts
4. Track engagement through comments

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Prachi Patil**
- GitHub: [@prachipatilcloud](https://github.com/prachipatilcloud)
- LinkedIn: [Prachi Patil](https://linkedin.com/in/prachi-patil)

## 🙏 Acknowledgments

- Material-UI team for the amazing component library
- MongoDB team for the robust database solution
- React team for the powerful frontend framework
- Express.js team for the flexible backend framework

## 📞 Support

If you have any questions or need help with the project, please feel free to:
- Open an issue on GitHub
- Contact me through LinkedIn

---

⭐ Star this repository if you found it helpful!
