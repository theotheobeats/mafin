import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const authFormSchema = (type: string) =>
	z.object({
		name: type === "/sign-up" ? z.string().min(8) : z.string().optional(),
		email: z.string().email(),
		password: z.string().min(2),
	});

export const transactionFormSchema = () =>
	z.object({
		name: z.string().min(8),
		amount: z.coerce.number({ required_error: "Please enter amount" }),
		type_id: z
			.string({
				required_error: "Please select type.",
			})
			.nonempty(),
		category_id: z
			.string({
				required_error: "Please select category.",
			})
			.nonempty(),
	});
