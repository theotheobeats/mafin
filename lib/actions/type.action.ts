import { createClient } from "@/utils/supabase/server";
import { getUser } from "./auth.action";
import { parseStringify } from "../utils";

export async function addType(data: { name: string }) {
	const supabase = createClient();

	try {
		const user = await getUser();

		if (!user) {
			throw new Error("User not found");
		}

		const { data: existingTypes, error: fetchError } = await supabase
			.from("types")
			.select("*")
			.eq("name", data.name)
			.eq("userId", user.id);

		if (fetchError) {
			throw fetchError;
		}

		if (existingTypes && existingTypes.length > 0) {
			throw new Error("Type with this name already exists");
		}

		const { data: insertedData, error: insertError } = await supabase
			.from("types")
			.insert([
				{
					name: data.name,
					userId: user.id,
				},
			]);

		if (insertError) {
			throw insertError;
		}

		return parseStringify(insertedData);
	} catch (error) {
		console.error(error);
		return;
	}
}

export async function updateType(data: { id: bigint; name: string }) {
	const supabase = createClient();

	try {
		const user = await getUser();

		const { data: insertedData, error: insertError } = await supabase
			.from("types")
			.update([
				{
					name: data.name,
					userId: user.id,
				},
			])
			.eq("id", data.id)
			.eq("userId", user.id)
			.single();

		if (insertError) {
			throw insertError;
		}

		return parseStringify(insertedData);
	} catch (error) {
		console.log(error);
		return;
	}
}

export async function deleteType(id: any) {
	const supabase = createClient();

	try {
		const user = await getUser();
		const response = await supabase
			.from("types")
			.delete()
			.eq("id", id)
			.eq("userId", user.id);

		return parseStringify(response);
	} catch (error) {
		return error;
	}
}
