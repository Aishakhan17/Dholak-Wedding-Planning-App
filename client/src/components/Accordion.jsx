import React, { useState, useEffect } from "react";
import { Buffer } from "buffer";

const Accordion = ({ title, data }) => {
	const [accordionOpen, setAccordionOpen] = useState(false);
	var name = "";
	var cover = "";
	var image = "";

	return (
		<div className="ml-2 py-2">
			<div className="flex space-x-5">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-6 h-6 text-white self-center justify-center">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
					/>
				</svg>
				<button
					onClick={() => setAccordionOpen(!accordionOpen)}
					className=" ml-2 flex justify-between w-full">
					<span className="text-sm font-bold leading-9 tracking-tight text-white">
						{title}
					</span>
					<svg
						className="fill-white shrink-0 self-center justify-center"
						width="16"
						height="16"
						xmlns="http://www.w3.org/2000/svg">
						<rect
							y="7"
							width="16"
							height="2"
							rx="1"
							className={`transform origin-center transition duration-200 ease-out ${
								accordionOpen && "!rotate-180"
							}`}
						/>
						<rect
							y="7"
							width="16"
							height="2"
							rx="1"
							className={`transform origin-center rotate-90 transition duration-200 ease-out ${
								accordionOpen && "!rotate-180"
							}`}
						/>
					</svg>
				</button>
			</div>
			<div
				className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm ${
					accordionOpen
						? "grid-rows-[1fr] opacity-100 h-content"
						: "grid-rows-[0fr] opacity-0 h-1"
				}`}>
				<div>
					{Object.keys(data).map((i, j) => {
						if (data[i].cover !== undefined) {
							cover = Buffer.from(data[i].cover.data.data, "binary").toString(
								"base64"
							);
						}
						if (data[i]["title"] !== undefined) {
							name = data[i]["title"];
						}
						let id = data[i]._id;
						return (
							<div
								className="mt-2 overflow-hidden w-full flex justify-start"
								key={j}>
								<img
									src={"data:image/jpg;base64," + cover}
									className="h-8 w-8 self-center justify-center"
								/>
								<a
									href={`/board/${id}`}
									className="p-3 ml-2 justify-center self-center flow-root text-sm leading-9 tracking-tight text-white">
									{name}
								</a>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Accordion;
