import { Application } from "../models/application.models.js";

export const createApplication = async (req, res) => {
  try {
    const user = req.user?._id;
    const {
      company,
      role,
      location,
      status,
      appliedDate,
      jobUrl,
      isFavorite,
      minSalary,
      maxSalary,
      currency,
      contactName,
      contactEmail,
      notes,
      interview: { ...interview },
    } = req.body;

    if (!company || !role) {
      throw new Error("Comapany name and Job role are required.");
    }

    if (interview.date) interview.scheduled = true;
    const newApplication = new Application({
      user,
      company,
      role,
      location,
      status,
      appliedDate,
      jobUrl,
      isFavorite,
      minSalary,
      maxSalary,
      currency,
      contactName,
      contactEmail,
      notes,
      interview: { ...interview },
    });
    await newApplication.save();
    res.status(201).json({
      message: "Application created successfully.",
      data: newApplication,
    });
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
};
