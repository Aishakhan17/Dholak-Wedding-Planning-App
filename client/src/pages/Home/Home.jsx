import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { useUpdate } from "../../utils/Context";
import OtherBoards from "../../components/OtherBoards";
import YourBoards from "../../components/YourBoards";
import Accordion from "../../components/Accordion";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import BoardForm from "../../components/BoardForm";
import Popup from "reactjs-popup";
import Activity from "../../components/Activity";

const Home = () => {
	const { user, isAuthenticated } = useUpdate();
	const [isLoading, setIsLoading] = useState(false);
	let [boards, setBoards] = useState([]);
	const navigate = useNavigate();

	const contentStyle = {
		width: "33%",
		// marginTop: "15rem",
		marginLeft: "auto",
		marginRight: "auto",
		opacity: "97%",
	};

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
		setIsLoading((current) => !current);
		const userBoards = await axios.post(
			`${process.env.REACT_APP_API_URL}/boards/get-boards`,
			{
				user,
			},
			{ "X-Requested-With": "XMLHttpRequest" }
		);
		if (userBoards.status === 200) {
			setIsLoading((current) => !current);
			return userBoards;
		}
	}
	if (isLoading) {
		return (
			<div className="mt-24">
				<Loading />
			</div>
		);
	}
	if (isAuthenticated) {
		return (
			<div className="h-full min-h-screen mx-auto w-5/6">
				<Navbar />
				<div className="grid grid-cols-[300px_minmax(400px,_1fr)_300px] gap-x-5 gap-y-10 mt-24 ">
					<div className="bg-foreground bg-opacity-80 rounded-md h-fit min-h-full max-h-fit">
						<div className="mb-2 p-5">
							<Accordion
								title="Boards"
								data={boards}
							/>
						</div>
						<div className="flex space-x-3 px-5 py-2 ml-2">
							<a className="self-center justify-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="white"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6 self-center justify-center hover:opacity-50">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
									/>
								</svg>
							</a>
							<Popup
								{...{ contentStyle }}
								position={"center-center"}
								trigger={
									<span>
										<button className="text-center text-sm font-bold leading-9 tracking-tight text-white hover:text-orange-400 self-center justify-center">
											Create a new Board
										</button>
									</span>
								}
								modal
								nested>
								<BoardForm />
							</Popup>
						</div>
					</div>
					<div>
						<div className=" rounded-md h-fit min-h-screen">
							<div className="">
								<h4 className="p-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
									Hello {user.data.firstName}
								</h4>
								<h4 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-white">
									Here's what's happened since you last checked in
								</h4>
								<div className="p-5 bg-background bg-opacity-5">
									<OtherBoards />
								</div>
								<div>
									<YourBoards
										boards={boards}
										isLoading={isLoading}
									/>
								</div>
							</div>
						</div>
					</div>
					<div>
						<div className="bg-foreground bg-opacity-80 rounded-md h-fit min-h-full max-h-fit">
							{/* <h4 className="p-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
								Activity
							</h4> */}
							<Activity />
						</div>
					</div>
				</div>
			</div>
		);
	} else {
		navigate("/");
	}
};

export default Home;
