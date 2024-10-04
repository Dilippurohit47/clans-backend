import { Router } from "express";
import { registerSchema } from "../validations/authValidatons.js";
import { formatError } from "../helper/errorformat.js";
import { ZodError } from "zod";
import prisma from "../config/database.js";
import bcrypt, { genSalt } from "bcrypt";
const router = Router();
router.post("/", async (req, res) => {
    const body = req.body;
    try {
        const paylaod = registerSchema.parse(body);
        let user = await prisma.user.findUnique({
            where: {
                email: paylaod.email,
            },
        });
        if (user) {
            return res.status(422).json({
                erros: {
                    email: "Eamil already taken Please use another one ",
                },
            });
        }
        const salt = await genSalt(10);
        paylaod.password = await bcrypt.hash(paylaod.password, salt);
        await prisma.user.create({
            data: {
                name: paylaod.name,
                email: paylaod.email,
                password: paylaod.password,
            },
        });
        console.log("user created succesfully");
        return res.json("user created successfully");
    }
    catch (error) {
        if (error instanceof ZodError) {
            const errors = formatError(error);
            return res.status(422).json({ message: "Invalid data", errors });
        }
        return res.status(500).json({ message: "Internal sever error" });
    }
});
export default router;
