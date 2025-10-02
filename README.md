# Nuvora - Modern E-commerce Platform

Nuvora is a high-performance e-commerce platform built with modern web technologies, featuring a beautiful and responsive UI, internationalization, and PWA support.

## 🚀 Features

- ⚡ **Blazing Fast** - Built with Vite and React 19
- 🎨 **Beautiful UI** - Powered by shadcn/ui and Tailwind CSS
- 🌍 **Internationalization** - Multi-language support with i18next
- 📱 **PWA** - Installable and works offline
- 🔍 **SEO Optimized** - Server-side rendering ready
- 🧪 **Tested** - Comprehensive test coverage with Vitest
- 🛒 **E-commerce Features** - Product catalog, cart, wishlist, and checkout
- 🌓 **Dark Mode** - Built-in dark/light theme support
- 🔐 **Authentication** - Secure user authentication
- 📱 **Fully Responsive** - Works on all devices

## 🛠 Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: React Context
- **Routing**: React Router
- **Internationalization**: i18next
- **Form Handling**: React Hook Form
- **UI Components**: Radix UI Primitives
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint + Prettier
- **Type Checking**: TypeScript
- **PWA**: Vite PWA Plugin

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+ or yarn 1.22+ or pnpm 8+

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/nuvora.git
   cd nuvora
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🏗 Project Structure

```
nuvora/
├── public/             # Static files
├── src/
│   ├── assets/         # Images, fonts, etc.
│   ├── components/     # Reusable UI components
│   ├── contexts/       # React contexts
│   ├── data/           # Mock data and constants
│   ├── hooks/          # Custom React hooks
│   ├── layouts/        # Layout components
│   ├── lib/            # Utility functions
│   ├── locales/        # Translation files
│   ├── pages/          # Page components
│   ├── styles/         # Global styles
│   ├── App.jsx         # Main App component
│   └── main.jsx        # Application entry point
├── .eslintrc.js        # ESLint configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── vite.config.js      # Vite configuration
└── package.json        # Project dependencies
```

## 📦 Available Scripts

- `dev` - Start development server
- `build` - Build for production
- `preview` - Preview production build locally
- `test` - Run tests
- `test:watch` - Run tests in watch mode
- `lint` - Lint code
- `format` - Format code with Prettier

## 🛠 Development

### Adding Components

To add new components from shadcn/ui:
```bash
npx shadcn-ui@latest add [component-name]
```

### Adding Translations

1. Add new keys to all language files in `src/locales/`
2. Use the `useTranslation` hook in your components

### Environment Variables

Create a `.env` file in the root directory:
```env
VITE_API_URL=your_api_url_here
VITE_GOOGLE_ANALYTICS_ID=your_ga_id
```

## 🧪 Testing

Run tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm test:watch
```

## 🚀 Deployment

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📧 Contact

Your Name - [@your_twitter](https://twitter.com/your_twitter) - your.email@example.com

Project Link: [https://github.com/your-username/nuvora](https://github.com/your-username/nuvora)
