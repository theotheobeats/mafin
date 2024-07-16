"use server";

import { revalidatePath } from "next/cache";
import { redirect, useRouter } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { parseStringify } from "../utils";

export async function login(data: { email: string; password: string }) {
	const supabase = createClient();

	// type-casting here for convenience
	// in practice, you should validate your inputs

	const response = await supabase.auth.signInWithPassword(data);

	if (response.error) {
		return parseStringify(response.error);
	}

	redirect("/");
}

export async function signup(data: {
	name?: string;
	email: string;
	password: string;
}) {
	const supabase = createClient();

	const { error, data: authData } = await supabase.auth.signUp({
		email: data.email,
		password: data.password,
	});

	if (error) {
		console.log(error);
		return;
	}

	const user = authData.user;
	if (user) {
		console.log(user.id);

		try {
			const { data: profileData, error: profileError } = await supabase
				.from("profiles")
				.insert([{ name: data.name, email: data.email, id: user.id }])
				.single();

			if (profileError) {
				console.log(profileError);
				return;
			}

			const { error: typeError } = await supabase
				.from("types")
				.insert([{ name: "Primary", userId: user.id }]);

			if (typeError) {
				console.log(typeError);
				return;
			}
		} catch (error) {
			console.log(error);
		}
	}

	revalidatePath("/", "layout");
	redirect("/");
}

export async function signout() {
	const supabase = createClient();

	try {
		const response = await supabase.auth.signOut();

		if (response.error) {
			throw new Error(response.error.message);
		}
	} catch (error) {
		console.error("Sign-out error:", error);
	}
}

export async function isLoggedIn() {
	const supabase = createClient();

	const res = supabase.auth.getSession();
	if ((await res).data.session) {
		console.log("user is logged in");
		return true;
	} else {
		console.log("theres no logged in user / session");
		return false;
	}
}

export async function getUser() {
	const supabase = createClient();

	const user = (await supabase.auth.getUser()).data.user;
	const { data, error } = await supabase
		.from("profiles")
		.select("*")
		.eq("id", user?.id)
		.single();

	if (data) {
		return data;
	} else {
		return error;
	}
}
