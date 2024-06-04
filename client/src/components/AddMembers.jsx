import axios from "axios";
import React, { useEffect, useState } from "react";
import noImg from "../assets/noImg.png";
import { useUpdate } from "../utils/Context";

const AddMembers = ({ boardId, participants, participantsChange }) => {
	let [query, setQuery] = useState("");
	let [users, setUsers] = useState([]);
	let [status, setStatus] = useState(false);
	let [errorMessage, setErrorMessage] = useState("");
	let { user } = useUpdate();
	let currentUser = user.data.id;

	function handleQuery(e) {
		let name = e.target.value;
		setQuery(name);
		if (name.length > 0) {
			let searchResult = userList(name);
			searchResult.then((searchResult) => setUsers(searchResult.data));
		} else if (name.length <= 0) {
			setUsers([]);
		}
	}

	async function userList(name) {
		const data = await axios.post(`${process.env.REACT_APP_API_URL}/users/get-users`, {
			name,
			currentUser,
			boardId,
		});
		return data;
	}

	async function addMember(id) {
		const updatedParticipants = await axios.post(
			`${process.env.REACT_APP_API_URL}/notifications/add-members`,
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
		if (!updatedParticipants.data.error) {
			participantsChange(updatedParticipants.data);
		} else {
			setErrorMessage(updatedParticipants.data.error);
		}
	}
	async function removeMember(id) {
		console.log("removed");
	}

	return (
		<div className="bg-white flex min-h-full flex-1 flex-col justify-center self-center px-6 py-12 lg:px-8 m-auto">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				{errorMessage && (
					<h3 className="mt-2 text-xl font-semi-bold leading-9 tracking-tight text-gray-800">
						{errorMessage}
					</h3>
				)}
			</div>
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<form className="space-y-6">
					<label
						htmlFor="email"
						className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-800">
						Search by Email or Name
					</label>
					<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm h-fit flex justify-between place-items-center">
						<input
							id="user-info"
							name="user-info"
							type="text"
							// autoComplete="user-info"
							placeholder="email or name"
							required
							className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6"
							onChange={handleQuery}
						/>
						<button
							type="button"
							className="w-1/4 flex justify-center items-center rounded-md bg-transparent hover:text-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white border-current shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6 text-gray-800">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
								/>
							</svg>
						</button>
					</div>
				</form>
				{Object.keys(users).length !== 0 ? (
					<div className="bg-white bg-opacity-90 h-full mt-2 w-sm">
						<ul className="">
							<div>
								{Object.keys(users).map((i, j) => {
									return (
										<div key={j}>
											<div
												className="flex justify-between p-2 w-4/5 border rounded-md border-slate-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400"
												key={j}>
												{users[i].image ? (
													<img
														className="h-5 w-5 rounded-full"
														src={users[i].image}
													/>
												) : (
													<img
														className="h-5 w-5"
														src={noImg}
													/>
												)}
												<span>
													<a href={`/profile/${users[i].id}`}>
														{users[i].firstName} {users[i].lastName}
													</a>
												</span>
												<span>
													{status === false ? (
														<button
															onClick={() => addMember(users[i].id)}>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																fill="none"
																viewBox="0 0 24 24"
																strokeWidth={1.5}
																stroke="currentColor"
																className="w-6 h-6">
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
																/>
															</svg>
														</button>
													) : (
														<button onClick={() => removeMember()}>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																fill="none"
																viewBox="0 0 24 24"
																strokeWidth={1.5}
																stroke="currentColor"
																className="w-6 h-6">
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
																/>
															</svg>
														</button>
													)}
												</span>
											</div>
										</div>
									);
								})}
							</div>
						</ul>
					</div>
				) : (
					<div>
						<p>No users found</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default AddMembers;
