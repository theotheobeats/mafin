import { CircleArrowDown, CircleArrowUp } from "lucide-react";
import React from "react";

function formatNumber(number: number) {
	const formatted = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "IDR",
	})
		.format(number)
		.slice(0, -3);

	return formatted;
}

const TransactionItem = ({ name, categories, date, amount }: any) => {
	const formattedAmount = formatNumber(amount);
	return (
		<>
			<div
				className={`flex justify-between mb-2 text-sm bg-green-100 h-full p-2 rounded-sm ${
					categories == "Income" ? "bg-green-200" : "bg-red-200"
				}`}>
				<div
					className={`flex gap-4 ${
						categories == "Income" ? "text-green-500" : "text-red-500"
					} `}>
					<div>
						{categories == "Income" ? (
							<CircleArrowDown width={15} />
						) : (
							<CircleArrowUp width={15} />
						)}
					</div>
					<div className=" mt-[2.5px]">{date}</div>
					<div className=" mt-[2.5px] font-semibold">{name}</div>
				</div>
				<div
					className={`font-bold mt-[2.5px] ${
						categories == "Income" ? "text-green-500" : "text-red-500"
					} `}>
					{categories == "Income" ? (
						<span>+ {formattedAmount}</span>
					) : (
						<span>- {formattedAmount}</span>
					)}
				</div>
			</div>
		</>
	);
};

export default TransactionItem;
