"use server";

import { createClient } from "@/utils/supabase/server";
import { getTransactionData } from "./transaction.action";
import { parseStringify } from "../utils";
import { getUser } from "./auth.action";

export async function getTypes(userId: bigint) {
	const supabase = createClient();
	const { data, error } = await supabase
		.from("types")
		.select("*")
		.eq("userId", userId);

	if (error) {
		throw new Error(`Error fetching types: ${error.message}`);
	}

	return data;
}

export async function getCategories() {
	const supabase = createClient();
	const { data, error } = await supabase.from("categories").select("*");

	if (error) {
		throw new Error(`Error fetching categories: ${error.message}`);
	}

	return data;
}

export async function getTodayTotalExpenses(date: any) {
	try {
		const supabase = createClient();
		const { data, error } = await supabase
			.from("transactions")
			.select(
				`
		  *,
		  types ( name ), 
		  categories ( name )
		`
			)
			.eq("date", date);

		if (error) {
			console.log(error);
			return error;
		}

		const expenseTransactions = data.filter(
			(tx) => tx.categories.name === "Expense"
		);
		const incomeTransactions = data.filter(
			(tx) => tx.categories.name === "Income"
		);

		const totalExpenses = expenseTransactions.reduce(
			(total, tx) => total + tx.amount,
			0
		);
		const totalIncomes = incomeTransactions.reduce(
			(total, tx) => total + tx.amount,
			0
		);

		return {
			expense: parseFloat(totalExpenses),
			income: parseFloat(totalIncomes),
		};
	} catch (error) {
		console.error(error);
		return error;
	}
}

export async function getLatestTransactions() {
	const supabase = createClient();

	const { data, error } = await supabase
		.from("transactions")
		.select(
			`
			*,
			types ( name ), 
			categories ( name )
		  `
		)
		.order("created_at", { ascending: false })
		.limit(3);

	if (error) {
		console.error("Error fetching transactions:", error);
		return null;
	}

	return data;
}
