"use server";

import { createClient } from "@/utils/supabase/server";
import { getUser } from "./auth.action";

export async function getTypes(userId: bigint) {
	const supabase = createClient();
	const { data, error } = await supabase
		.from("types")
		.select()
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

export async function getTodayTotalExpenses(date: any, userId: any) {
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
			.eq("userId", userId)
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

export async function getLatestTransactions(userId: any) {
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
		.eq("userId", userId)
		.limit(3);

	if (error) {
		console.error("Error fetching transactions:", error);
		return null;
	}

	return data;
}

export async function getThisMonthTotalExpense(
	userId: bigint,
	userBudget: number
) {
	const supabase = createClient();
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
		.eq("userId", userId)
		.gte("date", firstOfMonth)
		.lte("date", endOfMonth);

	const expenseTransactions = transactions!.filter(
		(transaction) =>
			(transaction.categories as unknown as { name: string }).name === "Expense"
	);

	// summing the amount
	const totalSpent = expenseTransactions.reduce(
		(sum, transaction) => sum + transaction.amount,
		0
	);

	const budget = userBudget;

	// Calculate the percentage of the budget spent
	const percentageSpent = parseFloat(((totalSpent / budget) * 100).toFixed(2));

	return {
		totalSpent,
		percentageSpent,
	};
}
