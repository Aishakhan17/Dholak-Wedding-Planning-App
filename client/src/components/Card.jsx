import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Buffer } from "buffer";
import AddMembers from "./AddMembers";

const Card = ({ cardTitle, listTitle, listId, boardId, participants }) => {
	function EditInactiveIcon(props) {
		return (
			<svg
				{...props}
				viewBox="0 0 20 20"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M4 13V16H7L16 7L13 4L4 13Z"
					fill="#EDE9FE"
					stroke="#A78BFA"
					strokeWidth="2"
				/>
			</svg>
		);
	}

	function EditActiveIcon(props) {
		return (
			<svg
				{...props}
				viewBox="0 0 20 20"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M4 13V16H7L16 7L13 4L4 13Z"
					fill="#8B5CF6"
					stroke="#C4B5FD"
					strokeWidth="2"
				/>
			</svg>
		);
	}

	function DuplicateInactiveIcon(props) {
		return (
			<svg
				{...props}
				viewBox="0 0 20 20"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M4 4H12V12H4V4Z"
					fill="#EDE9FE"
					stroke="#A78BFA"
					strokeWidth="2"
				/>
				<path
					d="M8 8H16V16H8V8Z"
					fill="#EDE9FE"
					stroke="#A78BFA"
					strokeWidth="2"
				/>
			</svg>
		);
	}

	function DuplicateActiveIcon(props) {
		return (
			<svg
				{...props}
				viewBox="0 0 20 20"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M4 4H12V12H4V4Z"
					fill="#8B5CF6"
					stroke="#C4B5FD"
					strokeWidth="2"
				/>
				<path
					d="M8 8H16V16H8V8Z"
					fill="#8B5CF6"
					stroke="#C4B5FD"
					strokeWidth="2"
				/>
			</svg>
		);
	}

	function ArchiveInactiveIcon(props) {
		return (
			<svg
				{...props}
				viewBox="0 0 20 20"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<rect
					x="5"
					y="8"
					width="10"
					height="8"
					fill="#EDE9FE"
					stroke="#A78BFA"
					strokeWidth="2"
				/>
				<rect
					x="4"
					y="4"
					width="12"
					height="4"
					fill="#EDE9FE"
					stroke="#A78BFA"
					strokeWidth="2"
				/>
				<path
					d="M8 12H12"
					stroke="#A78BFA"
					strokeWidth="2"
				/>
			</svg>
		);
	}

	function ArchiveActiveIcon(props) {
		return (
			<svg
				{...props}
				viewBox="0 0 20 20"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<rect
					x="5"
					y="8"
					width="10"
					height="8"
					fill="#8B5CF6"
					stroke="#C4B5FD"
					strokeWidth="2"
				/>
				<rect
					x="4"
					y="4"
					width="12"
					height="4"
					fill="#8B5CF6"
					stroke="#C4B5FD"
					strokeWidth="2"
				/>
				<path
					d="M8 12H12"
					stroke="#A78BFA"
					strokeWidth="2"
				/>
			</svg>
		);
	}

	function MoveInactiveIcon(props) {
		return (
			<svg
				{...props}
				viewBox="0 0 20 20"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M10 4H16V10"
					stroke="#A78BFA"
					strokeWidth="2"
				/>
				<path
					d="M16 4L8 12"
					stroke="#A78BFA"
					strokeWidth="2"
				/>
				<path
					d="M8 6H4V16H14V12"
					stroke="#A78BFA"
					strokeWidth="2"
				/>
			</svg>
		);
	}

	function MoveActiveIcon(props) {
		return (
			<svg
				{...props}
				viewBox="0 0 20 20"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M10 4H16V10"
					stroke="#C4B5FD"
					strokeWidth="2"
				/>
				<path
					d="M16 4L8 12"
					stroke="#C4B5FD"
					strokeWidth="2"
				/>
				<path
					d="M8 6H4V16H14V12"
					stroke="#C4B5FD"
					strokeWidth="2"
				/>
			</svg>
		);
	}

	function DeleteInactiveIcon(props) {
		return (
			<svg
				{...props}
				viewBox="0 0 20 20"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<rect
					x="5"
					y="6"
					width="10"
					height="10"
					fill="#EDE9FE"
					stroke="#A78BFA"
					strokeWidth="2"
				/>
				<path
					d="M3 6H17"
					stroke="#A78BFA"
					strokeWidth="2"
				/>
				<path
					d="M8 6V4H12V6"
					stroke="#A78BFA"
					strokeWidth="2"
				/>
			</svg>
		);
	}

	function DeleteActiveIcon(props) {
		return (
			<svg
				{...props}
				viewBox="0 0 20 20"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<rect
					x="5"
					y="6"
					width="10"
					height="10"
					fill="#8B5CF6"
					stroke="#C4B5FD"
					strokeWidth="2"
				/>
				<path
					d="M3 6H17"
					stroke="#C4B5FD"
					strokeWidth="2"
				/>
				<path
					d="M8 6V4H12V6"
					stroke="#C4B5FD"
					strokeWidth="2"
				/>
			</svg>
		);
	}
	return (
		<div className="bg-card h-full min-h-fit z-1000">
			<div className="flex flex-row space-x-10 p-2">
				<div className="w-9/12 p-5 ml-5">
					<h1 className="text-2xl font-bold leading-9 tracking-tight text-white self-center p-1">
						{cardTitle}
					</h1>
					<p className="text-sm leading-9 tracking-tight text-white self-center p-1">
						in list{" "}
						<a
							href={`/board/${boardId}`}
							className="font-bold">
							{listTitle}
						</a>
					</p>
					<h4 className="text-sm font-bold leading-9 tracking-tight text-white self-center p-1">
						Activity
					</h4>
					<div className="">
						<form>
							<input
								type="text"
								className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6"
								placeholder="Add a comment"
							/>
							<button
								type="submit"
								className="mt-2 text-white bg-cardTile hover:bg-opacity-90 w-2/5 p-1 text-center justify-center self-center rounded-md">
								Post
							</button>
						</form>
					</div>
				</div>
				<div className="w-3/12 p-5">
					<h4 className="text-sm font-bold leading-9 tracking-tight text-white self-center p-1">
						Add to Card
					</h4>
					{/* <p className="bg-cardTile bg-opacity-50 rounded-md text-sm leading-9 tracking-tight text-white self-center p-1">
						Members
					</p>
					<p className="bg-cardTile bg-opacity-50 rounded-md text-sm leading-9 tracking-tight text-white self-center p-1">
						Label
					</p>
					<p className="bg-cardTile bg-opacity-50 rounded-md text-sm leading-9 tracking-tight text-white self-center p-1">
						Checklist
					</p> */}
					<div className="fixed w-40 flex flex-col">
						<Menu
							as="div"
							className="relative inline-block text-left mt-5">
							<div>
								<Menu.Button className="inline-flex w-full justify-center rounded-md bg-cardTile px-4 py-2 text-sm font-medium text-white hover:bg-opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
									Members
									<ChevronDownIcon
										className="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100"
										aria-hidden="true"
									/>
								</Menu.Button>
							</div>
							<Transition
								as={Fragment}
								enter="transition ease-out duration-100"
								enterFrom="transform opacity-0 scale-95"
								enterTo="transform opacity-100 scale-100"
								leave="transition ease-in duration-75"
								leaveFrom="transform opacity-100 scale-100"
								leaveTo="transform opacity-0 scale-95">
								<Menu.Items className="relative mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
									<div className="px-1 py-1 ">
										<Menu.Item>
											{({ active }) => (
												<button
													className={`${
														active
															? "bg-card text-white"
															: "text-gray-900"
													}
                                                     group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
													{active ? (
														<EditActiveIcon
															className="mr-2 h-5 w-5"
															aria-hidden="true"
														/>
													) : (
														<EditInactiveIcon
															className="mr-2 h-5 w-5"
															aria-hidden="true"
														/>
													)}
													Add Members
												</button>
											)}
										</Menu.Item>
										<hr />
										{Object.keys(participants).map((i, j) => {
											let image;
											if (participants[i].image) {
												image = Buffer.from(
													participants[i].image.data,
													"binary"
												).toString("base64");
											}
											return (
												<div
													key={j}
													className="mt-1">
													<div className="flex flex-row self-center justify-between p-1">
														<div className="flex justify-start">
															{image ? (
																<img
																	className="object-cover h-8 w-8 rounded-full self-center justify-center"
																	src={
																		"data:image/jpg/jpeg/png;base64," +
																		image
																	}
																/>
															) : (
																<img
																	className="h-8 w-8 rounded-full object-cover self-center justify-center"
																	src={`https://ui-avatars.com/api/?name=${participants[i].firstName}+${participants[i].lastName}`}
																/>
															)}
															<div className="self-center justify-center">
																<li className="flow-root text-left ml-2 text-sm leading-9 tracking-tight text-white">
																	<a
																		href={`/profile/${participants[i]._id}`}>
																		{participants[i].firstName}{" "}
																		{participants[i].lastName}
																	</a>
																</li>
															</div>
														</div>
														<div className="self-center justify-center">
															<button className="self-center justify-center">
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	fill="none"
																	viewBox="0 0 24 24"
																	strokeWidth={1.5}
																	stroke="currentColor"
																	className="w-4 h-4 text-white self-center justify-center">
																	<path
																		strokeLinecap="round"
																		strokeLinejoin="round"
																		d="M6 18 18 6M6 6l12 12"
																	/>
																</svg>
															</button>
														</div>
													</div>
												</div>
											);
										})}
									</div>
								</Menu.Items>
							</Transition>
						</Menu>
						<Menu
							as="div"
							className="relative inline-block text-left mt-5">
							<div>
								<Menu.Button className="inline-flex w-full justify-center rounded-md bg-cardTile px-4 py-2 text-sm font-medium text-white hover:bg-opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
									Label
									<ChevronDownIcon
										className="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100"
										aria-hidden="true"
									/>
								</Menu.Button>
							</div>
							<Transition
								as={Fragment}
								enter="transition ease-out duration-100"
								enterFrom="transform opacity-0 scale-95"
								enterTo="transform opacity-100 scale-100"
								leave="transition ease-in duration-75"
								leaveFrom="transform opacity-100 scale-100"
								leaveTo="transform opacity-0 scale-95">
								<Menu.Items className="relative mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
									<div className="px-1 py-1 ">
										<Menu.Item>
											{({ active }) => (
												<button
													className={`${
														active
															? "bg-card text-white"
															: "text-gray-900"
													} group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
													{active ? (
														<EditActiveIcon
															className="mr-2 h-5 w-5"
															aria-hidden="true"
														/>
													) : (
														<EditInactiveIcon
															className="mr-2 h-5 w-5"
															aria-hidden="true"
														/>
													)}
													Edit
												</button>
											)}
										</Menu.Item>
									</div>
								</Menu.Items>
							</Transition>
						</Menu>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
