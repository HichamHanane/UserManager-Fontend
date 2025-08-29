# UserManager Frontend

A user management dashboard built with React, Redux Toolkit, Vite, and Material UI. This app supports authentication, user registration, profile management, and admin dashboard features.

## Features

- User login and registration
- Protected routes for admin and user roles
- User profile page
- Admin dashboard with user table and add/delete user functionality
- Form validation with React Hook Form and Yup
- Toast notifications with Sonner

## Tech Stack

- React
- Redux Toolkit
- React Router
- Material UI
- Axios
- Vite

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

```sh
npm install
```

### Running the App

```sh
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

### Building for Production

```sh
npm run build
```

### Linting

```sh
npm run lint
```

## Project Structure

```
src/
  components/      # Reusable UI components
  features/        # Redux slices
  pages/           # Route pages
  store/           # Redux store setup
  assets/          # Static assets
  App.jsx          # Main app component
  main.jsx         # Entry point
```

## API

This frontend expects a backend running at `http://localhost:3000` with the following endpoints:

- `POST /api/login`
- `POST /api/register`
- `POST /api/logout`
- `GET /api/check-token`
- `GET /api/users`
- `POST /api/users`
- `DELETE /api/users/:id`

## License

MIT