import { Fragment, useState } from "react";
import { Dialog, Popover, Tab, Transition, Menu } from "@headlessui/react";
import { Bars3Icon, BellIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logo.png";
import noImg from "../assets/noImg.png";
import { useUpdate } from "../utils/Context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { initUser } from "../utils/Context";
import axios from "axios";
import Popup from "reactjs-popup";
import BoardForm from "./BoardForm";
import { Buffer } from "buffer";

const navigation = {
	categories: [
		{
			id: "artists",
			name: "Trending Artists",
			featured: [
				{
					name: "New collections that have us drooling",
					href: "#",
					imageSrc:
						"https://ranosheirlooms.com/wp-content/uploads/2022/12/Shop-by-Collection-Banaras.webp",
					imageAlt: "Models in a bridal dress",
				},
				{
					name: "Makeup looks that have us obsessed",
					href: "#",
					imageSrc:
						"https://i.pinimg.com/564x/e3/cf/b4/e3cfb45f0b5c24f6828b1a90981dae52.jpg",
					imageAlt: "A subcontinental bride",
				},
			],
			sections: [
				{
					id: "designers",
					name: "Designers",
					items: [
						{ name: "Zuria Dor", href: "#" },
						{ name: "Fahad Husayn", href: "#" },
						{ name: "Mohsin Naveed Ranjha", href: "#" },
						{ name: "Ali Xeeshan", href: "#" },
						{ name: "Elan", href: "#" },
						{ name: "Farah Talib Aziz", href: "#" },
						{ name: "Rano" + "'s Heirlooms", href: "#" },
						{ name: "HSY", href: "#" },
						{ name: "Nomi Ansari", href: "#" },
						{ name: "Browse All", href: "#" },
					],
				},
				{
					id: "accessories",
					name: "Accessories",
					items: [
						{ name: "Jewellery", href: "#" },
						{ name: "Shoes", href: "#" },
						{ name: "Cosmetics", href: "#" },
						{ name: "Sunglasses", href: "#" },
						{ name: "Hats", href: "#" },
						{ name: "Belts", href: "#" },
					],
				},
				{
					id: "mua",
					name: "MUAs",
					items: [
						{ name: "Maram Abroo", href: "#" },
						{ name: "Makeup by Sehrish", href: "#" },
						{ name: "Numra" + "'s Makeup Studio", href: "#" },
						{ name: "Toni & Guy", href: "#" },
						{ name: "Makeup by Sameera", href: "#" },
					],
				},
			],
		},
		{
			id: "Vendors",
			name: "Vendors",
			featured: [
				{
					name: "Trending Rentals",
					href: "#",
					imageSrc:
						"https://i.pinimg.com/564x/ef/8f/b7/ef8fb78f5e7097e78612d2dbb0a342f0.jpg",
					imageAlt: "Picture of a trending wedding rental",
				},
				{
					name: "Hot Decor",
					href: "#",
					imageSrc:
						"https://i.pinimg.com/564x/38/b2/2e/38b22ec1e35caf7c1122d7da91e795a2.jpg",
					imageAlt:
						"Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
				},
			],
			sections: [
				{
					id: "rentals",
					name: "Rentals",
					items: [
						{ name: "Tops", href: "#" },
						{ name: "Pants", href: "#" },
						{ name: "Sweaters", href: "#" },
						{ name: "T-Shirts", href: "#" },
						{ name: "Jackets", href: "#" },
						{ name: "Activewear", href: "#" },
						{ name: "Browse All", href: "#" },
					],
				},
				{
					id: "photographers",
					name: "Photographers",
					items: [
						{ name: "Watches", href: "#" },
						{ name: "Wallets", href: "#" },
						{ name: "Bags", href: "#" },
						{ name: "Sunglasses", href: "#" },
						{ name: "Hats", href: "#" },
						{ name: "Belts", href: "#" },
					],
				},
				{
					id: "decor",
					name: "Decor",
					items: [
						{ name: "Re-Arranged", href: "#" },
						{ name: "Counterfeit", href: "#" },
						{ name: "Full Nelson", href: "#" },
						{ name: "My Way", href: "#" },
					],
				},
				{
					id: "invites",
					name: "Invites",
					items: [
						{ name: "Re-Arranged", href: "#" },
						{ name: "Counterfeit", href: "#" },
						{ name: "Full Nelson", href: "#" },
						{ name: "My Way", href: "#" },
					],
				},
				{
					id: "food",
					name: "Food",
					items: [
						{ name: "Re-Arranged", href: "#" },
						{ name: "Counterfeit", href: "#" },
						{ name: "Full Nelson", href: "#" },
						{ name: "My Way", href: "#" },
					],
				},
			],
		},
	],
	pages: [
		// { name: "Testimonials", href: "/testimonials" },
		{ name: "Home", href: "/home" },
	],
};

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
	const [open, setOpen] = useState(false);
	const { user, isAuthenticated, updateAuth, updateUser } = useUpdate();
	const [image, setImage] = useState("");
	const navigate = useNavigate();
	// console.log("navbar user", user);
	const contentStyle = {
		width: "33%",
		marginLeft: "auto",
		marginRight: "auto",
		opacity: "97%",
	};

	let userId;
	if (isAuthenticated) {
		userId = user.data.id;
	}

	useEffect(() => {
		let isCancelled = false;
		if (!isCancelled) {
			const profilePicture = getProfilePicture();
			profilePicture.then((profilePicture) => console.log("profilePicture", profilePicture));
			profilePicture.then((profilePicture) => {
				profilePicture.data.data !== undefined
					? setImage(Buffer.from(profilePicture.data.data, "binary").toString("base64"))
					: setImage("");
			});
		}
		return () => {
			isCancelled = true;
		};
	}, []);

	const getProfilePicture = async () => {
		let picture = await axios.post(
			`${process.env.REACT_APP_API_URL}/users/get-profile-picture`,
			{
				userId,
			}
		);
		if (!picture.data.error) {
			return picture;
		}
	};
	const logout = async () => {
		//add functionality to delete session data when logout
		let endSession = await axios
			.get(
				`${process.env.REACT_APP_API_URL}/auth/logout`,
				{
					withCredentials: true,
				},
				{
					crossdomain: true,
				},
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			)
			.then((endSession) => console.log("endSession", endSession))
			.then(() => updateAuth(false))
			.then(() => updateAuth(false))
			.then(() => updateUser(initUser))
			.then(() => console.log("logged out"));
		if (endSession) {
			navigate("/");
		}
	};

	let notifications = {};
	// async function getNotifications(currentUser) {

	// }

	let messages = {};

	async function getMessages() {}
	console.log("userImage", image);
	return (
		<div className="bg-background bg-opacity-20 z-20 sticky w-full">
			{" "}
			{/*absolute z-20*/}
			{/* Mobile menu */}
			<Transition.Root
				show={open}
				as={Fragment}>
				<Dialog
					as="div"
					className="relative z-40 lg:hidden"
					onClose={setOpen}>
					<Transition.Child
						as={Fragment}
						enter="transition-opacity ease-linear duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition-opacity ease-linear duration-300"
						leaveFrom="opacity-100"
						leaveTo="opacity-0">
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div className="fixed inset-0 z-40 flex">
						<Transition.Child
							as={Fragment}
							enter="transition ease-in-out duration-300 transform"
							enterFrom="-translate-x-full"
							enterTo="translate-x-0"
							leave="transition ease-in-out duration-300 transform"
							leaveFrom="translate-x-0"
							leaveTo="-translate-x-full">
							<Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white bg-opacity-90 pb-12 shadow-xl">
								<div className="flex px-4 pb-2 pt-5">
									<button
										type="button"
										className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-white"
										onClick={() => setOpen(false)}>
										<span className="absolute -inset-0.5" />
										<span className="sr-only">Close menu</span>
										<XMarkIcon
											className="h-6 w-6"
											aria-hidden="true"
										/>
									</button>
								</div>

								{/* Links */}
								{isAuthenticated ? (
									<div>
										<Tab.Group
											as="div"
											className="mt-2">
											<div className="border-b border-backrgound">
												<Tab.List className="-mb-px flex space-x-8 px-4">
													{navigation.categories.map((category) => (
														<Tab
															key={category.name}
															className={({ selected }) =>
																classNames(
																	selected
																		? " text-orange"
																		: "border-transparent text-foreground",
																	"flex-1 whitespace-nowrap border-b px-1 py-4 text-base font-medium"
																)
															}>
															{category.name}
														</Tab>
													))}
												</Tab.List>
											</div>
											<Tab.Panels as={Fragment}>
												{navigation.categories.map((category) => (
													<Tab.Panel
														key={category.name}
														className="space-y-10 px-4 pb-8 pt-10">
														<div className="grid grid-cols-2 gap-x-4">
															{category.featured.map((item) => (
																<div
																	key={item.name}
																	className="group relative text-sm">
																	<div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
																		<img
																			src={item.imageSrc}
																			alt={item.imageAlt}
																			className="object-cover object-center opacity-95"
																		/>
																	</div>
																	<a
																		href={item.href}
																		className="mt-6 block font-medium text-foreground hover:text-foreground">
																		<span
																			className="absolute inset-0 z-10"
																			aria-hidden="true"
																		/>
																		{item.name}
																	</a>
																	<p
																		aria-hidden="true"
																		className="mt-1 text-orange">
																		<strong>View now</strong>
																	</p>
																</div>
															))}
														</div>
														{category.sections.map((section) => (
															<div key={section.name}>
																<p
																	id={`${category.id}-${section.id}-heading-mobile`}
																	className="font-medium text-foreground hover:text-orange">
																	{section.name}
																</p>
																<ul
																	role="list"
																	aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
																	className="mt-6 flex flex-col space-y-6">
																	{section.items.map((item) => (
																		<li
																			key={item.name}
																			className="flow-root">
																			<a
																				href={item.href}
																				className="-m-2 block p-2 text-gray-800">
																				{item.name}
																			</a>
																		</li>
																	))}
																</ul>
															</div>
														))}
													</Tab.Panel>
												))}
											</Tab.Panels>
										</Tab.Group>

										<div className="space-y-6 border-t border-foreground px-4 py-6">
											{navigation.pages.map((page) => (
												<div
													key={page.name}
													className="flow-root">
													<a
														href={page.href}
														className="-m-2 block p-2 font-medium text-foreground">
														{page.name}
													</a>
												</div>
											))}
										</div>
									</div>
								) : (
									<div>
										<div className="space-y-6 border-t border-foreground px-4 py-6">
											<div className="flow-root">
												<a
													href="/login"
													className="-m-2 block p-2 font-medium text-foreground hover:text-cardTile">
													Sign in
												</a>
											</div>
											<div className="flow-root">
												<a
													href="/signup"
													className="-m-2 block p-2 font-medium text-foreground hover:text-cardTile">
													Create account
												</a>
											</div>
										</div>
									</div>
								)}
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition.Root>
			{/* //desktop menu */}
			<header className="relative bg-transparent">
				<nav
					aria-label="Top"
					className="mx-auto w-full px-4 sm:px-6 lg:px-8 lg:w-full md:w-full sm:w-full">
					<div>
						<div className="flex h-16 items-center">
							<button
								type="button"
								className="relative rounded-md bg-white p-2 text-foreground lg:hidden"
								onClick={() => setOpen(true)}>
								<span className="absolute -inset-0.5" />
								<span className="sr-only">Open menu</span>
								<Bars3Icon
									className="h-6 w-6"
									aria-hidden="true"
								/>
							</button>

							{/* Logo */}
							<div className="ml-4 flex lg:ml-0">
								<a href="/home">
									<span className="sr-only">Your Company</span>
									<img
										className="h-10 w-auto"
										src={logo}
										alt=""
									/>
								</a>
							</div>
							{isAuthenticated ? (
								<>
									<Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
										<div className="flex h-full space-x-8">
											{navigation.categories.map((category) => (
												<Popover
													key={category.name}
													className="flex">
													{({ open }) => (
														<>
															<div className="relative flex">
																<Popover.Button
																	className={classNames(
																		open
																			? "border-orange text-cardTile"
																			: " text-white hover:text-opacity-50",
																		"relative z-10 -mb-px flex items-center pt-px text-sm font-medium transition-colors duration-200 ease-out"
																	)}>
																	{category.name}
																</Popover.Button>
															</div>

															<Transition
																as={Fragment}
																enter="transition ease-out duration-200"
																enterFrom="opacity-0"
																enterTo="opacity-100"
																leave="transition ease-in duration-150"
																leaveFrom="opacity-100"
																leaveTo="opacity-0">
																<Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
																	<div
																		className="absolute inset-0 top-1/2 bg-gray-800 shadow"
																		aria-hidden="true"
																	/>

																	<div className="relative bg-white bg-opacity-90">
																		<div className="mx-auto max-w-7xl px-8">
																			<div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
																				<div className="col-start-2 grid grid-cols-2 gap-x-8">
																					{category.featured.map(
																						(item) => (
																							<div
																								key={
																									item.name
																								}
																								className="group relative text-base sm:text-sm">
																								<div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
																									<img
																										src={
																											item.imageSrc
																										}
																										alt={
																											item.imageAlt
																										}
																										className="object-cover object-center opacity-95"
																									/>
																								</div>
																								<a
																									href={
																										item.href
																									}
																									className="mt-6 block font-medium text-gray-800">
																									<span
																										className="absolute inset-0 z-10"
																										aria-hidden="true"
																									/>
																									{
																										item.name
																									}
																								</a>
																								<p
																									aria-hidden="true"
																									className="mt-1 text-orange">
																									<strong>
																										View
																										now
																									</strong>
																								</p>
																							</div>
																						)
																					)}
																				</div>
																				<div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
																					{category.sections.map(
																						(
																							section
																						) => (
																							<div
																								key={
																									section.name
																								}>
																								<p
																									id={`${section.name}-heading`}
																									className="font-medium text-gray-800 hover:text-orange">
																									<strong>
																										{
																											section.name
																										}
																									</strong>
																								</p>
																								<ul
																									role="list"
																									aria-labelledby={`${section.name}-heading`}
																									className="mt-6 space-y-6 sm:mt-4 sm:space-y-4">
																									{section.items.map(
																										(
																											item
																										) => (
																											<li
																												key={
																													item.name
																												}
																												className="flex">
																												<a
																													href={
																														item.href
																													}
																													className="hover:text-orange">
																													{
																														item.name
																													}
																												</a>
																											</li>
																										)
																									)}
																								</ul>
																							</div>
																						)
																					)}
																				</div>
																			</div>
																		</div>
																	</div>
																</Popover.Panel>
															</Transition>
														</>
													)}
												</Popover>
											))}
											{navigation.pages.map((page) => (
												<a
													key={page.name}
													href={page.href}
													className="flex items-center text-sm font-medium text-white hover:text-gray-300">
													{page.name}
												</a>
											))}
											<div className="flex items-center">
												<Menu>
													<div>
														<Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 text-white">
															<span className="absolute -inset-1.5" />
															<span className="sr-only">
																Open user menu
															</span>
															Create
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
														<Menu.Items className="relative inset-y-10 -inset-x-10 mt-10 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
															<Menu.Item>
																{({ active }) => (
																	<div>
																		<Popup
																			{...{ contentStyle }}
																			trigger={
																				<button
																					href="#"
																					className={classNames(
																						active
																							? "bg-gray-100"
																							: "",
																						"block px-4 py-2 text-sm text-gray-700"
																					)}>
																					Board
																				</button>
																			}
																			modal
																			nested>
																			<BoardForm />
																		</Popup>
																	</div>
																)}
															</Menu.Item>
															<Menu.Item>
																{({ active }) => (
																	<div>
																		<Popup
																			{...{ contentStyle }}
																			trigger={
																				<button
																					href="#"
																					className={classNames(
																						active
																							? "bg-gray-100"
																							: "",
																						"block px-4 py-2 text-sm text-gray-700"
																					)}>
																					Group
																				</button>
																			}
																			modal
																			nested>
																			<BoardForm />
																		</Popup>
																	</div>
																)}
															</Menu.Item>
														</Menu.Items>
													</Transition>
												</Menu>
											</div>
										</div>
									</Popover.Group>
									<div className="ml-auto flex items-center">
										<div className="flex lg:ml-6">
											<a
												href="#"
												className="p-2 text-white hover:text-gray-500">
												<span className="sr-only">Search</span>
												<MagnifyingGlassIcon
													className="h-6 w-6"
													aria-hidden="true"
												/>
											</a>
										</div>

										{/* notifications dropdown */}
										<Menu
											as="div"
											className="relative ml-3">
											<div>
												<Menu.Button className="relative rounded-full bg-orange p-1 text-white hover:text-foreground focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
													<span className="absolute -inset-1.5" />
													<span className="sr-only">Open user menu</span>
													<span className="absolute -inset-1.5" />
													<span className="sr-only">
														View notifications
													</span>
													<BellIcon
														className="h-6 w-6"
														aria-hidden="true"
													/>
												</Menu.Button>
											</div>
											{notifications.length > 0 ? (
												<div>
													{Object.keys(notifications).map((i, j) => {
														return (
															<div>
																<Transition
																	as={Fragment}
																	enter="transition ease-out duration-100"
																	enterFrom="transform opacity-0 scale-95"
																	enterTo="transform opacity-100 scale-100"
																	leave="transition ease-in duration-75"
																	leaveFrom="transform opacity-100 scale-100"
																	leaveTo="transform opacity-0 scale-95">
																	<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
																		<Menu.Item>
																			{({ active }) => (
																				<a
																					href={`/profile/${user.data.id}`}
																					className={classNames(
																						active
																							? "bg-gray-100"
																							: "",
																						"block px-4 py-2 text-sm text-gray-700"
																					)}>
																					Your Profile
																				</a>
																			)}
																		</Menu.Item>
																	</Menu.Items>
																</Transition>
															</div>
														);
													})}
												</div>
											) : (
												<div>
													<Transition
														as={Fragment}
														enter="transition ease-out duration-100"
														enterFrom="transform opacity-0 scale-95"
														enterTo="transform opacity-100 scale-100"
														leave="transition ease-in duration-75"
														leaveFrom="transform opacity-100 scale-100"
														leaveTo="transform opacity-0 scale-95">
														<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
															<Menu.Item>
																{({ active }) => (
																	<a
																		href={`/profile/${user.data.id}`}
																		className={classNames(
																			active
																				? "bg-gray-100"
																				: "",
																			"block px-4 py-2 text-sm text-gray-700"
																		)}>
																		No new notifications
																	</a>
																)}
															</Menu.Item>
														</Menu.Items>
													</Transition>
												</div>
											)}
										</Menu>

										{/* profile dropdown */}
										<Menu
											as="div"
											className=" ml-3">
											<div>
												<Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
													<span className="absolute -inset-1.5" />
													<span className="sr-only">Open user menu</span>
													{image ? (
														<img
															className="h-8 w-8 object-cover rounded-full"
															src={
																"data:image/jpg/jpeg/png;base64," +
																image
															}
														/>
													) : (
														<img
															className="h-8 w-8 rounded-full"
															src={`https://ui-avatars.com/api/?name=${user.data.firstName}+${user.data.lastName}`}
															alt=""
														/>
													)}
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
												<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
													<Menu.Item>
														{({ active }) => (
															<a
																href={`/profile/${user.data.id}`}
																className={classNames(
																	active ? "bg-gray-100" : "",
																	"block px-4 py-2 text-sm text-gray-700"
																)}>
																Your Profile
															</a>
														)}
													</Menu.Item>
													<Menu.Item>
														{({ active }) => (
															<a
																href="#"
																className={classNames(
																	active ? "bg-gray-100" : "",
																	"block px-4 py-2 text-sm text-gray-700"
																)}>
																Settings
															</a>
														)}
													</Menu.Item>
													<Menu.Button onClick={logout}>
														{({ active }) => (
															<a
																href="#"
																className={classNames(
																	active ? "bg-gray-100" : "",
																	"block px-4 py-2 text-sm text-gray-700"
																)}>
																Sign out
															</a>
														)}
													</Menu.Button>
												</Menu.Items>
											</Transition>
										</Menu>
									</div>
								</>
							) : (
								<div className="ml-auto flex items-center">
									<div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
										<a
											href="/login"
											className="text-sm font-medium text-white hover:text-cardTile">
											Sign in
										</a>
										<span
											className="h-6 w-px bg-gray-200"
											aria-hidden="true"
										/>
										<a
											href="/signup"
											className="text-sm font-medium text-white hover:text-cardTile">
											Create account
										</a>
									</div>
								</div>
							)}

							{/* Cart */}
							{/* <div className="ml-4 flow-root lg:ml-6">
                    <a href="#" className="group -m-2 flex items-center p-2">
                        <ShoppingBagIcon
                        className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                        />
                        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                        <span className="sr-only">items in cart, view bag</span>
                    </a>
                    </div> */}
						</div>
					</div>
				</nav>
			</header>
		</div>
	);
}
