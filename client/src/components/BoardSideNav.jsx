import Accordion from "./Accordion";
import Popup from "reactjs-popup";
import AddMembers from "./AddMembers";
import { useUpdate } from "../utils/Context";
import { useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";

const BoardSideNav = ({
	boardId,
	title,
	participants,
	description,
	cover,
	participantsChange,
	updateDescription,
	boards,
	owner,
}) => {
	const { user } = useUpdate();
	const [active, setActive] = useState(false);
	// const [boardDescription, setBoardDescription] = useState(description);
	const [errorMessage, setErrorMessage] = useState(false);
	const contentStyle = {
		marginLeft: "auto",
		marginRight: "auto",
		width: "50%",
		minWidth: "content",
		height: "content",
		minHeight: "20%",
	};

	async function changeBoardDescription(event) {
		event.preventDefault();
		let description = await event.target[0].value;

		const myFormData = new FormData();

		myFormData.append("description", description);
		myFormData.append("boardId", boardId);

		let updated = await axios.post(
			`${process.env.REACT_APP_API_URL}/boards/update-description`,
			myFormData,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		if (!updated.data.error) {
			// setBoardDescription(updated.data);
			updateDescription(updated.data);
			setActive((current) => !current);
		} else {
			setErrorMessage(updated.data.error);
		}
	}
	async function handleBlur() {
		setActive((current) => !current);
	}

	if (user.data.id === owner) {
		return (
			<div className="bg-foreground bg-opacity-80  h-fit min-h-full rounded-md mt-24">
				{/* sticky */}
				<div>
					<a href="/home">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-10 h-10 pt-3 ml-5 text-white">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
							/>
						</svg>
					</a>
				</div>
				<h4 className="mt-5 ml-5 text-left text-xl font-bold leading-9 tracking-tight text-white self-start justify-start">
					{title}
				</h4>
				<div>
					<ul
						id="slide-out"
						className="sidenav">
						<li>
							<div className="user-view">
								<div className="background place-items-center">
									<img
										src={"data:image/jpg;base64," + cover}
										className="h-80 mx-auto mt-10 rounded-md"
									/>
								</div>
							</div>
						</li>
					</ul>
				</div>
				<p className="self-center mt-5 justify-center ml-2 text-sm font-bold leading-9 tracking-tight text-white p-1">
					Board Description
				</p>
				<div className="ml-2 -mt-1 flex flex-row justify-start p-1">
					<button onClick={handleBlur}>
						<a>
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
									d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
								/>
							</svg>
						</a>
					</button>

					{active ? (
						<div
							className="w-full px-5"
							onMouseLeave={handleBlur}>
							<form onSubmit={changeBoardDescription}>
								<label
									htmlFor="boardImage"
									className="block text-m font-medium leading-6 text-white text-center">
									Add Description
								</label>
								<textarea
									type="text"
									className="block w-4/5 rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6"
									placeholder={`${description}`}
									// onBlur={handleBlur}
								/>
								<button
									type="submit"
									className="mt-2 text-white bg-cardTile hover:bg-opacity-90 w-2/5 p-1 text-center justify-center self-center rounded-md">
									Add
								</button>
							</form>
						</div>
					) : description ? (
						<div>
							<p className="ml-2 text-sm font-bold leading-9 tracking-tight text-white">
								{description}
							</p>
						</div>
					) : (
						<button
							className="self-center justify-center ml-2 text-sm font-bold leading-9 tracking-tight text-white"
							onClick={handleBlur}>
							Add a description
						</button>
					)}
				</div>
				<div className="ml-2 mt-5 p-1 flex flex-row justify-start">
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
							d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
						/>
					</svg>

					<ul className="ml-2 text-sm font-bold leading-9 tracking-tight text-white">
						Members
					</ul>
				</div>
				<div className="ml-2 mb-2 p-1 justify-start">
					{Object.keys(participants).map((i, j) => {
						let image;
						if (participants[i].image) {
							image = Buffer.from(participants[i].image.data, "binary").toString(
								"base64"
							);
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
												src={"data:image/jpg/jpeg/png;base64," + image}
											/>
										) : (
											<img
												className="h-8 w-8 rounded-full object-cover self-center justify-center"
												src={`https://ui-avatars.com/api/?name=${participants[i].firstName}+${participants[i].lastName}`}
											/>
										)}
										<div className="self-center justify-center">
											<li className="flow-root text-left ml-2 text-sm leading-9 tracking-tight text-white">
												<a href={`/profile/${participants[i]._id}`}>
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
					<div className="flex flex-row justify-start">
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
								d="M12 4.5v15m7.5-7.5h-15"
							/>
						</svg>
						<Popup
							{...{ contentStyle }}
							position={"center-center"}
							trigger={
								<span>
									<button className="ml-5 text-center text-sm leading-9 font-semibold tracking-tight text-white hover:text-orange-400 self-center justify-center">
										Add Members
									</button>
								</span>
							}
							modal
							nested>
							<AddMembers
								boardId={boardId}
								participants={participants}
								participantsChange={participantsChange}
							/>
						</Popup>
					</div>
				</div>
				<div className="mb-2 px-1">
					<Accordion
						title="Boards"
						data={boards}
						boardId={boardId}
					/>
				</div>
			</div>
		);
	}
};

export default BoardSideNav;
