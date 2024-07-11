"use server";

import { createClient } from "@/utils/supabase/server";
import { getTransactionData } from "./transaction.action";

export async function getTypes() {
	const supabase = createClient();
	const { data, error } = await supabase.from("types").select("*");

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

// export const fetchTransactionData = async () => {
// 	try {
// 		const transactionData = await getTransactionData();
// 		console.log("Transaction data fetched:", transactionData);

// 		return transactionData;
// 	} catch (error) {
// 		console.log("Error fetching transaction data:", error);
// 	}
// };

