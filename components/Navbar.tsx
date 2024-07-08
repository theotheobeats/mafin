import { signout } from "@/lib/actions/auth.action";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";

const Navbar = () => {
	const router = useRouter();

	const handleSignOut = async () => {
		try {
			await signout();
			router.push("/sign-in");
		} catch (error) {
			console.error("Error signing out:", error);
		}
	};

	return (
		<div className="absolute sm:md:lg:h-screen sm:md:lg:w-[200px] bg-black text-white flex flex-col justify-between">
			<div>
				<div className="font-bold p-8">MAFIN</div>
				<div className="flex-col p-8">
					<div className="hover:text-slate-500 hover:rounded-sm cursor-pointer transition-all py-2 pr-10 w-full">
						<Link href="/transaction">Transaction</Link>
					</div>
					<div className="hover:text-slate-500 hover:rounded-sm cursor-pointer transition-all py-2 pr-10 w-full">
						<Link href="/category">Category</Link>
					</div>
				</div>
			</div>
			<div className="p-8">
				<Button onClick={handleSignOut}>Sign Out</Button>
			</div>
		</div>
	);
};

export default Navbar;
