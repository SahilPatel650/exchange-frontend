# Trading Platform Frontend

A modern trading platform frontend built with Next.js, Firebase Authentication, and shadcn/ui components.

## Features

- User authentication (sign up, login, logout)
- Protected dashboard
- Modern UI with shadcn/ui components
- Firebase integration for user management

## Prerequisites

- Node.js 18.x or later
- npm or yarn
- Firebase project with Authentication and Firestore enabled

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd exchange-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase:
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password) and Firestore
   - Get your Firebase configuration from Project Settings
   - Copy the configuration values to `.env.local` file

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

- `src/app/` - Next.js app router pages
- `src/components/` - Reusable UI components
- `src/contexts/` - React contexts (e.g., AuthContext)
- `src/lib/` - Utility functions and configurations

## Environment Variables

Create a `.env.local` file with the following variables:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
