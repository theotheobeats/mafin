"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

// NOTE: WE WILL IMPORT TYPES LATER FROM DEDICATED TYPES FILE [done]

// NOTE: BRAINSTORM ON HOW TO CONVERT THIS TO REUSABLE COMPONENTS
export const columns: ColumnDef<TransactionColumnProps>[] = [
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "amount",
		header: () => <div className="text-left">Amount</div>,
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue("amount"));
			const category = row.original.category;
			// change this format to rupiah
			const formatted = new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "IDR",
			}).format(amount);

			return (
				<div
					className={`text-left font-bold ${
						category === "Income" ? "text-green-700" : "text-red-700"
					}`}>
					{category === "Income" ? `+ ${formatted}` : `- ${formatted}`}
				</div>
			);
		},
	},
	{
		accessorKey: "type",
		header: "Type",
	},
	// {
	// 	accessorKey: "category",
	// 	header: () => <div className="text-center">Category</div>,
	// 	cell: ({ row }) => {
	// 		const category = row.getValue("category") as string;

	// 		return (
	// 			<div
	// 				className={`text-center text-xs text-white rounded-xl mx-auto w-20 ${
	// 					category === "Income" ? "bg-green-600" : "bg-red-600"
	// 				}`}>
	// 				{category}
	// 			</div>
	// 		);
	// 	},
	// },
];
