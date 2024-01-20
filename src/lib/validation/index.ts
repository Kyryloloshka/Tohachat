import * as zod from "zod";

export const SignUpValidation = zod.object({
    name: zod.string().min(2, {message: "Too short"}),
    username: zod.string().min(2, {message: "Too short"}),
    email: zod.string().email(),
    password: zod.string().min(8, {message: 'Password must be at least 8 characters'})
})

export const SignInValidation = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8, {message: 'Password must be at least 8 characters'})
})