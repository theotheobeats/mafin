import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "./ui/button";
import { cn, transactionFormSchema } from "@/lib/utils";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	addTransaction,
	updateTransaction,
} from "@/lib/actions/transaction.action";
import { getCategories, getTypes } from "@/lib/actions/helper.action";
import toast from "react-hot-toast";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "./ui/calendar";
import { getUser } from "@/lib/actions/auth.action";

const TransactionModal = ({
	fetchTransactionData,
	edit,
	txData,
	setOpen,
	open,
	title,
}: any) => {
	const [types, setTypes] = useState<Type[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [userData, setUserData] = useState(null);
	const formSchema = transactionFormSchema();
	const [selectedTransaction, setSelectedTransaction] =
		useState<SingleTransaction>();
	const [loading, setLoading] = useState(true);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			date: new Date(),
		},
	});

	useEffect(() => {
		const fetchDatas = async () => {
			setLoading(true);
			try {
				const userData = await getUser();

				const [typesData, categoriesData] = await Promise.all([
					getTypes(userData.id),
					getCategories(),
				]);

				if (edit) {
					const selectedData = txData;
					form.reset({
						name: selectedData.txData.name,
						amount: selectedData.txData.amount,
						type_id: selectedData.txData.type_id.toString(),
						category_id: selectedData.txData.category_id.toString(),
						date: selectedData.txData.date,
					});
					setSelectedTransaction(selectedData.txData as SingleTransaction);
				}

				setTypes(typesData as Type[]);
				setCategories(categoriesData as Category[]);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		};

		if (open) {
			fetchDatas();
		}
	}, [open, txData, edit, form]);

	// fix reload flow below, change it to SSR
	async function onSubmit(data: z.infer<typeof formSchema>) {
		try {
			if (edit) {
				await toast.promise(updateTransaction(data, selectedTransaction?.id), {
					loading: "Updating transaction..",
					success: "Transcation updated!",
					error: "Error occured",
				});

				location.reload();
			} else {
				await toast.promise(addTransaction(data), {
					loading: "Saving transaction..",
					success: "Transcation created!",
					error: "Error occured",
				});
			}

			// if (edit) {
			// 	location.reload();
			// }

			fetchTransactionData();
			setOpen(false);
			form.reset();
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div>
			<Dialog onOpenChange={setOpen} open={open}>
				<DialogContent className="w-[350px] sm:md:lg:w-[600px] rounded-xl">
					{loading ? (
						<div>Loading..</div>
					) : (
						<>
							{edit === true ? (
								<DialogHeader className="pb-2">
									<DialogTitle>{title}</DialogTitle>
									<DialogDescription>
										Edit your transaction in here!
									</DialogDescription>
								</DialogHeader>
							) : (
								<DialogHeader className="pb-2">
									<DialogTitle>{title}</DialogTitle>
									<DialogDescription>
										Write down your transaction in here!
									</DialogDescription>
								</DialogHeader>
							)}

							<hr />
							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className="space-y-4">
									<FormField
										control={form.control}
										name="name"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Name</FormLabel>
												<FormControl>
													<Input
														placeholder="Transaction Name"
														{...field}
														// value={
														// 	edit
														// 		? selectedTransaction?.name
														// 		: field.value
														// }
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="type_id"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Type</FormLabel>
												<Select
													onValueChange={field.onChange}
													defaultValue={
														edit
															? selectedTransaction?.type_id.toString() || ""
															: ""
													}>
													<SelectTrigger className="w-full">
														<SelectValue placeholder="Select Type" />
													</SelectTrigger>
													<SelectContent {...field}>
														{types.map((type) => (
															<SelectItem
																value={type.id.toString()}
																key={type.id}>
																{type.name}
															</SelectItem>
														))}
													</SelectContent>
												</Select>

												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="amount"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Amount</FormLabel>
												<FormControl>
													<Input
														type="number"
														placeholder="Amount"
														{...field}
														// value={
														// 	edit
														// 		? selectedTransaction?.amount || ""
														// 		: field.value
														// }
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="category_id"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Category</FormLabel>
												<Select
													onValueChange={field.onChange}
													defaultValue={
														edit
															? selectedTransaction?.category_id.toString() ||
															  ""
															: undefined
													}>
													<SelectTrigger className="w-full">
														<SelectValue placeholder="Select Category" />
													</SelectTrigger>
													<SelectContent {...field}>
														{categories.map((category) => (
															<SelectItem
																value={category.id.toString()}
																key={category.id}>
																{category.name}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="date"
										render={({ field }) => (
											<FormItem className="flex flex-col pb-6 pt-2">
												<FormLabel>Date</FormLabel>
												<FormControl>
													<Popover>
														<PopoverTrigger asChild>
															<FormControl>
																<Button
																	variant={"outline"}
																	className={cn(
																		"w-full pl-3 text-left font-normal",
																		!field.value && "text-muted-foreground"
																	)}>
																	{field.value ? (
																		format(field.value, "PPP")
																	) : (
																		<span>Transaction Date</span>
																	)}
																	<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
																</Button>
															</FormControl>
														</PopoverTrigger>
														<PopoverContent
															className="w-auto p-0"
															align="start">
															<Calendar
																mode="single"
																selected={field.value}
																onSelect={field.onChange}
																disabled={(date) =>
																	date > new Date() ||
																	date < new Date("1900-01-01")
																}
																initialFocus
															/>
														</PopoverContent>
													</Popover>
												</FormControl>

												<FormMessage />
											</FormItem>
										)}
									/>

									<hr />
									<Button className="py-4 w-full" type="submit">
										Save
									</Button>
								</form>
							</Form>
						</>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default TransactionModal;
