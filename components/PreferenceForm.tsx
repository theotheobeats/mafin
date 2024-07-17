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
import TypeModal from "./TypeModal";
import { getProfile, updateProfile } from "@/lib/actions/profile.action";
import toast from "react-hot-toast";

const PreferenceForm = () => {
	const [types, setTypes] = useState<Array<Types>>([]);
	const [open, setOpen] = useState(false);
	const formSchema = preferenceSchema();
	const [isLoading, setIsLoading] = useState(false);
	const [edit, setEdit] = useState(false);
	const [typeId, setTypeId] = useState(null);
	const [loading, setLoading] = useState(true);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			budget: 0,
		},
	});

	async function onSubmit(data: z.infer<typeof formSchema>) {
		setIsLoading(true);
		try {
			await toast.promise(updateProfile(data), {
				loading: "Updating transaction..",
				success: "Transcation updated!",
				error: "Error occured",
			});

			location.reload();
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	}

	// TYPES CODE BLOCK
	function handleEditType(id: any) {
		setEdit(true);
		setTypeId(id);
		setOpen(true);
	}

	const handleAddType = () => {
		setEdit(false);
		setOpen(true);
	};

	useEffect(() => {
		const fetchType = async () => {
			try {
				const user = await getProfile();
				const types = await getTypes(user.data.id);

				form.reset({
					name: user.data.name,
					email: user.data.email,
					budget: user.data.budget,
				});

				setTypes(types as Type[]);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		};

		fetchType();
	}, [form]);

	return (
		<>
			{loading ? (
				<div>Loading..</div>
			) : (
				<>
					<div className="w-full mb-4">
						<h1 className="text-2xl font-bold mb-2">Preference</h1>
						<p className="text-xs font-slate-400">
							Manage your preference here including transaction types and
							monthly spending limit.
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
												<Input
													placeholder="Name"
													{...field}
													className="w-full"
												/>
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
											<Input
												placeholder="Password"
												{...field}
												type="password"
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
							<p className="text-xs italic text-red-600 font-semibold mt-4">
								add or remove your transaction tags here
							</p>
							<div className="flex gap-2">
								{types.map((item, index) => (
									<span
										className="bg-black rounded-xl p-2 text-xs text-white cursor-pointer hover:bg-slate-600 transition-colors"
										key={index}
										onClick={() => handleEditType(item.id)}>
										{item.name}{" "}
									</span>
								))}
								<Button type="button" onClick={handleAddType}>
									+
								</Button>
							</div>

							<br />
							<hr />
							<br />
							<Button
								type="submit"
								className="w-full mt-4"
								disabled={isLoading}>
								Save Preference
							</Button>
						</form>
					</Form>

					<TypeModal
						open={open}
						setOpen={setOpen}
						edit={edit}
						typeId={typeId}
					/>
				</>
			)}
		</>
	);
};

export default PreferenceForm;
