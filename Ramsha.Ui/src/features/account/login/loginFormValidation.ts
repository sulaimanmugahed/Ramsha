import { z } from "zod";

export const loginFormValidation = z.object({
    password: z
        .string()
        .min(6, 'password_should_more_5'),

    username: z
        .string()
        .min(1, 'username_should_more_4')

})