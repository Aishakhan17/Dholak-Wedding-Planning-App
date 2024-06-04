import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import BoardSideNav from "../../components/BoardSideNav";
import Navbar from "../../components/Navbar";
import { useUpdate } from "../../utils/Context";
import axios from "axios";
import { Buffer } from "buffer";
import ImageCarousel from "../../components/ImageCarousel";
import ListAndCards from "../../components/ListAndCards";

const Board = () => {
	let { id } = useParams();
	let [boards, setBoards] = useState([]);
	let [errorMessage, setErrorMessage] = useState("");
	let [title, setTitle] = useState("");
	let [cover, setCover] = useState("");
	let [images, setImages] = useState([]);
	let [description, setDescription] = useState("");
	let [participants, setParticipants] = useState([]);
	let [owner, setOwner] = useState("");
	let [isLoading, setIsLoading] = useState(false);
	let [loading, setLoading] = useState(false);
	const { user } = useUpdate();

	function participantsChange(updatedParticipants) {
		setParticipants(updatedParticipants);
	}

	function updateImages(updatedImages) {
		setImages(updatedImages);
	}
	function updateDescription(updatedDescription) {
		setDescription(updatedDescription);
	}

	useEffect(() => {
		let isCancelled = false;
		if (!isCancelled) {
			const boardResult = fetchBoards();
			boardResult.then((boardResult) => {
				setBoards(boardResult.data);
			});
		}
		return () => {
			isCancelled = true;
		};
	}, []);

	async function fetchBoards() {
		const userBoards = await axios.post(
			`${process.env.REACT_APP_API_URL}/boards/get-boards`,
			{
				user,
			},
			{ "X-Requested-With": "XMLHttpRequest" }
		);
		if (userBoards.status === 200) {
			return userBoards;
		}
	}

	useEffect(() => {
		let isCancelled = false;
		if (!isCancelled) {
			const result = fetchBoardData();
			result.then((result) => {
				setTitle(result.data.title);
				setDescription(result.data.description);
				setCover(Buffer.from(result.data.cover.data.data, "binary").toString("base64"));
				setParticipants(result.data.participants);
				setOwner(result.data.owner);
			});
		}
		return () => {
			isCancelled = true;
		};
	}, []);

	async function fetchBoardData() {
		setIsLoading((current) => !current);
		const boardData = await axios.post(
			`${process.env.REACT_APP_API_URL}/boards/board`,
			{
				id,
			},
			{ "X-Requested-With": "XMLHttpRequest" }
		);
		if (boardData.status === 200) {
			setIsLoading((current) => !current);
			return boardData;
		}
	}

	async function fetchBoardImages() {
		setLoading((current) => !current);
		const boardImages = await axios.post(
			`${process.env.REACT_APP_API_URL}/boards/board-images`,
			{
				id,
			}
		);

		if (boardImages.status === 200) {
			setLoading((current) => !current);
			return boardImages;
		}
	}

	useEffect(() => {
		let isCancelled = false;
		if (!isCancelled) {
			const result = fetchBoardImages();
			result.then((result) => {
				setImages(result.data);
			});
		}
		return () => {
			isCancelled = true;
		};
	}, []);

	async function uploadImage(event) {
		event.preventDefault();
		let boardImage = await event.target[0].files[0];
		let boardId = id;

		const myFormData = new FormData();

		myFormData.append("boardImage", boardImage);
		myFormData.append("boardId", boardId);

		const uploadStatus = await axios.post(
			`${process.env.REACT_APP_API_URL}/boards/add-image`,
			myFormData,
			{ crossdomain: true },
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
		);
		// console.log("uploadStatus", uploadStatus.data);
		if (uploadStatus.data.error) {
			setErrorMessage(uploadStatus.data.error);
		} else {
			updateImages(uploadStatus.data);
		}
	}
	if (isLoading) {
		return <Loading />;
	} else {
		return (
			<div className="h-full min-h-screen mx-auto w-5/6">
				<Navbar />
				{user.data.id === owner ? (
					<div className="grid grid-cols-[320px_minmax(400px,_2fr)] gap-x-5 gap-y-10">
						<div className="">
							<BoardSideNav
								boardId={id}
								title={title}
								participants={participants}
								cover={cover}
								description={description}
								participantsChange={participantsChange}
								updateDescription={updateDescription}
								boards={boards}
								owner={owner}
							/>
						</div>
						<div className="">
							<div className="ml-2 justify-center">
								<h1 className="mt-10 text-center text-xl font-bold leading-9 tracking-tight text-white self-center justify-center">
									Mood Board
								</h1>
								<ImageCarousel images={images} />
							</div>
							<div>
								{errorMessage && (
									<h3 className="mt-10 text-center text-1xl font-semi-bold leading-9 tracking-tight text-white">
										{errorMessage}
									</h3>
								)}
							</div>
							<div className="flex flex-row justify-center items-center">
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
							<div className="grid grid-cols-[900px_minmax(300px,_0.5fr)] gap-x-5 gap-y-8">
								<div>
									<p className="mt-10 text-center text-xl font-bold leading-9 tracking-tight text-white self-center justify-center">
										Huddle Corner
									</p>
									<ListAndCards
										boardId={id}
										participants={participants}
									/>
								</div>
								<div className="">
									<p className="mt-10 bg-card bg-opacity-90 text-center text-sm font-bold leading-9 tracking-tight text-white self-center justify-center rounded-md">
										Members
									</p>
									<div className="mt-10 flex space-x-2 overflow-hidden">
										{Object.keys(participants).map((i, j) => {
											let participantImage;
											if (participants[i].image) {
												participantImage = Buffer.from(
													participants[i].image.data,
													"binary"
												).toString("base64");
											}
											return (
												<div
													key={j}
													className="mt-1">
													<img />
													<li className="flow-root ml-2 text-sm leading-9 tracking-tight text-white">
														{participantImage ? (
															<a
																href={`/profile/${participants[i]._id}`}>
																<img
																	className="inline-block object-cover h-10 w-10 rounded-full ring-1 ring-white"
																	src={
																		"data:image/jpg/jpeg/png;base64," +
																		participantImage
																	}
																/>
															</a>
														) : (
															<a
																href={`/profile/${participants[i]._id}`}>
																<img
																	className="inline-block h-11 w-11 object-cover rounded-full ring-1 ring-white"
																	src={`https://ui-avatars.com/api/?name=${participants[i].firstName}+${participants[i].lastName}`}
																/>
															</a>
														)}
													</li>
												</div>
											);
										})}
									</div>
								</div>
							</div>
						</div>
					</div>
				) : (
					<div className="mt-10 bg-gradient-to-r from-foreground to-black p-2">
						<h4 className="mt-10 text-center text-xl font-bold leading-9 tracking-tight text-white self-center justify-center">
							{title}
						</h4>
						{description && (
							<p className="mt-5 text-center text-sm font-bold leading-9 tracking-tight text-white self-center justify-center">
								Description: {description}
							</p>
						)}
						<div className="mt-14 justify-center">
							<ImageCarousel images={images} />
						</div>
					</div>
				)}
			</div>
		);
	}
};

export default Board;
