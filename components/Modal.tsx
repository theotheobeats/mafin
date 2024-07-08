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
import { addTransaction } from "@/lib/actions/transaction.action";
import { getCategories, getTypes } from "@/lib/actions/helper.action";

type Category = { id: bigint; name: string };
type Type = { id: bigint; name: string };

const ModalButton = ({ children }: any) => {
	const [types, setTypes] = useState<Type[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const formSchema = transactionFormSchema();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			amount: 0,
		},
	});

	// to-do: get data of Category, Type from backend [create a server action]. Map it on select front-end.
	useEffect(() => {
		const fetchTypeAndCategory = async () => {
			try {
				const [typesData, categoriesData] = await Promise.all([
					getTypes(),
					getCategories(),
				]);

				setTypes(typesData as Type[]);
				setCategories(categoriesData as Category[]);

				// console.log(types);
				// console.log(categories);
			} catch (error) {
				console.log(error);
			}
		};

		fetchTypeAndCategory();
	}, []);

	async function onSubmit(data: z.infer<typeof formSchema>) {
		try {
			const result = await addTransaction(data);
			console.log(result);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div>
			<Dialog>
				<DialogTrigger asChild>
					<Button>{children}</Button>
				</DialogTrigger>
				<DialogContent className="w-[350px] sm:md:lg:w-[600px] rounded-xl">
					<DialogHeader className="pb-2">
						<DialogTitle>Add Transaction</DialogTitle>
						<DialogDescription>
							Write down your transaction in here!
						</DialogDescription>
					</DialogHeader>
					<hr />
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input placeholder="transaction name" {...field} />
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
										<Select>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select Type" />
											</SelectTrigger>
											<SelectContent {...field}>
												{types.map((type) => (
													<SelectItem value={type.id.toString()} key={type.id}>
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
											<Input type="number" placeholder="Amount" {...field} />
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
										<Select>
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
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default ModalButton;
