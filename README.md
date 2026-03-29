<div align="center">
 
<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=35&pause=1000&color=6C63FF&center=true&vCenter=true&width=600&lines=Talk-a-tive+%F0%9F%92%AC;Real-Time+Chat+App;MERN+%2B+Socket.io" alt="Typing SVG" />
 
<br/>
 
![Talk-a-tive Banner](https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12&height=200&section=header&text=Talk-a-tive&fontSize=70&fontAlignY=35&desc=Real-Time+Chat+Application&descAlignY=55&descAlign=50)
 
<br/>
 
[![MIT License](https://img.shields.io/badge/License-MIT-6C63FF?style=for-the-badge)](https://choosealicense.com/licenses/mit/)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white)
 
<br/>
 
> **Talk-a-tive** is a full-stack, real-time chat application where conversations feel instant, smooth, and alive. Built with the MERN stack and powered by Socket.io — connect, chat, and vibe in real time.
 
</div>
 
---
 
## ✨ Features
 
| Feature | Description |
|---|---|
| 🔐 **Authentication** | Secure JWT-based login & registration |
| 💬 **Real-Time Messaging** | Instant messaging powered by Socket.io |
| 👥 **Group Chat** | Create and manage group conversations |
| 🔍 **User Search** | Find and connect with other users |
| 🔔 **Notifications** | Real-time message notifications |
| 👤 **User Profiles** | Customizable profile with avatar |
| 📱 **Responsive Design** | Works beautifully on all devices |
| 🌙 **Modern UI** | Clean, intuitive interface with Chakra UI |
 
---
 
## 🛠️ Tech Stack
 
<div align="center">
 
### Frontend
![React](https://img.shields.io/badge/React.js-61DAFB?style=flat-square&logo=react&logoColor=black)
![Chakra UI](https://img.shields.io/badge/Chakra_UI-319795?style=flat-square&logo=chakraui&logoColor=white)
![Context API](https://img.shields.io/badge/Context_API-61DAFB?style=flat-square&logo=react&logoColor=black)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)
![Socket.io Client](https://img.shields.io/badge/Socket.io_Client-010101?style=flat-square&logo=socketdotio&logoColor=white)
 
### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat-square&logo=mongoose&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=flat-square&logo=socketdotio&logoColor=white)
![Bcrypt](https://img.shields.io/badge/Bcrypt-00599C?style=flat-square)
 
### Tools & Platforms
![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=flat-square&logo=postman&logoColor=white)
![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=flat-square&logo=visualstudiocode&logoColor=white)
 
</div>
 
---
 
## 📂 Project Structure
 
```
talk-a-tive/
│
├── 📁 backend/
│   ├── 📁 config/
│   │   └── db.js                  # MongoDB connection
│   ├── 📁 controllers/
│   │   ├── chatControllers.js
│   │   ├── messageControllers.js
│   │   └── userControllers.js
│   ├── 📁 middleware/
│   │   ├── authMiddleware.js       # JWT verification
│   │   └── errorMiddleware.js
│   ├── 📁 models/
│   │   ├── chatModel.js
│   │   ├── messageModel.js
│   │   └── userModel.js
│   ├── 📁 routes/
│   │   ├── chatRoutes.js
│   │   ├── messageRoutes.js
│   │   └── userRoutes.js
│   └── server.js                  # Entry point + Socket.io setup
│
├── 📁 frontend/
│   ├── 📁 public/
│   └── 📁 src/
│       ├── 📁 components/
│       │   ├── 📁 Authentication/
│       │   ├── 📁 ChatBox/
│       │   ├── 📁 miscellaneous/
│       │   └── SingleChat.js
│       ├── 📁 Context/
│       │   └── ChatProvider.js
│       ├── 📁 Pages/
│       │   ├── ChatPage.js
│       │   └── HomePage.js
│       └── App.js
│
├── .gitignore
├── package.json
└── README.md
```
 
---
 
## ⚙️ Getting Started
 
### Prerequisites
 
Make sure you have the following installed:
 
- ![Node](https://img.shields.io/badge/Node.js-v14+-339933?style=flat-square&logo=nodedotjs&logoColor=white)
- ![npm](https://img.shields.io/badge/npm-v6+-CB3837?style=flat-square&logo=npm&logoColor=white)
- ![MongoDB](https://img.shields.io/badge/MongoDB-Atlas_or_Local-47A248?style=flat-square&logo=mongodb&logoColor=white)
 
### 1️⃣ Clone the Repository
 
```bash
git clone https://github.com/chinu-mittal/talk-a-tive.git
cd talk-a-tive
```
 
### 2️⃣ Install Backend Dependencies
 
```bash
cd backend
npm install
```
 
### 3️⃣ Install Frontend Dependencies
 
```bash
cd ../frontend
npm install
```
 
---
 
## 🔑 Environment Variables
 
Create a `.env` file inside the **`backend/`** folder:
 
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
```
 
---
 
## ▶️ Run the Application
 
### Start Backend Server
 
```bash
npm start
```
 
> Runs on: `http://localhost:5000`
 
### Start Frontend
 
```bash
cd frontend
npm start
```
 
> Runs on: `http://localhost:5173`
 
---
 
## 🌐 API Endpoints
 
### 👤 User Routes — `/api/user`
 
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/register` | Register a new user | ❌ |
| `POST` | `/login` | Login user | ❌ |
| `GET` | `/` | Get all users (search) | ✅ |
 
### 💬 Chat Routes — `/api/chat`
 
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/` | Access or create one-to-one chat | ✅ |
| `GET` | `/` | Fetch all chats for user | ✅ |
| `POST` | `/group` | Create a group chat | ✅ |
| `PUT` | `/rename` | Rename group chat | ✅ |
| `PUT` | `/groupadd` | Add user to group | ✅ |
| `PUT` | `/groupremove` | Remove user from group | ✅ |
 
### 📨 Message Routes — `/api/message`
 
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/` | Send a message | ✅ |
| `GET` | `/:chatId` | Get all messages in a chat | ✅ |
 
---
 
## 🔌 Socket.io Events
 
```
setup            → Initialize socket with user data
join chat        → Join a specific chat room
typing           → Emit typing indicator
stop typing      → Stop typing indicator
new message      → Send & receive real-time messages
notification     → Handle message notifications
```
 
---
 
## 🔒 Security
 
- 🔑 **Password Hashing** — bcrypt.js with salt rounds
- 🎟️ **JWT Auth** — Stateless token-based authentication
- 🛡️ **Protected Routes** — Middleware guards all private endpoints
- 🙈 **Env Variables** — Sensitive keys stored securely in `.env`
 
---
 

 
---
 
## 🗺️ Roadmap
 
- [x] User Authentication (JWT)
- [x] One-to-One Chat
- [x] Group Chat
- [x] Real-Time Messaging (Socket.io)
- [x] Typing Indicator
- [x] Notifications
- [ ] Message Read Receipts
- [ ] File / Image Sharing
- [ ] Online / Offline Status Indicator
- [ ] Cloud Deployment (Render / Vercel)
- [ ] Dark Mode Toggle
- [ ] Message Reactions (Emoji)
 
---
 
## 👩‍💻 Author
 
<div align="center">
 
**Chinu Mittal**
*Computer Science Engineering Student | Full-Stack Developer*
 
[![GitHub](https://img.shields.io/badge/GitHub-chinu--mittal-181717?style=for-the-badge&logo=github)](https://github.com/chinu-mittal)
 
</div>
 
---
 
<div align="center">
 
### ⭐ If you found this project helpful, please give it a star!
 
![wave](https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12&height=100&section=footer)
 
</div>
