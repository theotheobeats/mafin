import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Page() {
	const supabase = createClient();

	const user = (await supabase.auth.getUser()).data.user;

	return (
		<section className="mx-auto my-auto">
			<h1>Hi {user?.email}</h1>
		</section>
	);
}
