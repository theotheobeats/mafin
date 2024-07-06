"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/lib/actions/auth.action";
import AuthForm from "@/components/AuthForm";

const SignIn = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkLoginStatus = async () => {
			const userLoggedIn = await isLoggedIn();
			if (userLoggedIn) {
				setLoading(false)
				router.push("/");
			} else {
				setLoading(false);
			}
		};

		checkLoginStatus();
	}, [router]);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<section className="mx-auto my-auto w-[25rem]">
			<AuthForm type="/sign-in" />
		</section>
	);
};

export default SignIn;
