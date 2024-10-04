import { z } from "zod";
import { client } from "../../../app/api/client";

export const registerFormValidation = z.object({
    firstName: z
        .string()
        .min(1, 'name_req'),
    lastName: z
        .string()
        .min(1, 'name_req'),

    email: z
        .string()
        .min(1, 'email_req')
        .regex(/^([a-zA-Z0-9_.+-]+)@([a-zA-Z0-9-]+)\.([a-zA-Z]{2,})$/, "Invalid Email")
        // .refine(async (value) => {
        //     const data = await client
        //         .post(`account/isEmailExist?email=${value}`)
        //         .then(response => response?.data?.data);
        //     return !data
        // }, 'email_exist'),
        ,

    username: z
        .string()
        .min(1, 'username_req')
        // .refine(async (value) => {
        //     const data = await client
        //         .post(`account/isUsernameExist?username=${value}`)
        //         .then(response => response?.data?.data);
        //     return !data
        // }, 'username_exist'),
        ,

    password: z
        .string()
        .min(1, 'password_req'),

    confirmPassword: z
        .string()
        .min(1, 'confirm_password_req'),
})
    .refine(data => data.password === data.confirmPassword,
        {
            message: 'password_no_match',
            path: ['confirmPassword'],
        })
