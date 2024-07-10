"use server";

import { createClient } from "@/utils/supabase/server";
import { parseStringify } from "../utils";
import { getUser } from "./auth.action";

// DATABASE TX
export async function addTransaction(data: {
	name: string;
	amount: number;
	type: string;
	category: string;
}) {
	const supabase = createClient();

	// type-casting here for convenience
	// in practice, you should validate your inputs

	try {
		const user = await getUser();

		if (!user) {
			throw new Error();
		}
		const response = await supabase.from("transactions").insert([
			{
				name: data.name,
				amount: data.amount,
				type_id: data.type,
				category_id: data.category,
				userId: user.id,
			},
		]);

		return parseStringify(response);
	} catch (error) {
		return error;
	}
}

export async function updateTransaction(
	txId: string,
	data: {
		name: string;
		amount: number;
		type: string;
		category: string;
	}
) {
	const supabase = createClient();

	// type-casting here for convenience
	// in practice, you should validate your inputs

	try {
		const user = await getUser();

		if (!user) {
			throw new Error();
		}
		const response = await supabase
			.from("transactions")
			.update([
				{
					name: data.name,
					amount: data.amount,
					type_id: data.type,
					category_id: data.category,
					userId: user.id,
				},
			])
			.eq("id", txId);

		return parseStringify(response);
	} catch (error) {
		return error;
	}
}

// FETCH
export async function getTransactionData() {
	const supabase = createClient();
	try {
		const user = await getUser();
		const response = await supabase
			.from("transactions")
			.select(
				`
				*,
				types ( name ), 
				categories ( name )
			  `
			)
			.eq("userId", user.id);

		if (response.error) {
			throw response.error;
		}

		// Transform the data into a flattened structure
		const flattenedData = response.data.map((transaction: any) => ({
			id: transaction.id,
			name: transaction.name,
			amount: transaction.amount,
			type: transaction.types.name,
			category: transaction.categories.name,
		}));

		return parseStringify(flattenedData);
	} catch (error) {
		return error;
	}
}

export async function getSingleTransactionData(id: string) {
	const supabase = createClient();

	try {
		const response = await supabase
			.from("transactions")
			.select("*")
			.eq("id", id)
			.single();

		console.log(parseStringify(response.data));
		return parseStringify(response.data);
	} catch (error) {
		return error;
	}
}
