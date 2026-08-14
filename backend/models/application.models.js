import mongoose from "mongoose";

const applicationSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: [
        "Saved",
        "Applied",
        "Interviewing",
        "Offer",
        "Rejected",
        "Withdrawn",
      ],
      default: "Saved",
    },
    appliedDate: {
      type: Date,
    },
    jobUrl: {
      type: String,
      trim: true,
    },

    minSalary: {
      type: String,
      trim: true,
    },
    maxSalary: {
      type: String,
      trim: true,
    },
    currency: {
      type: String,
      default: "USD",
    },

    interview: {
      date: { type: Date },
      type: {
        type: String,
        enum: ["Phone Screen", "Technical", "HR", "Manager", "Final", "Other"],
      },
      scheduled: {
        type: Boolean,
        default: false,
      },
      notes: { type: String },
    },
    contactName: {
      type: String,
    },
    contactEmail: {
      type: String,
    },
    notes: {
      type: String,
      trim: true,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const Application = mongoose.model("Application", applicationSchema);
export default Application;
