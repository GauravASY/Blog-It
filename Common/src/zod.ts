import {z} from 'zod'


export const signUpInput = z.object({
    email : z.string().email(),
    password : z.string().min(5),
    name : z.string().min(3)
})

export type SignUpInput = z.infer<typeof signUpInput>


export const signInInput = z.object({
    email : z.string().email(),
    password : z.string().min(5),
})

export type SignInInput = z.infer<typeof signInInput>

export const blogPost = z.object({
    title : z.string(),
    content : z.string()
})

export type BlogPost = z.infer<typeof blogPost>
