import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Mafin",
	description: "Personal finance journaling made easy.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				{children}
				<div>
					<Toaster position="bottom-right" reverseOrder={true} />
				</div>
			</body>
		</html>
	);
}
