# 🎨 Blog Application - Frontend

This is the frontend React application for the Blog Application project.

## 🛠️ Built With

- **React 19** - Latest React version with modern hooks
- **Vite** - Fast build tool and development server
- **Material-UI (MUI)** - React component library
- **React Router DOM** - Client-side routing
- **Axios** - Promise-based HTTP client
- **Emotion** - CSS-in-JS library

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and visit:
```
http://localhost:5173
```

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── account/         # Authentication components
│   ├── banner/          # Hero banner
│   ├── create/          # Post creation
│   ├── details/         # Post details
│   ├── header/          # Navigation
│   ├── home/            # Home page
│   └── common/          # Shared components
├── constants/           # App constants
├── context/             # React context
├── service/             # API services
├── utils/               # Utility functions
├── App.jsx             # Main app component
└── main.jsx            # Entry point
```

## 🎯 Features

- **Responsive Design** - Works on all devices
- **Modern UI** - Clean and intuitive interface
- **Real-time Updates** - Live data updates
- **Image Upload** - Drag and drop image uploads
- **Rich Text Editor** - Advanced text editing
- **Category Filtering** - Filter posts by category
- **User Authentication** - Secure login system

## 🔧 Configuration

The frontend communicates with the backend API running on `http://localhost:8000`. Update the API base URL in `src/constants/config.js` if needed.

## 📱 Responsive Breakpoints

- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

## 🎨 Theme

The application uses Material-UI's theming system with custom colors and typography. Theme configuration can be found in the component styling.

---

For the complete project documentation, see the main [README.md](../README.md) file.
