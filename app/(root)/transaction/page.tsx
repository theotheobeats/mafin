"use client";

import Modal from "@/components/Modal";
import { getTransactionData } from "@/lib/actions/transaction.action";
import { useEffect, useState } from "react";
import { columns } from "./column";
import { DataTable } from "@/components/DataTable";

const Page = () => {
	const [transactions, setTransactions] = useState<TransactionColumnProps[]>(
		[]
	);

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
		<section className="h-full w-full p-8">
			<div className="text-2xl font-bold flex justify-between">
				<div>
					<h1>Transactions</h1>
				</div>
				<div>
					<div className="hidden sm:md:lg:block">
						<Modal fetchTransactionData={fetchTransactionData}>Add Transaction</Modal>
					</div>
					<div className="sm:md:lg:hidden">
						<Modal fetchTransactionData={fetchTransactionData}>+</Modal>
					</div>
				</div>
			</div>
			<div></div>
			<p>Manage your recent transactions here.</p>

			<div className="py-4">
				<hr />
			</div>
			<div className="pb-4">
				<h2 className="font-semibold">Your today&apos;s transaction.</h2>
			</div>
			<DataTable columns={columns} data={transactions} />
		</section>
	);
};

export default Page;
