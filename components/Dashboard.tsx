import { getTodayTotalExpenses } from "@/lib/actions/helper.action";
import React, { useEffect, useState } from "react";

function getTodayDate() {
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, "0");
	const day = String(today.getDate()).padStart(2, "0");

	return `${year}/${month}/${day}`;
}

const Dashboard = ({ userData }: userDataProps) => {
	const [todayExpenses, setTodayExpenses] = useState(null);
	const date = getTodayDate();

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const data = await getTodayTotalExpenses(date);
				setTodayExpenses(data);
			} catch (error) {
				console.error("Error data:", error);
			}
		};

		fetchUserData();
	}, [date]);

	console.log(todayExpenses);

	return (
		<section>
			<div>
				<div className="text-2xl">
					Hi, <span className="font-bold">{userData?.name}</span>.
				</div>
				<p>
					Record your income and expense everyday to track your financial habit.
				</p>
			</div>
			<div className="flex">
				<div>
					<h1>Today Expenses: {todayExpenses}</h1>
				</div>
			</div>
		</section>
	);
};

export default Dashboard;
