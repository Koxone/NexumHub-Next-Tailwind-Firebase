# 🧭 TestigoMX

![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28?logo=firebase&logoColor=black)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Media-3448C5?logo=cloudinary&logoColor=white)
![Clerk](https://img.shields.io/badge/Clerk-Auth-5A67D8?logo=clerk&logoColor=white)
![i18n](https://img.shields.io/badge/i18n-ES%2FEN-blue?logo=google-translate&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?logo=pwa&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deploy-black?logo=vercel&logoColor=white)

Humanitarian platform to **document and search forensic findings and reports related to missing persons in Mexico**, with **images on Cloudinary** and **metadata on Firestore**. Provides **advanced full-sentence search**, **combinable filters**, **privacy control**, and **bilingual support**.

## 🔗 Live Demo

[Coming soon](https://www.testigo.mx/)

---

## 🚀 Features

- Consistent data model for each finding
- Image upload to Cloudinary and metadata in Firestore
- Advanced full-sentence search that is independent from filters
- Filters by category, type, color, and location
- Authentication with Clerk and protected views based on `isPrivate`
- Internationalization ES and EN with i18n
- Technical SEO with Next.js `metadata`
- PWA ready

---

## 🛠 Tech Stack

| Category       | Technology         |
| -------------- | ------------------ |
| Framework      | Next.js and React  |
| Styling        | Tailwind CSS v4    |
| State          | React Context      |
| Authentication | Clerk              |
| Database       | Firebase Firestore |
| Storage        | Cloudinary         |
| i18n           | react-i18next      |
| Deploy         | Vercel             |

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
├── components/
│   └── Sections/
│       └── Upload/
│           └── ObjectForm.jsx
├── Components/ (other UI and features modules)
├── pages/ or app/ (depending on the project setup)
└── utils/ (helpers, hooks, and so on)
```

- `ObjectForm.jsx` uses internal components `FormInput`, `FormTextarea`, and `FormImage`.
- `FormImage` must behave like `TestCloudinaryUpload` to upload to Cloudinary and return `secure_url`.

---

## 🧱 Data Model

```json
{
  "id": "string",
  "category": "string",
  "type": "string",
  "color": "string",
  "state": "string",
  "date": "string",
  "location": "string",
  "collective": "string",
  "description": "string",
  "fileNumber": "string",
  "notes": "string",
  "image": "string",
  "isPrivate": true,
  "tags": ["string"]
}
```

Key notes

- `tags` is the core for text search.
- `image` stores the Cloudinary secure URL when applicable.
- `isPrivate` enables access control for sensitive information.

---

## 🔎 Advanced Search

- Full sentence search hook that compares `type`, `color`, `location`, `description`, `notes`, `category`.
- Works in parallel with select filters. They do not interfere with each other.
- First version runs in the frontend. There is a plan to migrate to the backend to improve ranking, tokenization, and typo tolerance.

---

## 🖼 Cloudinary

- Operational folders
  - `TestigoMX/missing` for missing persons
  - `TestigoMX/lost` for findings
- Bulk upload from local folder `extraviadosFotos` from the project in VSCode, without `.env.local` for that specific task.
- Extract display names from filenames and show them automatically.

---

## 🔐 Security and Privacy

- Data and images can be sensitive. Use `isPrivate` to limit access.
- Keep credentials out of the client. For bulk uploads, run server side scripts with secure credentials.
- Activity logs and the least privilege principle when connecting Clerk to Firestore.

---

## ⚙️ Quick Setup

### 1) Clone

```bash
git clone <repo-url>
cd testigomx
```

### 2) Install dependencies

```bash
npm install
```

### 3) Environment variables

Create `.env.local` for the app, except for the bulk upload script that uses secure credentials out of the client:

```env
# Firebase
FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=

# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_FOLDER_MISSING=TestigoMX/missing
CLOUDINARY_FOLDER_LOST=TestigoMX/lost

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

### 4) Development

```bash
npm run dev
# http://localhost:3000
```

### 5) Build

```bash
npm run build
npm start
```

---

## 🧰 Useful Scripts

- `npm run upload:cloudinary` Run a server side script to upload the `extraviadosFotos` folder to `TestigoMX/lost`.
- `npm run lint` Static analysis.
- `npm run typecheck` If you use TypeScript.

---

## 🗺 Short Roadmap

- Integrate `FormImage` with Cloudinary and store `secure_url` in Firestore.
- Implement bulk upload of 12,000 images from the local folder with a server side script.
- Complete Clerk integration for protected views with `isPrivate`.
- Migrate advanced search to the backend to improve ranking and performance.
- Optimize Next.js `metadata` for technical SEO.

---

## 🤝 Contributing

Open an issue with context and reproducible steps. Pull requests are welcome.

---

## 📜 License

MIT © 2025 Koxone
