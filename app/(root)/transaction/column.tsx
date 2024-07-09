"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

// NOTE: WE WILL IMPORT TYPES LATER FROM DEDICATED TYPES FILE
export type Transaction = {
	id: bigint;
	name: string;
	amount: number;
};

// NOTE: BRAINSTORM ON HOW TO CONVERT THIS TO REUSABLE COMPONENTS
export const columns: ColumnDef<Transaction>[] = [
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "amount",
		header: () => <div className="text-right">Amount</div>,
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue("amount"));
			// change this format to rupiah
			const formatted = new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "USD",
			}).format(amount);

			return <div className="text-right font-medium">{formatted}</div>;
		},
	},
];
