import { Router } from "express";
import prisma from "../config/database.js";

const app = Router();

app.get("/all", async (req, res) => {
  const users = await prisma.user.findMany();
  console.log(users);
  return res.json(users);
});



export default app;
