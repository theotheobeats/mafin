"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

// NOTE: WE WILL IMPORT TYPES LATER FROM DEDICATED TYPES FILE

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
			// change this format to rupiah
			const formatted = new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "IDR",
			}).format(amount);

			return <div className="text-left font-medium">{formatted}</div>;
		},
	},
    {
		accessorKey: "type",
		header: "Type",
	},
    {
		accessorKey: "category",
		header: "Category",
	},
];
