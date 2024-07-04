"use client"

import AuthForm from "@/components/AuthForm";
import React from "react";

const SignUp = () => {
	return (
		<section className="mx-auto my-auto w-[25rem]">
			<AuthForm type="/sign-up" />
		</section>
	);
};

export default SignUp;
