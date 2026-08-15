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

export const getApplications = async (req, res) => {
  try {
    if (!req.user._id) throw new Error("Unauthorized User!");
    const applications = await Application.find({ user: req.user?._id });
    res.status(200).json({ message: "", data: applications });
  } catch (error) {
    res.status(400).send("ERROR : " + error?.message);
  }
};

export const updateApplicationById = async (req, res) => {
  try {
    if (!req.user._id) throw new Error("Unauthorized User!");
    const { id } = req.params;
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
    const application = await Application.findById(id);
    if (!application) throw new Error("No application found!");

    if (String(req.user._id) != String(application.user))
      throw Error("You are not allowed to update this application.");
    const updatedApplication = await Application.findByIdAndUpdate(id, {
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
    if (updatedApplication) await updatedApplication.save();
    res
      .status(200)
      .json({ message: "Application data updated.", data: updatedApplication });
  } catch (error) {
    res.status(400).send("ERROR : " + error?.message);
  }
};
