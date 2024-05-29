import React from "react";
import Navbar from "../../components/Navbar";
import ImageCarousel from "../../components/ImageCarousel";

const Landing = () => {
	return (
		<div>
			<div className="h-full min-h-screen mx-auto w-5/6">
				<div className="">
					<Navbar />
				</div>
				<div className="mt-24">
					<h4 className="mt-5 text-center text-3xl font-bold leading-9 tracking-tight text-white">
						No Panic at The Dholak!
					</h4>
				</div>
				<div className="grid grid-cols-[1100px_minmax(450px,_2fr)]">
					<div className="self-center justify-center p-10">
						<div className="justify-center ">
							<ImageCarousel images={[]} />
						</div>
					</div>
					<div className="ml-10 p-10 rounded-3xl self-center justify-center ">
						<h4 className="text-left text-2xl font-bold leading-9 tracking-tight text-white">
							Online Wedding Planning Assistant
						</h4>
						<p className="mt-12 text-justify text-sm leading-9 tracking-tight text-white">
							We'd rather see you lounging in your pajamas and sipping coffee while we
							do all the heavy lifting. From finding a venue that screams "us" to
							coordinating the perfect playlist that gets even the introverts grooving
							– we’ve got it all covered.
						</p>
						<div className="">
							<div className="mt-5">
								<h4 className="text-left text-xl font-bold leading-9 tracking-tight text-white">
									Are you a professional planner, vendor or venue? Start here:
								</h4>
								<button className="mt-5 flex w-full justify-center rounded-md bg-orange hover:bg-opacity-90 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
									<a href="#">Create Business Account</a>
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="mt-24">
					<h4 className="mt-5 text-center text-3xl font-bold leading-9 tracking-tight text-white">
						Why use a wedding planner?
					</h4>
					<div className="flex space-x-5 justify-evenly w-full">
						<div className="flex flex-col p-5 w-1/3">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								className="w-16 h-16 text-white self-center">
								<path d="M5.223 2.25c-.497 0-.974.198-1.325.55l-1.3 1.298A3.75 3.75 0 0 0 7.5 9.75c.627.47 1.406.75 2.25.75.844 0 1.624-.28 2.25-.75.626.47 1.406.75 2.25.75.844 0 1.623-.28 2.25-.75a3.75 3.75 0 0 0 4.902-5.652l-1.3-1.299a1.875 1.875 0 0 0-1.325-.549H5.223Z" />
								<path
									fillRule="evenodd"
									d="M3 20.25v-8.755c1.42.674 3.08.673 4.5 0A5.234 5.234 0 0 0 9.75 12c.804 0 1.568-.182 2.25-.506a5.234 5.234 0 0 0 2.25.506c.804 0 1.567-.182 2.25-.506 1.42.674 3.08.675 4.5.001v8.755h.75a.75.75 0 0 1 0 1.5H2.25a.75.75 0 0 1 0-1.5H3Zm3-6a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75v-3Zm8.25-.75a.75.75 0 0 0-.75.75v5.25c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-5.25a.75.75 0 0 0-.75-.75h-3Z"
									clipRule="evenodd"
								/>
							</svg>

							<p className="mt-12 text-justify text-sm leading-9 tracking-tight text-white">
								Planning a wedding can feel like juggling flaming torches while
								riding a unicycle. Enter the online wedding planner – your digital
								fairy godmother! This all-in-one marvel handles everything from
								venues to vendors, flowers to favors.
							</p>
						</div>
						<div className="flex flex-col p-5 w-1/3">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								className="w-16 h-16 text-white self-center">
								<path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
							</svg>

							<p className="mt-12 text-justify text-sm leading-9 tracking-tight text-white">
								Need to coordinate with your caterer, DJ, and friends all at once?
								No problem! It's like having a personal assistant who never sleeps,
								never forgets, and always knows where you left the seating chart
							</p>
						</div>
						<div className="flex flex-col p-5 w-1/3">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								className="w-16 h-16 text-white self-center">
								<path
									fillRule="evenodd"
									d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 18.375V5.625Zm1.5 0v1.5c0 .207.168.375.375.375h1.5a.375.375 0 0 0 .375-.375v-1.5a.375.375 0 0 0-.375-.375h-1.5A.375.375 0 0 0 3 5.625Zm16.125-.375a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h1.5A.375.375 0 0 0 21 7.125v-1.5a.375.375 0 0 0-.375-.375h-1.5ZM21 9.375A.375.375 0 0 0 20.625 9h-1.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h1.5a.375.375 0 0 0 .375-.375v-1.5Zm0 3.75a.375.375 0 0 0-.375-.375h-1.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h1.5a.375.375 0 0 0 .375-.375v-1.5Zm0 3.75a.375.375 0 0 0-.375-.375h-1.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h1.5a.375.375 0 0 0 .375-.375v-1.5ZM4.875 18.75a.375.375 0 0 0 .375-.375v-1.5a.375.375 0 0 0-.375-.375h-1.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h1.5ZM3.375 15h1.5a.375.375 0 0 0 .375-.375v-1.5a.375.375 0 0 0-.375-.375h-1.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375Zm0-3.75h1.5a.375.375 0 0 0 .375-.375v-1.5A.375.375 0 0 0 4.875 9h-1.5A.375.375 0 0 0 3 9.375v1.5c0 .207.168.375.375.375Zm4.125 0a.75.75 0 0 0 0 1.5h9a.75.75 0 0 0 0-1.5h-9Z"
									clipRule="evenodd"
								/>
							</svg>

							<p className="mt-12 text-justify text-sm leading-9 tracking-tight text-white">
								Join the Dholak community today, and let’s conjure up a wedding
								that’s uniquely you, minus the stress and plus all the fun. Say "I
								do" to stress-free planning and let the online wedding planner turn
								your big day into a flawless fairytale!
							</p>
						</div>
					</div>
				</div>
				<div className="mt-10">
					<h4 className="mt-5 text-center text-3xl font-bold leading-9 tracking-tight text-white">
						Dholak Features
					</h4>
				</div>
			</div>
		</div>
	);
};

export default Landing;
