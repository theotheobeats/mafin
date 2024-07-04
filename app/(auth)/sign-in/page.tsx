"use client";

import AuthForm from "@/components/AuthForm";

const SignIn = () => {
	return (
		<section className="mx-auto my-auto w-[25rem]">
			<AuthForm type="/sign-in" />
		</section>
	);
};

export default SignIn;
