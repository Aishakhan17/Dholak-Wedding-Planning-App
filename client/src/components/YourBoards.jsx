import React, { useState, useEffect } from "react";
import { useUpdate } from "../utils/Context";
import BoardTile from "./BoardTile";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import BoardForm from "./BoardForm";
import { Buffer } from "buffer";
import noImg from "../assets/noImg.png";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const YourBoards = ({ boards, isLoading }) => {
	const { user } = useUpdate();
	const userId = user.data.id;
	const userFirstName = user.data.firstName;
	const userLastName = user.data.lastName;
	let ownerImage;
	const contentStyle = {
		width: "33%",
		// marginTop: "15rem",
		marginLeft: "auto",
		marginRight: "auto",
		background: "#121212",
	};

	if (user.data.image) {
		ownerImage = user.data.image;
	} else {
		ownerImage = noImg;
	}
	console.log("isLoading", isLoading);
	if (isLoading) {
		return (
			<div className="mt-10">
				<SkeletonTheme
					baseColor="#121212"
					highlightColor="#091f2a"
					width="100%"
					height="30rem"
					borderRadius="2%"
					opacity="0.1">
					<p>
						<Skeleton />
					</p>
				</SkeletonTheme>
			</div>

			// <Loading />
		);
	}

	return (
		<div>
			<h4 className="mt-10 text-center text-md font-bold leading-12 tracking-tight text-white">
				Your boards
			</h4>
			<div>
				<div className="flex flex-col">
					<a className="self-center justify-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="white"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="mt-10 mb-0 w-8 h-8 self-center justify-center hover:opacity-50">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
							/>
						</svg>
					</a>
					<Popup
						{...{ contentStyle }}
						trigger={
							<button className="mt-2 text-center text-md font-bold leading-9 tracking-tight text-white hover:text-orange-400 self-center justify-center">
								Create a new Board
							</button>
						}
						position="center-center">
						<BoardForm />
					</Popup>
				</div>
			</div>

			<div className="mt-10 grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 px-10 md:grid-cols-2 place-items-center">
				{Object.keys(boards).map((i, j) => {
					let cover = Buffer.from(boards[i].cover.data.data, "binary").toString("base64");
					return (
						<div className="self-center justify-center">
							<BoardTile
								key={j}
								cover={"data:image/jpg;base64," + cover}
								title={boards[i]["title"]}
								ownerFirstName={userFirstName}
								ownerLastName={userLastName}
								ownerId={userId}
								ownerImage={ownerImage}
								createdAt={boards[i]["createdAt"]}
								boardId={boards[i]._id}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default YourBoards;
