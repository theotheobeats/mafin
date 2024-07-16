import React, { useEffect, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "./ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { typeSchema } from "@/lib/utils";
import { Button } from "./ui/button";
import {
	addType,
	deleteType,
	getType,
	updateType,
} from "@/lib/actions/type.action";
import toast from "react-hot-toast";

const TypeModal = ({ open, setOpen, edit, typeId }: any) => {
	const [loading, setLoading] = useState(false);
	const formSchema = typeSchema();
	const [selectedData, setSelectedData] = useState(null);
	const [color, setColor] = useState("");
	const [typeName, setTypeName] = useState("");
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
				const type = await getType(typeId);

				form.reset({
					name: type.data.name,
					color: type.data.color,
				});

				setTypeName(type.data.name);
				setColor(type.data.color);
				setSelectedData(type);
				setLoading(false);
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		};

		if (open && edit) {
			fetchDatas();
		}
	}, [open, form, typeId, edit]);

	const handleSubmit = async () => {
		try {
			if (edit) {
				await toast.promise(updateType(typeName, color, typeId), {
					loading: "Updating transaction..",
					success: "Transcation updated!",
					error: "Error occured",
				});

				location.reload();
			} else {
				await toast.promise(addType(typeName, color), {
					loading: "Saving transaction..",
					success: "Transcation created!",
					error: "Error occured",
				});
			}

			setOpen(false);
			location.reload();
			form.reset();
		} catch (error) {
			console.log(error);
		}
	};

	const handleDelete = async () => {
		try {
			await toast.promise(deleteType(typeId), {
				loading: "Deleting transaction..",
				success: "Transcation deleted!",
				error: "Error occured",
			});

			location.reload();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<Dialog onOpenChange={setOpen} open={open}>
				<DialogContent className="w-[350px] sm:md:lg:w-[600px] rounded-xl">
					{loading ? (
						<div>Loading..</div>
					) : (
						<>
							<DialogHeader className="pb-2">
								<DialogTitle>{edit ? "Edit Type" : "Add Type"}</DialogTitle>
								<DialogDescription>
									{edit
										? "Edit your transaction types in here!"
										: "Add your new transaction types in here!"}
								</DialogDescription>
							</DialogHeader>

							<hr />
							<Form {...form}>
								<form className="space-y-4">
									<FormField
										control={form.control}
										name="color"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Color Tag</FormLabel>
												<FormControl>
													<Input
														placeholder="Color"
														{...field}
														onChange={(e) => {
															field.onChange(e);
															setColor(e.target.value);
														}}
														type="Color"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="name"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Name</FormLabel>
												<FormControl>
													<Input
														placeholder="Type Name"
														{...field}
														onChange={(e) => {
															field.onChange(e);
															setTypeName(e.target.value);
															console.log(e.target.value);
														}}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<hr />
									<div className="flex gap-2 w-full">
										{edit ? (
											<>
												<Button
													className="py-4 w-full"
													type="button"
													variant="destructive"
													onClick={() => handleDelete()}>
													Delete
												</Button>
												<Button
													className="py-4 w-full"
													type="button"
													onClick={() => handleSubmit()}>
													Save
												</Button>
											</>
										) : (
											<Button
												className="py-4 w-full"
												type="button"
												onClick={() => handleSubmit()}>
												Save
											</Button>
										)}
									</div>
								</form>
							</Form>
						</>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default TypeModal;
