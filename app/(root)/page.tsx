"use client";

import Dashboard from "@/components/Dashboard";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { getUser, signout } from "@/lib/actions/auth.action";
import { getTodayTotalExpenses } from "@/lib/actions/helper.action";
import { getProfile } from "@/lib/actions/profile.action";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
	return (
		<section className="w-full h-full p-8">
			<Dashboard />
		</section>
	);
};

export default Page;
