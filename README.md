## 🧑‍💼 Admin Usage Guide

The Admin Panel allows authorized users to manage workshops and bookings. It connects to the backend API and requires proper setup.

---

### ✅ Method 1: Quick Start (Recommended)

1. First, make sure the **backend** and **Docker environment** are up and running.  
   Follow [Setup Instructions](https://github.com/Mekin-jema/workshop-booking-backend) from the backend.

2. Open the admin panel in your browser:  
   👉 [https://workshop-booking-admin.vercel.app/](https://workshop-booking-admin.vercel.app/)

3. This admin panel is **private** — only known users should access it.  
   You must **register yourself as an admin**.

4. After registering, log in and begin managing:
   - 🔧 Workshops
   - 📋 Bookings

> ⚠️ Keep this URL confidential for security.

---

### 🛠️ Method 2: Local Setup (From Scratch)

If you want to run the admin panel locally:

#### 1. Clone the Repository

```bash
git clone https://github.com/Mekin-jema/workshop-booking-admin.git
cd workshop-booking-admin
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Add Environment Variables

Create a `.env.local` file in the project root with the following:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
```


#### 4. Run the Dev Server

```bash
npm run dev
```

> 🔗 Visit the app at: [http://localhost:3000](http://localhost:3000)  
> Log in as an admin and begin managing the system.

---

### 🛡️ What Can Admins Do?

- 📅 Create, update, and delete workshops
- 🕐 Manage time slots and availability
- 📦 View and manage bookings


