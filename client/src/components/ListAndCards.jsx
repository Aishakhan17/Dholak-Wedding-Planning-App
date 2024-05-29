import axios from "axios";
import { useEffect, useState, Fragment } from "react";
import List from "./List";
import Loading from "./Loading";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

const ListAndCards = ({ boardId }) => {
	const [lists, setLists] = useState([]);
	let [active, setActive] = useState(false);
	let [errorMessage, setErrorMessage] = useState("");
	// const contentStyle = {marginLeft: "auto", marginRight: "auto", width: "40%", minWidth: "content", height: "content", minHeight: "20%"}

	async function createList(event) {
		event.preventDefault();
		let listTitle = event.target[0].value;
		let result = await axios.post(
			`${process.env.REACT_APP_API_URL}/lists/create-list`,
			{ boardId, listTitle },
			{ crossdomain: true },
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		let updatedLists = getLists();
		updatedLists.then((updatedLists) => setLists(updatedLists.data));
		updatedLists.then(setActive((current) => !current));
	}

	useEffect(() => {
		let isCancelled = false;
		if (!isCancelled) {
			const result = getLists();
			result.then((result) => {
				setLists(result.data);
			});
			// handleListUpdate(result)
		}
		return () => {
			isCancelled = true;
		};
	}, []);

	async function getLists() {
		let boardLists = await axios.post(
			`${process.env.REACT_APP_API_URL}/lists/get-lists`,
			{ boardId },
			{ crossdomain: true },
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		if (boardLists.status === 200) {
			return boardLists;
		}
	}

	async function listChange(updatedBoardLists) {
		setLists(updatedBoardLists);
	}

	async function errorMessageUpdate(message) {
		setErrorMessage(message);
	}

	async function handleBlur() {
		setActive((current) => !current);
	}

	return (
		<div className="flex flex-col">
			<div className="relative self-center justify-center mt-5 h-fit w-64 min-w-48 bg-card bg-opacity-80 rounded-md">
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
							Create a List..
						</button>
					</div>
				) : (
					<div
						className="w-full p-3"
						onMouseLeave={handleBlur}>
						<form onSubmit={createList}>
							<label
								htmlFor="boardImage"
								className="block text-m font-medium leading-6 text-white text-center">
								Add List Title
							</label>
							<input
								type="text"
								className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6"
								placeholder="Enter list title. Example pending"
								// onBlur={handleBlur}
							/>
							<button
								type="submit"
								className="mt-2 text-white bg-cardTile hover:bg-opacity-90 w-2/5 p-1 text-center justify-center self-center rounded-md">
								Add List
							</button>
						</form>
					</div>
				)}
			</div>
			<div className=" mt-2">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					{errorMessage && (
						<h3 className="mt-2 text-xl font-semi-bold leading-9 tracking-tight text-gray-800">
							{errorMessage}
						</h3>
					)}
				</div>
				{lists.length > 0 ? (
					<div className="flex flex-row flex-wrap justify-center">
						{Object.keys(lists).map((i, j) => {
							let listTitle = lists[i].title;
							let id = lists[i]._id;
							return (
								<List
									listTitle={listTitle}
									id={id}
									boardId={boardId}
									listChange={listChange}
									errorMessageUpdate={errorMessageUpdate}
								/>
							);
						})}
					</div>
				) : (
					<div>
						<p className="text-center text-xl font-bold leading-9 tracking-tight text-white self-center p-1">
							No Lists to Show
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default ListAndCards;
