"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { authFormSchema } from "@/lib/utils";
import { login, signup } from "@/lib/actions/auth.action";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const AuthForm = ({ type }: { type: string }) => {
	const formSchema = authFormSchema(type);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	async function onSubmit(data: z.infer<typeof formSchema>) {
		setIsLoading(true);
		try {
			if (type === "/sign-in") {
				const result = await login(data);
				if (result) {
					toast.error("Invalid ID/Password");
				}
			}

			// TODO: Data unique handling
			if (type === "/sign-up") {
				const result = await signup(data);
				console.log(result);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<>
			<div className="text-[5rem] text-center font-bold mb-8">
				<h1 className="bg-gradient-to-tr from-emerald-200 to-lime-300">
					MAFIN.
				</h1>
				<p className="text-xs text-slate-200 font-sans">
					Your finance journaling made easy.
				</p>
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					{type === "/sign-up" && (
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input placeholder="name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					)}
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder="email" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input type="password" placeholder="password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{type === "/sign-in" ? (
						<div>
							<Button type="submit" className="w-full" disabled={isLoading}>
								Sign In
							</Button>
							<p className="text-center mt-4 text-xs">
								Don&apos;t have an account? Sign up{" "}
								<Link
									href="/sign-up"
									className="underline cursor-pointer font-bold">
									here
								</Link>
							</p>
						</div>
					) : (
						<div>
							<Button type="submit" className="w-full" disabled={isLoading}>
								Sign Up
							</Button>
							<p className="text-center mt-4 text-xs">
								Already have an account? Sign in{" "}
								<Link
									href="/sign-in"
									className="underline cursor-pointer font-bold">
									here
								</Link>
							</p>
						</div>
					)}
				</form>
			</Form>
		</>
	);
};

export default AuthForm;
