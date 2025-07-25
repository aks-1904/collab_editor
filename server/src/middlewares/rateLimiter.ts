import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 100, // 15 minutes
  max: 100, // limit each IP to 100 request per window
  standardHeaders: true,
  legacyHeaders: true,
  message: {
    success: false,
    message: "Too many request from this IP address. Try again later",
  },
});

export const authLimiter = rateLimit({
  windowMs: 60 * 60 * 100, // 60 minutes
  max: 5, // limit each IP to 5 request per window
  standardHeaders: true,
  legacyHeaders: true,
  message: {
    success: false,
    message: "Too many request to authenticate, try again later",
  },
});
