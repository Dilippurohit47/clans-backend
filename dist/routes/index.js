import { Router } from "express";
import AuthRoutes from "./authRoutes.js";
import UserRoute from "./getUser.js";
const router = Router();
router.use("/api/auth", AuthRoutes);
router.use("/api/user", UserRoute);
export default router;
