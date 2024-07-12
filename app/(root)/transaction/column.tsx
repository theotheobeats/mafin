"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableRowActions } from "./row-actions";
import { format } from "date-fns";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

// NOTE: BRAINSTORM ON HOW TO CONVERT THIS TO REUSABLE COMPONENTS

export const columns: ColumnDef<TransactionColumnProps>[] = [
	{
		accessorKey: "date",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className="bg-transparent text-left">
					Date
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			let formattedDate = "N/A";

			if (row.original.date) {
				formattedDate = format(new Date(row.original.date), "MMMM do, yyyy");
			}

			return (
				<span className="rounded-xl text-xs shadow-sm font-bold">
					{formattedDate}
				</span>
			);
		},
	},
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "amount",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				className="bg-transparent text-left">
				Amount
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue("amount"));
			const category = row.original.category;

			const formatted = new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "IDR",
			}).format(amount);

			const formattedWithoutCents = formatted.slice(0, -3);

			return (
				<div
					className={`text-left font-bold text-xs ${
						category === "Income" ? "text-green-700" : "text-red-700"
					}`}>
					{category === "Income"
						? `+ ${formattedWithoutCents}`
						: `- ${formattedWithoutCents}`}
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
