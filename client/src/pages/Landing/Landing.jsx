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
					<div className="flex space-x-5 justify-evenly w-full mt-10">
						<div className="flex flex-col p-5 w-1/3">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								className="w-16 h-16 text-cardTile self-center">
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
								className="w-16 h-16 text-cardTile self-center">
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
								className="w-16 h-16 text-cardTile self-center">
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
				{/* <div className="h-2 bg-gradient-to-r from-card to-cardTile bg-opacity-50 rounded-xl w-full mt-24" /> */}
				<div className="mt-24">
					<div className="grid grid-cols-[400px_minmax(1100px,_2fr)]">
						<div className="flex justify-center self-center">
							<div>
								<h4 className="text-left text-xl font-bold leading-9 tracking-tight text-white">
									Do we have you sold?
								</h4>
								<button className="mt-5 flex w-full justify-center rounded-md bg-orange hover:bg-opacity-90 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
									<a href="/login">Let's get started!</a>
								</button>
							</div>
						</div>
						<div className="">
							<h4 className="mt-5 text-left text-2xl font-bold leading-9 tracking-tight text-white px-10">
								Streamline your wedding planning with these unique tools
							</h4>
							<div className="grid grid-cols-2 grid-rows-2 gap-y-10 mt-10 p-10">
								<div className="flex space-x-5">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										className="h-10 w-10 text-cardTile self-center justify-center">
										<path
											fillRule="evenodd"
											d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
											clipRule="evenodd"
										/>
										<path
											fillRule="evenodd"
											d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z"
											clipRule="evenodd"
										/>
									</svg>
									<p className="self-center justify-center text-justify text-sm leading-9 tracking-tight text-white">
										Venue Matchmaking: Find the location that makes your heart
										skip a beat faster than your first dance.
									</p>
								</div>
								<div className="flex space-x-5">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										className="h-10 w-10 text-cardTile self-center justify-center">
										<path d="m15 1.784-.796.795a1.125 1.125 0 1 0 1.591 0L15 1.784ZM12 1.784l-.796.795a1.125 1.125 0 1 0 1.591 0L12 1.784ZM9 1.784l-.796.795a1.125 1.125 0 1 0 1.591 0L9 1.784ZM9.75 7.547c.498-.021.998-.035 1.5-.042V6.75a.75.75 0 0 1 1.5 0v.755c.502.007 1.002.021 1.5.042V6.75a.75.75 0 0 1 1.5 0v.88l.307.022c1.55.117 2.693 1.427 2.693 2.946v1.018a62.182 62.182 0 0 0-13.5 0v-1.018c0-1.519 1.143-2.829 2.693-2.946l.307-.022v-.88a.75.75 0 0 1 1.5 0v.797ZM12 12.75c-2.472 0-4.9.184-7.274.54-1.454.217-2.476 1.482-2.476 2.916v.384a4.104 4.104 0 0 1 2.585.364 2.605 2.605 0 0 0 2.33 0 4.104 4.104 0 0 1 3.67 0 2.605 2.605 0 0 0 2.33 0 4.104 4.104 0 0 1 3.67 0 2.605 2.605 0 0 0 2.33 0 4.104 4.104 0 0 1 2.585-.364v-.384c0-1.434-1.022-2.7-2.476-2.917A49.138 49.138 0 0 0 12 12.75ZM21.75 18.131a2.604 2.604 0 0 0-1.915.165 4.104 4.104 0 0 1-3.67 0 2.605 2.605 0 0 0-2.33 0 4.104 4.104 0 0 1-3.67 0 2.605 2.605 0 0 0-2.33 0 4.104 4.104 0 0 1-3.67 0 2.604 2.604 0 0 0-1.915-.165v2.494c0 1.035.84 1.875 1.875 1.875h15.75c1.035 0 1.875-.84 1.875-1.875v-2.494Z" />
									</svg>

									<p className="self-center justify-center text-justify text-sm leading-9 tracking-tight text-white">
										Vendor Enchantment: Connect with vendors who turn your
										dreams into reality, without turning you into a bridezilla.
									</p>
								</div>
								<div className="flex space-x-5">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										className="h-10 w-10 text-cardTile self-center justify-center">
										<path
											fillRule="evenodd"
											d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 15Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H8.25Z"
											clipRule="evenodd"
										/>
										<path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
									</svg>

									<p className="self-center justify-center text-justify text-sm leading-9 tracking-tight text-white">
										Guest List Sorcery: Effortlessly manage RSVPs, seating
										charts, and dietary requests with a wave of our digital
										wand.
									</p>
								</div>
								<div className="flex space-x-5">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										className="h-10 w-10 text-cardTile self-center justify-center">
										<path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
										<path
											fillRule="evenodd"
											d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"
											clipRule="evenodd"
										/>
									</svg>

									<p className="self-center justify-center text-justify text-sm leading-9 tracking-tight text-white">
										Budget Magic: We sprinkle a little financial fairy dust to
										keep your budget on track, so you can splurge on what really
										matters (hello, honeymoon!).
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Landing;
