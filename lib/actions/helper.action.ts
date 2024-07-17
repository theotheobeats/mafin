"use server";

import { createClient } from "@/utils/supabase/server";
import { getTransactionData } from "./transaction.action";
import { parseStringify } from "../utils";
import { getUser } from "./auth.action";
import { getProfile } from "./profile.action";

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
		const user = await getUser();
		const { data, error } = await supabase
			.from("transactions")
			.select(
				`
		  *,
		  types ( name ), 
		  categories ( name )
		`
			)
			.eq("userId", user.id)
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

	const user = await getUser();

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
		.eq("userId", user.id)
		.limit(3);

	if (error) {
		console.error("Error fetching transactions:", error);
		return null;
	}

	return data;
}

export async function getThisMonthTotalExpense() {
	const supabase = createClient();
	const user = await getProfile();
	const today = new Date();
	const firstOfMonth = new Date(
		Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1)
	).toISOString();
	const endOfMonth = new Date(
		Date.UTC(today.getUTCFullYear(), today.getUTCMonth() + 1, 0, 23, 59, 59)
	).toISOString();

	const { data: transactions, error } = await supabase
		.from("transactions")
		.select(
			`
			amount,
			categories ( name )
		  `
		)
		.eq("userId", user.data.id)
		.gte("date", firstOfMonth)
		.lte("date", endOfMonth);

	// Filter transactions by category name
	const expenseTransactions = transactions!.filter(
		(transaction) =>
			Array.isArray(transaction.categories) &&
			transaction.categories.some((category) => category.name === "Expense")
	);
	
	// summing the amount
	const totalSpent = expenseTransactions.reduce(
		(sum, transaction) => sum + transaction.amount,
		0
	);

	const budget = user.data.budget;

	// Calculate the percentage of the budget spent
	const percentageSpent = parseFloat(((totalSpent / budget) * 100).toFixed(2));

	return {
		totalSpent,
		percentageSpent,
	};
}
