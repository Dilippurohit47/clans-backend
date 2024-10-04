import { Router } from "express";
import { registerSchema } from "../validations/authValidatons.js";
import { formatError } from "../helper/errorformat.js";
import { ZodError } from "zod";
import prisma from "../config/database.js";
import bcrypt, { genSalt } from "bcrypt";
import { v4 as uuid } from "uuid";
import { renderEmailEjs } from "../helper/htmlRender.js";
import { emailQueue, emailQueueName } from "../jobs/Email-jobs.js";
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
        const token = await bcrypt.hash(uuid(), salt);
        const url = `${process.env.APP_URL}/verify-email?email=${paylaod.email}&token=${token}`;
        const emailBody = await renderEmailEjs("verify-email", {
            name: paylaod.name, url,
        });
        await emailQueue.add(emailQueueName, {
            to: paylaod.email, subject: "Verify your email", body: emailBody
        });
        await prisma.user.create({
            data: {
                name: paylaod.name,
                email: paylaod.email,
                password: paylaod.password,
            },
        });
        console.log("user created succesfully");
        return res.json("Please check your eamil we have sned verifiation email");
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
