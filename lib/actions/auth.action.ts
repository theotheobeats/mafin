"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(data: { email: string; password: string }) {
	const supabase = createClient();

	// type-casting here for convenience
	// in practice, you should validate your inputs

	const { error } = await supabase.auth.signInWithPassword(data);

	if (error) {
		return error;
	}

	return;
}

export async function signup(data: { email: string; password: string }) {
	const supabase = createClient();

	const { error } = await supabase.auth.signUp(data);

	if (error) {
		console.log(error);
	}

	revalidatePath("/", "layout");
	redirect("/");
}
