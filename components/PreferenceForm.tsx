import React, { useEffect, useState } from "react";
import { preferenceSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Button } from "./ui/button";
import { getTypes } from "@/lib/actions/helper.action";
import { getUser } from "@/lib/actions/auth.action";

const PreferenceForm = () => {
	const [types, setTypes] = useState<Array<Types>>([]);
	const [newTypeName, setNewTypeName] = useState("");
	const formSchema = preferenceSchema();
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
		},
	});

	async function onSubmit(data: z.infer<typeof formSchema>) {
		setIsLoading(true);
		try {
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	}

	function handleDeleteType() {}

	const handleAddType = () => {};

	useEffect(() => {
		const fetchType = async () => {
			try {
				const user = await getUser();
				const types = await getTypes(user.id);
				setTypes(types as Type[]);
			} catch (error) {
				console.log(error);
			}
		};

		fetchType();
	}, []);

	return (
		<>
			<div className="w-full mb-4">
				<h1 className="text-2xl font-bold mb-2">Preference</h1>
				<p className="text-xs font-slate-400">
					Manage your preference here including transaction types and monthly
					spending limit.
				</p>
			</div>

			<hr className="mb-4" />

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-4 w-full">
					<div className="flex w-full gap-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input placeholder="Name" {...field} className="w-full" />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder="Email" {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input placeholder="Password" {...field} type="password" />
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="budget"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Spending Limit</FormLabel>
								<FormControl>
									<Input
										placeholder="Spending Limit"
										{...field}
										type="number"
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="budget"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Types</FormLabel>
								<FormControl>
									<div className="flex gap-4">
										<Input
											placeholder="Add more transaction type"
											{...field}
											onChange={(e) => setNewTypeName(e.target.value)}
											type="color"
										/>
										<Button type="button" onClick={handleAddType}>
											+
										</Button>
									</div>
								</FormControl>
							</FormItem>
						)}
					/>
					<div className="flex gap-2">
						{types.map((item, index) => (
							<span
								className="bg-slate-700 rounded-xl p-2 text-xs text-white cursor-pointer"
								key={index}>
								{item.name}{" "}
								<span
									className="hover:text-slate-600 cursor-pointer text-xs ml-4"
									onClick={() => handleDeleteType()}>
									{" "}
									x{" "}
								</span>
							</span>
						))}
					</div>

					<br />
					<hr />
					<br />
					<Button type="submit" className="w-full mt-4" disabled={isLoading}>
						Save Preference
					</Button>
				</form>
			</Form>
		</>
	);
};

export default PreferenceForm;
