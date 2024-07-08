"use client"

import Modal from "@/components/Modal";
import React from "react";

const page = () => {
	
	return (
		<section className="h-full w-full p-8">
			<div className="text-2xl font-bold flex justify-between">
				<div>
					<h1>Transactions</h1>
				</div>
				<div>
					<div className="hidden sm:md:lg:block">
						<Modal>Add Transaction</Modal>
					</div>
					<div className="sm:md:lg:hidden">
						<Modal>+</Modal>
					</div>
				</div>
			</div>
			<div></div>
			<p>Add and find your recent expenses here.</p>

			<div className="py-4">
				<hr />
			</div>
			<div className="">
				<h2 className="font-semibold">Your today&apos;s transaction.</h2>
			</div>
		</section>
	);
};

export default page;
