import React from "react";

const Card = ({ cardTitle }) => {
	return (
		<div className="bg-card min-h-full">
			<h1 className="ml-5 text-2xl font-bold leading-9 tracking-tight text-white self-center p-1">
				{cardTitle}
			</h1>
			<div className="flex flex-row">
				<div className="w-9/12 p-5">
					<h4 className="text-sm font-bold leading-9 tracking-tight text-white self-center p-1">
						Add Comment
					</h4>
					<div>
						<form>
							<input
								type="text"
								className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6"
								placeholder="Enter list title. Example pending"
							/>
							<button
								type="submit"
								className="mt-2 text-white bg-cardTile hover:bg-opacity-90 w-2/5 p-1 text-center justify-center self-center rounded-md">
								Post
							</button>
						</form>
					</div>
				</div>
				<div className="w-3/12 p-5">
					<h4 className="text-sm font-bold leading-9 tracking-tight text-white self-center p-1">
						Card Actions
					</h4>
				</div>
			</div>
		</div>
	);
};

export default Card;
