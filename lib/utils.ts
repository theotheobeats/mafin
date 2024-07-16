import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { bigint, z } from "zod";

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
		name: z.string().min(2),
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
		date: z.date(),
	});

export const preferenceSchema = () =>
	z.object({
		name: z.string().min(8),
		email: z.string().email(),
		password: z.string().min(2),
		budget: z.coerce.number({
			required_error: "Please enter your monthly spending limit.",
		}),
	});

export const typeSchema = () =>
	z.object({
		id: z.bigint(),
		name: z.string().min(2),
		color: z.string().min(5),
	});
