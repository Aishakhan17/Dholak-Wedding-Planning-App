import React from "react";
import Navbar from "../../components/Navbar";
import ImageCarousel from "../../components/ImageCarousel";

const Landing = () => {
	return (
		<div className="h-full min-h-screen mx-auto w-5/6">
			<Navbar />
			<div className="mt-24">
				{/* <h4 className="mt-5 text-center text-3xl font-bold leading-9 tracking-tight text-white">
					No Panic at The Dholak!
				</h4> */}
			</div>
			<div className="grid grid-cols-[450px_minmax(450px,_2fr)] gap-x-5 gap-y-10">
				<div className="ml-10 bg-foreground bg-opacity-90 p-5 rounded-3xl">
					<h4 className="mt-12 text-left text-2xl font-bold leading-9 tracking-tight text-white">
						Online Wedding Planning Assistant
					</h4>
					<p className="mt-12 text-justify text-sm leading-9 tracking-tight text-white">
						We'd rather see you lounging in your pajamas and sipping coffee while we do
						all the heavy lifting. From finding a venue that screams "us" to
						coordinating the perfect playlist that gets even your phupho grooving –
						we’ve got it all covered.
					</p>
					<div className="mt-12">
						<h4 className="text-left text-xl font-bold leading-9 tracking-tight text-white">
							Are you a professional planner, vendor or venue? Start here:
						</h4>
						<button className="mt-5 flex w-full justify-center rounded-md bg-orange hover:bg-opacity-90 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
							<a href="#">Create Business Account</a>
						</button>
					</div>
				</div>
				<div className="mt-19">
					<div className="mt-10 justify-center ">
						<ImageCarousel images={[]} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Landing;
