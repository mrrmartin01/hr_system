import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    employeeId: {
      type: String,
      required: true,
      unique: true,
    },
    department: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
    },
    hireDate: {
      type: Date,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
    },
  },
  { timestamps: true }
);

export const Employee = mongoose.models?.Employee || mongoose.model("Employee", employeeSchema);
