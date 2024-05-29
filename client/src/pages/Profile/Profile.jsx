import React, { useEffect, useState } from "react";
import { useUpdate } from "../../utils/Context";
import Navbar from "../../components/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import noImg from "../../assets/noImg.png";
import YourBoards from "../../components/YourBoards";

const Profile = () => {
	let [user, setUser] = useState([]);
	// const _id = useParams()
	const currentUser = useUpdate().user.data.id;
	const id = useParams().id;
	console.log("currentUser", currentUser, "user", user);

	useEffect(() => {
		let result = fetchUserDetails();
		result.then((result) => setUser(result.data));
	}, []);

	async function fetchUserDetails() {
		let userDetails = await axios.post(`${process.env.REACT_APP_API_URL}/users/user`, {
			id,
		});
		return userDetails;
	}
	// console.log(user)
	return (
		<div className="h-full min-h-screen mx-auto w-5/6">
			<Navbar />
			<div className="mt-24 grid grid-cols-[320px_minmax(400px,_2fr)] gap-x-5 gap-y-10">
				<div className="bg-foreground bg-opacity-80 h-fit min-h-screen flex flex-col mx-auto w-full rounded-md">
					<div className="mt-16 justify-center self-center">
						{user.image ? (
							<img
								className="h-36 w-36 rounded-full"
								src={`${user.image}`}
							/>
						) : (
							<img
								className="h-36 w-36 rounded-full"
								src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`}
							/>
						)}
					</div>
					<div className="self-center justify-center">
						<p className="mt-10 text-center text-xl font-bold leading-9 tracking-tight text-white self-center justify-center">
							{user.firstName} {user.lastName}
						</p>
						<p className="mt-2 text-center text-xs leading-2 tracking-tight text-white self-center justify-center">
							{user.email}
						</p>
					</div>
					<div className="flex flex-row justify-start p-5 ml-3">
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
						<span>
							<h4 className="ml-3 text-left text-sm font-bold leading-9 tracking-tight self-center justify-center text-white">
								Add a new board
							</h4>
						</span>
					</div>
				</div>
				<div className="h-fit min-h-screen">
					{currentUser === id ? (
						<div>
							<YourBoards />
						</div>
					) : (
						<div>
							<p className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white self-center justify-center">
								Nothing to see here
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Profile;