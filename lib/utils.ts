import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const authFormSchema = (type: string) =>
	z.object({
		name: type === "/sign-up" ? z.string().min(8) : z.string().optional(),
		email: z.string().email(),
		password: z.string().min(8),
	});

export const transactionFormSchema = () =>
	z.object({
		name: z.string().min(8),
		amount: z.coerce.number(),
		type: z.bigint(),
		category: z.bigint(),
	});
