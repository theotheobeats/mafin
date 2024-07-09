"use client"

import AuthForm from "@/components/AuthForm";
import React from "react";

const SignUp = () => {
	return (
		<section className="mx-auto my-auto w-[30rem] p-16 shadow-xl rounded-2xl">
			<AuthForm type="/sign-up" />
		</section>
	);
};

export default SignUp;
