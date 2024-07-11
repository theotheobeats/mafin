import React from "react";

const Dashboard = ({ userData }: userDataProps) => {
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
		</section>
	);
};

export default Dashboard;
