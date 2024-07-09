"use client";

import Dashboard from "@/components/Dashboard";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { getUser, signout } from "@/lib/actions/auth.action";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
	const [userData, setUserData] = useState<any>(null);

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const data = await getUser();
				setUserData(data);
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};

		fetchUserData();
	}, []);

	return (
		<section className="w-full h-full p-8">
			<div className="font-bold text-2xl">Hello, {userData?.name}</div>
			<p className="text-slate-500">Journay your expenses daily to let AI analyze your finance habit.</p>
		</section>
	);
};

export default Page;
