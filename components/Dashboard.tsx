import {
	getLatestTransactions,
	getThisMonthTotalExpense,
	getTodayTotalExpenses,
} from "@/lib/actions/helper.action";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import TransactionItem from "./TransactionItem";
import { Progress } from "./ui/progress";
import { getProfile } from "@/lib/actions/profile.action";

function getTodayDate() {
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, "0");
	const day = String(today.getDate()).padStart(2, "0");

	return `${year}/${month}/${day}`;
}

function formatNumber(number: number) {
	const formatted = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "IDR",
	})
		.format(number)
		.slice(0, -3);

	return formatted;
}

const Dashboard = () => {
	const [todayExpenses, setTodayExpenses] = useState<number>(0);
	const [todayIncomes, setTodayIncomes] = useState<number>(0);
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [thisMonthTotalExpense, setThisMonthTotalExpense] =
		useState<ThisMonthTotalExpense | null>(null);
	const date = getTodayDate();
	const [userData, setUserData] = useState<any>(null);

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const data: any = await getTodayTotalExpenses(date);
				const latestTransaction = await getLatestTransactions();
				const thisMonthTotalExpenseData = await getThisMonthTotalExpense();
				const userData = await getProfile();

				let expense = parseFloat(data.expense);
				let income = parseFloat(data.income);

				setUserData(userData.data);
				setTodayExpenses(Number(expense));
				setTodayIncomes(Number(income));
				setTransactions(latestTransaction as Transaction[]);
				setThisMonthTotalExpense(thisMonthTotalExpenseData);
			} catch (error) {
				console.error("Error data:", error);
			}
		};

		fetchUserData();
	}, [date]);

	return (
		<section>
			<div>
				<div className="text-2xl">
					Hi, <span className="font-bold">{userData?.name}</span>.
				</div>
				<p className="text-xs">
					Record your income and expense everyday to track your financial habit.
				</p>
			</div>
			<br />
			<hr />
			<div className="flex mt-4 sm:md:lg:mt-8 gap-4 sm:md:lg:h-[225px] h-[100px]">
				<div className="flex-col justify-evenly gap-4 w-full">
					<div className="w-full">
						<div className="flex gap-4 justify-evenly w-full">
							<div className="text-black rounded-lg w-full bg-slate-50 shadow-sm p-4">
								<h1 className="text-xs">Today Income</h1>
								<h1 className="sm:md:lg:text-xl font-bold text-sm text-green-400">
									+ {formatNumber(todayIncomes)}
								</h1>
							</div>
							<div className="text-black rounded-lg w-full shadow-sm p-4 bg-slate-50">
								<h1 className="text-xs">Today Spending</h1>
								<h1 className="sm:md:lg:text-xl font-bold text-sm text-red-400">
									- {formatNumber(todayExpenses)}
								</h1>
							</div>
						</div>
					</div>
					<div className="w-full mt-4">
						<div className="text-black rounded-lg w-full bg-slate-50 shadow-sm p-4 sm:md:lg:h-[130px]">
							<h1 className="text-xs">Budget</h1>
							<h1 className="sm:md:lg:text-xl font-bold text-sm text-green-400">
								<Progress
									className="my-2"
									value={thisMonthTotalExpense?.percentageSpent ?? 0}
								/>
								<span className="text-red-500">
									{formatNumber(thisMonthTotalExpense?.totalSpent ?? 0)}
								</span>
								/
								<span className="text-xs">
									{formatNumber(userData?.budget ?? 0)}
								</span>
							</h1>
						</div>
					</div>
				</div>

				<div className="hidden sm:md:lg:block bg-white text-black rounded-lg w-full shadow-sm p-4 outline-dashed outline-2 outline-offset-[-3px] outline-slate-400">
					<div className="p-2">
						<div className="flex justify-between">
							<h1 className="text-xl font-bold">Recent Transaction</h1>
							<Link href="/transaction">
								<span className="text-xs font-slate-300 hover:text-slate-300 underline">
									See all
								</span>
							</Link>
						</div>
						<div className="mt-4">
							{transactions.map((item: any) => (
								<div key={item.id}>
									<TransactionItem
										name={item.name}
										date={item.date}
										categories={item.categories.name}
										amount={item.amount}
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
			<br />
			<div className="sm:md:lg:hidden mt-20 bg-white text-black rounded-lg w-full shadow-sm p-4 outline-dashed outline-2 outline-offset-[-3px] outline-slate-400">
				<div className="p-2">
					<div className="flex justify-between">
						<h1 className="font-bold">Recent Transaction</h1>
						<Link href="/transaction">
							<span className="text-xs font-slate-300 hover:text-slate-300 underline">
								See all
							</span>
						</Link>
					</div>
					<div className="mt-4">
						{transactions.map((item: any) => (
							<div key={item.id}>
								<TransactionItem
									name={item.name}
									date={item.date}
									categories={item.categories.name}
									amount={item.amount}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Dashboard;
