import React from "react";

const Dashboard = ({ userData }: userDataProps) => {
	return (
		<section className="ml-[225px]">
			<div className="font-semibold mt-8 text-4xl">
				Welcome back, {userData?.name}
			</div>
			<p>
				Journal your expenses everyday to let our AI to track about your
				financial habits.
			</p>
		</section>
	);
};

export default Dashboard;
