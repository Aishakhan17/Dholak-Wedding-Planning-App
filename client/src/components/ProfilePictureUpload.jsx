import { useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";

const ProfilePictureUpload = ({ userImage, id, updateProfilePicture, firstName, lastName }) => {
	let [image, setImage] = useState(userImage);
	let [errorMessage, setErrorMessage] = useState("");

	async function uploadImage(event) {
		event.preventDefault();
		if (event.target[0].files[0] === undefined) {
			setErrorMessage("Please pick an image");
		}
		if (!(event.target[0].files[0] === undefined)) {
			let profilePicture = await event.target[0].files[0];
			let myFormData = new FormData();
			myFormData.append("profilePicture", profilePicture);
			myFormData.append("userId", id);

			let upload = await axios.post(
				`${process.env.REACT_APP_API_URL}/users/upload-picture`,
				myFormData,
				{ crossdomain: true },
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			console.log("upload", upload);
			if (!upload.data.error) {
				setImage(Buffer.from(upload.data.data.data, "binary").toString("base64"));
				updateProfilePicture(
					Buffer.from(upload.data.data.data, "binary").toString("base64")
				);
			}
			if (upload.data.error) {
				setErrorMessage(upload.data.error);
			}
		}
	}
	return (
		<div className="bg-foreground min-h-full">
			<div className="p-10">
				<div className="flex flex-col">
					<h1 className="text-center text-2xl font-bold leading-9 tracking-tight text-white p-1">
						Upload Image
					</h1>
					{errorMessage && (
						<h1 className="text-center text-l leading-9 tracking-tight text-white p-1">
							{errorMessage}
						</h1>
					)}
					<div className="relative overflow-hidden pb-2/3">
						{userImage ? (
							<img
								className="absolute h-full w-full object-cover self-center justify-center"
								src={"data:image/jpg/png/jpeg/;base64," + image}
							/>
						) : (
							<img
								className="absolute h-full w-full object-cover self-center justify-center"
								src={`https://ui-avatars.com/api/?name=${firstName}+${lastName}`}
							/>
						)}
					</div>
				</div>
				<div className="flex flex-row justify-center items-center mt-10">
					<form
						className="space-y-6"
						enctype="multipart/form-data"
						onSubmit={uploadImage}>
						<div className="mt-5 flex flex-row items-center justify-center">
							<label
								htmlFor="boardImage"
								for="boardImage"
								className="block text-m font-medium leading-6 text-gray-900"></label>
							<input
								type="file"
								id="boardImage"
								name="boardImage"
								className="flex w-full justify-center file:rounded-md rounded-md file:bg-white file:hover:bg-opacity-90 file:px-3 file:py-1 file:text-sm file:font-semibold file:leading-6 text-white file:shadow-sm file:focus-visible:outline file:focus-visible:outline-2 file:focus-visible:outline-offset-2 file:focus-visible:outline-indigo-600"
							/>
							<button type="submit">
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
										d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
									/>
								</svg>
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ProfilePictureUpload;
