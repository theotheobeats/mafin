import React from "react";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

const TypeModal = () => {
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

export default TypeModal;
