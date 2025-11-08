# Tribal Handicrafts E-Commerce Frontend

A modern, responsive e-commerce frontend application for selling authentic tribal handicrafts. Built with React, Vite, and React Router.

## Features

- 🛍️ **Product Catalog** - Browse 20+ authentic tribal handicrafts
- 🛒 **Shopping Cart** - Add, remove, and manage cart items
- 💰 **Multi-Currency Support** - USD, INR, EUR, GBP, JPY
- 👤 **User Authentication** - Simple login/registration system
- 💳 **Payment Processing** - Mock payment integration
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🎨 **Modern UI** - Clean and intuitive user interface

## Tech Stack

- **React 18** - UI library
- **Vite 5** - Build tool and dev server
- **React Router 6** - Client-side routing
- **LocalStorage** - Data persistence

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository
```bash
git clone https://github.com/mdfareedsohail/frontend.git
cd frontend
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Deployment

This project is configured for deployment on Render. The `render.yaml` file contains the deployment configuration.

### Deploy on Render

1. Push your code to GitHub
2. Connect your repository to Render
3. Render will automatically detect the `render.yaml` configuration
4. Your site will be deployed automatically

## Project Structure

```
├── public/          # Static assets
├── src/
│   ├── components/  # React components
│   ├── pages/       # Page components
│   ├── data/        # Product data
│   ├── utils/       # Utility functions
│   └── styles.css   # Global styles
├── index.html
├── package.json
└── vite.config.js
```

## Routes

- `/` - Home page with product catalog
- `/product/:id` - Product detail page
- `/cart` - Shopping cart
- `/payment` - Payment page
- `/login` - Login/Registration

## License

This project is private and proprietary.
