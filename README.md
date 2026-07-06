# 🛒 E-Commerce Web Application

<p align="center">

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?logo=javascript)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![JWT](https://img.shields.io/badge/Auth-JWT-red)
![License](https://img.shields.io/badge/License-MIT-blue)
![Status](https://img.shields.io/badge/Status-Active-success)
![Contributions](https://img.shields.io/badge/Contributions-Welcome-orange)

</p>

---

# 📖 Overview

This is a modern **Full-Stack E-Commerce Web Application** developed using **React** for the frontend and **Node.js + Express.js** for the backend. The project provides a complete online shopping experience with secure authentication, role-based authorization, online payment integration, product management, order processing, and an intuitive administrative dashboard.

The application follows modern development practices including RESTful API architecture, reusable React components, responsive design, JWT-based authentication, protected routes, and scalable project organization.

---

# 🚀 Live Demo

### 🌐 Frontend

https:[(http://localhost:5173/)](http://localhost:5173/)

### 🔗 Backend API

https://your-api-url.com

---

# 📸 Screenshots

## Home Page

![Home]<img width="2856" height="1540" alt="image" src="https://github.com/user-attachments/assets/512aaaef-d93b-4031-813e-556b01448c29" />


---

## Shop Page

![Shop]<img width="2866" height="1532" alt="image" src="https://github.com/user-attachments/assets/e09cfeb9-9dcc-4bb9-bdec-6a6fcb121eeb" />


---

## Product Details

![Product]<img width="2844" height="1536" alt="image" src="https://github.com/user-attachments/assets/415e03af-457d-4fd9-9c56-7b6b5683ebf2" />


---

## Shopping Cart

![Cart]<img width="2874" height="1540" alt="image" src="https://github.com/user-attachments/assets/e76d55b6-032c-4b4f-aa36-6f2d6eacb9a2" />


---

## Checkout

![Checkout]<img width="2866" height="1532" alt="image" src="https://github.com/user-attachments/assets/a3ca1fca-c12e-454c-ac90-be1e8218b64c" />


---

## User Dashboard

![User Dashboard]<img width="2866" height="1524" alt="image" src="https://github.com/user-attachments/assets/b2350d88-2221-4abf-8b4f-3c417fd10942" />


---

## Admin Dashboard

![Admin Dashboard]<img width="2860" height="1542" alt="image" src="https://github.com/user-attachments/assets/9feb383e-6c8e-46c4-b92d-5df9944a3efd" />
<img width="2846" height="1526" alt="image" src="https://github.com/user-attachments/assets/3062f274-f9b6-4223-a46c-4a0757cea24c" />
<img width="2836" height="1536" alt="image" src="https://github.com/user-attachments/assets/75b88979-ecd5-4e2a-a728-824127b012e5" />
<img width="2842" height="1534" alt="image" src="https://github.com/user-attachments/assets/a7f88c71-7882-4cdf-86b2-d5960cbebcd7" />
<img width="2830" height="1534" alt="image" src="https://github.com/user-attachments/assets/bfad784d-75c1-4a47-9566-e0333623cb16" />






---

# ✨ Features

## Customer

- User Registration
- Secure Login
- JWT Authentication
- Profile Management
- Product Search
- Category Filter
- Product Details
- Shopping Cart
- Wishlist
- Online Payment
- Cash On Delivery
- Order Tracking
- Order History
- Responsive Design

---

## Admin

- Admin Dashboard
- Product CRUD
- Category CRUD
- User Management
- Order Management
- Payment Management
- Sales Overview
- Role Management
- Inventory Control

---

## Security

- JWT Authentication
- Role-Based Authorization
- Password Hashing
- Protected Routes
- Secure API
- Environment Variables
- Input Validation
- Error Handling

---

# 🛠️ Tech Stack

## Frontend

- React
- JavaScript (ES6+)
- React Router DOM
- Axios
- CSS3
- HTML5

---

## Backend

- Node.js
- Express.js
- REST API
- JWT Authentication
- bcrypt
- Multer

---

## Database

- MongoDB

---

## Payment Gateway

- bKash
- Stripe
- SSLCommerz

*(Use the one you implemented.)*

---

## Development Tools

- Git
- GitHub
- VS Code
- Postman
- npm

---

# 📂 Project Structure

```
Ecommerce/
│
├── client/
│   ├── public/
│   ├── src/
│   │
│   ├── components/
│   ├── pages/
│   ├── layouts/
│   ├── routes/
│   ├── services/
│   ├── hooks/
│   ├── context/
│   ├── assets/
│   ├── styles/
│   ├── App.js
│   └── main.js
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── uploads/
│   ├── app.js
│   └── server.js
│
├── screenshots/
├── README.md
└── package.json
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/ecommerce.git
```

```
cd ecommerce
```

---

## Install Frontend

```
cd client
npm install
```

Run

```
npm run dev
```

---

## Install Backend

```
cd server
npm install
```

Run

```
npm start
```

or

```
npm run dev
```

---

# 🔐 Environment Variables

Create a `.env` file inside the server folder.

```env
PORT=5000

MONGODB_URI=your_database_url

JWT_SECRET=your_secret_key

JWT_EXPIRE=7d

BKASH_APP_KEY=your_key

BKASH_APP_SECRET=your_secret

BKASH_USERNAME=your_username

BKASH_PASSWORD=your_password

STRIPE_SECRET_KEY=your_key
```

---

# 📡 API Documentation

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/auth/register | Register User |
| POST | /api/auth/login | Login |
| GET | /api/auth/profile | User Profile |

---

## Products

| Method | Endpoint |
|---------|----------|
| GET | /api/products |
| GET | /api/products/:id |
| POST | /api/products |
| PUT | /api/products/:id |
| DELETE | /api/products/:id |

---

## Categories

| Method | Endpoint |
|---------|----------|
| GET | /api/categories |
| POST | /api/categories |
| PUT | /api/categories/:id |
| DELETE | /api/categories/:id |

---

## Orders

| Method | Endpoint |
|---------|----------|
| GET | /api/orders |
| POST | /api/orders |
| PUT | /api/orders/:id |
| DELETE | /api/orders/:id |

---

## Cart

| Method | Endpoint |
|---------|----------|
| GET | /api/cart |
| POST | /api/cart |
| DELETE | /api/cart/:id |

---

## Wishlist

| Method | Endpoint |
|---------|----------|
| GET | /api/wishlist |
| POST | /api/wishlist |
| DELETE | /api/wishlist/:id |

---

## Payment

| Method | Endpoint |
|---------|----------|
| POST | /api/payment/create |
| POST | /api/payment/execute |
| POST | /api/payment/success |
| POST | /api/payment/failure |

---

# 🔒 Authentication

The project uses **JWT (JSON Web Token)** for authentication.

Protected endpoints require:

```
Authorization: Bearer YOUR_TOKEN
```

---

# 👨‍💻 Admin Credentials

```
Email:
admin@example.com

Password:
********
```

*(Replace with your own or remove before publishing.)*

---

# 🚀 Deployment

## Frontend

- Vercel
- Netlify

Build

```
npm run build
```

---

## Backend

Deploy on

- Render
- Railway
- Azure
- AWS
- DigitalOcean

---

## Database

- MongoDB Atlas

---

# 📈 Future Improvements

- Product Reviews
- Ratings
- Coupons
- Notifications
- Email Verification
- Password Reset
- AI Product Recommendation
- Multi-language Support
- Dark Mode
- Analytics Dashboard

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository

2. Create a feature branch

```
git checkout -b feature/NewFeature
```

3. Commit your changes

```
git commit -m "Added new feature"
```

4. Push

```
git push origin feature/NewFeature
```

5. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Ashikur Rahman**

GitHub: https:[//github.com/yourusername](https://github.com/ashikur-255)

LinkedIn: https:[//linkedin.com/in/yourprofile](https://www.linkedin.com/in/ashikur-rahman-134300159/)

Portfolio: https://yourportfolio.com

Email: ashikurr255@email.com

---

# ⭐ Support

If you found this project helpful, please consider giving it a ⭐ on GitHub. Your support helps motivate future improvements and encourages open-source collaboration.

```

## Repository Structure Recommendation

For a professional GitHub repository, organize it like this:

```text
Ecommerce/
│
├── client/
├── server/
├── screenshots/
│   ├── home.png
│   ├── shop.png
│   ├── product-details.png
│   ├── cart.png
│   ├── checkout.png
│   ├── user-dashboard.png
│   └── admin-dashboard.png
├── docs/
│   ├── API.md
│   ├── DATABASE.md
│   └── DEPLOYMENT.md
├── .gitignore
├── LICENSE
├── README.md
└── package.json
```

This structure and README are suitable for a portfolio or capstone project and present your work in a professional, industry-style format.
