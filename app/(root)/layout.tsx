"use client"

import Navbar from "@/components/Navbar";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="flex h-screen w-full font-inter">
			<Navbar />
			{children}
		</main>
	);
}
