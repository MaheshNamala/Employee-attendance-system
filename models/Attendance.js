// models/Attendance.js
const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    checkInTime: {
      type: Date,
      required: true,
    },
    checkOutTime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['present', 'late', 'absent'],
      default: 'present',
    },
    totalHours: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// 👇 THIS is the important part
const Attendance = mongoose.model('Attendance', attendanceSchema);
module.exports = Attendance;
