import { useState, useEffect } from "react";
import { useUpdate } from "../utils/Context";
import { Buffer } from "buffer";
import axios from "axios";
import BoardTile from "./BoardTile";
import Loading from "./Loading";
import noImg from "../assets/noImg.png";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const OtherBoards = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [otherBoards, setOtherBoards] = useState([]);
	const { user } = useUpdate();
	const id = user.data.id;
	let ownerImage;

	useEffect(() => {
		let isCancelled = false;
		if (!isCancelled) {
			const publicResult = fetchPublicBoards();
			publicResult.then((publicResult) => {
				setOtherBoards(publicResult.data);
			});
		}
		return () => {
			isCancelled = true;
		};
	}, []);

	async function fetchPublicBoards() {
		setIsLoading((current) => !current);
		const publicBoards = await axios.post(
			`${process.env.REACT_APP_API_URL}/boards/get-public-boards`,
			{
				id,
			}
		);

		if (Object.keys(publicBoards.data).length !== 0) {
			setIsLoading((current) => !current);
			return publicBoards;
		}
	}
	console.log(otherBoards);
	if (isLoading) {
		return (
			<div>
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
			<div className="mt-10 grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 px-5 md:grid-cols-2 place-items-center">
				{" "}
				{/* grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 px-10 md:grid-cols-2 */}
				{Object.keys(otherBoards).map((i, j) => {
					let cover = Buffer.from(otherBoards[i].cover.data.data, "binary").toString(
						"base64"
					);
					if (otherBoards[i]["owner"].image) {
						ownerImage = otherBoards[i]["owner"].image;
					} else {
						ownerImage = noImg;
					}
					return (
						<div className="self-center justify-center">
							<BoardTile
								key={j}
								cover={"data:image/jpg;base64," + cover}
								title={otherBoards[i]["title"]}
								ownerFirstName={otherBoards[i]["owner"].firstName}
								ownerLastName={otherBoards[i]["owner"].lastName}
								ownerId={otherBoards[i]["owner"]._id}
								createdAt={otherBoards[i]["createdAt"]}
								boardId={otherBoards[i]._id}
								ownerImage={ownerImage}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default OtherBoards;
