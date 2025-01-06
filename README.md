# 🚗 Vehicle Transfer Module (Next.js & TypeScript)

Welcome to the **Vehicle Transfer Module**! 🎉 This is a technical test project designed to simulate the management of vehicle transfers in a CMS. The application is built using **Next.js**, **TypeScript**, and **Material UI** for a robust and aesthetically pleasing user experience.

---

## **📦 Features**

- 🔐 **Authentication**: Mock authentication with roles (`admin`, `editor`, `viewer`) and permissions.
- 📄 **CRUD Operations**: Create, read, update, and delete vehicle transfers.
- 🔍 **Filtering**: Filter transfers by plate or type.
- 🛠️ **Responsive Design**: Fully responsive UI built with Material UI components.
- 🎭 **Mock Backend**: Simulated backend with in-memory data and JSON mocks.

---
## **🌍 Live Demo**

The application is deployed on both **Vercel** and **Render** for testing purposes:

- 🌐 **Vercel**: [https://test-moraleda.vercel.app/](https://test-moraleda.vercel.app/)
- 🌐 **Render**: [https://test-moraleda.onrender.com/](https://test-moraleda.onrender.com/)

---
## **🔑 User Roles for Testing**

The application includes mock users for testing different roles and permissions. Use the following credentials to test authentication and access control:

| **Username** | **Password** | **Role**   | **Permissions**          |
|--------------|--------------|------------|--------------------------|
| admin        | admin123     | admin      | create, edit, delete     |
| editor       | editor123    | editor     | create, edit             |
| viewer       | viewer123    | viewer     | (No permissions)         |

- **Admin**: Full access to all features.
- **Editor**: Can create and edit transfers but cannot delete.
- **Viewer**: Read-only access; cannot create, edit, or delete transfers.

---

## **🚀 Installation Guide**


2. Install Dependencies
This project uses Yarn for package management. If you don't have Yarn installed, you can install it globally:

### **1. Clone the Repository**
```bash
git clone https://github.com/Darcy96/Test_Moraleda.git
cd Test_Moraleda
```

### **2. Install Dependencies**
```bash
npm install -g yarn
```

### **3. Run the Application**
```bash
yarn dev
```
