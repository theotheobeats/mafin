import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import TransactionModal from "@/components/TransactionModal";
import { useState } from "react";

export function DataTableRowActions(transaction: any) {
	const [open, setOpen] = useState(false);
	return (
		<>
			<div className="text-left">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							&#183; &#183;
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem className="font-semibold">
							<button onClick={() => setOpen(true)}>Edit</button>
						</DropdownMenuItem>
						<DropdownMenuItem className="text-red-600 font-bold">
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<TransactionModal
				title="Edit Data"
				open={open}
				setOpen={setOpen}
				edit={true}
				txId={transaction.id}
			/>
		</>
	);
}
