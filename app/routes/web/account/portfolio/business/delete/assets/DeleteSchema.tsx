import { z } from "zod"

const password_regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/

const DeleteSchema = z.object({

    confirm_delete: z
        .string()
        .refine((val) => val === "DELETE", {
            message: 'You must type "DELETE" to confirm',
        }),

    password: z.string({ message: "Please enter a password" })
        .min(8, "Password must be at least 8 characters")
        .regex(password_regex, "Please enter a valid password")
})

export default DeleteSchema
