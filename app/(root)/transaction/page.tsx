"use client";

import { getTransactionData } from "@/lib/actions/transaction.action";
import { useEffect, useState } from "react";
import { columns } from "./column";
import { DataTable } from "@/components/DataTable";
import TransactionModal from "@/components/TransactionModal";
import { Button } from "@/components/ui/button";

const Page = () => {
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
			<section className="h-full w-full p-8">
				<div className="pb-2">
					<div className="text-xl font-bold flex justify-between">
						<div>
							<h1>Transactions</h1>
						</div>
						<div>
							<div className="hidden sm:md:lg:block">
								<Button onClick={() => setOpen(true)}>Add Transaction</Button>
							</div>
							<div className="sm:md:lg:hidden">
								<Button onClick={() => setOpen(true)}>+</Button>
							</div>
						</div>
					</div>
					<p className="text-slate-400">Manage your recent transactions here.</p>
				</div>
				<hr className="py-2"/>
				<div>

					<div className="pb-4">
						<h2 className="font-semibold">Your today&apos;s transaction.</h2>
					</div>
					<DataTable columns={columns} data={transactions} />
				</div>

				<TransactionModal
					title="Add Transaction"
					open={open}
					setOpen={setOpen}
					fetchTransactionData={fetchTransactionData}
				/>
			</section>
		</>
	);
};

export default Page;
