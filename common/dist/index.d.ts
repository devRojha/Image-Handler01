import z from "zod";
export declare const signupInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name: string;
}, {
    email: string;
    password: string;
    name: string;
}>;
export declare const signinInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const blogInput: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodString;
    published: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    content: string;
    title?: string | undefined;
    published?: string | undefined;
}, {
    content: string;
    title?: string | undefined;
    published?: string | undefined;
}>;
export declare const updateBlogInput: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
    published: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    title?: string | undefined;
    content?: string | undefined;
    published?: string | undefined;
}, {
    title?: string | undefined;
    content?: string | undefined;
    published?: string | undefined;
}>;
export declare const CommentInput: z.ZodObject<{
    comment: z.ZodString;
}, "strip", z.ZodTypeAny, {
    comment: string;
}, {
    comment: string;
}>;
export type SignupInput = z.infer<typeof signupInput>;
export type SigninInput = z.infer<typeof signinInput>;
export type BlogInput = z.infer<typeof blogInput>;
export type UpdateBlogInput = z.infer<typeof updateBlogInput>;
export type CommentInput = z.infer<typeof CommentInput>;
