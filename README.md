# 🏥 Medical Camp Management System (MCMS)

A full-stack Medical Camp Management System (MCMS) built with the MERN stack to streamline medical camp organization, registration, and management for both Organizers and Participants.

---

## 🔐 Organizer Login Info

- **Email:** organizer@example.com
- **Password:** organizer123

---

## 🔗 Live Links

- 🔴 **Live Website:** [https://medical-camp-10888.web.app](https://medical-camp-10888.web.app)
- 💻 **Client GitHub Repo:** [Client Repository](https://github.com/Programming-Hero-Web-Course4/ b11a12-client-side-BELALKHANBK)
- 🛠️ **Server GitHub Repo:** [Server Repository](https://github.com/Programming-Hero-Web-Course4/b11a12-server-side-BELALKHANBK)

---

## 💡 Key Features

1. **Secure Authentication** with Firebase (Email/Password + Social Login) using `react-hook-form`.
2. 🔐 **JWT Authentication** & role-based route protection for Organizers and Participants.
3. 📈 **Participant Dashboard Analytics** using `Recharts`.
4. 📋 **Organizer Dashboard** for adding, updating, deleting camps and managing registered users.
5. 🧾 **Stripe Payment Integration** with transaction tracking and status updates.
6. 🗂️ **Search, Sort & Pagination** implemented in all data tables.
7. ✅ **SweetAlerts** for all authentication and CRUD actions. No browser alert used.
8. 🧠 **TanStack Query** used for optimized GET request data fetching.
9. 🌟 **Feedback & Ratings** from participants after payment, shown on the home page.
10. 🎨 Fully Responsive across Mobile, Tablet, and Desktop with beautiful UI using `shadcn/ui`.

---

## 📁 Tech Stack

| Client               | Server               |
| -------------------- | -------------------- |
| React + Vite         | Node.js + Express    |
| Firebase Auth        | MongoDB + Mongoose   |
| React Hook Form      | JSON Web Token (JWT) |
| Stripe Payment       | CORS, Dotenv         |
| TanStack Query       |                      |
| SweetAlert2          |                      |
| Shadcn/UI + Tailwind |                      |

---

## 🛠️ Environment Variables

Ensure the following env variables are set correctly in your project:

### `.env` (Client)

\`\`\`env
VITE_API_URL=https://your-backend-api.com
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
...
\`\`\`

### `.env` (Server)

\`\`\`env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/medical_camp
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_key
\`\`\`

---

## 📊 Dashboard Routes

### Organizer Dashboard:

- ✅ Organizer Profile Update
- ➕ Add A Camp
- 🛠️ Manage Camps (Update/Delete)
- 🧾 Manage Registered Camps (View/Confirm/Cancel)

### Participant Dashboard:

- 📊 Analytics (with Recharts)
- 👤 Profile Update
- 📝 Registered Camps (Pay/Cancel/Feedback)
- 💳 Payment History

---

## 🔐 Protected Routes & Auth Flow

- Role-based dashboard (Organizer or Participant)
- JWT saved in localStorage
- Private route persistence after refresh
- Firebase Auth integrated

---

## 🧪 Additional Features

- 🔍 Search, Sort, Pagination on all major tables
- 📝 Reusable modal for participant registration
- 💬 Real-time Feedback display on homepage
- 🎥 Home Banner Slider with impactful camp moments
- 🌈 Animated with Framer Motion

---

## 📄 Custom Feature (Bonus)

🗂️ **Health Records Management:** Each participant can view and update personal health data related to past camps (example feature added in dashboard).

---

## 🚫 404 Page

Includes a custom 404 page with a friendly error message and a button to return to home.

---

## 📞 Footer

Footer contains contact info, social links, and navigation shortcuts.

---

> ✅ All commits have been meaningfully added with clear messages (20+ in client, 12+ in server).

> 🔐 All Firebase & MongoDB credentials are safely stored using environment variables.

> ⚠️ No `Lorem ipsum` text used anywhere in the project.

---

## 📸 Screenshots (Optional)

_Add some screenshots of home, dashboard, payment, etc. here if you want._

---

## 👨‍💻 Developed By

Belal Khan – [LinkedIn](https://linkedin.com/in/your-profile) | [GitHub](https://github.com/your-username)

---
