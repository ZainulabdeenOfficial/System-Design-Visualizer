# System Design Visualizer 🏗️

A beautiful, AI-powered web application that transforms system design text into stunning visual diagrams. Built with Next.js, React, and Tailwind CSS.

![System Design Visualizer](https://img.shields.io/badge/Next.js-14.0.0-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- **🎨 Beautiful UI**: Modern, responsive design with glass morphism effects
- **🤖 AI-Powered Parsing**: Intelligent text analysis to understand system components
- **📊 Visual Diagrams**: Generate professional system architecture diagrams
- **💾 Download Support**: Export diagrams as high-quality PNG images
- **⚡ Real-time Generation**: Instant visualization with smooth animations
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **🎯 Smart Component Detection**: Automatically identifies different types of system components
- **🔗 Connection Visualization**: Shows relationships between system components

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd system-design-visualizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 How to Use

1. **Describe Your System**: Enter your system design description in the text area
2. **Choose Examples**: Use the provided example templates to get started quickly
3. **Generate Diagram**: Click "Generate System Design" to create your visualization
4. **Download**: Save your diagram as a PNG image for presentations or documentation

### Example Input

```
A microservices architecture with API Gateway, User Service, Product Service, 
Order Service, and Payment Service. Each service has its own database. 
Redis for caching, RabbitMQ for message queuing, and Elasticsearch for search functionality.
```

## 🏗️ Architecture

The application is built with a modern tech stack:

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom animations
- **Animations**: Framer Motion for smooth interactions
- **Icons**: Lucide React for beautiful icons
- **Export**: html2canvas for PNG generation
- **Type Safety**: TypeScript for better development experience

## 📁 Project Structure

```
system-design-visualizer/
├── app/
│   ├── globals.css          # Global styles and Tailwind config
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main application page
├── components/
│   ├── Header.tsx           # Navigation header
│   ├── Footer.tsx           # Footer component
│   └── SystemDesignVisualizer.tsx  # Main diagram component
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

## 🎨 Component Types

The visualizer automatically detects and categorizes different types of system components:

- **🖥️ Servers**: Web servers, application servers, microservices
- **🗄️ Databases**: PostgreSQL, MySQL, Redis, Elasticsearch
- **🚪 Gateways**: API gateways, load balancers
- **💾 Storage**: CDN, S3, file storage
- **🔧 Components**: General system components

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

The application can be deployed to any platform that supports Next.js:

```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Lucide](https://lucide.dev/) for beautiful icons
- [html2canvas](https://html2canvas.hertzen.com/) for image export functionality

## 📞 Support

If you have any questions or need help, please:

- Open an issue on GitHub
- Check the documentation
- Contact the development team

---

Made with ❤️ for the developer community

# System-Design-Visualizer