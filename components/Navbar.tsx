import { signout } from "@/lib/actions/auth.action";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Navbar = () => {
	const router = useRouter();
	const handleSignOut = async () => {
		try {
			await signout();
			router.push("/sign-in");
		} catch (error) {
			console.error("Error signing out: ", error);
		}
	};
	return (
		<>
			{/* REFACTOR THE CODE IF CAN: MOVE ALL THE MENU CONTENT INTO TYPES AND JUST MAP IT IN HERE */}
			<div className="fixed hidden sm:md:lg:h-screen sm:md:lg:w-[80px] bg-black text-white sm:md:lg:flex sm:md:lg:flex-col justify-between">
				<div className="text-center mt-12">
					<div className="flex flex-col items-center space-y-4">
						<div className="hover:bg-slate-800 hover:rounded-sm cursor-pointer transition-all py-2 px-2">
							<Link href="/">
								<div className="icon-wrapper p-2 rounded-sm">
									<svg
										width="20"
										height="20"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										stroke="currentColor">
										<g id="SVGRepo_bgCarrier" stroke-width="0" />

										<g
											id="SVGRepo_tracerCarrier"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>

										<g id="SVGRepo_iconCarrier">
											{" "}
											<path
												d="M22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274"
												stroke="#ffffff"
												stroke-width="1.5"
												stroke-linecap="round"
											/>{" "}
											<path
												d="M15 18H9"
												stroke="#ffffff"
												stroke-width="1.5"
												stroke-linecap="round"
											/>{" "}
										</g>
									</svg>
								</div>
							</Link>
						</div>
					</div>
					<div className="flex flex-col items-center space-y-4 pt-16">
						<div className="hover:bg-slate-800 hover:rounded-sm cursor-pointer transition-all px-2 py-2">
							<Link href="/transaction">
								<div className="icon-wrapper p-2 rounded-sm">
									<svg
										stroke="currentColor"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										width="22"
										height="22"
										fill="none"
										viewBox="0 0 24 24">
										<path
											stroke="currentColor"
											stroke-linecap="round"
											stroke-width="2"
											d="M8 7V6a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1M3 18v-7a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
										/>
									</svg>
								</div>
							</Link>
						</div>

						<div className="hover:bg-slate-800 hover:rounded-sm cursor-pointer transition-all px-2 py-2">
							<Link href="/setting">
								<div className="icon-wrapper p-2 rounded-sm">
									<svg
										width="20"
										height="20"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg">
										<g id="SVGRepo_bgCarrier" stroke-width="0" />

										<g
											id="SVGRepo_tracerCarrier"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>

										<g id="SVGRepo_iconCarrier">
											{" "}
											<path
												d="M7.84308 3.80211C9.8718 2.6007 10.8862 2 12 2C13.1138 2 14.1282 2.6007 16.1569 3.80211L16.8431 4.20846C18.8718 5.40987 19.8862 6.01057 20.4431 7C21 7.98943 21 9.19084 21 11.5937V12.4063C21 14.8092 21 16.0106 20.4431 17C19.8862 17.9894 18.8718 18.5901 16.8431 19.7915L16.1569 20.1979C14.1282 21.3993 13.1138 22 12 22C10.8862 22 9.8718 21.3993 7.84308 20.1979L7.15692 19.7915C5.1282 18.5901 4.11384 17.9894 3.55692 17C3 16.0106 3 14.8092 3 12.4063V11.5937C3 9.19084 3 7.98943 3.55692 7C4.11384 6.01057 5.1282 5.40987 7.15692 4.20846L7.84308 3.80211Z"
												stroke="#ffffff"
												stroke-width="1.5"
											/>{" "}
											<circle
												cx="12"
												cy="12"
												r="3"
												stroke="#ffffff"
												stroke-width="1.5"
											/>{" "}
										</g>
									</svg>
								</div>
							</Link>
						</div>
					</div>
				</div>
				<div className="mx-auto">
					<div className="cursor-pointer transition-all mb-2 rounded-xl">
						<button onClick={handleSignOut}>
							<div className="flex flex-col items-center">
								<div className="icon-wrapper p-2 rounded-sm hover:bg-slate-800 py-2 px-2">
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg">
										<g id="SVGRepo_bgCarrier" stroke-width="0" />

										<g
											id="SVGRepo_tracerCarrier"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>

										<g id="SVGRepo_iconCarrier">
											<path
												fill-rule="evenodd"
												clip-rule="evenodd"
												d="M21.593 10.943c.584.585.584 1.53 0 2.116L18.71 15.95c-.39.39-1.03.39-1.42 0a.996.996 0 0 1 0-1.41 9.552 9.552 0 0 1 1.689-1.345l.387-.242-.207-.206a10 10 0 0 1-2.24.254H8.998a1 1 0 1 1 0-2h7.921a10 10 0 0 1 2.24.254l.207-.206-.386-.241a9.562 9.562 0 0 1-1.69-1.348.996.996 0 0 1 0-1.41c.39-.39 1.03-.39 1.42 0l2.883 2.893zM14 16a1 1 0 0 0-1 1v1.5a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1.505a1 1 0 1 0 2 0V5.5A2.5 2.5 0 0 0 12.5 3h-7A2.5 2.5 0 0 0 3 5.5v13A2.5 2.5 0 0 0 5.5 21h7a2.5 2.5 0 0 0 2.5-2.5V17a1 1 0 0 0-1-1z"
												fill="#ffffff"
											/>
										</g>
									</svg>
								</div>
							</div>
						</button>
					</div>
				</div>
			</div>
			<div className="bottom-0 fixed bg-black text-white w-full h-[50px] flex sm:md:lg:hidden justify-evenly overflow-hidden z-10">
				<div className="hover:bg-slate-800 hover:rounded-sm cursor-pointer transition-all py-2 px-2">
					<Link href="/">
						<div className="icon-wrapper p-2 rounded-sm">
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								stroke="currentColor">
								<g id="SVGRepo_bgCarrier" stroke-width="0" />

								<g
									id="SVGRepo_tracerCarrier"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>

								<g id="SVGRepo_iconCarrier">
									{" "}
									<path
										d="M22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274"
										stroke="#ffffff"
										stroke-width="1.5"
										stroke-linecap="round"
									/>{" "}
									<path
										d="M15 18H9"
										stroke="#ffffff"
										stroke-width="1.5"
										stroke-linecap="round"
									/>{" "}
								</g>
							</svg>
						</div>
					</Link>
				</div>
				<div className="hover:bg-slate-800 hover:rounded-sm cursor-pointer transition-all px-2 py-2">
					<Link href="/transaction">
						<div className="icon-wrapper p-2 rounded-sm">
							<svg
								stroke="currentColor"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								width="22"
								height="22"
								fill="none"
								viewBox="0 0 24 24">
								<path
									stroke="currentColor"
									stroke-linecap="round"
									stroke-width="2"
									d="M8 7V6a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1M3 18v-7a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
								/>
							</svg>
						</div>
					</Link>
				</div>
				<div className="hover:bg-slate-800 hover:rounded-sm cursor-pointer transition-all px-2 py-2">
					<Link href="/setting">
						<div className="icon-wrapper p-2 rounded-sm">
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<g id="SVGRepo_bgCarrier" stroke-width="0" />

								<g
									id="SVGRepo_tracerCarrier"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>

								<g id="SVGRepo_iconCarrier">
									{" "}
									<path
										d="M7.84308 3.80211C9.8718 2.6007 10.8862 2 12 2C13.1138 2 14.1282 2.6007 16.1569 3.80211L16.8431 4.20846C18.8718 5.40987 19.8862 6.01057 20.4431 7C21 7.98943 21 9.19084 21 11.5937V12.4063C21 14.8092 21 16.0106 20.4431 17C19.8862 17.9894 18.8718 18.5901 16.8431 19.7915L16.1569 20.1979C14.1282 21.3993 13.1138 22 12 22C10.8862 22 9.8718 21.3993 7.84308 20.1979L7.15692 19.7915C5.1282 18.5901 4.11384 17.9894 3.55692 17C3 16.0106 3 14.8092 3 12.4063V11.5937C3 9.19084 3 7.98943 3.55692 7C4.11384 6.01057 5.1282 5.40987 7.15692 4.20846L7.84308 3.80211Z"
										stroke="#ffffff"
										stroke-width="1.5"
									/>{" "}
									<circle
										cx="12"
										cy="12"
										r="3"
										stroke="#ffffff"
										stroke-width="1.5"
									/>{" "}
								</g>
							</svg>
						</div>
					</Link>
				</div>
				<div className="hover:bg-slate-800 hover:rounded-sm cursor-pointer transition-all px-2 py-2">
					<button onClick={handleSignOut}>
						<div className="icon-wrapper p-2 rounded-sm">
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<g id="SVGRepo_bgCarrier" stroke-width="0" />

								<g
									id="SVGRepo_tracerCarrier"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>

								<g id="SVGRepo_iconCarrier">
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M21.593 10.943c.584.585.584 1.53 0 2.116L18.71 15.95c-.39.39-1.03.39-1.42 0a.996.996 0 0 1 0-1.41 9.552 9.552 0 0 1 1.689-1.345l.387-.242-.207-.206a10 10 0 0 1-2.24.254H8.998a1 1 0 1 1 0-2h7.921a10 10 0 0 1 2.24.254l.207-.206-.386-.241a9.562 9.562 0 0 1-1.69-1.348.996.996 0 0 1 0-1.41c.39-.39 1.03-.39 1.42 0l2.883 2.893zM14 16a1 1 0 0 0-1 1v1.5a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1.505a1 1 0 1 0 2 0V5.5A2.5 2.5 0 0 0 12.5 3h-7A2.5 2.5 0 0 0 3 5.5v13A2.5 2.5 0 0 0 5.5 21h7a2.5 2.5 0 0 0 2.5-2.5V17a1 1 0 0 0-1-1z"
										fill="#ffffff"
									/>
								</g>
							</svg>
						</div>
					</button>
				</div>
			</div>
		</>
	);
};

export default Navbar;
