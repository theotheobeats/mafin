import React, { useEffect, useState } from "react";
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
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "./ui/button";
import { transactionFormSchema } from "@/lib/utils";
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
	getSingleTransactionData,
	updateTransaction,
} from "@/lib/actions/transaction.action";
import { getCategories, getTypes } from "@/lib/actions/helper.action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const TransactionModal = ({
	fetchTransactionData,
	edit,
	txId,
	setOpen,
	open,
	title,
}: any) => {
	const [types, setTypes] = useState<Type[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const formSchema = transactionFormSchema();
	const [transaction, setTransaction] = useState<Transaction[]>([]);
	const [loading, setLoading] = useState(true);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
		},
	});

	useEffect(() => {
		const fetchDatas = async () => {
			setLoading(true);
			try {
				const [typesData, categoriesData] = await Promise.all([
					getTypes(),
					getCategories(),
				]);

				if (edit) {
					const transactionData = await getSingleTransactionData(txId);
					setTransaction(transactionData);
					console.log(transactionData)
					form.reset({
						name: transactionData.name,
						type: transactionData.type_id.toString(),
						amount: transactionData.amount,
						category: transactionData.category_id.toString(),
					});
				} else {
					form.reset({ name: "", type: "", category: "" });
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
	}, [open, txId, edit, form]);

	// fix reload flow below, change it to SSR
	async function onSubmit(data: z.infer<typeof formSchema>) {
		try {
			if (edit) {
				await toast.promise(updateTransaction(txId, data), {
					loading: "Updating transaction..",
					success: "Transcation updated!",
					error: "Error occured",
				});
			} else {
				await toast.promise(addTransaction(data), {
					loading: "Saving transaction..",
					success: "Transcation created!",
					error: "Error occured",
				});
			}

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
														value={edit ? transaction?.name || "" : field.value}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="type"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Type</FormLabel>
												<Select
													onValueChange={field.onChange}
													defaultValue={
														edit ? transaction?.type_id?.toString() || "" : ""
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
														value={
															edit ? transaction?.amount || "" : field.value
														}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="category"
										render={({ field }) => (
											<FormItem className="pb-4">
												<FormLabel>Category</FormLabel>
												<Select
													onValueChange={field.onChange}
													defaultValue={
														edit
															? transaction?.category_id?.toString() || ""
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
