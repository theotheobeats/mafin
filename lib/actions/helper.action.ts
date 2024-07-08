"use server";

import { createClient } from "@/utils/supabase/server";

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
