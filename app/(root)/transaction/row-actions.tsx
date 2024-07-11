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
import { useEffect, useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { getTransactionData } from "@/lib/actions/transaction.action";

export function DataTableRowActions(txData: any) {
	const [open, setOpen] = useState(false);
	const [transactions, setTransactions] = useState<TransactionColumnProps[]>(
		[]
	);

	// REFACTOR THIS LATER
	const fetchTransactionData = async () => {
		try {
			const transactionData = await getTransactionData();
			console.log("Transaction data fetched:", transactionData);

			if (Array.isArray(transactionData)) {
				setTransactions(transactionData as TransactionColumnProps[]);
			} else {
				console.error("Fetched data is not an array:", transactionData);
			}
		} catch (error) {
			console.log("Error fetching transaction data:", error);
		}
	};

	useEffect(() => {
		fetchTransactionData();
	}, []);

	return (
		<>
			<div className="text-left">
				<Dialog>
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
				</Dialog>
			</div>
			<TransactionModal
				title="Edit Data"
				open={open}
				setOpen={setOpen}
				edit={true}
				txData={txData}
				fetchTransactionData={fetchTransactionData}
			/>
		</>
	);
}
