# 🍔 Food Factory

### A Full-Stack Food Delivery Application

**Food Factory** is a robust, full-stack food delivery platform built with the MERN stack. It features a responsive customer-facing frontend, a comprehensive admin panel for restaurant management, and a secure backend API.

---

## 🚀 Key Features

### 👤 Customer App (Frontend)
*   **Authentication**: Secure login/signup using **Clerk** (Google & Email auth).
*   **Browse Food**: Explore a variety of food categories and dishes.
*   **Cart & Checkout**: Seamless cart management and order placement.
*   **My Orders**: Track order status (Food Processing, Out for delivery, Delivered).
*   **Dark Mode**: Fully supported dark/light theme toggle.
*   **Responsive Design**: optimized for desktop and mobile devices.

### 🛠️ Admin Panel
*   **Product Management**: Add, update, and remove food items.
*   **Order Management**: View all customer orders and update their status.
*   **Dashboard**: Overview of product list and incoming orders.
*   **Dark Mode**: Consistent theming with the main app.

### 🔐 Backend & Security
*   **REST API**: Built with Node.js & Express.
*   **Database**: MongoDB for scalable data storage.
*   **Security**: JWT (JSON Web Tokens) for API protection.
*   **Image Storage**: Multer for handling file uploads.

---

## 🛠️ Tech Stack

*   **Frontend**: React.js, Vite, Context API, CSS3
*   **Backend**: Node.js, Express.js
*   **Database**: MongoDB
*   **Authentication**: Clerk Auth (Frontend), JWT (Backend)
*   **Payment**: Stripe Integration (Ready)
*   **Tools**: Git, Axios, React Router, Toastify

---

## ⚙️ Setup & Installation

Follow these steps to run the project locally.

### 1. Clone the Repository
```bash
git clone https://github.com/aryanwebd35/Food-Factory.git
cd Food-Factory
```

### 2. Backend Setup
```bash
cd backend
npm install
```
**Create a `.env` file in the `backend` folder:**
```env
PORT=4000
DB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLERK_SECRET_KEY=your_clerk_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```
**Start the Server:**
```bash
npm run server
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```
**Create a `.env` file in the `frontend` folder:**
```env
VITE_API_URL=http://localhost:4000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```
**Start the Client:**
```bash
npm run dev
```

### 4. Admin Panel Setup
```bash
cd admin
npm install
```
**Create a `.env` file in the `admin` folder (optional if hardcoded, but recommended):**
```env
VITE_API_URL=http://localhost:4000
```
**Start the Admin Panel:**
```bash
npm run dev
```

---

## 🌍 Deployment

*   **Backend**: Deployed on [Render](https://render.com)
*   **Frontend**: Deployed on [Vercel](https://vercel.com)
*   **Admin**: Deployed on [Vercel](https://vercel.com)

---

## 📸 Screenshots

*(Add screenshots of your Home Page, Cart, and Admin Dashboard here)*

---

Made with ❤️ by [Aryan](https://github.com/aryanwebd35)
