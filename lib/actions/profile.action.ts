"use server";

import { createClient } from "@/utils/supabase/server";
import { getUser } from "./auth.action";
import { parseStringify } from "../utils";

export async function getProfile() {
	const supabase = createClient();
	try {
		const user = await getUser();
		const response = await supabase
			.from("profiles")
			.select()
			.eq("id", user.id)
			.single();

		return parseStringify(response);
	} catch (error) {
		return error;
	}
}

export async function updateProfile(data: {
	name: string;
	email: string;
	password: string;
	budget: number;
}) {
	const supabase = createClient();

	try {
		const user = await getUser();

		if (!user) {
			throw new Error();
		}

		if (data.password !== "" || data.password !== null) {
			await supabase.auth.updateUser({ password: data.password });
		}

		const response = await supabase
			.from("profiles")
			.update({
				name: data.name,
				email: data.email,
				budget: data.budget,
			})
			.eq("id", user.id)
			.single();

		return parseStringify(response);
	} catch (error) {
		return error;
	}
}
