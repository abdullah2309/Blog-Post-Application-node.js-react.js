# Blog-Post-Application-node.js-react.js

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-17.0.2-blue?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16.x-green?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-green?logo=mongodb)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express.js-4.x-lightgrey?logo=express)](https://expressjs.com/)

A **full-stack Blog Post CRUD Application** built with the **MERN stack (MongoDB, Express.js, React.js, Node.js)**.  
This application allows users to **create, read, update, and delete blog posts** with optional image uploads and a **modern, responsive UI** using Bootstrap 5.  

---

## 🌟 Features

- ✅ Create blog posts with **title, subtitle, description, and image**  
- ✅ View all blog posts in a **responsive card layout**  
- ✅ Edit existing posts with **pre-filled edit form**  
- ✅ Delete posts with confirmation prompts  
- ✅ Image uploads using **Multer**  
- ✅ **Responsive design** with Bootstrap 5  
- ✅ Client-side routing using **React Router v6**  
- ✅ Clean **MVC architecture** for backend  

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Bootstrap 5, React Router v6  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (Mongoose ORM)  
- **File Uploads**: Multer  
- **HTTP Client**: Fetch API  

---

## 📂 Project Structure

### Backend (Node.js / Express / MongoDB)


backend/
├── controllers/
│ └── blogController.js
├── models/
│ └── blogModel.js
├── routes/
│ └── blogRoutes.js
├── uploads/
├── config/
│ └── db.js
├── server.js
└── package.json


### Frontend (React.js) Blog Post

frontend/
├── src/
│ ├── components/
│ │ ├── BlogForm.jsx
│ │ └── BlogList.jsx
│ ├── App.jsx
│ ├── index.jsx
│ └── routes/
├── public/
└── package.json


---

## 🔧 Installation

### 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/blog-post-crud.git
cd Blog Post CRUD Application
