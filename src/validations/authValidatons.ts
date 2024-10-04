import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(3, { message: "name must be 3 characters long" }),

  email: z.string({ message: "Type correct email" }),
  password: z
    .string({ message: "password is required" })
    .min(6, { message: "password must be 6 characters long" }),
  confirm_password: z
    .string({ message: "confirm password is required" })
    .min(6, { message: "password must be 6 characters long" }),
}).refine((data) =>data.password === data.confirm_password ,{message:"Confirm password does'nt match", path:["Confirm_password"]})
