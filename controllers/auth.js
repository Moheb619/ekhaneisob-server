import Users from "../models/Users.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/errors.js";
import jwt, { verify } from "jsonwebtoken";
import { verifyToken, verifyUser } from "../utils/verifyToken.js";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const isAdmin = false;
    const newUser = new Users({
      ...req.body,
      isAdmin: isAdmin,
      password: hash,
    });
    await newUser.save();
    await login(req, res, next);
    res.status(200).send("Users has been created.");
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "Users not found!"));

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordCorrect) return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT, {
      expiresIn: "45m", // expires in 45 miniutes
    });
    const refresh_token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.REFRESH_JWT, {
      expiresIn: "30d", // expires in 30 days
    });

    const { password, isAdmin, ...otherDetails } = user._doc;
    res.cookie("refresh_token", refresh_token, {
      expires: new Date(Date.now() + 2592000000),
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res
      .cookie("access_token", token, {
        expires: new Date(Date.now() + 2700000),
        secure: true,
      })
      .status(200)
      .json({ message: "Successfully Logged Id" });
  } catch (err) {
    next(err);
  }
};

export const access_token_regenerate = async (req, res, next) => {
  try {
    const token = jwt.sign({ id: req.user._id, isAdmin: req.user.isAdmin }, process.env.JWT, {
      expiresIn: "45m", // expires in 45 miniutes
    });
    const refresh_token = jwt.sign({ id: req.user._id, isAdmin: req.user.isAdmin }, process.env.REFRESH_JWT, {
      expiresIn: "30d", // expires in 30 days
    });

    res.cookie("refresh_token", refresh_token, {
      expires: new Date(Date.now() + 2592000000),
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res.cookie("access_token", token, {
      expires: new Date(Date.now() + 2700000),
      secure: true,
    });
    next();
  } catch (err) {
    next(err);
  }
};

export const getTokenValue = async (req, res, next) => {
  try {
    verifyToken(req, res, () => {
      if (req.user) {
        res.status(200).json({ user: req.user });
        next();
      } else {
        return next(createError(403, "You are not authorized!"));
      }
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  const token = "expired";
  const refresh_token = "expired";
  try {
    res.cookie("refresh_token", refresh_token, {
      expires: new Date(Date.now() - 60000),
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res
      .cookie("access_token", token, {
        expires: new Date(Date.now() - 60000),
        secure: true,
      })
      .status(200)
      .json({ message: "Logged Out Successfully" });
  } catch (err) {
    next(err);
  }
};
