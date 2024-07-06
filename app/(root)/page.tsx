"use client";

import { Button } from "@/components/ui/button";
import { getUser, signout } from "@/lib/actions/auth.action";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
	const [userData, setUserData] = useState<any>(null);
	const router = useRouter();

	const handleSignOut = async () => {
		try {
			await signout();
			router.push("/sign-in");
		} catch (error) {
			console.error("Error signing out:", error);
		}
	};

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const data = await getUser(); // Assuming getUser returns a promise resolving to user data
				setUserData(data);
			} catch (error) {
				console.error("Error fetching user data:", error);
				// Handle error fetching user data, e.g., redirect to error page or show error message
			}
		};

		fetchUserData();
	}, []);

	return (
		<section className="mx-auto my-auto">
			<h1>Hi {userData?.name}</h1>
			<Button onClick={handleSignOut}>Sign Out</Button>
		</section>
	);
};

export default Page;
