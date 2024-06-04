import { useEffect, useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Card from "./Card";
import axios from "axios";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

const List = ({ listTitle, id, boardId, listChange, errorMessageUpdate, participants }) => {
	let [active, setActive] = useState(false);
	let [cards, setCards] = useState([]);
	let [errorMessage, setErrorMessage] = useState("");
	const contentStyle = {
		marginLeft: "auto",
		marginRight: "auto",
		// marginTop: "20rem",
		width: "40%",
		minWidth: "content",
		height: "40rem",
		minHeight: "content",
		background: "#091f2A",
	};

	async function createCard(event) {
		event.preventDefault();
		let cardTitle = event.target[0].value;
		let cardStatus = await axios.post(`${process.env.REACT_APP_API_URL}/cards/create-card`, {
			id,
			cardTitle,
		});
		let updatedCards = getListCards();
		updatedCards.then((updatedCards) => setCards(updatedCards.data));
		updatedCards.then(setActive((current) => !current));
	}

	async function getListCards() {
		let listCards = await axios.post(
			`${process.env.REACT_APP_API_URL}/cards/get-cards`,
			{
				id,
			},
			{ crossdomain: true },
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		return listCards;
	}

	async function deleteList() {
		let deleted = await axios.post(
			`${process.env.REACT_APP_API_URL}/lists/delete-list`,
			{
				id,
				boardId,
			},
			{ crossdomain: true },
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (!deleted.data.error) {
			listChange(deleted.data);
		} else {
			errorMessageUpdate(deleted.data.error);
		}
	}

	useEffect(() => {
		let isCancelled = false;
		if (!isCancelled) {
			const result = getListCards();
			result.then((result) => {
				if (result.data.length > 0) {
					setCards(result.data);
				}
			});
		}
		return () => {
			isCancelled = true;
		};
	}, []);

	async function handleBlur() {
		setActive((current) => !current);
	}

	return (
		<div className="mt-5 ml-5 h-fit min-h-content w-64 min-w-48 bg-card bg-opacity-80 rounded-md justify-center">
			<div className="flex flex-row justify-between p-1">
				<h4 className="text-center text-xl font-bold leading-9 tracking-tight text-white self-center p-1">
					{listTitle}
				</h4>
				<Menu
					as="div"
					className="relative inline-block text-left">
					<div>
						<Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm  hover:bg-gray-50">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6 text-white">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
								/>
							</svg>
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
						<Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
							<div className="py-1">
								<Menu.Item>
									{({ active }) => (
										<a
											href="#"
											className={classNames(
												active
													? "bg-gray-100 text-gray-900"
													: "text-gray-700",
												"block px-4 py-2 text-sm"
											)}>
											Add Card
										</a>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<a
											href="#"
											className={classNames(
												active
													? "bg-gray-100 text-gray-900"
													: "text-gray-700",
												"block px-4 py-2 text-sm"
											)}>
											Watch
										</a>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<button onClick={deleteList}>
											<a
												href="#"
												className={classNames(
													active
														? "bg-gray-100 text-gray-900"
														: "text-gray-700",
													"block px-4 py-2 text-sm"
												)}>
												Delete List
											</a>
										</button>
									)}
								</Menu.Item>
								<form
									method="POST"
									action="#"></form>
							</div>
						</Menu.Items>
					</Transition>
				</Menu>
			</div>
			{cards.length > 0 ? (
				<div className="p-2">
					{Object.keys(cards).map((i, j) => {
						let cardTitle = cards[i].title;
						return (
							<Popup
								{...{ contentStyle }}
								position={"center-center"}
								trigger={
									<div className="bg-cardTile mt-2 rounded-lg hover:bg-opacity-80 flex flex-row justify-between p-2">
										<p className="text-center text-sm font-bold leading-9 tracking-tight text-white self-center justify-center">
											{cardTitle}
										</p>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-4 h-4 self-center justify-center text-white">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
											/>
										</svg>
									</div>
								}
								modal
								nested>
								<Card
									cardTitle={cardTitle}
									listTitle={listTitle}
									listId={id}
									boardId={boardId}
									participants={participants}
								/>
							</Popup>
						);
					})}
				</div>
			) : (
				<div>
					<p className="mt-2 text-center text-sm font-bold leading-9 tracking-tight text-white self-center justify-center">
						No Cards yet
					</p>
				</div>
			)}
			<div>
				{!active ? (
					<div className="w-full flex flex-row justify-evenly p-2">
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
								d="M12 4.5v15m7.5-7.5h-15"
							/>
						</svg>
						<button
							className="text-white text-center justify-center self-center"
							onClick={handleBlur}>
							Add new card
						</button>
					</div>
				) : (
					<div
						className="w-full p-3"
						onMouseLeave={handleBlur}>
						<form onSubmit={createCard}>
							<label
								htmlFor="boardImage"
								className="block text-m font-medium leading-6 text-white text-center">
								Add Card Title
							</label>
							<input
								type="text"
								className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6"
								placeholder="Enter list title. Example pending"
							/>
							<button
								type="submit"
								className="mt-2 text-white bg-cardTile hover:bg-opacity-90 w-2/5 p-1 text-center justify-center self-center rounded-md">
								Create
							</button>
						</form>
					</div>
				)}
			</div>
		</div>
	);
};

export default List;
