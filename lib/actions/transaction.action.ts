"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { parseStringify } from "../utils";
import { getUser } from "./auth.action";

export async function addTransaction(data: {
	name: string;
	amount: number;
	type: string;
	category: string;
}) {
	const supabase = createClient();
	const user = await getUser();

	// type-casting here for convenience
	// in practice, you should validate your inputs

	try {
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

