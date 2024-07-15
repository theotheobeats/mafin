import { getTodayTotalExpenses } from "@/lib/actions/helper.action";
import React, { useEffect, useState } from "react";

import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
	desktop: {
		label: "Desktop",
		color: "hsl(var(--chart-1))",
	},
	mobile: {
		label: "Mobile",
		color: "hsl(var(--chart-2))",
	},
} satisfies ChartConfig;

import {
	Area,
	AreaChart,
	CartesianGrid,
	Label,
	Pie,
	PieChart,
	XAxis,
} from "recharts";
import { TrendingUp } from "lucide-react";

const pieChartData = [
	{ browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
	{ browser: "safari", visitors: 200, fill: "var(--color-safari)" },
	{ browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
	{ browser: "edge", visitors: 173, fill: "var(--color-edge)" },
	{ browser: "other", visitors: 190, fill: "var(--color-other)" },
];
const pieChartConfig = {
	visitors: {
		label: "Visitors",
	},
	chrome: {
		label: "Chrome",
		color: "hsl(var(--chart-1))",
	},
	safari: {
		label: "Safari",
		color: "hsl(var(--chart-2))",
	},
	firefox: {
		label: "Firefox",
		color: "hsl(var(--chart-3))",
	},
	edge: {
		label: "Edge",
		color: "hsl(var(--chart-4))",
	},
	other: {
		label: "Other",
		color: "hsl(var(--chart-5))",
	},
} satisfies ChartConfig;

const chartData = [
	{ month: "January", desktop: 186, mobile: 80 },
	{ month: "February", desktop: 305, mobile: 200 },
	{ month: "March", desktop: 237, mobile: 120 },
	{ month: "April", desktop: 73, mobile: 190 },
	{ month: "May", desktop: 209, mobile: 130 },
	{ month: "June", desktop: 214, mobile: 140 },
];

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

const Dashboard = ({ userData }: any) => {
	const [todayExpenses, setTodayExpenses] = useState<number>(0);
	const [todayIncomes, setTodayIncomes] = useState<number>(0);
	const date = getTodayDate();

	const totalVisitors = React.useMemo(() => {
		return pieChartData.reduce((acc, curr) => acc + curr.visitors, 0);
	}, []);

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const data: TodayTotalProps = await getTodayTotalExpenses(date);
				setTodayExpenses(formatNumber(data.expense));
				setTodayIncomes(formatNumber(data.income));
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
				<p className="text-xs">
					Record your income and expense everyday to track your financial habit.
				</p>
			</div>
			<br />
			<hr />
			<div className="flex mt-8 gap-4 sm:md:lg:h-[200px] h-[100px]">
				<div className="flex gap-4 justify-evenly w-full">
					<div className="bg-gradient-to-tr from-emerald-200 to-lime-300 text-black rounded-lg w-full shadow-sm p-4">
						<h1 className="text-xs">Today Income</h1>
						<h1 className="sm:md:lg:text-2xl font-bold">- {todayExpenses}</h1>
					</div>
					<div className="bg-gradient-to-tr from-red-200 to-red-300 text-black rounded-lg w-full shadow-md p-4">
						<h1 className="text-xs">Today Spending</h1>
						<h1 className="sm:md:lg:text-2xl font-bold">+ {todayIncomes}</h1>
					</div>
				</div>

				<div className="hidden sm:md:lg:block bg-gradient-to-tr from-slate-50 to-slate-100 text-black rounded-lg w-full shadow-md p-4">
					<h1 className="text-xs">Recent Transaction</h1>
					<h1 className="sm:md:lg:text-2xl font-bold">+ {todayIncomes}</h1>
				</div>
			</div>
			<div className="sm:md:lg:hidden mt-4 bg-gradient-to-tr from-slate-50 to-slate-100 text-black rounded-lg w-full shadow-md p-4">
				<h1 className="text-xs">Recent Transaction</h1>
				<h1 className="sm:md:lg:text-2xl font-bold">+ {todayIncomes}</h1>
			</div>
			<div className="sm:md:lg:flex mt-8 gap-8 overflow-hidden">
				<div className="w-full shadow-md p-4 rounded-xl mb-4">
					<h1 className="font-bold">Category Spending</h1>
					<ChartContainer
						config={pieChartConfig}
						className="mx-auto aspect-square max-w-[400px]">
						<PieChart>
							<ChartTooltip
								cursor={false}
								content={<ChartTooltipContent hideLabel />}
							/>
							<Pie
								data={pieChartData}
								dataKey="visitors"
								nameKey="browser"
								innerRadius={60}
								strokeWidth={10}>
								<Label
									content={({ viewBox }) => {
										if (viewBox && "cx" in viewBox && "cy" in viewBox) {
											return (
												<text
													x={viewBox.cx}
													y={viewBox.cy}
													textAnchor="middle"
													dominantBaseline="middle">
													<tspan
														x={viewBox.cx}
														y={viewBox.cy}
														className="fill-foreground text-3xl font-bold">
														{totalVisitors.toLocaleString()}
													</tspan>
													<tspan
														x={viewBox.cx}
														y={(viewBox.cy || 0) + 24}
														className="fill-muted-foreground">
														Visitors
													</tspan>
												</text>
											);
										}
									}}
								/>
							</Pie>
						</PieChart>
					</ChartContainer>
				</div>
				<div className="w-full shadow-md rounded-xl p-4 mb-4">
					<div className="font-bold">6-Month Spending Statistic</div>
					<ChartContainer config={chartConfig} className="mx-auto my-auto">
						<AreaChart
							accessibilityLayer
							data={chartData}
							margin={{
								left: 12,
								right: 12,
							}}>
							<CartesianGrid vertical={true} />
							<XAxis
								dataKey="month"
								tickLine={false}
								axisLine={false}
								tickMargin={8}
								tickFormatter={(value) => value.slice(0, 3)}
							/>
							<ChartTooltip
								cursor={false}
								content={<ChartTooltipContent indicator="dot" />}
							/>
							<Area
								dataKey="mobile"
								type="natural"
								fill="var(--color-mobile)"
								fillOpacity={0.4}
								stroke="var(--color-mobile)"
								stackId="a"
							/>
							<Area
								dataKey="desktop"
								type="natural"
								fill="var(--color-desktop)"
								fillOpacity={0.4}
								stroke="var(--color-desktop)"
								stackId="a"
							/>
						</AreaChart>
					</ChartContainer>
				</div>
			</div>
			{/* <div>Recent Transactions up to 10 transaction only.</div> */}
		</section>
	);
};

export default Dashboard;
