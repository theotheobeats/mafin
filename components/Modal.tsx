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
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Category = { id: bigint; name: string };
type Type = { id: bigint; name: string };

const ModalButton = ({ children }: any) => {
	const [types, setTypes] = useState<Type[]>([]);
	const [open, setOpen] = useState(false);
	const [categories, setCategories] = useState<Category[]>([]);
	const formSchema = transactionFormSchema();
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
		},
	});

	// to-do: get data of Category, Type from backend [create a server action]. Map it on select front-end. [done]
	useEffect(() => {
		const fetchDatas = async () => {
			try {
				const [typesData, categoriesData] = await Promise.all([
					getTypes(),
					getCategories(),
				]);

				setTypes(typesData as Type[]);
				setCategories(categoriesData as Category[]);
			} catch (error) {
				console.log(error);
			}
		};

		fetchDatas();
	}, [open]);

	// fix reload flow below, change it to SSR
	async function onSubmit(data: z.infer<typeof formSchema>) {
		try {
			
			toast.promise(addTransaction(data), {
				loading: "Saving transaction..",
				success: "Transcation saved!",
				error: "Error occured",
			});

			setOpen(false);
		} catch (error) {
			console.error(error);
		} 
	}

	return (
		<div>
			<Dialog onOpenChange={setOpen} open={open}>
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
										<Select onValueChange={field.onChange}>
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
										<Select onValueChange={field.onChange}>
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
