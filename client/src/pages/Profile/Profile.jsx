import React, { useEffect, useState } from "react";
import { useUpdate } from "../../utils/Context";
import Navbar from "../../components/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import YourBoards from "../../components/YourBoards";
import { Buffer } from "buffer";
import Popup from "reactjs-popup";
import ProfilePictureUpload from "../../components/ProfilePictureUpload";
import Loading from "../../components/Loading";

const contentStyle = {
	marginLeft: "auto",
	marginRight: "auto",
	width: "30%",
	minWidth: "content",
	height: "content",
	minHeight: "20%",
	background: "#EEEEF0",
};

const Profile = () => {
	let [user, setUser] = useState([]);
	let [isLoading, setIsLoading] = useState(false);
	const currentUser = useUpdate().user.data.id;
	const id = useParams().id;
	let [image, setImage] = useState("");

	useEffect(() => {
		let result = fetchUserDetails();
		result.then((result) => setUser(result.data));
		result.then((result) => {
			result.data.image.data !== undefined
				? setImage(Buffer.from(result.data.image.data, "binary").toString("base64"))
				: setImage("");
		});
	}, []);

	async function fetchUserDetails() {
		setIsLoading((current) => !current);
		let userDetails = await axios.post(`${process.env.REACT_APP_API_URL}/users/user`, {
			id,
		});
		console.log("userDetails", userDetails);
		if (!userDetails.data.error) {
			setIsLoading((current) => !current);
			return userDetails;
		}
	}

	async function updateProfilePicture(newImage) {
		setImage(newImage);
	}
	if (isLoading) {
		return (
			<div className="h-full min-h-screen mx-auto w-5/6">
				<Navbar />
				<Loading />
			</div>
		);
	}
	return (
		<div className="h-full min-h-screen mx-auto w-5/6">
			<Navbar />
			<div className="mt-24 grid grid-cols-[320px_minmax(400px,_2fr)] gap-x-5 gap-y-10">
				<div className="bg-foreground bg-opacity-80 h-fit min-h-screen flex flex-col mx-auto w-full rounded-md">
					<div className="mt-16  flex flex-col space-y-10justify-center self-center">
						<div className="group h-40 w-40 relative inline-block hover:block">
							{image ? (
								<img
									className="h-full w-full rounded-full object-cover inline-block group-hover:opacity-20"
									src={"data:image/jpg/jpeg/png;base64," + image}
								/>
							) : (
								<img
									className="h-full w-full rounded-full object-cover inline-block group-hover:opacity-20"
									src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`}
								/>
							)}
							<Popup
								{...{ contentStyle }}
								trigger={
									<button className="hidden absolute bottom-0 right-5 group-hover:block">
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
												d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
											/>
										</svg>
									</button>
								}
								modal
								nested>
								<ProfilePictureUpload
									userImage={image}
									id={id}
									updateProfilePicture={updateProfilePicture}
									firstName={user.firstName}
									lastName={user.lastName}
								/>
							</Popup>
						</div>
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
				{/* <div className="h-fit min-h-screen">
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
				</div> */}
			</div>
		</div>
	);
};

export default Profile;
