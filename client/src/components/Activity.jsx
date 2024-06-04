import React from "react";

const Activity = () => {
	return (
		<div className="px-7">
			<h4 className="p-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
				Recent Activity
			</h4>
			<div className="flex flex-col space-y-5 justify-center">
				<div className="flex space-x-5">
					<img
						className="h-10 w-10 rounded-full self-center justify-center"
						src="https://ui-avatars.com/api/?name=John+Doe"
					/>
					<p className="text-left text-xs font-bold leading-9 tracking-tight text-white self-center justify-center">
						John Doe commented on your board
					</p>
				</div>
				<div className="flex space-x-5">
					<img
						className="h-10 w-10 rounded-full self-center justify-center"
						src="https://ui-avatars.com/api/?name=John+Doe"
					/>
					<p className="text-left text-xs font-bold leading-9 tracking-tight text-white self-center justify-center">
						John Doe commented on your board
					</p>
				</div>
				<div className="flex space-x-5">
					<img
						className="h-10 w-10 rounded-full self-center justify-center"
						src="https://ui-avatars.com/api/?name=John+Doe"
					/>
					<p className="text-left text-xs font-bold leading-9 tracking-tight text-white self-center justify-center">
						John Doe commented on your board
					</p>
				</div>
				<div className="flex space-x-5">
					<img
						className="h-10 w-10 rounded-full self-center justify-center"
						src="https://ui-avatars.com/api/?name=John+Doe"
					/>
					<p className="text-left text-xs font-bold leading-9 tracking-tight text-white self-center justify-center">
						John Doe commented on your board
					</p>
				</div>
			</div>
		</div>
	);
};

export default Activity;
