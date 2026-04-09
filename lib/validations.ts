import { z } from "zod"

export const contactForm = z.object({
    Full_Name: z.string().min(2, "valid name required"),
    Phone: z.string().min(2, "Valid Phone Number Required"),
    title: z.string().min(2, "Please Enter Your title"),
    message: z.string().min(2, "Please Enter your full message")
})

export const login = z.object({
    username: z.string().min(2, "Please Enter Your Username"),
    password: z.string().min(2, "Please Enter Your Password")
})

export const eventRegistrationForm = z.object({
    name: z.string().min(2, "Please enter your name"),
    email: z.email("Please enter a valid email address"),
    phone: z.string().min(7, "Please enter a valid phone number"),
    eventId: z.number().int().positive("Please choose an event"),
})

export const adminPasswordUpdateForm = z.object({
    currentPassword: z.string().min(6, "Please enter your current password"),
    newPassword: z.string().min(8, "New password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Please confirm your new password"),
}).refine((values) => values.newPassword === values.confirmPassword, {
    message: "New passwords do not match",
    path: ["confirmPassword"],
}).refine((values) => values.currentPassword !== values.newPassword, {
    message: "New password must be different from the current password",
    path: ["newPassword"],
})
