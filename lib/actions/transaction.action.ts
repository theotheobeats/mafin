"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function addTransaction(data: {
	name: string;
	amount: number;
	type: bigint;
	category: bigint;
}) {
	const supabase = createClient();

	// type-casting here for convenience
	// in practice, you should validate your inputs

	const response = await supabase.from("transactions").insert([
		{
			name: data.name,
			amount: data.amount,
			type_id: data.type,
			category_id: data.category,
		},
	]);

	if (response.error) {
		return response.error;
	}

	redirect("/transaction");
}
