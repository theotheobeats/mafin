import Link from "next/link";
import React from "react";

const Navbar = () => {

	return (
		<>
			<div className="hidden sm:md:lg:h-screen sm:md:lg:w-[80px] bg-black text-white sm:md:lg:flex sm:md:lg:flex-col justify-between">
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
										width="20" // Adjust width and height as needed
										height="20"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
										fill="currentColor"
										stroke="currentColor">
										<g id="SVGRepo_bgCarrier" strokeWidth="0" />
										<g
											id="SVGRepo_tracerCarrier"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<g id="SVGRepo_iconCarrier">
											<path d="M17.0020048,13 C17.5542895,13 18.0020048,13.4477153 18.0020048,14 C18.0020048,14.5128358 17.6159646,14.9355072 17.1186259,14.9932723 L17.0020048,15 L5.41700475,15 L8.70911154,18.2928932 C9.0695955,18.6533772 9.09732503,19.2206082 8.79230014,19.6128994 L8.70911154,19.7071068 C8.34862757,20.0675907 7.78139652,20.0953203 7.38910531,19.7902954 L7.29489797,19.7071068 L2.29489797,14.7071068 C1.69232289,14.1045317 2.07433707,13.0928192 2.88837381,13.0059833 L3.00200475,13 L17.0020048,13 Z M16.6128994,4.20970461 L16.7071068,4.29289322 L21.7071068,9.29289322 C22.3096819,9.8954683 21.9276677,10.9071808 21.1136309,10.9940167 L21,11 L7,11 C6.44771525,11 6,10.5522847 6,10 C6,9.48716416 6.38604019,9.06449284 6.88337887,9.00672773 L7,9 L18.585,9 L15.2928932,5.70710678 C14.9324093,5.34662282 14.9046797,4.77939176 15.2097046,4.38710056 L15.2928932,4.29289322 C15.6533772,3.93240926 16.2206082,3.90467972 16.6128994,4.20970461 Z" />
										</g>
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
						<Link href="/sign-out">
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
						</Link>
					</div>
				</div>
			</div>
			<div className="bottom-0 absolute bg-black text-white w-full h-[50px] flex sm:md:lg:hidden justify-evenly overflow-hidden">
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
								width="20" // Adjust width and height as needed
								height="20"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								stroke="currentColor">
								<g id="SVGRepo_bgCarrier" strokeWidth="0" />
								<g
									id="SVGRepo_tracerCarrier"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<g id="SVGRepo_iconCarrier">
									<path d="M17.0020048,13 C17.5542895,13 18.0020048,13.4477153 18.0020048,14 C18.0020048,14.5128358 17.6159646,14.9355072 17.1186259,14.9932723 L17.0020048,15 L5.41700475,15 L8.70911154,18.2928932 C9.0695955,18.6533772 9.09732503,19.2206082 8.79230014,19.6128994 L8.70911154,19.7071068 C8.34862757,20.0675907 7.78139652,20.0953203 7.38910531,19.7902954 L7.29489797,19.7071068 L2.29489797,14.7071068 C1.69232289,14.1045317 2.07433707,13.0928192 2.88837381,13.0059833 L3.00200475,13 L17.0020048,13 Z M16.6128994,4.20970461 L16.7071068,4.29289322 L21.7071068,9.29289322 C22.3096819,9.8954683 21.9276677,10.9071808 21.1136309,10.9940167 L21,11 L7,11 C6.44771525,11 6,10.5522847 6,10 C6,9.48716416 6.38604019,9.06449284 6.88337887,9.00672773 L7,9 L18.585,9 L15.2928932,5.70710678 C14.9324093,5.34662282 14.9046797,4.77939176 15.2097046,4.38710056 L15.2928932,4.29289322 C15.6533772,3.93240926 16.2206082,3.90467972 16.6128994,4.20970461 Z" />
								</g>
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
					<Link href="/sign-out">
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
					</Link>
				</div>
			</div>
		</>
	);
};

export default Navbar;
