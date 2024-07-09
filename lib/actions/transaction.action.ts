"use server";

import { createClient } from "@/utils/supabase/server";
import { parseStringify } from "../utils";
import { getUser } from "./auth.action";

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

// TODO: READ, UPDATE AND DELETE SERVER ACTION
export async function getTransactionData() {
	const supabase = createClient();
	try {
		const user = await getUser();
		const response = await supabase
			.from("transactions")
			.select("*")
			.eq("userId", user.id);

		// TODO: join types and categories

		return parseStringify(response.data);
	} catch (error) {
		return error;
	}
}
