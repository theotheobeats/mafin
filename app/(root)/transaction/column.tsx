"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableRowActions } from "./row-actions";
import { format } from "date-fns";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

// NOTE: BRAINSTORM ON HOW TO CONVERT THIS TO REUSABLE COMPONENTS

export const columns: ColumnDef<TransactionColumnProps>[] = [
	{
		accessorKey: "date",
		header: "Date",
		cell: ({ row }) => {
			let formattedDate = "N/A"; 

			if (row.original.date) {
				formattedDate = format(new Date(row.original.date), "MMMM do, yyyy");
			}

			return <span className="rounded-xl text-xs shadow-sm font-bold">{formattedDate}</span>;
		},
	},
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
	{
		id: "actions",
		cell: ({ row }) => {
			const txData = row.original;
			return <DataTableRowActions txData={txData} />;
		},
	},
];