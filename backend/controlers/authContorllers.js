import User from "../models/user.models.js";
import jwt from "jsonwebtoken";
export const signup = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      throw new Error("All fields are required");
    }
    if (userName.length < 3) {
      throw new Error("userName must have at least 4 characters");
    }
    if (password.length < 4) {
      throw new Error("password must have at least 4 characters");
    }

    const userExit = await User.findOne({ email });
    if (userExit) {
      throw new Error("User Already Exist!");
    }

    const newUser = await new User({
      userName,
      email,
      password,
    });

    if (newUser) {
      await newUser.save();
      const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "15d",
      });

      const { password: pass, ...userWithoutPassword } = newUser._doc;
      res
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
        })
        .send(userWithoutPassword);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("All fields are required");
    }
    const vaildUser = await User.findOne({ email });
    if (!vaildUser) {
      throw new Error("User not found");
    }

    if (vaildUser.password != password) {
      throw new Error("Invalid Credentials");
    }
    const { password: pass, ...userWithoutPassword } = vaildUser._doc;
    const token = jwt.sign({ _id: vaildUser._id }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
      })
      .send(userWithoutPassword);
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
};

export const signout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).send("Logout Successful");
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
};
