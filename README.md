# Full Stack Open: Next.js Blog Application

A modern, full-stack blog application built with **Next.js 16**, **TypeScript**, and **Drizzle ORM**. Developed as part of the [Full Stack Open](https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-nextjs) course by the University of Helsinki.

This project emphasizes clean architecture, type safety, separation of concerns, and robust end-to-end (E2E) testing.

## 🚀 Live Demo

> **[Live Application](https://fullstackopennextjsbol507.vercel.app/)** ([Source Code](https://github.com/bol507/fullstackopen_nextjs))

## ✨ Features

- **Secure Authentication**: User registration, login, and logout powered by NextAuth.js v5 with secure password hashing (bcrypt).
- **Blog Management**: Create, view, and like blog posts with server-side rendering (SSR) and seamless client-side interactions.
- **Personalized Reading List**: Users can save blogs to their reading list and toggle their "read/unread" status, with real-time UI updates via Server Actions.
- **API Token Management**: Secure generation and revocation of personal API tokens for authenticated users.
- **Comprehensive E2E Testing**: A robust test suite built with **Playwright**, ensuring reliable user flows (authentication, navigation, and data manipulation).
- **Modern UI/UX**: Fully responsive design with dark mode support, built using **Tailwind CSS** and accessible components.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Server Components, Server Actions)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: PostgreSQL (hosted on [Neon](https://neon.tech/))
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication**: [NextAuth.js v5](https://authjs.dev/)
- **Testing**: [Playwright](https://playwright.dev/)
- **Package Manager**: `pnpm`

## 📦 Getting Started

Follow these instructions to get a local copy up and running.

### Prerequisites

- Node.js (v24 or higher)
- `pnpm` package manager
- A PostgreSQL database (e.g., via Neon)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/bol507/fullstackopen_nextjs.git
   cd fullstackopen_nextjs