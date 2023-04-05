import jwt from "jsonwebtoken";
import { access_token_regenerate } from "../controllers/auth.js";
import { createError } from "../utils/errors.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    const refresh_token = req.cookies.refresh_token;
    if (!refresh_token) {
      return next(createError(401, "You are not authenticated!"));
    }
    jwt.verify(refresh_token, process.env.REFRESH_JWT, (err, user) => {
      if (err) return next(createError(403, "Token is not valid!"));
      req.user = user;
      access_token_regenerate(req, res, next);
    });
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};
