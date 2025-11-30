Employee Attendance System
A full-stack web application for managing employee attendance with role-based access control for Employees and Managers.

Show Image



Show Image



Show Image




🚀 Live Demo
Frontend: [Your Deployment URL]
Backend API: [Your API URL]
📋 Features
Employee Features
✅ Register and Login
✅ Mark daily attendance (Check In/Check Out)
✅ View attendance history with calendar
✅ Monthly summary (Present/Absent/Late/Half-day)
✅ Real-time dashboard with statistics
✅ Profile management
Manager Features
✅ View all employees' attendance
✅ Filter by employee, date, and status
✅ Team attendance summary dashboard
✅ Export attendance reports (CSV)
✅ Real-time team statistics
✅ Weekly attendance trends
✅ Department-wise analytics
🛠️ Tech Stack
Frontend
React 18
Redux Toolkit (State Management)
React Router v6
Axios
Recharts (Charts)
React Calendar
React Toastify (Notifications)
CSS3
Backend
Node.js
Express.js
MongoDB (Database)
Mongoose (ODM)
JWT (Authentication)
bcryptjs (Password Hashing)
json2csv (CSV Export)
📁 Project Structure
attendance-system/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Attendance.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── attendance.js
│   │   └── dashboard.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── seedData.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── employee/
│   │   │   └── manager/
│   │   ├── store/
│   │   │   ├── slices/
│   │   │   └── store.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
🚀 Quick Start
Prerequisites
Node.js (v16 or higher)
MongoDB (Local or Atlas)
npm or yarn
Backend Setup
Clone the repository
bash
git clone <your-repo-url>
cd attendance-system/backend
Install dependencies
bash
npm install
Environment Variables Create a .env file in the backend directory:
env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/attendance_system
JWT_SECRET=your_super_secret_jwt_key_12345
FRONTEND_URL=http://localhost:3000
Start MongoDB
bash
# If using local MongoDB
mongod
Seed the database (Optional - for demo data)
bash
npm run seed
Start the server
bash
npm run dev
Backend will run on http://localhost:5000

Frontend Setup
Navigate to frontend
bash
cd ../frontend
Install dependencies
bash
npm install
Start the application
bash
npm start
Frontend will run on http://localhost:3000

🔑 Demo Credentials
Manager Account
Email: manager@company.com
Password: manager123
Employee Accounts
Email: john@company.com | Password: employee123
Email: jane@company.com | Password: employee123
Email: mike@company.com | Password: employee123
📊 Database Schema
Users Collection
javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: ['employee', 'manager'],
  employeeId: String (unique),
  department: String,
  createdAt: Date
}
Attendance Collection
javascript
{
  userId: ObjectId (ref: User),
  date: Date,
  checkInTime: Date,
  checkOutTime: Date,
  status: ['present', 'absent', 'late', 'half-day'],
  totalHours: Number,
  createdAt: Date
}
🔌 API Endpoints
Authentication
POST /api/auth/register - Register new user
POST /api/auth/login - User login
GET /api/auth/me - Get current user
Attendance (Employee)
POST /api/attendance/checkin - Check in
POST /api/attendance/checkout - Check out
GET /api/attendance/today - Today's status
GET /api/attendance/my-history - My attendance history
GET /api/attendance/my-summary - Monthly summary
Attendance (Manager)
GET /api/attendance/all - All employees' attendance
GET /api/attendance/employee/:id - Specific employee
GET /api/attendance/summary - Team summary
GET /api/attendance/today-status - Today's team status
GET /api/attendance/export - Export to CSV
Dashboard
GET /api/dashboard/employee - Employee stats
GET /api/dashboard/manager - Manager stats
📸 Screenshots
Employee Dashboard


Show Image



Manager Dashboard


Show Image

Attendance Calendar


Show Image

🚢 Deployment
Backend Deployment (Render/Railway/Heroku)
Push code to GitHub
Connect to deployment platform
Set environment variables
Deploy
Frontend Deployment (Vercel/Netlify)
Build the project
bash
npm run build
Deploy the build folder
MongoDB Atlas Setup
Create account at MongoDB Atlas
Create a cluster
Get connection string
Update MONGODB_URI in .env
🧪 Testing
Backend Tests
bash
cd backend
npm test
Frontend Tests
bash
cd frontend
npm test
📝 Business Rules
Attendance Logic
On Time: Check-in before 9:15 AM = Present
Late: Check-in after 9:15 AM = Late
Half Day: Less than 4 hours = Half Day
Absent: No check-in = Absent
Access Control
Employees can only view/manage their own attendance
Managers can view all employees' attendance
All routes are protected with JWT authentication
🔒 Security Features
Password hashing with bcrypt
JWT token authentication
Protected API routes
Input validation
CORS configuration
Environment variables for sensitive data
🐛 Known Issues
None currently. Please report issues on GitHub.

📈 Future Enhancements
 Email notifications
 Leave management system
 Mobile app
 Biometric integration
 Real-time notifications
 Advanced analytics
 Multi-language support
👨‍💻 Author
Your Name

GitHub: [@yourusername]
LinkedIn: [Your LinkedIn]
Email: your.email@example.com
📄 License
This project is licensed under the MIT License.

🙏 Acknowledgments
React Team for the amazing framework
MongoDB for the database
Express.js community
All open-source contributors
Note: This is a demonstration project built for interview purposes. It showcases full-stack development skills including React, Redux, Node.js, Express, and MongoDB.

