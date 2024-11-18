import dayjs, { Dayjs } from "dayjs";
import { z } from "zod";

const zodDay = z.instanceof(dayjs as unknown as typeof Dayjs, { message: 'invalid date' })


export const discountSchema = z.object({
    type: z.string(),
    value: z.string(),
    startDate: zodDay,
    endDate: zodDay
})
    .superRefine((data, ctx) => {
        const { type, value, endDate, startDate } = data;


        const parsedValue = parseFloat(value);
        if (isNaN(parsedValue)) {
            ctx.addIssue({
                code: "custom",
                path: ["value"],
                message: "Value must be a valid number",
            });
            return;
        }

        if (type === "Percentage" && (parsedValue < 0 || parsedValue > 100)) {
            ctx.addIssue({
                code: "custom",
                path: ["value"],
                message: "Percentage must be between 0 and 100",
            });
        } else if (type === "FixedAmount" && parsedValue <= 0) {
            ctx.addIssue({
                code: "custom",
                path: ["value"],
                message: "Fixed amount must be greater than 0",
            });
        }

        if (dayjs.isDayjs(endDate) && endDate.isBefore(startDate)) {
            ctx.addIssue({
                code: "custom",
                path: ["endDate"],
                message: "End date must be after the start date",
            });
        }


    });


export type DiscountSchema = z.infer<typeof discountSchema>