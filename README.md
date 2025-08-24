# 💼 NexumHub - Professional Portfolio

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28?logo=firebase&logoColor=black)
![Clerk](https://img.shields.io/badge/Clerk-Authentication-6C47FF?logo=clerk&logoColor=white)
![i18n](https://img.shields.io/badge/i18n-Multi--Language-blue?logo=google-translate&logoColor=white)
![GitHub API](https://img.shields.io/badge/GitHub-API-181717?logo=github&logoColor=white)
![Discord](https://img.shields.io/badge/Discord-Webhooks-5865F2?logo=discord&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animations-0055FF?logo=framer&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?logo=pwa&logoColor=white)

A **modern, interactive, and fully responsive professional portfolio** built with **Next.js 15, Tailwind CSS v4, Firebase Firestore, and Clerk Authentication**.  
Featuring **real-time chat, GitHub activity integration, Discord notifications**, and multi-language support for **English, Spanish, and Portuguese**.

## 🔗 **Live Demo:** [https://www.nexumhub.dev/](https://www.nexumhub.dev/)

---

## 🚀 Features

✅ Built with Next.js 15 (App Router) for optimal performance & SEO  
✅ Modern, responsive design with smooth animations  
✅ **Real-time chat system** using Firebase Firestore  
✅ **Discord webhook integration** for instant chat notifications  
✅ **GitHub API integration** displaying live activity and project data  
✅ **Multi-language support** (English, Spanish, Portuguese) with i18n  
✅ **Clerk Authentication** for secure user management  
✅ Interactive project showcase with detailed information  
✅ Professional contact forms and communication channels  
✅ PWA-ready with offline support and mobile optimization

---

## 🛠 Tech Stack

| Category                 | Technology                   |
| ------------------------ | ---------------------------- |
| **Framework**            | Next.js 15 (App Router)      |
| **Styling**              | Tailwind CSS v4              |
| **Authentication**       | Clerk                        |
| **Database**             | Firebase Firestore           |
| **Animations**           | Framer Motion                |
| **Internationalization** | next-intl (i18n)             |
| **APIs**                 | GitHub API, Discord Webhooks |
| **Deployment**           | Vercel                       |

---

## 🏗 Key Features

### 💬 Real-Time Chat System

- Built-in chat component for direct communication
- Firebase Firestore for real-time message synchronization
- Discord webhook notifications for instant alerts
- Professional chat interface with typing indicators

### 📊 GitHub Integration

- Live GitHub activity feed
- Real-time repository statistics
- Featured projects with detailed information
- Dynamic contribution graphs and metrics

### 🌍 Multi-Language Support

- Complete i18n implementation
- Support for English, Spanish, and Portuguese
- Dynamic language switching
- Localized content and UI elements

### 🔐 Authentication & Security

- Clerk integration for user authentication
- Secure chat sessions
- Protected routes and user management
- Professional user experience

---

## 🧩 Personal Coding Style

- `className` always written as an **array format** for readability
- First line always starts with `mobile` followed by general classes
- Fixed breakpoint order maintained: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- Conditional classes (e.g. `isOpen ? ... : ...`) always appended at the end of the `mobile` line
- Some breakpoint classes are intentionally **repeated** (e.g. `xl:hidden` and `2xl:hidden`) for consistency, even if redundant
- This is a **personal convention** for clarity in my own projects
- In a **professional environment**, I strictly follow the team’s conventions and coding standards

---

## 📂 Project Structure

```
src/
├── app/                # Next.js App Router pages and layouts
│   ├── [locale]/       # Internationalized routes
│   ├── api/           # API routes for integrations
│   └── globals.css    # Global styles
├── components/         # Reusable UI components
│   ├── ui/            # Base UI components
│   ├── features/      # Feature-specific components
│   │   ├── Chat/      # Real-time chat system
│   │   ├── GitHub/    # GitHub integration components
│   │   └── Portfolio/ # Portfolio showcase components
│   └── layout/        # Layout components
├── lib/               # Utility functions and configurations
│   ├── firebase.js    # Firebase configuration
│   ├── github.js      # GitHub API utilities
│   └── discord.js     # Discord webhook utilities
├── hooks/             # Custom React hooks
├── stores/            # State management (Zustand)
├── styles/            # Global CSS and Tailwind setup
└── i18n/              # Internationalization configurations
```

---

## ⚡ Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Koxone/NexumHub-Next-Tailwind-Firebase.git
cd NexumHub-Next-Tailwind-Firebase
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure environment variables

Create a `.env.local` file and add:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# GitHub API
GITHUB_TOKEN=your_github_personal_access_token
GITHUB_USERNAME=your_github_username

# Discord Webhook
DISCORD_WEBHOOK_URL=your_discord_webhook_url

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4️⃣ Set up Firebase

1. Create a new Firebase project
2. Enable Firestore Database
3. Set up authentication (optional)
4. Configure security rules for chat functionality

### 5️⃣ Configure Clerk Authentication

1. Create a Clerk account and application
2. Set up authentication methods
3. Configure webhooks and user management

### 6️⃣ Run the development server

```bash
npm run dev
```

Go to 👉 [http://localhost:3000](http://localhost:3000)

### 7️⃣ Build for production

```bash
npm run build
npm start
```

---

## 🎨 Customization

### Chat System

- Modify chat UI in `src/components/features/Chat/`
- Configure Discord notifications in `src/lib/discord.js`
- Customize Firebase rules for security

### GitHub Integration

- Update GitHub API calls in `src/lib/github.js`
- Modify project showcase in `src/components/features/GitHub/`
- Add or remove displayed repositories

### Multi-Language Support

- Add new languages in `src/i18n/`
- Update translation files for each locale
- Modify language switcher component

---

## 📱 Mobile Experience

- **Responsive Design**: Optimized for all device sizes
- **PWA Support**: Installable as a mobile app
- **Touch-Friendly**: Optimized touch interactions
- **Fast Loading**: Optimized for mobile networks

---

## 🔧 Key Integrations

### Firebase Firestore

- Real-time chat message storage
- User session management
- Scalable NoSQL database

### Discord Webhooks

- Instant chat notifications
- Professional communication alerts
- Customizable message formatting

### GitHub API

- Live repository data
- Contribution statistics
- Project showcasing
- Activity timeline

---

## 📈 Performance Features

- **Server-Side Rendering**: Fast initial page loads
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Lazy loading for better performance
- **Caching**: Optimized API response caching
- **SEO Optimized**: Meta tags and structured data

---

## 🌟 Future Enhancements

🔹 Advanced analytics dashboard  
🔹 Blog integration with CMS  
🔹 Enhanced project filtering and search  
🔹 Real-time collaboration features  
🔹 Integration with more development platforms

---

## 🤝 Contributing

Contributions are welcome!  
Feel free to open an **issue** or submit a **pull request** to improve the project.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.  
© 2025 [Kox](https://github.com/Koxone)

---

## 📞 Contact

- **Portfolio**: [https://www.nexumhub.dev/](https://www.nexumhub.dev/)
- **GitHub**: [@Koxone](https://github.com/Koxone)
- **LinkedIn**: [Connect with me](https://www.linkedin.com/in/carlos-d-leon/)

---

### 💡 Why NexumHub?

This portfolio represents the **next generation of professional portfolios**, combining:

✅ **Real-time Communication**: Direct chat with potential clients and collaborators  
✅ **Live Development Activity**: Showcase your active GitHub contributions  
✅ **Global Accessibility**: Multi-language support for international reach  
✅ **Modern Tech Stack**: Built with cutting-edge technologies  
✅ **Professional Experience**: Seamless user experience across all devices  
✅ **Scalable Architecture**: Ready for future enhancements and integrations

---

**Built with ❤️ by [Kox](https://github.com/Koxone) - Connecting developers with opportunities worldwide.**
